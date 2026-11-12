# PRIKAUSHION PORTFOLIO — V2 CHANGELOG & METRICS
**Project:** `https://prikaushion.vercel.app` · **Repository:** `prakharrai12/prikaushion`

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
