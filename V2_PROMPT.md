<USER_REQUEST>
# PRIKAUSHION PORTFOLIO — V2 AUDIT, REDESIGN, SECURITY & TRAFFIC PROMPT
### For: Google Antigravity · Site: https://prikaushion.vercel.app · Owner: Prakhar Kaushik ("VishRim")

> **HOW TO USE THIS FILE**
> Paste this entire file into Antigravity as the task. Keep `PORTFOLIO_SPEC.md` (the original design spec) in the repo root — it remains the **design source of truth** (palette, type system, motion library, copy). This file is the **second pass**: audit what was built, fix everything that falls short, then harden it for security and traffic.
>
> **Rules for the agent**
> 1. **Audit before you change anything.** Phase 1 produces a written report. Do not edit code until Phase 1 is complete.
> 2. **Work phase by phase, in order.** Commit after each phase with the message format `v2(phase-N): <summary>`. Never mix phases in one commit.
> 3. **Never delete existing content, copy or routes** unless a step says so. Improve, don't rewrite from scratch.
> 4. **Measure, don't guess.** Every improvement must have a before/after number or screenshot in `V2_CHANGELOG.md`.
> 5. **If a step cannot be completed** (missing credential, missing URL, tool limitation), write it into `V2_BLOCKERS.md` with the exact thing needed from the owner, then continue with the next step.
> 6. **Do not invent** social handles, project URLs, phone numbers, testimonials or statistics. Missing data stays as the disabled "Link coming soon" pattern from the original spec.

---

## 0. WHAT IS ALREADY KNOWN ABOUT THE LIVE SITE

A first check of the deployed site returned only the document `<head>` (the page is a client-rendered single-page app, so the body is built by JavaScript). What that revealed:

| Item | Observed | Verdict |
|---|---|---|
| Title | `Prakhar Kaushik — Frontend Developer & Educator \| prikaushion` | ✅ matches spec |
| Meta description | Present and matches spec | ✅ |
| `theme-color` | `#0A0A0B` | ✅ |
| `viewport` | `width=device-width, initial-scale=1.0` | ✅ (add `viewport-fit=cover`, see Phase 5) |
| **Canonical URL** | Points to `https://prikaushion.studio/` while the site is served from `prikaushion.vercel.app` | ⚠️ **Mismatch.** If `prikaushion.studio` is not connected to this Vercel project, search engines are told the "real" page lives on a domain that may not serve it. Must be resolved in Phase 6. |
| **`og:image`** | Relative path `./assets/brand/og-image.png` | ❌ **Broken for social previews.** Open Graph images must be **absolute HTTPS URLs**. WhatsApp, LinkedIn, X and Instagram will not show the card. |
| `og:type`, `og:title`, `og:description` | Present | ✅ |
| Twitter/X card tags | Not seen | ❌ add |
| Body content | Not visible without running JS | ➡️ The agent must audit it in a real browser (Phase 1). |

**Everything else (visual quality, spacing, interactions, headers, performance) is unverified and must be audited by you in Phase 1.** Do not assume the spec was implemented correctly.

---

## PHASE 1 — FULL AUDIT (NO CODE CHANGES)

Create `AUDIT_REPORT.md` in the repo root. Fill every section below with **evidence** (numbers, screenshots, copied header output, file paths).

### 1.1 Capture the live site
1. Using a headless browser (Playwright/Chromium), load `https://prikaushion.vercel.app` and wait for the preloader to finish.
2. Take **full-page screenshots** at widths `360, 390, 768, 1024, 1280, 1440, 1920` and save to `/audit/screens/`.
3. Record a **scroll video / frame sequence** (one frame per 400px of scroll) at 1440 and 390 widths to inspect transitions and the colour journey.
4. Extract the **rendered DOM** (`document.documentElement.outerHTML` after load) into `/audit/dom.html` so the real content can be reviewed.
5. List **every link** (`a[href]`) and every button action, and HTTP-check each external URL. Output a table: `element | text | href | status | verdict`.
6. List **every console error/warning** and **every failed network request**.

### 1.2 Design audit — compare against `PORTFOLIO_SPEC.md`
For each spec section, mark **✅ implemented / ⚠️ partial / ❌ missing / 🔁 implemented but looks wrong**, with a one-line reason:
- Preloader (cream logo curtain) · Nav (desktop + mobile menu, hide-on-scroll) · Hero (name, K mark, cursor reactions) · Marquee · About (arched portrait, stamp, stats) · Work timeline · Projects (sticky stack + list rows, **Live/Code buttons on all 11**) · Services (horizontal pinned track) · Toolkit (constellation) · Education · Socials (colour flood) · Contact (cream inversion + form) · Footer (giant wordmark).
- Global systems: grain · custom cursor · scroll progress + section dots · **background colour journey** · section headers (meta row, drawing rule, sparkle, ghost word) · section bridges.

