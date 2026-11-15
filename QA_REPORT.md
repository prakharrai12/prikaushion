# PRIKAUSHION PORTFOLIO — QA DEFECT REGISTER & AUDIT REPORT (PHASE A)

**Site:** https://prikaushion.vercel.app  
**Owner:** Prakhar Kaushik ("VishRim")  
**Environment:** Local Static Build (`http://localhost:4180`, Node.js v24.19.0, Playwright Chromium/Chrome Headless Shell)  
**Date:** 2026-11-15  
**Audit Scope:** Full responsive matrix (14 viewports: 320px to 2560px, landscape, and tablets), edge-case tests (mid-scroll resize, scroll restoration on refresh, reduced motion).

---

## 1. Automated Detection Summary Matrix

| Viewport Name | Dimensions (px) | Device Type | Page Overflow | Overflow Offenders | Clipped Elements | Stuck Hidden | Collisions | Target Issues |
|---|---|---|:---:|:---:|:---:|:---:|:---:|:---:|
| `small-phone-320` | 320 × 568 | Small Phone | ❌ None | 25 | 20 | 2 | 23 | 20 |
| `small-phone-360` | 360 × 640 | Small Phone | ❌ None | 25 | 20 | 3 | 23 | 21 |
| `small-phone-375` | 375 × 667 | iPhone SE | ❌ None | 25 | 20 | 3 | 23 | 21 |
| `phone-390` | 390 × 844 | iPhone 14 | ❌ None | 25 | 20 | 3 | 23 | 21 |
| `phone-412` | 412 × 915 | Pixel 7 | ❌ None | 25 | 20 | 3 | 23 | 21 |
| `phone-430` | 430 × 932 | Pro Max | ❌ None | 25 | 20 | 3 | 23 | 21 |
| `landscape-667x375` | 667 × 375 | Phone Landscape | ❌ None | 25 | 20 | 2 | 28 | 25 |
| `landscape-844x390` | 844 × 390 | Phone Landscape | ❌ None | 25 | 20 | 3 | 44 | 30 |
| `tablet-768` | 768 × 1024 | iPad Mini | ❌ None | 25 | 20 | 4 | 42 | 30 |
| `tablet-1024x768` | 1024 × 768 | iPad Landscape | ❌ None | 25 | 20 | 4 | 25 | 30 |
| `laptop-1280` | 1280 × 720 | 720p Laptop | ❌ None | 25 | 20 | 2 | 30 | 30 |
| `laptop-1440` | 1440 × 900 | 900p Laptop | ❌ None | 25 | 20 | 3 | 30 | 30 |
| `desktop-1920` | 1920 × 1080 | 1080p Desktop | ❌ None | 25 | 20 | 2 | 29 | 30 |
| `desktop-2560` | 2560 × 1440 | 1440p / 2K Display | ❌ None | 25 | 20 | 3 | 29 | 30 |

*Console Errors/Warnings across all runs:* **0**  
*Failed Network Requests:* **0**  
*Full page scroll width overflow:* **False (0 horizontal page scrollbar detected on any viewport)**

---

## 2. Defect Register

