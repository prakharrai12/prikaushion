# PRIKAUSHION PORTFOLIO — V2 CHANGELOG & METRICS
**Project:** `https://prikaushion.vercel.app` · **Repository:** `prakharrai12/prikaushion`

---

## PHASE 6 — SEO, SOCIAL METADATA & CANONICAL DOMAIN
**Date:** 2026-11-12  
**Commit Target:** `v2(phase-6): absolute social metadata, twitter cards, and canonical correctness`

### Improvements & Changes Applied
- **Canonical Domain Alignment:**
  - Standardized canonical URL to `https://prikaushion.vercel.app/` across `index.html`, `robots.txt`, and `sitemap.xml` to eliminate search engine canonical mismatches with undeployed custom domains.
- **Social Media Previews (Open Graph & Twitter/X):**
  - Replaced relative `./assets/brand/og-image.png` with absolute HTTPS URL `https://prikaushion.vercel.app/assets/brand/og-image.png` (resolving issue `A-02`).
  - Added Twitter Cards metadata (`summary_large_image`, title, description, and absolute image card).
  - Configured Open Graph dimensions (1200×630px) and site name.
- **Structured Data & Web Manifest:**
  - Expanded JSON-LD `Person` schema with complete `sameAs` array linking GitHub, LinkedIn (`https://www.linkedin.com/in/prakhar-kaushik-38731828b/`), and Instagram (`https://www.instagram.com/prakhareverie/`).
  - Created standard `manifest.webmanifest` with standalone display, dark theme colors, and icons.
  - Implemented semantic, styled `<noscript>` fallback for search engines and JavaScript-disabled clients.

---

## PHASE 5 — PERFORMANCE, IMAGE & BUNDLE OPTIMIZATION
**Date:** 2026-11-12  
**Commit Target:** `v2(phase-5): modular chunk splitting, webp asset optimization, and image resilience`

### Improvements & Changes Applied
- **Asset Processing & WebP Conversion:**
  - Converted and deployed high-definition WebP preview screenshots for all 5 featured and shipped projects:
    - `hacks-2026.webp` (47 KB)
    - `vipra-pulse.webp` (37 KB)
    - `finculator.webp` (82 KB)
    - `radix-aroma.webp` (59 KB)
    - `amisphere.webp` (43 KB)
  - Every single raster asset in the repository is strictly under 85 KB (well below the 150 KB budget threshold).
- **Vite Bundle Splitting & Vendor Chunks:**
  - Configured intelligent manual code-splitting in `vite.config.ts`:
    - `vendor-react` (React, ReactDOM)
    - `vendor-gsap` (GSAP core and plugins)
    - `vendor-lenis` (Lenis smooth scroll engine)
    - `vendor-icons` (Lucide React SVG icons)
    - `vendor-motion` (Framer motion primitives)
  - Reduced main entry application chunk (`index.js`) from 403.77 kB down to **166.90 kB** (only **49.65 kB** gzipped!).
- **Image Resilience & Fallbacks:**
  - Standardized absolute asset URLs `/assets/projects/${slug}.webp` across sticky stack and list hover components.
  - Added graceful `onError` fallback handlers and decorative typography overlays so missing or loading assets never produce blank layout voids.

---

## PHASE 4 — INTERACTIVITY & MOTION SYSTEM
**Date:** 2026-11-12  
**Commit Target:** `v2(phase-4): view transitions, scroll choreography, and motion accessibility`

### Improvements & Changes Applied
- **Custom Cursor & Precision Magnetics:**
  - Added magnetic snapping to interactive element centers within a 28px proximity zone.
  - Enforced strict touch device suppression (`@media (pointer: coarse)`) to prevent phantom desktop cursors on touch screens.
  - Dedicated cursor states: `view`, `link`, `open`, `text`, `none`.
- **View Transitions & Curtain Flash:**
  - Integrated `triggerCurtainFlash()`: a 2px crimson bar sweeping across the top of the viewport on route / state transitions.
  - Seamlessly bound to native `document.startViewTransition()` with fallback for unsupported browsers.
- **Scroll Choreography & Background Journey:**
  - Fine-tuned Lenis smooth scrolling (`lerp: 0.085`, `wheelMultiplier: 0.9`, `touchMultiplier: 1.5`).
  - Isolated `BackgroundJourney.tsx` cleanup to its own array of triggers, eliminating a critical bug where `ScrollTrigger.getAll().forEach(t => t.kill())` prematurely wiped triggers in other components.
  - Calibrated background color shifts (`start: 'top 60%'`, `end: 'top 10%'`, `scrub: 1.2`).
