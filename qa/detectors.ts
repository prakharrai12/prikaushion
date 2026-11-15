// Helper to compute a short unique selector for an element
function sel(el: Element): string {
  if (el.id) return `#${el.id}`;
  const tag = el.tagName.toLowerCase();
  const classes = Array.from(el.classList).filter(c => !c.startsWith('cgt-') && !c.startsWith('lucide')).slice(0, 2).join('.');
  const classStr = classes ? `.${classes}` : '';
  const parent = el.parentElement;
  if (!parent || parent === document.body) return `${tag}${classStr}`;
  const pTag = parent.tagName.toLowerCase();
  const pId = parent.id ? `#${parent.id}` : '';
  return `${pTag}${pId} > ${tag}${classStr}`;
}

// 1. Horizontal overflow (page + per-element offenders)
export const overflowCheck = () => {
  const vw = document.documentElement.clientWidth;
  const offenders: any[] = [];
  document.querySelectorAll<HTMLElement>('body *').forEach((el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    if (cs.position === 'fixed' || cs.display === 'none' || r.width === 0) return;
    if (r.right > vw + 1 || r.left < -1) {
      offenders.push({ sel: sel(el), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), vw });
    }
  });
  return { pageOverflow: document.documentElement.scrollWidth > vw, offenders: offenders.slice(0, 50) };
};

// 2. Content clipped by an ancestor with overflow hidden/clip (text cut-off detector)
export const clippingCheck = () => {
  const bad: any[] = [];
  document.querySelectorAll<HTMLElement>('h1,h2,h3,p,a,button,li,span,img,canvas,svg').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    let p = el.parentElement;
    while (p && p !== document.body) {
      const cs = getComputedStyle(p);
      if (/(hidden|clip)/.test(cs.overflowX + cs.overflowY)) {
        const pr = p.getBoundingClientRect();
        const cutX = r.left < pr.left - 2 || r.right > pr.right + 2;
        const cutY = r.top < pr.top - 2 || r.bottom > pr.bottom + 2;
        if ((cutX || cutY) && !p.matches('[data-intentional-mask], .cgt-root, [data-carousel]')) {
          bad.push({ el: sel(el), clippedBy: sel(p), cutX, cutY, elRect: { w: Math.round(r.width), h: Math.round(r.height) } });
        }
        break;
      }
      p = p.parentElement;
    }
  });
  return bad.slice(0, 80);
};

// 3. Reveal check: after scrolling, any visible-in-viewport element still at opacity ~0 / translated off
export const stuckHiddenCheck = () => {
  return Array.from(document.querySelectorAll<HTMLElement>('section *'))
    .filter((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      const inView = r.bottom > 0 && r.top < window.innerHeight && r.width > 8 && r.height > 8;
      return inView && (parseFloat(cs.opacity) < 0.05 || cs.visibility === 'hidden');
    })
    .map(sel)
    .slice(0, 80);
};

// 4. Fixed-element collision map (launcher, dock, nav, hire pill, section dots, toasts)
export const collisionCheck = () => {
  const fixedElements = Array.from(
    document.querySelectorAll<HTMLElement>(
      'header, nav, [data-fixed], .cgt-dock-glass, .cgt-launcher, [role="alert"], #scroll-progress, .fixed'
    )
  ).filter((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return cs.position === 'fixed' && r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden';
  });

  const collisions: any[] = [];
  for (let i = 0; i < fixedElements.length; i++) {
    for (let j = i + 1; j < fixedElements.length; j++) {
      const a = fixedElements[i];
      const b = fixedElements[j];
      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();
      const intersects = !(
        ra.right <= rb.left ||
        ra.left >= rb.right ||
        ra.bottom <= rb.top ||
        ra.top >= rb.bottom
      );
      if (intersects) {
        collisions.push({
          a: sel(a),
          b: sel(b),
          rectA: { x: ra.x, y: ra.y, w: ra.width, h: ra.height },
          rectB: { x: rb.x, y: rb.y, w: rb.width, h: rb.height },
        });
      }
    }
  }
  return collisions;
};

// 5. Tap-target sizes (< 44×44 on touch viewports) and font-size < 16px on inputs
export const targetCheck = () => {
  return Array.from(
    document.querySelectorAll<HTMLElement>('a,button,[role=button],input,select,textarea,summary')
  )
    .map((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        el: sel(el),
        text: (el.textContent || '').trim().slice(0, 20),
        w: Math.round(r.width),
        h: Math.round(r.height),
        fontSize: parseFloat(cs.fontSize),
        isInput: ['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName),
      };
    })
    .filter((t) => (t.w > 0 && t.h > 0 && (t.w < 44 || t.h < 44)) || (t.isInput && t.fontSize < 16));
};
