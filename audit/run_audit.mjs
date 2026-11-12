import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const URL = 'https://prikaushion.vercel.app';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const WIDTHS = [360, 390, 768, 1024, 1280, 1440, 1920];

async function run() {
  console.log(`Starting audit on ${URL}...`);

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const consoleLogs = [];
  const networkFailures = [];

  // 1. Initial desktop load to capture logs, DOM and links
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  page.on('console', (msg) => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
  });

  page.on('requestfailed', (req) => {
    networkFailures.push({ url: req.url(), failure: req.failure()?.errorText });
  });

  console.log('Navigating to page...');
  const navStart = Date.now();
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  const navTime = Date.now() - navStart;
  console.log(`Page loaded in ${navTime}ms`);

  // Wait for preloader to finish (preloader has 3.6s sequence)
  console.log('Waiting for preloader completion...');
  await page.waitForTimeout(4500);

  // Extract Rendered DOM
  const domHtml = await page.evaluate(() => document.documentElement.outerHTML);
  fs.writeFileSync(path.join('audit', 'dom.html'), domHtml, 'utf8');
  console.log('Saved audit/dom.html');

  // Extract all links & buttons
  const elements = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a')).map((a) => ({
      tag: 'a',
      text: (a.innerText || a.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' '),
      href: a.getAttribute('href') || '',
      target: a.getAttribute('target') || '',
      rel: a.getAttribute('rel') || '',
      rect: { width: a.offsetWidth, height: a.offsetHeight },
    }));

    const buttons = Array.from(document.querySelectorAll('button')).map((b) => ({
      tag: 'button',
      text: (b.innerText || b.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' '),
      type: b.getAttribute('type') || '',
      rect: { width: b.offsetWidth, height: b.offsetHeight },
    }));

    const images = Array.from(document.querySelectorAll('img')).map((img) => ({
      src: img.getAttribute('src') || '',
      alt: img.getAttribute('alt') || '',
      loading: img.getAttribute('loading') || '',
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      renderedWidth: img.clientWidth,
      renderedHeight: img.clientHeight,
    }));

    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map((h) => ({
      level: h.tagName.toLowerCase(),
      text: (h.innerText || '').trim().replace(/\s+/g, ' '),
    }));

    return { links, buttons, images, headings };
  });

  // Check HTTP status of links
  console.log(`Checking ${elements.links.length} links...`);
  const linkAudit = [];
  for (const l of elements.links) {
    let status = 'INTERNAL / HASH';
    let verdict = 'PASS';

    if (l.href.startsWith('http')) {
      try {
        const res = await fetch(l.href, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(5000) });
        status = res.status;
        verdict = res.status >= 200 && res.status < 400 ? 'PASS' : 'WARN ' + res.status;
      } catch (err) {
        status = 'ERR: ' + err.message;
        verdict = 'FAIL';
      }
    } else if (l.href.startsWith('mailto:')) {
      status = 'MAILTO';
      verdict = 'PASS';
    } else if (l.href.startsWith('#')) {
      const exists = domHtml.includes(`id="${l.href.slice(1)}"`);
      status = exists ? 'ANCHOR_EXISTS' : 'ANCHOR_MISSING';
      verdict = exists ? 'PASS' : 'FAIL';
    }

    linkAudit.push({
      element: l.tag,
      text: l.text || '(icon / no text)',
      href: l.href,
      target: l.target,
      rel: l.rel,
      status,
      verdict,
    });
  }

  // Measure full-page screenshots & layout metrics across all 7 breakpoints
  const layoutMetrics = {};

  for (const w of WIDTHS) {
    console.log(`Capturing full-page screenshot at width ${w}...`);
    const bpContext = await browser.newContext({
      viewport: { width: w, height: 900 },
      deviceScaleFactor: 1,
    });
    const bpPage = await bpContext.newPage();
    await bpPage.goto(URL, { waitUntil: 'networkidle' });
    await bpPage.waitForTimeout(4000);

    const bpMetrics = await bpPage.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const scrollW = document.documentElement.scrollWidth;
      const hasOverflow = scrollW > docW;

      // Section vertical paddings
      const sections = Array.from(document.querySelectorAll('section')).map((s) => {
        const style = window.getComputedStyle(s);
        return {
          id: s.id || '(no-id)',
          paddingTop: style.paddingTop,
          paddingBottom: style.paddingBottom,
          paddingLeft: style.paddingLeft,
          paddingRight: style.paddingRight,
        };
      });

      // Small tap targets < 44px
      const interactives = Array.from(document.querySelectorAll('a, button, input, textarea')).map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          text: (el.innerText || el.getAttribute('aria-label') || '').slice(0, 30),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          isSmall: rect.width < 44 || rect.height < 44,
        };
      });

      return {
        clientWidth: docW,
        scrollWidth: scrollW,
        hasOverflow,
        sections,
        interactives: interactives.filter((i) => i.isSmall),
      };
    });

    layoutMetrics[w] = bpMetrics;

    const screenPath = path.join('audit', 'screens', `screen-${w}.png`);
    await bpPage.screenshot({ path: screenPath, fullPage: true });
    console.log(`Saved ${screenPath}`);

    // If 1440 or 390, capture frame sequence every 400px of scroll
    if (w === 1440 || w === 390) {
      console.log(`Capturing scroll sequence for width ${w}...`);
      const totalHeight = await bpPage.evaluate(() => document.body.scrollHeight);
      let scrollY = 0;
      let frame = 0;
      while (scrollY < totalHeight && frame < 30) {
        await bpPage.evaluate((y) => window.scrollTo(0, y), scrollY);
        await bpPage.waitForTimeout(150);
        const framePath = path.join('audit', 'screens', `scroll-${w}-f${String(frame).padStart(2, '0')}.png`);
        await bpPage.screenshot({ path: framePath, fullPage: false });
        scrollY += 400;
        frame++;
      }
      console.log(`Captured ${frame} scroll frames for width ${w}`);
    }

    await bpContext.close();
  }

  // Collect Typography & CSS font usage
  const typography = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('h1, h2, h3, h4, p, span, a, div, label'));
    const fontSizes = new Set();
    const fontFamilies = new Set();
    const lineHeights = new Set();

    elements.forEach((el) => {
      const style = window.getComputedStyle(el);
      if (el.innerText && el.innerText.trim().length > 0) {
        fontSizes.add(style.fontSize);
        fontFamilies.add(style.fontFamily);
        lineHeights.add(style.lineHeight);
      }
    });

    return {
      fontSizes: Array.from(fontSizes).sort((a, b) => parseFloat(a) - parseFloat(b)),
      fontFamilies: Array.from(fontFamilies),
      lineHeights: Array.from(lineHeights),
    };
  });

  const fullAuditData = {
    url: URL,
    timestamp: new Date().toISOString(),
    navTime,
    consoleLogs,
    networkFailures,
    headings: elements.headings,
    images: elements.images,
    linkAudit,
    layoutMetrics,
    typography,
  };

  fs.writeFileSync(path.join('audit', 'audit_data.json'), JSON.stringify(fullAuditData, null, 2), 'utf8');
  console.log('Saved audit/audit_data.json successfully!');

  await context.close();
  await browser.close();
}

run().catch((err) => {
  console.error('Audit script failed:', err);
  process.exit(1);
});