- **Motion Accessibility (`prefers-reduced-motion`):**
  - Added interactive, persistent **"Reduce motion" toggle** button in the footer.
  - Persisted user preference in `localStorage['prikaushion_reduced_motion']`.
  - Configured global `.reduce-motion` CSS rules that force `transition-duration: 0.01ms !important`, `animation-duration: 0.01ms !important`, and disable continuous decorative transforms while preserving site layout.

---

## PHASE 3 — UI POLISH & VISUAL UPGRADE
**Date:** 2026-11-12  
**Commit Target:** `v2(phase-3): visual depth, surface system, and typography refinement`

### Improvements & Changes Applied
- **Surface & Depth System:**
  - Defined 3 surface tiers in `:root`: `--surface-0` (`#0A0A0B`), `--surface-1` (`#0F0E10`), `--surface-2` (`#161417`).
  - Added hairline inner highlight: `box-shadow: inset 0 1px 0 rgba(244,239,228,0.06)` via `.surface-card` and `.surface-elevated` across projects, services, and education cards (resolving issue `A-12`).
  - Added subtle fixed radial vignette (`.page-vignette`: transparent to 35% black) to focus eye on center editorial content (resolving issue `A-13`).
- **Typography & Font Refinements:**
  - Enforced Fraunces optical axes (`opsz` 144, `SOFT` 30, `WONK` 1, letter-spacing `-0.035em`, line-height `0.88`).
  - Configured global optical kerning and ligatures: `font-feature-settings: "kern", "liga", "calt"`, `font-optical-sizing: auto`.
  - Configured tabular numerals on all monospace and counter metrics (`font-variant-numeric: tabular-nums`).
- **Section Headers & Micro-Interactions:**
  - Added animated digit-roll (odometer effect) to section index numbers on scroll enter.
  - Added sticky mini-header in long sections (`Work` and `Projects`) showing `(02) WORK` and `(03) PROJECTS` with a pulsing crimson dot that fades in after the main header scrolls away.
- **Component & Asset Standards:**
  - Created standardized `Button` component with `primary`, `ghost`, and `icon` variants, `min-height: 48px`, and `touch-action: manipulation`.
  - Added descriptive accessible portrait alt text in `About.tsx`.

---

## PHASE 1 — AUDIT
**Date:** 2026-11-12  
**Commit:** `v2(phase-1): complete comprehensive site audit report and source spec`

### Baseline Metrics Captured
- **Total viewports evaluated:** 7 (360, 390, 768, 1024, 1280, 1440, 1920)
- **Horizontal overflow issues:** 0 (`scrollWidth === clientWidth` on all viewports)
- **Console errors:** 0 | **Network failures:** 0
- **Total links audited:** 65 (61 PASS, 4 LinkedIn anti-bot 405/999 warnings)
- **Tap targets < 44×44px on mobile:** 66 elements
- **Distinct computed font sizes:** 34
- **Distinct section padding values:** Inconsistent between hero (`top=128px`), bridge (`top=40px`), and main sections (`top=201.6px`)
- **Security headers present:** 1 of 8 (`Strict-Transport-Security` only; CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options, COOP missing)
- **Static asset cache-control:** `public, max-age=0, must-revalidate` (Missing immutable cache)
- **Heading tags:** `h1`: 0, `h2`: 8, `h3`: 18, `h4`: 3
- **JS bundle size:** 399.72 kB (127.89 kB gzipped)
- **CSS bundle size:** 103.79 kB (38.33 kB gzipped)

---

## PHASE 3 — UI POLISH & VISUAL UPGRADE
**Date:** 2026-11-12  
**Commit Target:** `v2(phase-3): visual depth, surface system, and typography refinement`

### Improvements & Changes Applied
- **Surface & Depth System:**
  - Defined 3 surface tiers in `:root`: `--surface-0` (`#0A0A0B`), `--surface-1` (`#0F0E10`), `--surface-2` (`#161417`).
  - Added hairline inner highlight: `box-shadow: inset 0 1px 0 rgba(244,239,228,0.06)` via `.surface-card` and `.surface-elevated` across projects, services, and education cards (resolving issue `A-12`).
  - Added subtle fixed radial vignette (`.page-vignette`: transparent to 35% black) to focus eye on center editorial content (resolving issue `A-13`).
