const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const distDir = path.resolve(__dirname, 'dist');

// Static server for dist/
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(distDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const mimeMap = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.webp': 'image/webp',
      '.jpg': 'image/jpeg',
      '.png': 'image/png',
      '.svg': 'image/svg+xml',
      '.mp3': 'audio/mpeg',
      '.m4a': 'audio/mp4',
      '.txt': 'text/plain',
      '.woff2': 'font/woff2',
      '.woff': 'font/woff',
    };
    res.setHeader('Content-Type', mimeMap[ext] || 'application/octet-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream(path.join(distDir, 'index.html')).pipe(res);
  }
});

const PORT = 4180;
const BASE_URL = `http://localhost:${PORT}`;

const VIEWPORTS = [
  // Small phone
  { name: 'small-phone-320', w: 320, h: 568, isMobile: true, hasTouch: true },
  { name: 'small-phone-360', w: 360, h: 640, isMobile: true, hasTouch: true },
  { name: 'small-phone-375', w: 375, h: 667, isMobile: true, hasTouch: true },
  // Phone
  { name: 'phone-390', w: 390, h: 844, isMobile: true, hasTouch: true },
  { name: 'phone-412', w: 412, h: 915, isMobile: true, hasTouch: true },
  { name: 'phone-430', w: 430, h: 932, isMobile: true, hasTouch: true },
  // Phone landscape
  { name: 'landscape-667x375', w: 667, h: 375, isMobile: true, hasTouch: true },
  { name: 'landscape-844x390', w: 844, h: 390, isMobile: true, hasTouch: true },
  // Tablet
  { name: 'tablet-768', w: 768, h: 1024, isMobile: true, hasTouch: true },
  { name: 'tablet-1024x768', w: 1024, h: 768, isMobile: false, hasTouch: true },
  // Laptop & Desktop
  { name: 'laptop-1280', w: 1280, h: 720, isMobile: false, hasTouch: false },
  { name: 'laptop-1440', w: 1440, h: 900, isMobile: false, hasTouch: false },
  { name: 'desktop-1920', w: 1920, h: 1080, isMobile: false, hasTouch: false },
  { name: 'desktop-2560', w: 2560, h: 1440, isMobile: false, hasTouch: false },
];