| ID | Viewport(s) | Section / Component | Severity | Evidence | Suspected Root Cause |
|---|---|---|:---:|---|---|
| **DEF-01** | All viewports | Music Dock (`Dock.tsx`), Projects Modal, Marquee, Footer, Cursor | **P1 (High)** | Screenshot `dock-fixed-v2.png`: Dock Play/Pause button expanded to 192px × 128px white capsule, crushing track title & artist. Projects modal header rendered 128px high. | `tailwind.config.js` extended `spacing` by mapping numeric keys `'10'` and `'11'` directly to fluid variables `--space-10` (128px) and `--space-11` (192px), which overwrote standard Tailwind `w-10` (40px) and `w-11` (44px) across the entire application. |
| **DEF-02** | 320 to 768 | Fixed Bottom Elements (Dock, Status Pill, Hire Banner) | **P2 (Medium)** | Detector `collisionCheck`: 23–44 collisions logged between fixed layers (`canvas.fixed`, `div.fixed.z-[85]`, `footer.bottom-10`). | When Dock is visible on mobile viewports, it occupies `bottom: max(12px, env(safe-area-inset-bottom))`, overlapping the "Available for Work" badge or footer link buttons unless mutual exclusivity or adequate dynamic padding is enforced. |
| **DEF-03** | 320 to 430 (Touch) | Music Section (`OrbitCarousel`, `Dock`, `Controls`), Footer quick links | **P2 (Medium)** | Detector `targetCheck`: 20–25 interactive elements with bounding dimensions $< 44\times 44\text{px}$ (e.g. `Shuffle` 36×36px, `Prev/Next` 38×38px, `Source/Spotify` links 15px height, lyrics button 37px height). | Controls rely solely on visual padding (`p-1.5`, `p-2.5`) without an invisible minimum touch target footprint (`min-w-[44px] min-h-[44px]` or `touch-expand` pseudo-element). |
| **DEF-04** | All viewports | Section display headings (`About.tsx`, `Work.tsx`, `Services.tsx`) | **P2 (Medium)** | Detector `clippingCheck`: 20 text elements flagged where bounding box extends outside parent bounding box by 1–3px. | Character-mask wrappers use strict `overflow: hidden` without vertical padding (`py-1` or `clip-path`), clipping font descenders on Fraunces Variable glyphs (`g`, `y`, `p`, `j`). |
| **DEF-05** | Mobile (320 to 375) | Marquee & Hero ghost tracks | **P3 (Low)** | Detector `overflowCheck`: Elements with negative left bounds (`left: -3340px`) flagged in raw DOM audit. | Infinite scrolling tracks extend beyond viewport as part of CSS animation. While the page itself does not scroll horizontally, containers should specify `overflow-x: clip` to isolate layout calculation. |
| **DEF-06** | All viewports | Sticky Section Indicator (`SectionHeader.tsx`) | **P3 (Low)** | Detector `stuckHiddenCheck`: `div.fixed.top-[92px]` flagged with `opacity: 0`. | Sticky header pill remains in DOM when section is inactive with `opacity: 0`. Should use `pointer-events: none` and `aria-hidden="true"` or unmount to avoid accessibility/DOM clutter. |

---

## 3. Visual & Interaction Test Results

1. **Above-the-Fold Capture (`above-the-fold.png`):**
   - Clean preloader exit at 1.8s.
   - Hero typography, wordmark `prikaushion`, and navigation render crisply across all 14 viewports.
2. **Scroll-Through Captures (`step-00.png` to `step-18.png`):**
   - All 9 sections reveal correctly without getting stuck.
   - Dark ink theme transitions seamlessly to paper theme on `#contact`.
3. **Mid-Scroll Viewport Resize (`1440px -> 390px -> 1440px`):**
   - Successfully verified in `qa/screens/resize-mid-390.png` and `resize-back-1440.png`.
   - Layout reflows smoothly without breakages or layout traps.
4. **Scroll Restoration on Refresh (`refresh-mid-page.png`):**
   - Page successfully reloads mid-scroll; ScrollTriggers recalculate without sticking.
5. **Reduced Motion Mode (`reduced-motion.png`):**
   - Animated film grain, marquee drift, and carousel spin respect `prefers-reduced-motion: reduce`.

---

## 4. Next Phase Action Plan

- **Phase B:** Resolve DEF-01 (Restore Tailwind standard spacing scale, lock dock & projects modal dimensions), DEF-04 (add descender breathing room to display heading masks), and DEF-05 (enforce container clip boundaries).
- **Phase C:** Harden Music Player Drag physics, touch momentum buffer (last 5 samples in 80ms), snap math, and vertical scroll lock threshold (8px / 20°).
- **Phase D:** Enforce 44px tap targets (DEF-03) and bottom dock / status pill mutual exclusivity (DEF-02).