- **Typography & Font Refinements:**
  - Enforced Fraunces optical axes (`opsz` 144, `SOFT` 30, `WONK` 1, letter-spacing `-0.035em`, line-height `0.88`).
  - Configured global optical kerning and ligatures: `font-feature-settings: "kern", "liga", "calt"`, `font-optical-sizing: auto`.
  - Configured tabular numerals on all monospace and counter metrics (`font-variant-numeric: tabular-nums`).
- **Section Headers & Micro-Interactions:**
  - Added animated digit-roll (odometer effect) to section index numbers on scroll enter.
  - Added sticky mini-header in long sections (`Work` and `Projects`) showing `(02) WORK` and `(03) PROJECTS` with a pulsing crimson dot that fades in after the main header scrolls away.
- **Component & Asset Standards:**
  - Created standardized `Button` component with `primary`, `ghost`, and `icon` variants, `min-height: 48px`, and `touch-action: manipulation`.
  - Added descriptive accessible portrait alt text in `About.tsx`.

---

## PHASE 2 — GRID, LAYOUT & SPACING SYSTEM
**Date:** 2026-11-12  
**Commit Target:** `v2(phase-2): standardize 12-column grid and fluid spacing scale`

### Improvements & Changes Applied
- **Layout Primitives:**
  - Created `<Container>` component with engineered `max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)]`.
  - Created `<Grid>` component with 12 cols (≥1024px), 8 cols (768–1023px), 4 cols (<768px), and `clamp(16px,2vw,32px)` column gap.
  - Replaced ad-hoc wrapper widths and margins in `Hero`, `About`, `Work`, `Projects`, `Services`, `Toolkit`, `Education`, `Socials`, `Contact`, and `Footer` with `<Container>`.
- **Spacing Scale:**
  - Defined CSS variables `--space-1` (4px) through `--space-11` (192px) and `--section-y: clamp(96px, 14vw, 220px)`.
  - Exposed scale in `tailwind.config.js`.
  - Unified section vertical rhythm to `py-[var(--section-y)]`.
- **Typography & Text Blocks:**
  - Promoted hero title to semantic `<h1>` with `.font-display` (resolving issue `A-03`).
  - Added global `text-wrap: balance` on headings and `text-wrap: pretty` with `max-w-[54ch]` / `prose-editorial` on paragraphs.
- **Mobile & Touch Optimization:**
  - Added `touch-expand` pseudo-element padding and `min-h-[44px]` touch target sizing to filter buttons, project action pills, contact chips, and mobile navigation items (resolving issue `A-05`).
  - Added `viewport-fit=cover` in `index.html` and safe-area inset handling on navigation.
  - Set `100svh` / `100dvh` for hero and mobile menu to eliminate iOS Safari toolbar jumps.

---

## PHASE 3 — UI POLISH & VISUAL UPGRADE
**Date:** 2026-11-12  
**Commit Target:** `v2(phase-3): visual depth, surface system, and typography refinement`

### Improvements & Changes Applied
- **Surface & Depth System:**
  - Defined 3 surface tiers in `:root`: `--surface-0` (`#0A0A0B`), `--surface-1` (`#0F0E10`), `--surface-2` (`#161417`).
  - Added hairline inner highlight: `box-shadow: inset 0 1px 0 rgba(244,239,228,0.06)` via `.surface-card` and `.surface-elevated` across projects, services, and education cards (resolving issue `A-12`).
  - Added subtle fixed radial vignette (`.page-vignette`: transparent to 35% black) to focus eye on center editorial content (resolving issue `A-13`).
- **Typography & Font Refinements:**
  - Enforced Fraunces optical axes (`opsz` 144, `SOFT` 30, `WONK` 1, letter-spacing `-0.035em`, line-height `0.88`).
  - Configured global optical kerning and ligatures: `font-feature-settings: "kern", "liga", "calt"`, `font-optical-sizing: auto`.
  - Configured tabular numerals on all monospace and counter metrics (`font-variant-numeric: tabular-nums`).
- **Section Headers & Micro-Interactions:**
  - Added animated digit-roll (odometer effect) to section index numbers on scroll enter.
  - Added sticky mini-header in long sections (`Work` and `Projects`) showing `(02) WORK` and `(03) PROJECTS` with a pulsing crimson dot that fades in after the main header scrolls away.
- **Component & Asset Standards:**
  - Created standardized `Button` component with `primary`, `ghost`, and `icon` variants, `min-height: 48px`, and `touch-action: manipulation`.
  - Added descriptive accessible portrait alt text in `About.tsx`.

---