### 1.3 Layout, grid and spacing audit
Measure and report (use DevTools computed styles via Playwright):
1. **Container widths & gutters** at each breakpoint. Is content aligned to one consistent left edge across all sections?
2. **Vertical rhythm:** list the top/bottom padding of every section. Flag any that differ by more than 16px from the spec's `clamp(96px, 14vw, 220px)`.
3. **Horizontal overflow:** any element wider than the viewport (`scrollWidth > clientWidth`) at any breakpoint.
4. **Type scale:** list every distinct `font-size` used. Flag anything outside the spec scale.
5. **Spacing values:** list every distinct `margin/padding/gap`. Flag values that are not multiples of 4px.
6. **Tap targets:** every interactive element smaller than 44×44px on mobile.
7. **Contrast:** automated axe-core run + manual check of crimson text on ink.

### 1.4 Interaction & motion audit
- Does the custom cursor exist and change state? Are there cursor states for project cards, social rows?
- Do hover/focus/active states exist for **every** interactive element?
- Frame-rate check: record the Performance panel during a scroll of the full page; report **long tasks > 50ms**, **layout thrash**, **dropped frames**.
- Are scroll animations **scrubbed with lag (`scrub: 1`)** or snapping? Are any ScrollTriggers **leaking** (not killed on unmount)?
- Is `prefers-reduced-motion` honoured? Test with emulation.
- Touch behaviour: do social rows auto-flood? Does the horizontal Services track swipe on mobile?

### 1.5 Performance audit
1. Run **Lighthouse** (mobile + desktop, 3 runs each, median) → record Performance, Accessibility, Best Practices, SEO, plus LCP, CLS, INP/TBT, FCP, TTFB.
2. Bundle analysis (`vite-bundle-visualizer` or `rollup-plugin-visualizer`): total JS (gzip), largest chunks, duplicate libraries.
3. List **every image** with its format, natural size, rendered size and transfer size. Flag anything > 150KB or not WebP/AVIF.
4. List **every font file** and weight loaded. Flag unused axes/weights.
5. Check for render-blocking resources and for layout shift caused by the preloader or font swap.