async function runAudit() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--autoplay-policy=no-user-gesture-required'],
  });

  const fullReport = {
    timestamp: new Date().toISOString(),
    viewportsAudited: [],
    defects: [],
    detectorResults: {},
    consoleMessages: [],
    failedRequests: [],
  };

  for (const vp of VIEWPORTS) {
    console.log(`\n=== Auditing Viewport: ${vp.name} (${vp.w}x${vp.h}) ===`);
    const screenDir = path.join(__dirname, 'qa', 'screens', vp.name);
    fs.mkdirSync(screenDir, { recursive: true });

    const context = await browser.newContext({
      viewport: { width: vp.w, height: vp.h },
      isMobile: vp.isMobile,
      hasTouch: vp.hasTouch,
      deviceScaleFactor: vp.isMobile ? 2 : 1,
    });

    const page = await context.newPage();

    const consoleLogs = [];
    const failedReqs = [];
    page.on('console', (msg) => {
      if (['error', 'warning'].includes(msg.type())) {
        consoleLogs.push({ type: msg.type(), text: msg.text() });
      }
    });
    page.on('requestfailed', (req) => {
      failedReqs.push({ url: req.url(), error: req.failure()?.errorText });
    });

    try {
      await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });

      // Wait for preloader curtain to dismiss (dismisses after ~1.8s)
      await page.waitForTimeout(2200);

      // 1. Above-the-fold screenshot
      await page.screenshot({ path: path.join(screenDir, 'above-the-fold.png'), fullPage: false });

      // 2. Dump initial rendered DOM
      const domHtml = await page.content();
      fs.writeFileSync(path.join(__dirname, 'qa', `dom-${vp.name}.html`), domHtml, 'utf8');

      // 3. Scroll-through capture (steps of 0.8 * viewport height, wait 700ms)
      const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      const stepSize = Math.round(vp.h * 0.8);
      const totalSteps = Math.min(18, Math.ceil(totalHeight / stepSize));

      for (let s = 0; s < totalSteps; s++) {
        await page.evaluate((scrollTarget) => {
          window.scrollTo(0, scrollTarget);
        }, s * stepSize);
        await page.waitForTimeout(700);

        // Only save selected key steps to conserve disk while capturing full journey
        if (s === 0 || s === 3 || s === 6 || s === 9 || s === 12 || s === totalSteps - 1) {
          const stepPadded = String(s).padStart(2, '0');
          await page.screenshot({
            path: path.join(screenDir, `step-${stepPadded}.png`),
            fullPage: false,
          });
        }
      }

      // 4. Per-section screenshots
      const sectionIds = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('section[id]')).map((s) => s.id);
      });

      for (const id of sectionIds) {
        const secEl = await page.$(`#${id}`);
        if (secEl) {
          await page.evaluate((selId) => {
            const el = document.getElementById(selId);
            if (el) el.scrollIntoView();
          }, id);
          await page.waitForTimeout(800);
          try {
            await secEl.screenshot({ path: path.join(screenDir, `section-${id}.png`) });
          } catch {
            // Some sections might have complex bounds
          }
        }
      }

      // 5. Run detectors at bottom & top
      const detectorOutput = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        function sel(el) {
          if (el.id) return `#${el.id}`;
          const tag = el.tagName.toLowerCase();
          const classes = Array.from(el.classList).filter((c) => !c.startsWith('cgt-') && !c.startsWith('lucide')).slice(0, 2).join('.');
          const classStr = classes ? `.${classes}` : '';
          const parent = el.parentElement;
          if (!parent || parent === document.body) return `${tag}${classStr}`;
          const pTag = parent.tagName.toLowerCase();
          const pId = parent.id ? `#${parent.id}` : '';
          return `${pTag}${pId} > ${tag}${classStr}`;
        }

        // 1. overflowCheck
        const offenders = [];
        document.querySelectorAll('body *').forEach((el) => {
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          if (cs.position === 'fixed' || cs.display === 'none' || r.width === 0) return;
          if (r.right > vw + 1 || r.left < -1) {
            offenders.push({ sel: sel(el), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), vw });
          }
        });
        const overflowRes = { pageOverflow: document.documentElement.scrollWidth > vw, offenders: offenders.slice(0, 25) };

        // 2. clippingCheck
        const badClipping = [];
        document.querySelectorAll('h1,h2,h3,p,a,button,li,span,img,canvas,svg').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) return;
          let p = el.parentElement;
          while (p && p !== document.body) {
            const cs = getComputedStyle(p);
            if (/(hidden|clip)/.test(cs.overflowX + cs.overflowY)) {
              const pr = p.getBoundingClientRect();
              const cutX = r.left < pr.left - 2 || r.right > pr.right + 2;
              const cutY = r.top < pr.top - 2 || r.bottom > pr.bottom + 2;
              if ((cutX || cutY) && !p.matches('[data-intentional-mask], .cgt-root, [data-carousel], .cgt-dock-glass')) {
                badClipping.push({ el: sel(el), clippedBy: sel(p), cutX, cutY, w: Math.round(r.width), h: Math.round(r.height) });
              }
              break;
            }
            p = p.parentElement;
          }
        });

        // 3. stuckHiddenCheck
        const stuckHidden = Array.from(document.querySelectorAll('section *'))
          .filter((el) => {
            const r = el.getBoundingClientRect();
            const cs = getComputedStyle(el);
            const inView = r.bottom > 0 && r.top < window.innerHeight && r.width > 8 && r.height > 8;
            return inView && (parseFloat(cs.opacity) < 0.05 || cs.visibility === 'hidden');
          })
          .map(sel)
          .slice(0, 25);

        // 4. collisionCheck
        const fixedElements = Array.from(
          document.querySelectorAll('header, nav, [data-fixed], .cgt-dock-glass, [role="alert"], .fixed')
        ).filter((el) => {
          const cs = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return cs.position === 'fixed' && r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden';
        });

        const collisions = [];
        for (let i = 0; i < fixedElements.length; i++) {
          for (let j = i + 1; j < fixedElements.length; j++) {
            const a = fixedElements[i];
            const b = fixedElements[j];
            const ra = a.getBoundingClientRect();
            const rb = b.getBoundingClientRect();
            const intersects = !(ra.right <= rb.left || ra.left >= rb.right || ra.bottom <= rb.top || ra.top >= rb.bottom);
            if (intersects) {
              collisions.push({ a: sel(a), b: sel(b) });
            }
          }
        }

        // 5. targetCheck
        const badTargets = Array.from(document.querySelectorAll('a,button,[role=button],input,select,textarea,summary'))
          .map((el) => {
            const r = el.getBoundingClientRect();
            const cs = getComputedStyle(el);
            return {
              el: sel(el),
              text: (el.textContent || '').trim().slice(0, 25),
              w: Math.round(r.width),
              h: Math.round(r.height),
              fontSize: parseFloat(cs.fontSize),
              isInput: ['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName),
            };
          })
          .filter((t) => (t.w > 0 && t.h > 0 && (t.w < 44 || t.h < 44)) || (t.isInput && t.fontSize < 16));

        return {
          overflow: overflowRes,
          clipping: badClipping.slice(0, 20),
          stuckHidden,
          collisions,
          targets: badTargets.slice(0, 30),
        };
      });

      fullReport.detectorResults[vp.name] = detectorOutput;
      fullReport.viewportsAudited.push(vp.name);

      if (consoleLogs.length > 0) {
        fullReport.consoleMessages.push({ viewport: vp.name, logs: consoleLogs });
      }
      if (failedReqs.length > 0) {
        fullReport.failedRequests.push({ viewport: vp.name, requests: failedReqs });
      }

      console.log(`- Page overflow: ${detectorOutput.overflow.pageOverflow}`);
      console.log(`- Overflow offenders: ${detectorOutput.overflow.offenders.length}`);
      console.log(`- Clipped elements: ${detectorOutput.clipping.length}`);
      console.log(`- Stuck hidden elements: ${detectorOutput.stuckHidden.length}`);
      console.log(`- Collisions: ${detectorOutput.collisions.length}`);
      console.log(`- Small tap targets / input sizes: ${detectorOutput.targets.length}`);
    } catch (err) {
      console.error(`Error auditing ${vp.name}:`, err);
    } finally {
      await context.close();
    }
  }

  // 6. Test Resize mid-scroll: 1440 -> 390 -> 1440
  console.log('\n=== Testing Resize Mid-Scroll ===');
  const resizeContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const resizePage = await resizeContext.newPage();
  await resizePage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await resizePage.waitForTimeout(2200);
  await resizePage.evaluate(() => window.scrollTo(0, 2000));
  await resizePage.waitForTimeout(500);
  await resizePage.setViewportSize({ width: 390, height: 844 });
  await resizePage.waitForTimeout(800);
  await resizePage.screenshot({ path: path.join(__dirname, 'qa', 'screens', 'resize-mid-390.png') });
  await resizePage.setViewportSize({ width: 1440, height: 900 });
  await resizePage.waitForTimeout(800);
  await resizePage.screenshot({ path: path.join(__dirname, 'qa', 'screens', 'resize-back-1440.png') });
  await resizeContext.close();

  // 7. Test Refresh Mid-Page
  console.log('\n=== Testing Refresh Mid-Page ===');
  const refreshContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const refreshPage = await refreshContext.newPage();
  await refreshPage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await refreshPage.waitForTimeout(2200);
  await refreshPage.evaluate(() => window.scrollTo(0, 3000));
  await refreshPage.waitForTimeout(500);
  await refreshPage.reload({ waitUntil: 'networkidle' });
  await refreshPage.waitForTimeout(1500);
  await refreshPage.screenshot({ path: path.join(__dirname, 'qa', 'screens', 'refresh-mid-page.png') });
  await refreshContext.close();

  // 8. Test Reduced Motion
  console.log('\n=== Testing Reduced Motion ===');
  const rmContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const rmPage = await rmContext.newPage();
  await rmPage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await rmPage.waitForTimeout(1500);
  await rmPage.screenshot({ path: path.join(__dirname, 'qa', 'screens', 'reduced-motion.png') });
  await rmContext.close();

  // Save report JSON
  fs.writeFileSync(
    path.join(__dirname, 'qa', 'reports', 'audit-report.json'),
    JSON.stringify(fullReport, null, 2),
    'utf8'
  );
  console.log('\nWrote qa/reports/audit-report.json successfully!');

  await browser.close();
}

server.listen(PORT, async () => {
  console.log(`Static server running on ${BASE_URL}`);
  try {
    await runAudit();
  } catch (err) {
    console.error('Fatal audit failure:', err);
  } finally {
    server.close();
    console.log('Static server stopped.');
  }
});