### 1.6 Security audit (see Phase 7 for the fix list — here you only *measure*)
1. Fetch response headers for `/`, `/assets/*.js`, `/assets/*.webp`, `/favicon.svg` with `curl -sI` and paste them into the report.
2. Check the presence/value of: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options` / `frame-ancestors`, `Cross-Origin-Opener-Policy`, `Cache-Control`.
3. Scan the repository for committed secrets: `.env*` files, API keys, tokens, `serviceAccount`, `Bearer`, `sk-`, `AIza`, `ghp_` (use `gitleaks` or `trufflehog` if installable; otherwise a regex grep across **git history**, not just the working tree).
4. Run `npm audit --omit=dev` and `npx depcheck`; list vulnerable and unused dependencies.
5. Check that **source maps** are not publicly served in production.
6. Check the contact form: where does it submit, is there validation, spam protection, rate limiting?
7. Check every `target="_blank"` link has `rel="noopener noreferrer"`.
8. Check any `dangerouslySetInnerHTML`, `innerHTML`, `eval`, inline event handlers.
9. Confirm there is **no authentication surface** (this is a static portfolio). If any login, admin route, CMS or database exists, list it — it must be handled in Phase 7.5.

### 1.7 SEO & metadata audit
`<html lang>`, canonical, OG/Twitter tags, JSON-LD, `robots.txt`, `sitemap.xml`, heading hierarchy (one `h1`, ordered `h2`s), image `alt`s, link text quality, `404` page behaviour, favicon set, `manifest.webmanifest`.

### 1.8 Deliverable of Phase 1
`AUDIT_REPORT.md` ending with a **prioritised issue list**: `P0 (broken/security)`, `P1 (major UX/perf)`, `P2 (polish)`. Every issue gets an ID (`A-01`, `A-02`…) that later commits must reference.

---

## PHASE 2 — GRID, LAYOUT & SPACING SYSTEM

Goal: the site must feel **engineered**. One grid, one spacing scale, one rhythm — applied everywhere.

### 2.1 Single layout primitive
Create `<Container>` and `<Grid>` components (and matching Tailwind utilities) and **replace every ad-hoc wrapper** with them:
- `Container`: `max-width: 1440px; margin-inline: auto; padding-inline: clamp(20px, 5vw, 80px);`
- `Grid`: 12 columns, `column-gap: clamp(16px, 2vw, 32px)`; 8 columns ≥ 768px? No — **12 columns ≥ 1024px, 8 columns 768–1023px, 4 columns < 768px.**
- All section content must snap to this grid. No magic-number margins.

### 2.2 Spacing scale
Define CSS variables and use **only** these (no arbitrary px in components):
```
--space-1: 4px   --space-2: 8px   --space-3: 12px  --space-4: 16px
--space-5: 24px  --space-6: 32px  --space-7: 48px  --space-8: 64px
--space-9: 96px  --space-10: 128px --space-11: 192px
--section-y: clamp(96px, 14vw, 220px)
```
Run a codemod/grep to find stray values (`/\b(\d+)px/`) not on this scale and convert them.

### 2.3 Vertical rhythm
1. Every section uses `padding-block: var(--section-y)`.
2. Inside a section: header → intro `var(--space-7)`; intro → content `var(--space-9)`; between content blocks `var(--space-8)`.
3. Text blocks: body `line-height: 1.7`, headings `0.88–1.1`, mono labels `1.4`. Max line length `46–68ch` for paragraphs.

### 2.3.1 Alignment rules
- Section headers, titles, paragraph columns, buttons and card edges **share the same left edge** (grid column 1 start) unless an intentional offset is documented in code comments.
- Intentional asymmetry (e.g. About text starts at column 7) must land **exactly on a grid line**.

### 2.4 Responsive fixes
- Zero horizontal scroll at 320px–1920px (`overflow-x: clip` on `html` only as a safety net — fix the cause, don't hide it).
- Fluid type via `clamp()` for every display size; verify nothing wraps awkwardly (no single-word orphan lines in titles; use `text-wrap: balance` for headings and `text-wrap: pretty` for paragraphs).
- Use `100svh`/`100dvh` (not `100vh`) for the hero and mobile menu so iOS Safari's toolbar does not cause jumps.
- Safe-area insets: `padding-top: env(safe-area-inset-top)` on nav; add `viewport-fit=cover` to the viewport meta.

**Acceptance:** screenshots at 7 widths show consistent left edges and rhythm; automated overflow test passes; spacing audit finds 0 off-scale values.

---

## PHASE 3 — UI POLISH & VISUAL UPGRADE

Keep the palette and fonts from the original spec. Raise the level of finish.

### 3.1 Depth & surface system
1. Introduce **three surface levels** (`--surface-0 ink`, `--surface-1 obsidian`, `--surface-2 charcoal`) and use them consistently so cards visibly sit *above* the background.
2. Add **hairline inner highlight** to raised surfaces: `box-shadow: inset 0 1px 0 rgba(244,239,228,0.06)`.
3. Add a subtle **vignette** (radial, 0 → 35% black at the corners) over the whole page to focus the eye.
4. Ensure the **film grain** is visible but never muddy — final opacity in the range `0.05–0.08`; test on OLED black.

### 3.2 Typography refinement
1. Verify Fraunces uses the `opsz`, `SOFT` and `WONK` axes from the spec (title letter-spacing `-0.035em`, line-height `0.88`).
2. Add **optical kerning/ligatures**: `font-feature-settings: "kern", "liga", "calt"`; `font-optical-sizing: auto`.
3. Mono labels: tabular numerals (`font-variant-numeric: tabular-nums`).
4. Eliminate **FOUT/FOIT** jumps: preload the two critical font files, `size-adjust` the fallback stack so layout shift ≤ 0.02.

### 3.3 Section headers — make them unmistakable
Check each section's header against spec §6. Upgrades to add if missing:
- **Sticky mini-header** inside long sections (Work, Projects) showing `(03) PROJECTS` in the top-left with a crimson dot, fading in after the title scrolls away.
- **Index numbers** in each header animate with a **digit-roll** (odometer) from the previous section's number to the current one.
- A **section-colour accent line** under the meta row that changes tint with the section (still within the ink/oxblood/crimson/bone family).

### 3.4 Component upgrades
- **Buttons:** unify into one `Button` component with variants `primary | ghost | icon`; each has default / hover / focus-visible / active / disabled states, `min-height: 48px`, `touch-action: manipulation`.
- **Chips/tags:** consistent height `28px`, mono 11px, hairline border.
- **Project cards:** ensure the **Live** and **Code** buttons are always visible without hover (important for touch), and that the card's main click target is clearly the Live link.
- **Empty/TODO links:** disabled style + tooltip "Link coming soon" — and the owner-facing list of TODOs is printed to `V2_BLOCKERS.md`.

### 3.5 Imagery
1. Replace any placeholder or missing project screenshot with a real capture (Playwright, 1440×900, `deviceScaleFactor 2`, saved as AVIF + WebP + JPEG fallback). Cover-art fallback from the spec only if capture is impossible.
2. Portrait: AVIF/WebP `srcset` at 480/700/1000/1400, `sizes` attribute set correctly, `fetchpriority="high"` only if it is the LCP element, otherwise lazy.
3. Add `alt` text that describes: e.g. "Prakhar Kaushik smiling with both thumbs up in front of the Faraway International Hackathon Round 2 banner".

**Acceptance:** side-by-side before/after screenshots in `V2_CHANGELOG.md`; no component without a defined focus and disabled state.

---

## PHASE 4 — INTERACTIVITY & TRANSITIONS UPGRADE

### 4.1 Page-level transitions
1. Use the **View Transitions API** (`document.startViewTransition`) for hash/section navigation and mobile-menu open/close where supported; fall back to the existing GSAP tweens.
2. Nav-link click → Lenis smooth-scroll with a **curtain flash**: a 2px crimson line sweeps across the top of the viewport (0.5s) as the target section arrives.
3. Section-to-section: verify the **background colour journey** is scrubbed (`scrub: 1.2`) and that glow position drifts. If the background "pops" instead of blending, fix the tween overlap (`start: "top 60%"`, `end: "top 10%"`).

### 4.2 Micro-interactions to add or verify (each must exist)
| Where | Interaction | Detail |
|---|---|---|
| Nav links | Underline draw + dot | `0.4s`, origin left |
| Buttons | Magnetic pull + fill wipe | strength `0.3`, `0.45s flood` easing |
| Project cards | 3D tilt ±6°, spotlight, auto-scroll screenshot on hover | per spec §14.4 |
| Project list rows | Floating cursor-following preview | lerp `0.12` |
| Social rows | Pointer-origin colour flood and retreat | per spec §18.3 |
| Toolkit | Bi-directional hover linking constellation ↔ list | |
| Stats | Count-up on enter | `2s power2.out` |
| Form fields | Floating label + drawing underline + shake on error | |
| Footer wordmark | "Piano" letter lift on hover | `power3.out` |
| Logo K (hero/footer) | Click → sparkle burst + toast `YOU FOUND THE K.` | |

### 4.3 Scroll feel
1. Lenis settings: `lerp: 0.085`, `wheelMultiplier: 0.9`, `touchMultiplier: 1.5`, native touch scroll on mobile.
2. Connect Lenis to the GSAP ticker; `ScrollTrigger.update` on every Lenis scroll; `ScrollTrigger.refresh()` after fonts + images load and on orientation change.
3. Use `ScrollTrigger.matchMedia` so desktop-only effects (cursor, constellation, floating previews, pinned stacks) are **not created** on mobile.
4. **Kill all triggers/tweens on unmount**; add a dev-only check that `ScrollTrigger.getAll().length` returns to 0 after route teardown.

### 4.4 Cursor system (desktop, fine pointer)
Verify all states from the spec: default, link, `VIEW`, `DRAG`, `OPEN ↗`, text-input bar, hidden-on-leave. Add: **magnetic snap** of the ring to the centre of small icon buttons within 24px.

### 4.5 Accessibility of motion
Implement a visible **"Reduce motion" toggle** in the footer (stored in `localStorage` inside try/catch) in addition to honouring `prefers-reduced-motion`. When on: no parallax, no marquee movement, no tilt, no char-split — only opacity fades.

**Acceptance:** screen-capture video shows every transition; no jank in the Performance trace (no frame > 32ms during scroll); reduced-motion mode verified.

---

## PHASE 5 — PERFORMANCE & TRAFFIC-READINESS (FRONTEND)

Vercel serves static builds from a global edge CDN, so raw traffic capacity is high — the job is to make each visit **cheap** and **fast** so a spike (a LinkedIn post going viral, a recruiter blast, a hackathon announcement) costs nothing and never slows down.

### 5.1 Budgets (fail the build if exceeded)
| Metric | Budget |
|---|---|
| Initial JS (gzip) | ≤ 180 KB |
| Total transferred on first load | ≤ 1.2 MB (excluding lazy images) |
| LCP (mobile, 4G) | ≤ 2.5 s |
| CLS | ≤ 0.05 |
| INP | ≤ 200 ms |
| Lighthouse | Perf ≥ 90 (mobile), A11y ≥ 95, BP ≥ 95, SEO ≥ 95 |
Add a `lighthouserc.json` and a GitHub Action that runs Lighthouse CI on every push and **fails on regression**.

### 5.2 Code splitting & loading strategy
1. `React.lazy` + `Suspense` for: Toolkit constellation, Services horizontal track, Projects Tier B floating preview, Contact form, footer easter eggs.
2. Dynamic `import()` GSAP plugins (`ScrollTrigger`, `Flip`) only where used.
3. Defer non-critical work with `requestIdleCallback` (star-field generation, constellation layout, prefetch of project screenshots).
4. Remove unused dependencies (from Phase 1 `depcheck`). Replace heavy libraries with lighter equivalents where trivial.
5. `vite.config`: `build.target: "es2020"`, `cssCodeSplit: true`, `build.sourcemap: false` for production, manual chunks for `react`, `gsap`, `framer-motion`.

### 5.3 Preloader — make it fast, not fake
The preloader must **not** delay the Largest Contentful Paint beyond budget. Rules:
1. Render the hero HTML underneath immediately; the preloader is an overlay (`position: fixed`), not a gate.
2. Real progress: counter tied to `document.fonts.ready` + hero image decode, with a **maximum 3.2s** cap.
3. First visit: full sequence. Return visits (sessionStorage): 0.9s version.
4. Provide a **Skip** button after 1s (already in spec) and honour `prefers-reduced-motion` by skipping to a 0.3s fade.

### 5.4 Images & fonts
- All images AVIF + WebP + fallback, responsive `srcset`, explicit `width`/`height` (zero CLS), `decoding="async"`, `loading="lazy"` below the fold.
- Fonts: self-hosted `woff2`, Latin subset, preload Fraunces (opsz variable) and Manrope; `font-display: swap`; fallback `size-adjust`.
- Inline the **critical CSS** (above-the-fold: nav, hero, preloader, grain) in `<head>`.

### 5.5 Caching (Vercel)
In `vercel.json` set long-lived immutable caching for hashed assets and short for HTML:
```json
{
  "headers": [
    { "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/(.*)\\.(avif|webp|jpg|jpeg|png|svg|woff2)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/", "headers": [{ "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }] }
  ]
}
```
(Merge with the security headers from Phase 7 — do not create two conflicting `headers` blocks.)

### 5.6 Resilience
1. Add an **offline/poor-network fallback**: a small service worker (Workbox or hand-written) that caches the app shell and fonts. Cache-first for static assets, network-first for HTML. Version it, and make sure updates never leave users on a stale shell (skipWaiting + a toast "New version available — refresh").
2. A branded **404 page** (`/404`) in the site's style with a link home and a sparkle animation.
3. An **error boundary** around each lazy section: if one section crashes, the rest of the page stays alive and a styled "This section failed to load — retry" shows.
4. Handle **JS-disabled / crawler** visits: a `<noscript>` block with the name, role, key links and email so the page is never blank.

### 5.7 Observability
1. Enable **Vercel Web Analytics** and **Speed Insights** (privacy-friendly, no cookie banner needed).
2. Add lightweight `web-vitals` reporting to Vercel Analytics custom events.
3. Set up a free **uptime monitor** (UptimeRobot / BetterStack) hitting the home page every 5 minutes, alerting the owner's email.
4. In `README.md`, document how to read the dashboards and what thresholds mean.

---

## PHASE 6 — SEO, METADATA & DOMAIN CORRECTNESS

### 6.1 Fix the metadata errors found in §0
1. **`og:image` must be absolute.** Change to `https://<final-domain>/assets/brand/og-image.png` (1200×630, < 300KB). Add `og:image:width`, `og:image:height`, `og:image:alt`.
2. Add **`og:url`**, **`og:site_name`** (`prikaushion`), **`og:locale`** (`en_IN`).
3. Add Twitter/X tags: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image` (absolute).
4. `<html lang="en-IN">`.
5. Add `viewport-fit=cover` to the viewport meta.

### 6.2 Domain & canonical resolution
The canonical currently points to `https://prikaushion.studio/`.
- **If the owner owns `prikaushion.studio`:** connect it in Vercel (Project → Settings → Domains), make **one** hostname primary (apex or `www`), 301-redirect the other, 301-redirect `prikaushion.vercel.app` → the primary domain, and make the canonical, `og:url`, sitemap and JSON-LD all use that primary domain.
- **If the owner does not own it (or hasn't connected it):** set canonical to `https://prikaushion.vercel.app/` everywhere and note in `V2_BLOCKERS.md`: "Buy/connect custom domain, then switch canonical."
- Write the chosen domain in **one** place (`site.ts → siteUrl`) and read it everywhere (meta, sitemap, robots, JSON-LD, OG).

### 6.3 Structured data & crawl files
1. JSON-LD `Person` + `WebSite` (name, alternateName `VishRim`, jobTitle, url, image, sameAs = [GitHub, LinkedIn, Instagram **only if URLs are real**], email, address locality "New Delhi", alumniOf "Amity University").
2. `public/robots.txt` allowing all, with `Sitemap:` line.
3. `public/sitemap.xml` with the home URL and `lastmod`.
4. `manifest.webmanifest` (name, short_name, `theme_color #0A0A0B`, `background_color #0A0A0B`, icons 192/512, maskable icon of the red K).
5. Favicon set: `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` (180).

### 6.4 Pre-rendering (important for a client-rendered SPA)
Crawlers and link-preview bots see only the empty shell today. Fix with **one** of:
- **Preferred:** pre-render the static home page at build time (e.g. `vite-plugin-ssr`/`vite-react-ssg`, or Astro/Next static export) so the HTML contains the real headings, About text, project list and links.
- **Minimum:** inject a server-visible, semantic HTML summary (name, role, about paragraph, project titles with links, socials) inside `<noscript>` and as visually-hidden content that is replaced on hydration.
Verify with `curl -s https://<domain> | grep -i "Prakhar"` returning real content.

### 6.5 Content/semantics
One `h1` (name), `h2` per section, `h3` per project; descriptive link text (no "click here"); all images with meaningful `alt`; `aria-label` on icon-only buttons; skip-to-content link.

**Acceptance:** Facebook Sharing Debugger / LinkedIn Post Inspector / Google Rich Results Test pass; the social card renders; `curl` shows real content.

---

## PHASE 7 — SECURITY HARDENING

This is a **static portfolio**: it has no login and no database, so there is no authentication to attack — that is a security *advantage*. **Do not add authentication, accounts or an admin panel.** Security work therefore focuses on: HTTP headers, the contact form (the only input), dependency/supply-chain hygiene, secrets, third-party scripts, and abuse/traffic protection.

### 7.1 Security headers (add to `vercel.json`)
Apply to `/(.*)`:
```json
{
  "key": "Content-Security-Policy",
  "value": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https://vitals.vercel-insights.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://formspree.io; object-src 'none'; upgrade-insecure-requests"
}
```
plus:
```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-site
X-Frame-Options: DENY
```
Rules:
1. **Tune the CSP to the real site.** Open the site, watch the console for CSP violations, and add only the minimum origins needed (Vercel Analytics script, fonts if not self-hosted, a form endpoint if used). Prefer **self-hosting fonts** and removing `fonts.googleapis.com` entirely.
2. Avoid `unsafe-eval` and inline scripts. If an inline script is unavoidable (e.g. JSON-LD), use a **nonce/hash**; JSON-LD `type="application/ld+json"` is not executed and does not need `script-src` allowance.
3. Test the CSP in **report-only** mode first (`Content-Security-Policy-Report-Only`), fix violations, then enforce.
4. After deploy, verify the grade at **securityheaders.com** (target **A or A+**) and **Mozilla Observatory** (target **A**). Record in the changelog.
5. Submit the domain to the **HSTS preload list only after** confirming HTTPS works on all subdomains in use.

### 7.2 Contact form security (the only user input)
Choose **one** implementation and document it:

**Option A (recommended): serverless function on Vercel** — `/api/contact.ts`
1. Method check: accept `POST` only; return `405` otherwise.
2. **Validate and sanitise** with `zod`: `name` 2–80 chars, `email` valid + ≤ 254 chars, `topic` from an allow-list, `message` 10–2000 chars. Reject everything else with `400`. Strip control characters. Never reflect raw input into HTML.
3. **Spam defence (layered):**
   a. Honeypot field (hidden, `tabindex=-1`, `autocomplete="off"`); if filled → silently return `200`.
   b. **Cloudflare Turnstile** (free, privacy-friendly) token verified server-side with the secret from env.
   c. Minimum-time-to-submit check (reject forms submitted in < 3s after render).
   d. **Rate limiting:** max 3 submissions per IP per 10 minutes (Vercel KV/Upstash Redis free tier, or Vercel Firewall rate-limit rule). Return `429` with `Retry-After`.
4. Deliver the message with **Resend** (or Nodemailer + app password) to `prakhar1532006@gmail.com`; the API key lives **only** in Vercel Environment Variables (`RESEND_API_KEY`) — never in the repo, never prefixed with `VITE_`.
5. CORS: same-origin only; check the `Origin`/`Referer` header against `siteUrl`.
6. Response bodies are generic (`{ ok: true }` / `{ ok: false, error: "…" }`); never leak stack traces.
7. Log failures server-side without logging message contents or full IPs.

**Option B (simplest):** Formspree/Basin endpoint with their spam filter + reCAPTCHA/Turnstile, and `form-action` in CSP allowing only that origin. Keep the `mailto:` fallback.

**Client side (both options):** disable the submit button while sending, show success/error states from the spec, never use `dangerouslySetInnerHTML` with user input, and keep the honeypot + timestamp fields.

**Email harvesting:** the email address appears in the page for humans. Reduce scraping by assembling it at runtime from parts (`user` + `@` + `domain`) on click/hover, and do not render it as plain text in the SSR/noscript HTML. (A `mailto:` link is still allowed after interaction.)

### 7.3 Secrets & repository hygiene
1. `.gitignore` must contain `.env`, `.env.*`, `*.pem`, `*.key`, `.vercel`, `node_modules`, `dist`.
2. If Phase 1 found any secret in git history: **rotate it immediately**, then purge it with `git filter-repo` (or BFG), force-push, and note in `V2_BLOCKERS.md` that the owner must rotate the credential at the provider.
3. Add **`gitleaks`** as a pre-commit hook (husky) and a GitHub Action.
4. Environment variables: only non-secret config uses `VITE_` (it is public by design). Secrets are server-only.
5. Enable **GitHub secret scanning + push protection** on the repository (Settings → Code security).
6. Turn on **2FA** for GitHub, Vercel, the domain registrar and the email account (owner action → `V2_BLOCKERS.md`).

### 7.4 Dependency & supply-chain security
1. Run `npm audit --omit=dev`; fix with `npm audit fix`; for anything that cannot be fixed, document the risk.
2. Pin versions (commit `package-lock.json`); use `npm ci` in CI.
3. Enable **Dependabot** (`.github/dependabot.yml`: weekly npm + GitHub Actions updates) and **CodeQL** scanning.
4. Remove unused packages (Phase 1 `depcheck`) to shrink attack surface.
5. **No third-party scripts** except Vercel Analytics/Speed Insights and the CAPTCHA. If any CDN script/style is used, add **Subresource Integrity** (`integrity` + `crossorigin="anonymous"`) and pin an exact version.
6. Disable production **source maps** (`build.sourcemap:false`) so the source is not trivially browsable (not a secret-protection measure, only hygiene).

### 7.4.1 Frontend code safety checklist
- No `eval`, `new Function`, `document.write`.
- No `innerHTML`/`dangerouslySetInnerHTML` with dynamic data.
- All external links: `target="_blank" rel="noopener noreferrer"`.
- URLs from `site.ts`/`projects.ts` are validated (allow only `https:` and `mailto:`) before rendering as `href` — reject `javascript:` and `data:`.
- Clipboard API calls wrapped in try/catch with a graceful fallback.
- `localStorage` / `sessionStorage` usage wrapped in try/catch; stores no personal data.

### 7.5 Authentication & authorisation
- **Confirm in the audit that no auth surface exists.** There must be no login, no admin route, no `/api` endpoint except `/api/contact` (if Option A), and no database credentials in the client.
- If the audit finds *any* auth or admin functionality (CMS, dashboard, hidden route): list it, then either **remove it** or put it behind a proper provider (Clerk/Auth.js/Vercel Password Protection) with: HTTPS only, secure + HttpOnly + SameSite cookies, CSRF protection, rate-limited login, no secrets in the client, least-privilege roles. State the decision in the changelog.
- If the owner later wants a private preview, use **Vercel Deployment Protection** for preview URLs rather than building auth.

### 7.6 Abuse & traffic protection (Vercel)
1. **Vercel Firewall** (Project → Firewall): enable **bot protection / managed rules**; add a custom rule that **rate-limits `/api/*`** (e.g. 20 req / minute / IP) and **challenges** requests with missing/blank `User-Agent`.
2. Know the emergency switch: **Attack Challenge Mode** — document in the README when and how to turn it on during a traffic attack.
3. Set a **spend/usage alert** and (if on a paid plan) a **spend cap**, so a bot flood cannot create a surprise bill. On the free Hobby plan, note the bandwidth limit and monitor it.
4. Serve heavy media (any video) from an optimised source, not the origin; avoid autoplay video on mobile.
5. Put **Cloudflare** (free) in front only if the owner wants extra DDoS/WAF layers; document trade-offs (extra DNS hop, SSL mode must be "Full (strict)").
6. Ensure `www`/apex redirects and HTTP→HTTPS are enforced (Vercel does this by default on custom domains; verify).

**Acceptance for Phase 7:** `securityheaders.com` ≥ A; Mozilla Observatory ≥ A; `gitleaks` clean; `npm audit` shows 0 high/critical; form rejects malformed input, honeypot hits, rapid repeats (`429`); no console CSP violations; documented decision on auth ("none by design").

---

## PHASE 8 — ACCESSIBILITY & QUALITY

1. Run **axe-core** + manual keyboard walkthrough: every interactive element reachable in a logical order, visible focus ring (`2px crimson, 4px offset`), no keyboard traps (the mobile menu must trap focus while open and restore it on close; `Esc` closes).
2. Screen reader pass (NVDA/VoiceOver): landmarks (`header`, `nav`, `main`, `section[aria-labelledby]`, `footer`), split-text titles expose full text via a visually-hidden span, marquees are `aria-hidden` with a static alternative, disabled links announce "Link coming soon".
3. Colour contrast: bone on ink ≥ 12:1; crimson on ink only for ≥ 24px text and non-text UI; never for small body copy. Fix any failure.
4. Target size ≥ 44×44px for touch; spacing between adjacent targets ≥ 8px.
5. Respect `prefers-reduced-motion`, `prefers-color-scheme` (site is intentionally dark — set `color-scheme: dark` so native controls match), and `forced-colors`.
6. Cross-browser matrix: Chrome, Firefox, Safari (iOS + macOS), Edge, Samsung Internet. Fix `backdrop-filter`, `clip-path`, `text-wrap`, `100dvh`, `view-transition` gaps with fallbacks.
7. Real-device test: low-end Android over throttled 4G (Lighthouse "Slow 4G" + 4× CPU slowdown). Scroll must stay smooth; if not, reduce effects on `navigator.hardwareConcurrency <= 4` or `deviceMemory <= 4` (disable constellation, grain animation, tilt).

---

## PHASE 9 — CONTENT & CONVERSION POLISH

(Everything here uses **only facts the owner has provided**; do not invent numbers, testimonials or clients.)

1. **Hero CTA clarity:** one primary action ("See my work"), one secondary ("Hire me" → contact). Make sure "Hire me" is visible on mobile (sticky bottom pill after the hero scrolls away, hides at Contact).
2. **Project proof:** each project card shows year, stack, and both buttons; add a one-line "Role" (e.g. "Design + build") and, where known, the outcome (e.g. "Live at thehacks.in"). Owner-provided facts only.
3. **Scannability:** About paragraphs ≤ 3 lines on desktop at `46ch`; first sentence of each section is the takeaway.
4. **Contact reassurance:** show response time and a copy-email button; after submit, show a clear success state.
5. **Add a "Now" strip** (small mono line near the footer): `NOW — ORGANISING HACKS 2026 · BUILDING prikaushion · LEARNING JAPANESE` (owner can edit in `site.ts`).
6. **Resume:** if `resumeUrl` is set, track clicks with a Vercel Analytics custom event `cv_download`.
7. **Social proof placeholders:** a clearly-disabled slot for testimonials in `site.ts` (`testimonials: []`) — render the section only if the array is non-empty.

---

## PHASE 10 — DEPLOYMENT, CI/CD & DOCUMENTATION

1. **Branch workflow:** `main` = production; PRs create Vercel preview deployments; preview deployments are protected (Deployment Protection) and `noindex` (`X-Robots-Tag: noindex` on non-production hostnames via middleware/headers).
2. **GitHub Actions** (`.github/workflows/ci.yml`): `npm ci` → typecheck → lint → unit/e2e smoke → build → bundle-size check → Lighthouse CI → gitleaks → CodeQL (separate workflow).
3. **Playwright smoke tests** (run in CI): home loads without console errors; nav links scroll to sections; every project has Live+Code buttons rendered; contact form blocks invalid input; no horizontal overflow at 360px; `/404` renders.
4. **README.md:** how to run, build, deploy; where to edit `site.ts` / `projects.ts`; how to turn on Attack Challenge Mode; how to read analytics; how to rotate keys; the performance and security budgets.
5. **`V2_CHANGELOG.md`:** every issue ID from the audit, what changed, before/after metrics, commit hash.
6. **`V2_BLOCKERS.md`:** the exact list of things only the owner can provide or do (LinkedIn URL, Instagram handle, project live/repo URLs, custom domain decision, secret rotation, 2FA, Vercel Firewall toggles that require the dashboard, spend alerts).

---

## FINAL VERIFICATION (RUN LAST, REPORT RESULTS)

| Check | Tool | Target |
|---|---|---|
| Lighthouse mobile | Lighthouse CI | Perf ≥ 90 · A11y ≥ 95 · BP ≥ 95 · SEO ≥ 95 |
| Core Web Vitals | Lighthouse + web-vitals | LCP ≤ 2.5s · CLS ≤ 0.05 · INP ≤ 200ms |
| Security headers | securityheaders.com | A or A+ |
| TLS / HSTS | SSL Labs | A / A+ |
| Observatory | Mozilla Observatory | A |
| Secrets | gitleaks (history) | 0 findings |
| Dependencies | `npm audit --omit=dev` | 0 high / 0 critical |
| Social cards | LinkedIn Post Inspector, WhatsApp share, Facebook Debugger | Card with image renders |
| Crawlability | `curl` + Google Rich Results Test | Real content in HTML; JSON-LD valid |
| Layout | Playwright overflow test | 0 overflow at 320–1920 |
| Links | Link checker | 0 broken; `TODO` links shown as disabled |
| Forms | Manual + e2e | Invalid input rejected; honeypot silent; 429 on abuse |
| Smoothness | Chrome Performance on throttled mobile | No frame > 32ms during scroll |

When everything passes, print a one-screen **FINAL SUMMARY** listing: issues found, issues fixed, issues deferred (with reason), the new Lighthouse and header grades, and the owner's remaining to-do list from `V2_BLOCKERS.md`.

---

## THINGS YOU MUST NOT DO IN THIS PASS

- ❌ Do not add login, accounts, an admin panel or a database.
- ❌ Do not put any secret in client code, in `VITE_*` variables, or in the repo.
- ❌ Do not weaken the design: no purple/blue gradients (except the Socials hover flood), no generic card grids, no emoji icons, no bouncy easing.
- ❌ Do not remove content, projects or sections to "simplify".
- ❌ Do not fake metrics, testimonials, client names or social links.
- ❌ Do not disable security headers or CSP to make an error go away — fix the cause.
- ❌ Do not ship without running the Final Verification table.         after te change before pushig it to github ill see the actual version on loca host first 
</USER_REQUEST>
<ADDITIONAL_METADATA>
The current local time is: 2026-11-12T11:09:50+05:30.

The user's current state is as follows:
Active Document: c:\Users\prakh\PORTFOLIO\generate_project_covers.py (LANGUAGE_UNSPECIFIED)
Cursor is on line: 1
Other open documents:
- c:\Users\prakh\PORTFOLIO\src\config\site.ts (LANGUAGE_UNSPECIFIED)
- c:\Users\prakh\PORTFOLIO\src\config\projects.ts (LANGUAGE_UNSPECIFIED)
- c:\Users\prakh\PORTFOLIO\src\sections\Socials.tsx (LANGUAGE_UNSPECIFIED)
- c:\Users\prakh\PORTFOLIO\src\components\Preloader.tsx (LANGUAGE_UNSPECIFIED)
- c:\Users\prakh\PORTFOLIO\src\sections\About.tsx (LANGUAGE_UNSPECIFIED)
</ADDITIONAL_METADATA>