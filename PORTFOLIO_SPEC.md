<USER_REQUEST>
# PRIKAUSHION PORTFOLIO — MASTER BUILD SPEC
### For: Google Antigravity (agentic build) · Owner: Prakhar Kaushik ("VishRim") · Brand: prikaushion

> **READ THIS FIRST, AGENT.**
> You are building a **premium, dark, sophisticated, editorial portfolio website**. It must **not** look like a typical AI-generated template. Every detail in this file is intentional. Where this file gives an exact value (hex, ms, easing, px, copy), use it **exactly**. Where it says "must", it is non-negotiable. Do not simplify, do not skip sections, do not substitute fonts, do not replace the copy with lorem ipsum.
>
> Work in the **build order in Section 22**. After each phase, run the **acceptance checklist in Section 23** for that phase before moving on.

---

## TABLE OF CONTENTS

0. Vision & the "Not AI-looking" Rules
1. Assets Provided & How to Use Them
2. Config File (fill-in values: links, handles)
3. Tech Stack & Project Structure
4. Design Tokens (Color, Gradients, Type, Spacing, Radius, Shadows, Grain)
5. Typography System (the section-heading font in depth)
6. Section Separator System (how every section is divided)
7. Global Behaviours (smooth scroll, cursor, scroll progress, background colour-journey)
8. Preloader / Intro Sequence
9. Navigation
10. Section 01 — HOME (Hero)
11. Section 02 — MARQUEE STRIP
12. Section 03 — ABOUT ME
13. Section 04 — WORK / EXPERIENCE
14. Section 05 — PROJECTS
15. Section 06 — SERVICES (prikaushion)
16. Section 07 — TOOLKIT / SKILLS
17. Section 08 — EDUCATION & CLUBS
18. Section 09 — SOCIALS (colour-transition interactive)
19. Section 10 — CONTACT
20. Footer
21. Motion Library (every animation, defined)
22. Build Order
23. Acceptance Checklist
24. Performance, Accessibility, Responsive, SEO
25. Things You Must NOT Do

---

## 0. VISION & THE "NOT AI-LOOKING" RULES

**One-line vision:** *A dark, cinematic, editorial portfolio where black ink, a single blood-red accent and warm bone-white paper-grain tones — pulled straight from the prikaushion logo — make a 20-year-old builder look like a studio.*

**Mood words:** classy · dark · sophisticated · editorial · cinematic · confident · crafted · premium · tactile · alive.

**Reference feel (do not copy, absorb):** high-end design-studio sites, fashion lookbooks, A24 film-poster typography, award-winning Awwwards-style portfolios. Slow, weighty, deliberate motion. Large type. Generous negative space. Hairline rules. One accent colour used sparingly.

### The "Not AI-looking" rules (violating any of these = fail)
1. **No purple/blue/pink "AI gradients".** The only gradient hues allowed are: black, charcoal, oxblood/burgundy, crimson, ember (deep orange-red, tiny amounts) and warm bone.
2. **No uniform three-column card grid of identical glassmorphism boxes** as the main layout of any section. Layouts must vary section to section (asymmetric, overlapping, sticky, horizontal, list-hover, etc.).
3. **No emoji as icons.** Use inline SVG (Lucide-style 1.5px stroke) or custom shapes. The only decorative glyph family is the **four-point star / sparkle** from the logo.
4. **No centred-everything layout.** Use left-aligned editorial layouts with deliberate asymmetry; centre only where the spec says so.
5. **No default system/Inter-only typography.** Use the type system in Section 5 exactly.
6. **No generic "Welcome to my portfolio" copy.** Use the copy in this file.
7. **No stock illustrations, no 3D blob shapes, no floating dashboard mockups.**
8. **No drop-shadow soup.** Depth comes from layered tone, hairline borders (`1px` at low-opacity bone) and light (radial spotlights), not from big blurry shadows.
9. **No bouncy/elastic easing on UI.** Motion is smooth, expo/quart-out, weighty.
10. **Every interactive element must have a designed hover, focus, and active state.**

---

## 1. ASSETS PROVIDED & HOW TO USE THEM

The owner has attached two images. Save them into the project exactly as below (the agent should copy the uploaded files into these paths and then create the derived versions described).

| Uploaded file | Save as | Purpose |
|---|---|---|
| Logo image (cream background, black distressed brush lettering "PRIKAUSHION", with a large **red K-shaped starburst**, orbit arcs and four-point sparkles) | `/public/assets/brand/logo-original.png` | Preloader, OG image, footer badge |
| Portrait photo (man, pink-and-white striped polo, thumbs up, olive duffel bag, standing before a "Faraway — International Hackathon — Round 2 — AUG 2026" banner) | `/public/assets/images/prakhar-portrait-original.jpg` | About Me hero image |

### 1.1 Derived brand assets the agent must create
1. `/public/assets/brand/logo-mark-k.svg` — a vector recreation of **just the red K starburst** (the large crimson K with the sharp spike going up-right and the long thin spike going down-right). Used as favicon, cursor easter egg, section-divider star, loader glyph. Colour `#E01B24`.
2. `/public/assets/brand/sparkle.svg` — a clean **four-point star** (concave diamond/sparkle). Two versions: crimson `#E01B24` and bone `#F4EFE4`. Used in dividers, marquee separators, hover effects.
3. `/public/assets/brand/logo-bone-on-transparent.png` — the logo with the cream background removed and the black lettering recoloured to bone `#F4EFE4`, keeping the red K as-is. Used on dark surfaces (nav, footer). If clean background removal is not possible, the agent must instead render the nav wordmark as live text (see Section 9) and use the original logo only on cream surfaces.
4. `/public/favicon.svg` and `/public/favicon-32.png` — the red K mark on a `#0A0A0B` rounded square.
5. `/public/assets/brand/og-image.png` — 1200×630. Left: bone-on-black logo. Right: "Prakhar Kaushik — Builder of Interfaces". Black `#0A0A0B` background with grain.

### 1.2 Portrait treatment (About Me)
The photo is a portrait (9:16-ish) with a busy banner background. Treatment rules:
1. Crop to a **4:5 portrait** centred on face and shoulders, thumbs-up hands visible. Save as `/public/assets/images/prakhar-portrait.webp` (quality 85, max width 1400px) plus a 700px version.
2. Apply a **cinematic grade in CSS** (not baked): `filter: grayscale(0.15) contrast(1.08) saturate(0.9)`.
3. Overlay a **dark-to-transparent gradient from the bottom** (`linear-gradient(to top, rgba(10,10,11,0.85), transparent 55%)`) and a **red-tinted multiply layer at 12% opacity** on hover only.
4. Frame: **arched top** (border-radius `999px 999px 0 0` at the top corners, 0 at the bottom) — a doorway/arch shape — with a 1px bone border at 18% opacity offset 14px outside the image (an "echo frame").
5. A small rotated **stamp badge** overlapping the bottom-right corner: circular text "FARAWAY · INTERNATIONAL HACKATHON · ROUND 2 · AUG 2026 ·" rotating slowly (see Section 12.4). Center of the stamp holds the sparkle.
6. Photo must be lazy-loaded with a blur-up placeholder (20px base64 blur).

---

## 2. CONFIG FILE (FILL-IN VALUES)

Create `/src/config/site.ts`. **All links in the site must come from this file** so the owner can edit in one place. Pre-fill what is known; leave clearly-marked `TODO` for what is not and make the UI degrade gracefully (a button whose URL is `TODO` renders as disabled with tooltip "Link coming soon").

```ts
export const site = {
  name: "Prakhar Kaushik",
  alias: "VishRim",
  brand: "prikaushion",
  role: "Frontend Developer · Builder · Educator",
  location: "New Delhi, India",
  email: "prakhar1532006@gmail.com",
  brandEmail: "prikaushionv@gmail.com",
  // phone intentionally NOT displayed publicly. Do not render a phone number anywhere.
  socials: {
    github:   { label: "GitHub",   handle: "prakharrai12",        url: "https://github.com/prakharrai12" },
    linkedin: { label: "LinkedIn", handle: "Prakhar Kaushik",     url: "TODO_LINKEDIN_URL" },   // e.g. https://www.linkedin.com/in/<slug>
    instagram:{ label: "Instagram",handle: "TODO_INSTAGRAM_HANDLE",url: "TODO_INSTAGRAM_URL" },  // e.g. https://instagram.com/<handle>
    email:    { label: "Email",    handle: "prakhar1532006@gmail.com", url: "mailto:prakhar1532006@gmail.com" },
  },
  resumeUrl: "TODO_RESUME_PDF",  // optional: /public/Prakhar-Kaushik-CV.pdf
};
```

Create `/src/config/projects.ts` using the schema and the pre-filled list in **Section 14.3**. Every project has `liveUrl` and `repoUrl`. The owner states **all projects are already hosted**, so each card **must** render a working **"Live"** button and a **"Code"** button using these URLs. Use `TODO_` placeholders where the exact URL is unknown (see 14.3); do not invent URLs.

---

## 3. TECH STACK & PROJECT STRUCTURE

**Framework:** Vite + React 18 + TypeScript.
**Styling:** Tailwind CSS v3 + CSS variables (tokens in Section 4) + a small `globals.css` for grain, selection, scrollbar and cursor rules.
**Animation:**
- **GSAP 3 + ScrollTrigger + SplitText-equivalent** (if SplitText is unavailable, write a tiny `splitText()` utility that wraps characters/words/lines in `<span>` with `overflow:hidden` masks).
- **Lenis** for smooth scrolling (`lerp: 0.085`, `wheelMultiplier: 0.9`, `smoothTouch: false`).
- **Framer Motion** only for component enter/exit (nav menu, modals, tooltip), not for scroll choreography.
**Optional 3D/WebGL:** none required. Do **not** add Three.js unless Section 10.7 is implemented as an optional enhancement. Prioritise 60fps.
**Fonts:** Google Fonts via `@fontsource` packages (self-hosted, `font-display: swap`): Fraunces (variable, with `opsz`, `SOFT`, `WONK` axes), Instrument Serif (400, italic), Manrope (300–800), JetBrains Mono (400, 500).
**Icons:** `lucide-react` (stroke 1.5) + custom SVG for the sparkle and K mark.
**Deploy target:** static hosting (GitHub Pages / Cloudflare Pages / Vercel). Use relative-safe `base` config.

```
/src
  /assets (fonts handled by @fontsource)
  /components
    Preloader.tsx
    CustomCursor.tsx
    ScrollProgress.tsx
    BackgroundJourney.tsx      // the scroll-driven colour/gradient system
    Grain.tsx
    Nav.tsx
    MagneticButton.tsx
    SectionHeader.tsx          // the reusable section separator (Section 6)
    SplitText.tsx
    Marquee.tsx
    ProjectCard.tsx
    SocialRow.tsx
    ...
  /sections
    Hero.tsx  About.tsx  Work.tsx  Projects.tsx
    Services.tsx  Toolkit.tsx  Education.tsx  Socials.tsx  Contact.tsx  Footer.tsx
  /config   site.ts  projects.ts  experience.ts  skills.ts
  /hooks    useMagnetic.ts  useScrollTheme.ts  useReducedMotion.ts  useMediaQuery.ts
  /lib      gsap.ts (register plugins)  lenis.ts  utils.ts
  main.tsx  App.tsx  globals.css
/public/assets/{brand,images,projects}
```

---

## 4. DESIGN TOKENS

### 4.1 Colour (define as CSS variables on `:root`)

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0A0A0B` | Deepest background, near-black |
| `--obsidian` | `#0F0E10` | Default surface |
| `--charcoal` | `#161417` | Raised surface / cards |
| `--graphite` | `#221F24` | Borders-on-fill, hover surface |
| `--oxblood` | `#4A0A10` | Deep red-brown for gradient washes |
| `--burgundy` | `#7A0F18` | Mid wine tone for gradient washes |
| `--crimson` | `#E01B24` | **Primary accent** (the logo red). Use sparingly. |
| `--crimson-glow` | `#FF3B3B` | Hover/glow variant of crimson |
| `--ember` | `#FF5A36` | Tiny highlights only (1% of UI) |
| `--bone` | `#F4EFE4` | Primary text on dark; the logo's cream paper colour |
| `--bone-dim` | `rgba(244,239,228,0.64)` | Secondary text |
| `--bone-faint` | `rgba(244,239,228,0.14)` | Hairlines / borders |
| `--bone-ghost` | `rgba(244,239,228,0.06)` | Ghost outlines / giant background words |
| `--paper` | `#F4EFE4` | Cream surfaces (Contact section inversion, preloader) |
| `--paper-ink` | `#0A0A0B` | Text on cream |

**Accent usage rule:** crimson appears as: the K mark, hairline-rule leading ends, primary buttons, link underlines on hover, the active nav item dot, cursor ring on interactive elements, tiny sparkles, and the scroll-progress bar. **Never** use crimson as a large body-text colour and never as a full-section flat background (it is allowed as a *gradient wash* with ≤ 35% opacity, and as the Socials hover flood).

### 4.2 Gradient recipes (named — used by the Background Journey in 7.4)

- `--grad-void`: `radial-gradient(120% 80% at 70% 10%, #1a0d10 0%, #0A0A0B 55%)`
- `--grad-ember-haze`: `radial-gradient(90% 70% at 20% 0%, rgba(122,15,24,0.55) 0%, rgba(10,10,11,0) 60%), #0A0A0B`
- `--grad-oxblood-deep`: `linear-gradient(180deg, #0A0A0B 0%, #2a070c 55%, #4A0A10 100%)`
- `--grad-wine-spot`: `radial-gradient(70% 60% at 85% 40%, rgba(224,27,36,0.28) 0%, rgba(74,10,16,0.35) 35%, #0A0A0B 75%)`
- `--grad-smoke`: `linear-gradient(180deg, #0F0E10 0%, #161417 100%)`
- `--grad-crimson-flood`: `linear-gradient(110deg, #7A0F18 0%, #E01B24 60%, #FF3B3B 100%)` (Socials hover only)
- `--grad-paper`: `linear-gradient(180deg, #F4EFE4 0%, #EDE6D6 100%)` (Contact section)

### 4.3 Spacing / layout
- Base unit `4px`. Section vertical padding: `clamp(96px, 14vw, 220px)` top & bottom.
- Max content width: `1440px`; side gutters `clamp(20px, 5vw, 80px)`.
- 12-column grid, column gap `clamp(16px, 2vw, 32px)`.
- Radius scale: `--r-xs 6px`, `--r-sm 10px`, `--r-md 16px`, `--r-lg 28px`, `--r-pill 999px`. Prefer **sharp or large** radii; avoid mid-radius "SaaS card" 12px everywhere. Project cards use `--r-lg`; buttons use `--r-pill`; hairline panels use `--r-xs`.

### 4.4 Borders & shadows
- Hairline: `1px solid var(--bone-faint)`.
- Hover hairline: `1px solid rgba(244,239,228,0.38)`.
- Elevation (rare): `0 30px 80px -30px rgba(0,0,0,0.75)`.
- Red glow (hover only): `0 0 0 1px rgba(224,27,36,0.5), 0 20px 60px -20px rgba(224,27,36,0.45)`.

### 4.5 Film grain (global, mandatory)
- Fixed full-screen `<div class="grain">` above content, `pointer-events:none`, `z-index: 90`.
- Use an inline SVG `feTurbulence` noise (`baseFrequency 0.8`, `numOctaves 2`) as a tiled background, `opacity: 0.07`, `mix-blend-mode: overlay`.
- **Animate** it: shift `background-position` through 6 steps at `steps(6)` every `0.9s` infinitely to create subtle film flicker. Disable under `prefers-reduced-motion`.

### 4.6 Selection, scrollbar, focus
- `::selection { background: var(--crimson); color: var(--ink); }`
- Hide native scrollbar on desktop and show the custom scroll-progress (Section 7.3).
- Focus-visible: `outline: 2px solid var(--crimson); outline-offset: 4px;` — never remove focus outlines.

---

## 5. TYPOGRAPHY SYSTEM

This is the heart of the "classy" feel. **Use exactly these four families.**

| Role | Family | Details |
|---|---|---|
| **Section titles / Display** | **Fraunces** (variable) | `font-variation-settings: "opsz" 144, "SOFT" 30, "WONK" 1;` Weight **300** for the main word, **800** for emphasised word. Tracking `-0.035em`. Line-height `0.88`. |
| **Accent / italic whisper words** | **Instrument Serif** *italic* | Used for one word inside every section title, in crimson or bone. Tracking `-0.01em`. |
| **Body & UI** | **Manrope** | Body 17px/1.7 weight 400 (bone-dim). UI labels 14px weight 600. |
| **Labels, numbers, metadata** | **JetBrains Mono** | 12px, uppercase, tracking `0.18em`. Used for section indices "(01)", dates, tags, captions. |

### 5.1 Type scale (fluid)
```
--fs-mega:   clamp(5.5rem, 17vw, 17rem);   /* hero name, giant section ghost words */
--fs-title:  clamp(3.5rem, 11vw, 11rem);   /* section titles */
--fs-h2:     clamp(2.2rem, 5vw, 4.5rem);
--fs-h3:     clamp(1.5rem, 2.4vw, 2.25rem);
--fs-lead:   clamp(1.15rem, 1.6vw, 1.6rem);
--fs-body:   1.0625rem;
--fs-small:  0.875rem;
--fs-mono:   0.75rem;
```

### 5.2 Section-title formula (apply to EVERY section title)
Each section title is **two lines**, mixing three styles:

```
Line 1:  Fraunces 300, bone                    → the "setup" word
Line 2:  Fraunces 800, bone  +  one Instrument Serif italic word in crimson
```

Examples (exact copy used later):
- **HOME** → *(hero has its own treatment, see 10)*
- **ABOUT** → line 1: `The person` / line 2: `behind the *pixels*`
- **WORK** → line 1: `Where I've` / line 2: `put in the *hours*`
- **PROJECTS** → line 1: `Selected` / line 2: `*work*, shipped`
- **SERVICES** → line 1: `What prikaushion` / line 2: `can *build* for you`
- **TOOLKIT** → line 1: `The tools` / line 2: `of the *trade*`
- **EDUCATION** → line 1: `Always` / line 2: `*learning*`
- **SOCIALS** → line 1: `Find me` / line 2: `*elsewhere*`
- **CONTACT** → line 1: `Let's make` / line 2: `something *iconic*`

(Words between `*asterisks*` = Instrument Serif italic in crimson.)

### 5.3 Title reveal animation (applies to every section title)
1. Split each title into **lines → words → characters**, each line wrapped in `overflow: hidden`.
2. Initial state: each character `translateY(110%) rotateZ(4deg)`, `opacity: 0`.
3. Trigger when the title's top hits `80%` of viewport (`ScrollTrigger start: "top 80%"`, `once: true`).
4. Animate characters to `translateY(0) rotateZ(0)`, `opacity: 1`, `duration: 1.1s`, `ease: "expo.out"`, `stagger: 0.025s` per character, line 2 delayed `0.18s` after line 1.
5. The crimson italic word additionally animates `letter-spacing` from `0.2em` → `-0.01em` over `1.4s` with `power4.out`.

---

## 6. SECTION SEPARATOR SYSTEM

Every section (except Hero and Footer) begins with the `<SectionHeader>` component. This is what visually *separates* sections. It must be identical in structure but with different content per section.

### 6.1 Anatomy (top to bottom)
1. **Meta row** (flex, space-between, full width):
   - Left: mono label `(01)` — section number in parentheses, crimson.
   - Centre-left: mono caps section name, e.g. `ABOUT ME`, bone-dim.
   - Right: mono `SCROLL ↓` with a tiny 12px arrow that bobs `translateY 0→4px` (1.6s, sine, infinite).
2. **Hairline rule** directly below, full width, 1px, `--bone-faint`. On enter, a **crimson 1px line draws over it** left→right (`scaleX 0→1`, `transform-origin: left`, `duration 1.4s`, `expo.inOut`). At the end of the line, a **sparkle (crimson, 18px)** appears with `scale 0→1`, `rotate -90→0`, `0.6s`, then slowly rotates continuously (`360deg / 14s linear infinite`).
3. **Giant ghost word** behind the title: the section name in Fraunces 800, `--fs-mega`, **outline only** (`-webkit-text-stroke: 1px var(--bone-ghost)`, transparent fill), positioned absolutely behind, offset left `-2vw`. It **parallax-scrubs** horizontally: `x` from `+8vw` to `-8vw` across the section's scroll range (`scrub: 1`).
4. **Title** per Section 5.2 / 5.3, sitting over the ghost word.
5. **Intro line** (optional) — one sentence, Manrope `--fs-lead`, bone-dim, max-width `46ch`, fades up (`y 24→0`, `opacity 0→1`, `0.9s`, `power3.out`) `0.5s` after the title.

### 6.2 Section transitions (between sections)
Between consecutive sections, insert a `<SectionBridge>` (height `18vh`) containing:
- A **horizontal marquee of sparkles and the next section's name**: `✦ NEXT — PROJECTS ✦ NEXT — PROJECTS ✦` (use the sparkle SVG, not the text glyph), mono caps 12px, bone at 30% opacity, scrolling right-to-left at 40px/s, pausing on hover.
- The **page background colour** is mid-tween here (see 7.4) so the bridge visibly sits between two colour worlds.
- A **thin curved orbit arc** (SVG path echoing the logo's orbit swoosh), crimson 1px, that **draws itself** (`stroke-dashoffset`) as the bridge scrolls through the viewport (`scrub: 1`).

---

## 7. GLOBAL BEHAVIOURS

### 7.1 Smooth scroll (Lenis)
- Initialise Lenis once; connect to GSAP ticker: `gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0);`
- `lenis.on('scroll', ScrollTrigger.update)`.
- Anchor links use `lenis.scrollTo(target, { offset: -80, duration: 1.6, easing: t => 1 - Math.pow(1 - t, 4) })`.
- While the preloader or mobile menu is open, call `lenis.stop()`; resume with `lenis.start()` after.

### 7.2 Custom cursor (desktop / fine pointer only)
Two elements, `position: fixed`, `pointer-events: none`, `z-index: 100`, hidden on touch devices:
1. **Dot** — 8px bone circle, follows pointer instantly.
2. **Ring** — 40px circle, 1px bone border at 50% opacity, follows with lerp `0.16`.
`mix-blend-mode: difference` on both.

**States:**
| Target | Ring behaviour |
|---|---|
| Default | 40px ring |
| Any `a`, `button`, `[data-cursor="link"]` | Ring scales to 64px, border becomes crimson, dot hides |
| `[data-cursor="view"]` (project cards) | Ring becomes 96px **filled crimson**, shows mono text **"VIEW"** in `--ink` |
| `[data-cursor="drag"]` | Ring 96px, text **"DRAG"** |
| `[data-cursor="open"]` (social rows) | Ring 110px filled bone, text **"OPEN ↗"** in `--ink` |
| Text selection / inputs | Ring becomes a 2px × 28px vertical bar |
| Pointer leaves window | Fade out 0.2s |
Transitions between states: `0.35s`, `cubic-bezier(0.22, 1, 0.36, 1)`.

### 7.3 Scroll progress
- A **fixed 2px bar at the very top**, full width, crimson, `scaleX` bound to scroll progress (`transform-origin: left`), `z-index: 95`.
- A **fixed right-edge vertical indicator** (desktop only): a thin 1px vertical line (`60vh` tall) with **10 tiny dots** (one per section). The active section dot is a crimson filled circle 8px with a pulsing ring; inactive dots are 4px bone-at-30%. Hovering a dot shows a tooltip with the section name (mono caps) and clicking smooth-scrolls to it.

### 7.4 BACKGROUND COLOUR-JOURNEY (the gradient transition as you scroll) — MANDATORY
The page background **continuously shifts colour/gradient as the user scrolls**, section to section, like moving through rooms of different light. Implementation spec:

1. A fixed full-screen layer `<div id="bg-journey">` at `z-index: -1`, containing **two stacked gradient layers** `A` and `B` (each `position: absolute; inset:0`). Layer `B` is cross-faded over `A`.
2. Each section declares `data-bg="<gradient-name>"` and `data-accent-x`, `data-accent-y` (percent position of its radial glow).
3. Use one `ScrollTrigger` **per section boundary** with `start: "top 60%"`, `end: "top 10%"`, `scrub: 1.2`. As the next section enters, tween layer B's opacity `0 → 1` while its gradient is set to the incoming section's gradient; when complete, copy B → A and reset.
4. In addition, tween **CSS variables** `--glow-x`, `--glow-y` (percent) so the radial "light source" visibly **drifts** across the screen as you scroll.
5. Also tween a `--noise-boost` variable (grain opacity `0.07 → 0.10 → 0.07`) at each boundary for a subtle "projector flicker".

**Section → background map (exact):**

| # | Section | Gradient | Glow position | Vibe |
|---|---|---|---|---|
| 1 | Home | `--grad-void` | 70% 10% | Black with a faint warm vignette |
| 2 | Marquee/bridge | tween | — | Void → ember haze |
| 3 | About | `--grad-ember-haze` | 20% 0% | Smoky wine glow top-left |
| 4 | Work | `--grad-smoke` | 50% 50% | Cool, neutral graphite — a breather |
| 5 | Projects | `--grad-oxblood-deep` | 50% 100% | Deep wine rising from the bottom |
| 6 | Services | `--grad-wine-spot` | 85% 40% | Crimson spotlight on the right |
| 7 | Toolkit | `--grad-void` | 30% 20% | Return to pure black, minimal |
| 8 | Education | `--grad-smoke` | 80% 80% | Graphite, quiet |
| 9 | Socials | `--grad-void` → crimson flood on hover | per row | Black, with **colour floods** per social |
| 10 | Contact | `--grad-paper` | — | **Inversion to cream paper** (the logo's own background) |
| 11 | Footer | `--ink` | — | Back to black |

**The Contact inversion is a key moment:** as Contact enters, the page background tweens from black to bone cream, text colour variables flip (`--text: var(--ink)`, `--text-dim: rgba(10,10,11,0.62)`, hairlines to `rgba(10,10,11,0.16)`) over `1.2s`, and the cursor ring blend mode keeps it visible. When the footer enters, it flips back to black.

### 7.5 Reduced motion
Under `prefers-reduced-motion: reduce`: disable grain animation, parallax, marquee auto-scroll (leave static), char-split reveals (use a simple `opacity` fade 0.4s), Lenis smoothing (use native scroll), and cursor trail. The background colour journey becomes **instant section-based colour changes** (no scrub).

---

## 8. PRELOADER / INTRO SEQUENCE

A full-screen preloader that runs **once per session** (`sessionStorage` flag). Total duration ≈ 3.6s. Surface: **cream paper** (`--paper`) with grain — deliberately the same cream as the logo image so the logo appears to "belong".

**Timeline (exact):**
1. `0.0s` — Cream screen. Centre: the **original logo** (`logo-original.png`), initial `opacity: 0`, `scale: 0.92`, `filter: blur(8px)`.
2. `0.2s → 1.0s` — Logo fades in to `opacity 1`, `scale 1`, `blur 0` (`expo.out`).
3. `0.4s → 2.6s` — A **mono counter** bottom-left counts `000 → 100` (`JetBrains Mono`, 12px, tracking 0.2em), with text `LOADING THE EXPERIENCE` beside it. Bottom-right: `EST. 2026 — NEW DELHI`.
4. `0.6s → 2.6s` — A **1px crimson progress line** across the bottom edge, `scaleX 0 → 1`.
5. `1.2s` — The four small sparkles around the logo **pulse** (`scale 1 → 1.4 → 1`, `0.8s`, staggered `0.12s`).
6. `2.7s` — Logo scales to `1.08` and fades `opacity → 0` (`0.5s`, `power2.in`).
7. `3.0s → 3.9s` — **Curtain reveal**: the cream surface splits into **two halves** (top/bottom) that slide away (`yPercent: -100` and `+100`, `1.0s`, `expo.inOut`) revealing the dark hero beneath. At the same time a **crimson 2px line** flashes along the seam and fades.
8. `3.4s` — Hero entrance (Section 10.8) begins, overlapping the curtain.
9. After completion: unmount preloader, `lenis.start()`.

Skip behaviour: if `sessionStorage.seen === "1"`, play a **short 0.9s version** (logo flashes, curtain). A hidden "Skip" mono button appears at top-right after 1s.

---

## 9. NAVIGATION

### 9.1 Layout
- **Fixed top**, height `84px`, full width, `z-index: 80`, padding `0 var(--gutter)`.
- Left: **wordmark** — the live-text `prikaushion` in Fraunces 800, 22px, bone, letter-spacing `-0.02em`; the letter **K** (4th letter: pri**k**aushion) is crimson and slightly larger (`1.12em`) echoing the logo's red K. Hover: the K does a quick `rotate(20deg) scale(1.2)` and a sparkle pops at its top-right.
- Centre/right (desktop): links — `Home · About · Work · Projects · Services · Toolkit · Socials · Contact`, mono caps 12px, tracking `0.18em`. Active link has a **6px crimson dot** before it. Hover: text becomes bone (from bone-dim) and a **hairline underline draws** left→right (`0.4s`).
- Far right: **"Hire me"** pill button (`MagneticButton`), crimson border, transparent fill, on hover fills crimson with `--ink` text, arrow `↗` rotates 45deg. Links to `#contact`.

### 9.2 Scroll behaviour
- At top: transparent background.
- After scrolling `>80px`: nav gains a **blurred dark glass** background (`backdrop-filter: blur(14px) saturate(120%)`, `background: rgba(10,10,11,0.55)`, 1px bottom hairline).
- **Hide on scroll down, show on scroll up** (`translateY(-100%)` over `0.5s expo.out`, threshold 12px).
- When Contact (cream) section is under the nav, nav text colours flip to ink automatically.

### 9.3 Mobile menu (< 900px)
- Right: a **two-line hamburger** (two 1px lines, 24px wide, 6px apart). On open, lines rotate into an **X** (`0.5s`).
- Opens a **full-screen overlay**, `--ink` with grain and a crimson radial glow bottom-left.
- Menu links are **huge** Fraunces 800 (`clamp(3rem, 12vw, 6rem)`), stacked, each preceded by a mono index `01`…`08`. They **reveal with a mask slide-up stagger** (`0.07s` per item, `0.9s`, `expo.out`).
- Bottom row: socials as mono links + email.
- Closing: items slide down & overlay fades `0.5s`.

---

## 10. SECTION 01 — HOME (HERO)

`id="home"` · `data-bg="grad-void"` · min-height `100svh`.

### 10.1 Layout
Full-viewport, asymmetric, left-aligned. Content block anchored to the **bottom-left** with generous top space. Right side holds an interactive visual (10.5).

### 10.2 Copy (exact)
- **Top-left mono kicker** (reveals first): `● AVAILABLE FOR FREELANCE — 2026` — the dot is a **pulsing green-free** indicator: use **crimson** dot, pulsing (`scale 1→1.8`, `opacity 1→0`, `1.6s`, infinite).
- **Name (Fraunces, `--fs-mega`)**, three stacked lines with masked reveal:
  - Line 1: `PRAKHAR` — Fraunces 300, bone.
  - Line 2: `KAUSHIK` — Fraunces 800, bone, with the **K** in crimson.
  - Line 3 (smaller, Instrument Serif italic, `--fs-h2`, crimson): `a.k.a. VishRim`
- **Role line** (Manrope `--fs-lead`, bone-dim, max `38ch`): `I design and build frontends that feel expensive — and teach the next generation to code.`
- **Meta row** (mono caps 12px, three items separated by sparkle dividers): `NEW DELHI, IN` · `FRONTEND DEV` · `EDUCATOR`
- **CTA group:**
  1. Primary `MagneticButton`: **"See my work"** + arrow-down icon → smooth-scrolls to `#projects`. Style: pill, crimson fill, ink text, 56px tall, padding `0 32px`. Hover: fill slides from bottom to bone, text ink; arrow bobs.
  2. Secondary: **"Download CV"** ghost pill (hairline bone border). Hover: border becomes crimson, text crimson. If `resumeUrl` is TODO, render disabled with tooltip "CV coming soon".
- **Bottom-right scroll cue:** a vertical mono text `SCROLL` rotated `-90deg` with a 60px line beneath that animates `scaleY 0→1→0` on loop (`2s`).

### 10.3 Hero name interactivity
- **Per-letter magnetic repel**: characters of the name subtly move away from the cursor within a 140px radius (max displacement 14px), springing back with `power3.out`.
- **Variable-font weight reaction**: as the cursor moves horizontally across the name, each letter's Fraunces weight interpolates between `300 ↔ 800` based on distance to the cursor (closer = heavier). Use `font-variation-settings: "wght" X`.
- On touch devices, replace with a gentle auto-oscillation (weight wave, `4s` loop).

### 10.4 Ambient background in hero
- Faint **star field**: ~40 tiny sparkles (2–6px) scattered, each twinkling with random `opacity 0.2↔0.9` over `2–5s`, a few in crimson. Positions fixed at build time (seeded), parallax-drifting at `0.03–0.12` of scroll speed.
- A **huge soft crimson radial glow** (`60vw`, blur 120px, opacity 0.18) following the cursor with `lerp 0.05` (very laggy, atmospheric).
- A **thin orbit arc SVG** (echoing the logo's swoosh) across the hero, crimson 1px, slowly rotating `360deg / 60s`.

### 10.5 Right-side interactive element: "THE K"
An oversized **red K starburst** (the logo mark SVG), `~38vw` wide, partially cropped off the right edge, `opacity: 0.9`.
- Idle: slow `rotate ±3deg` sway (`8s`, sine, yoyo).
- On mouse move: tilts in 3D toward the cursor (`rotateX/rotateY` ±10deg, `perspective: 1200px`), and its **spikes elongate** slightly (`scaleX` of the long spike path 1 → 1.06).
- On click: emits a **burst of 12 small sparkles** radiating outward that fade (`0.9s`), and the K does a quick `scale 1 → 1.08 → 1`.
- On scroll: parallax `y` at `-0.25` and rotate `0 → 18deg` over hero scroll range.

### 10.6 Scroll-out
As the hero leaves, the name lines slide **up at different speeds** (line 1: `-12%`, line 2: `-20%`, line 3: `-30%`), opacity to 0.4, and the K scales to 1.15.

### 10.7 Optional enhancement (only if all else is done)
A `canvas` ink-splatter that trails the cursor in black/crimson on the cream-free dark surface, fading in 1.2s. Skip on mobile.

### 10.8 Hero entrance (after preloader)
Staggered timeline, starting at `3.4s`: kicker (`0.0s`) → name line 1 chars (`0.1s`) → line 2 (`0.28s`) → line 3 (`0.46s`) → role line (`0.7s`, y 30→0, opacity) → meta row (`0.85s`) → CTAs (`1.0s`, scale `0.9→1` + opacity) → the K fades/scales in from `0.7` (`0.2s`, `1.6s`, `expo.out`) → star field fades in (`1.2s`).

---

## 11. SECTION 02 — MARQUEE STRIP

Immediately under the hero, full-bleed band (height `120px`), top and bottom hairlines.
- **Two rows** scrolling in **opposite directions** (row 1 → left at 60px/s; row 2 → right at 45px/s).
- Row 1 text (Fraunces 800, `clamp(2rem,5vw,4.5rem)`, bone, with sparkle separators in crimson):
  `FRONTEND DEVELOPMENT ✦ UI/UX DESIGN ✦ REACT ✦ INTERACTIVE WEB ✦ EDUCATION ✦ IoT TINKERING ✦`
- Row 2 text (Fraunces 300 italic **outline only**, `-webkit-text-stroke: 1px bone`, transparent fill):
  `PRIKAUSHION ✦ BUILT IN NEW DELHI ✦ OPEN FOR PROJECTS ✦ PRIKAUSHION ✦`
- **Scroll-velocity reaction:** marquee speed multiplies by `1 + |scrollVelocity| * 0.02` (clamped to 4×) and **direction flips** when scroll direction reverses.
- **Hover:** the hovered row pauses; characters under the cursor swap to crimson.

---

## 12. SECTION 03 — ABOUT ME

`id="about"` · `data-bg="grad-ember-haze"` · glow at top-left.

### 12.1 SectionHeader
Meta: `(01)` · `ABOUT ME`. Title: `The person` / `behind the *pixels*`. Ghost word: `ABOUT`.

### 12.2 Layout (desktop)
12-col grid. **Left (cols 1–5):** portrait (Section 1.2) sticky (`position: sticky; top: 12vh`). **Right (cols 7–12):** scrolling text column. Mobile: portrait on top (arched), text below.

### 12.3 Copy (exact, in order)
1. **Lead paragraph** (Fraunces 300, `--fs-h3`, bone, line-height 1.25; the words *builder*, *educator*, and *iconic* are Instrument Serif italic crimson):
   > "I'm Prakhar — a *builder* and *educator* from New Delhi, obsessed with making the web feel crafted, not generated."
2. **Body paragraph 1** (Manrope body, bone-dim):
   > "I'm a diploma student in Computer Science Engineering at Amity University, Greater Noida, and I spend most of my days building frontend web applications — from student housing platforms and finance tools to hackathon websites and AI products. Everything I make starts with one question: *would someone pay for this because of how it feels?*"
3. **Body paragraph 2:**
   > "Alongside building, I teach. I've taught AI, coding, Scratch and prompt engineering to students from Grade 1 to 8, because the best way to understand something is to make a child understand it too."
4. **Body paragraph 3:**
   > "I also tinker with hardware — ESP32 boards, sensors, a desktop AI companion robot — because the web is only half the world. Under **prikaushion**, my umbrella brand, I take on freelance work, build products, and slowly turn ideas into companies."
5. **Pull-quote** (Instrument Serif italic, `--fs-h2`, crimson, with a hairline above and a sparkle):
   > "Classy over loud. Crafted over fast."

### 12.4 Stats row (animated counters)
Four stat blocks in a row (2×2 on mobile), each with mono label under a big Fraunces number, hairline separators. Numbers **count up** on enter (`2s`, `power2.out`, tabular numerals):
| Number | Label |
|---|---|
| `10+` | `PROJECTS SHIPPED` |
| `1–8` | `GRADES TAUGHT` |
| `4+` | `CLIENT & EVENT SITES` |
| `2026` | `YEAR I WENT FULL BUILDER` |
*(The agent must keep these exact labels. If the owner edits numbers, they edit them in `site.ts`.)*

### 12.5 Facts list ("Quick facts") — mono rows with hairlines
```
BASED IN ........ New Delhi, India
STUDYING ........ Diploma in CSE · Amity University, Greater Noida
LANGUAGES ....... English · Hindi · Learning Japanese & Spanish
CLUBS ........... Aegis (core) · Aarohan (cultural)
WORK STYLE ...... Flexible with any routine or shift
ALIAS ........... VishRim
```
Rows reveal sequentially (`0.08s` stagger, `x -20 → 0`, opacity). Dots between label and value are an animated dotted leader that **extends** on reveal.

### 12.6 Portrait interactions (details)
- **Arched frame** with the echo frame offset (Section 1.2).
- **Parallax inside the frame:** image `scale 1.15` and moves `y: -6% → 6%` across the scroll range so it feels like looking through a window.
- **Hover:** red multiply tint fades in (`0.5s`), image `scale → 1.2`, and the cursor ring becomes `[data-cursor="view"]`-style with text **"HI 👋"** → **do not use emoji** → use text **"HELLO"**.
- **Mouse tilt:** the whole frame tilts ±5deg toward the cursor (`perspective 1000px`).
- **Rotating stamp badge** bottom-right: SVG circular text path, `FARAWAY · INTERNATIONAL HACKATHON · ROUND 2 · AUG 2026 ·`, mono 9px caps, bone, rotating `360deg / 20s linear infinite`; slows to a stop on hover; centre holds the crimson sparkle. Stamp is `120px` (desktop), `88px` (mobile).
- **Reveal on enter:** a **clip-path wipe** — `inset(100% 0 0 0)` → `inset(0 0 0 0)` over `1.4s expo.inOut` — while the image counter-scales `1.4 → 1.15`.
- **Caption** under portrait (mono 11px, bone-dim): `FIG. 01 — PRAKHAR, FARAWAY INTERNATIONAL HACKATHON, ROUND 2.`

### 12.7 Gradient & scroll feel
As About scrolls, the **glow drifts** from top-left to centre; the paragraphs have **scroll-linked opacity** — each paragraph is `0.25` opacity until it crosses the viewport centre, then animates to `1` (`scrub`), creating a reading-focus effect.

---

## 13. SECTION 04 — WORK / EXPERIENCE

`id="work"` · `data-bg="grad-smoke"`.

### 13.1 SectionHeader
Meta: `(02)` · `WORK & EXPERIENCE`. Title: `Where I've` / `put in the *hours*`. Ghost word: `WORK`.

### 13.2 Layout: vertical interactive timeline
- Left: a **1px vertical line** running the full height of the list. A **crimson fill line** grows downward with scroll (`scaleY` scrubbed to section progress).
- Each entry is a row: **left column** (cols 1–3) holds mono date + location; **right column** (cols 4–12) holds role, org, description, tags.
- Each entry has a **node** on the line: a 12px circle. Inactive = hollow bone-faint; as the crimson line passes it, it **fills crimson** with a ripple ring (`scale 1→2.4`, `opacity .6→0`, `0.9s`).
- **Hover on a row:** all other rows dim to `0.35` opacity (`0.4s`), the hovered row's title shifts `x +12px` and a **spotlight radial gradient** follows the cursor inside the row; arrow icon slides in on the right.

### 13.3 Entries (exact data → `/src/config/experience.ts`)

| # | Date | Role | Organisation / Place | Description | Tags |
|---|---|---|---|---|---|
| 1 | `Aug – Nov 2026` | **Website Developer & Core Organiser** | Hacks 2026 — hosted by NARI | `Built the official hackathon website (thehacks.in) and am organising the event on 22 Nov 2026 — managing crowd flow and handling participant queries as a core organiser.` | `React` `Vite` `Tailwind` `Event Ops` |
| 2 | `31 Aug – 11 Oct 2026` | **Internship — Web & AI Projects** | Amity Polytechnic, AUGN Campus | `Six-week internship delivering four projects — Finculator, VipraPulse (AI brand-intelligence), an event-hosting platform, and an Indian-meal calorie tracker.` | `Python` `FastAPI` `React` `AI` |
| 3 | `28 May – 28 Jun 2026` | **STEM Educator (AI & Coding)** | Vision Sports School & Vision Basketball India | `Taught AI, coding, Scratch and prompt engineering to students from Grade 1 to 8 as a summer intern. Certificate available on LinkedIn.` | `Teaching` `AI` `Scratch` `Prompt Eng.` |
| 4 | `2026` | **Freelance Web Developer** | Joyra (gifting) · Radix Aroma (essential oils) · Local clients | `Designed and built websites for local businesses — a gifting store and an essential-oils brand — from brand-matched UI to launch.` | `Freelance` `UI/UX` `Branding` |
| 5 | `30 Aug – 2 Sep 2025` | **Head Volunteer** | Technoxian World Cup 9.0 · AICRA · Noida Stadium Complex | `Led on-ground event operations at an international robotics and AI championship.` | `Events` `Leadership` |
| 6 | `20 May – 4 Jun 2024` | **Python & AI Summer Camp** | Rancho Labs × IIT Delhi IHFC | `Completed an intensive Python and AI summer programme in collaboration with IIT Delhi's IHFC.` | `Python` `AI` |

### 13.4 Entry reveal animation
Each row on enter: date slides from `x -30`, role title performs the **line-mask reveal** (`yPercent 100→0`, `1s`, `expo.out`), description fades up (`y 20→0`, `0.8s`, delay `0.15s`), tags pop in with `0.05s` stagger (`scale 0.8→1`, `opacity`).

---

## 14. SECTION 05 — PROJECTS

`id="projects"` · `data-bg="grad-oxblood-deep"` · The visual centrepiece. Every project **must** have visible, working **Live** and **Code** buttons.

### 14.1 SectionHeader
Meta: `(03)` · `SELECTED WORK`. Title: `Selected` / `*work*, shipped`. Ghost word: `PROJECTS`. Intro line: `Every project below is live. Open it, click around, break it — then tell me what you'd improve.`

### 14.2 Layout — two tiers

**Tier A: Featured projects (first 4) — "Sticky stack" scroll.**
- Section pins; cards are **full-width, ~78vh tall**, stacked with `position: sticky; top: 12vh`. As the next card scrolls up it covers the previous, which **scales down to `0.94`**, **dims to `0.5` brightness**, and shifts up `-3vh` (scrub). Card `z-index` increments.
- Card layout (desktop): left 40% = text, right 60% = preview.

**Tier B: More projects — "List-hover" rows.**
- Remaining projects appear as a **minimalist table list**: big index number, project name (Fraunces 800, `--fs-h2`), mono category, year, and two inline buttons.
- On row hover: a **floating preview image** (240×160, arched corner) follows the cursor with lerp `0.12`, slightly rotating by movement direction (`±6deg`); row background gains a crimson-to-transparent wash from the left (`--grad-crimson-flood` at 12% opacity); the title shifts `x +16px`.

### 14.3 Project data (exact → `/src/config/projects.ts`)

Schema:
```ts
type Project = {
  slug: string; index: string; title: string; category: string; year: string;
  tagline: string; description: string; stack: string[];
  liveUrl: string; repoUrl: string; featured: boolean;
  accent?: string; // optional per-card glow colour (must stay within the red/black/bone family unless the project's own brand colour is shown only as a tiny chip)
};
```

Pre-filled list (**`liveUrl`/`repoUrl` use `TODO_…` unless known; all projects are already hosted, the owner will paste the links — render the buttons regardless and make TODO links disabled-with-tooltip**; base GitHub profile is `https://github.com/prakharrai12`):

| Idx | slug | Title | Category | Year | Tagline | Description | Stack | Featured |
|---|---|---|---|---|---|---|---|---|
| 01 | `hacks-2026` | **Hacks 2026 — NARI Hackathon** | Event Website | 2026 | `The official home of NARI's flagship hackathon.` | `A poster-matched, high-contrast event site covering themes, mentors, prize pool of ₹1 lakh+ and pre-placement offers, with registration routed through Unstop. Live at thehacks.in.` | `React` `Vite` `Tailwind` | ✅ live: `https://thehacks.in` |
| 02 | `vipra-pulse` | **VipraPulse** | AI Product | 2026 | `Brand intelligence from what customers actually say.` | `An AI marketing assistant that reads reviews and Reddit mentions and answers grounded questions via RAG — comparing real customer sentiment against a brand's own claims.` | `React` `Vite` `FastAPI` `RAG` `Sentiment` | ✅ |
| 03 | `finculator` | **Finculator** | Web App | 2026 | `Finance maths, made friendly.` | `A production-minded finance calculator web app, hardened against the OWASP-style checklist (auth, input sanitisation, headers, rate limiting) and deployed on Cloudflare Pages.` | `React` `Cloudflare Pages` `Security` | ✅ |
| 04 | `radix-aroma` | **Radix Aroma** | Brand Website | 2026 | `Nature's Tributary — essential oils & contract farming.` | `A classic, brand-matched site for an essential-oils label and a contract-farming marketplace with a Sell/Buy model for farmers and buyers across India. Launch oils: Lemongrass, Vetiver, Basil, Citronella, Jojoba.` | `Next.js` `Tailwind` `Branding` | ✅ |
| 05 | `nooq` | **nooq** | Platform | 2026 | `Student housing, designed properly.` | `A comprehensive React student-housing platform with a deep indigo UI system and full multi-page interactivity.` | `React` `UI/UX` | ❌ |
| 06 | `amisphere` | **Amisphere** | College Website | 2026 | `The college site, rebuilt.` | `An improved, security-hardened and fully polished re-imagining of the official college website.` | `React` `Security` `UX` | ❌ |
| 07 | `desical` | **DesiCal** | Mobile App | 2026 | `An Indian food calorie tracker that knows dal from dosa.` | `A Python/Flet calorie tracker with a pre-loaded Indian food database — scan, search or choose — installable as a mobile app.` | `Python` `Flet` | ❌ |
| 08 | `nova` | **NOVA** | Hardware + AI | 2026 | `A desktop AI companion robot.` | `ESP32-S3 body with a TFT face, pan/tilt servos, touch, mic and speaker; a local Ollama (qwen2.5:3b) brain and a desktop app called NOVA AI Studio.` | `ESP32-S3` `Ollama` `Python` | ❌ |
| 09 | `access-control` | **P4-EYE Access Control** | IoT | 2026 | `Multi-factor access, face + Morse.` | `An ESP32-P4-EYE access system combining face recognition with a dynamic challenge-response second factor, PIR wake and servo/relay actuation, with a web simulator demo.` | `ESP32-P4` `IoT` `React` | ❌ |
| 10 | `joyra` | **Joyra** | E-commerce Site | 2026 | `Gifting, but make it effortless.` | `A client website for a gifting brand.` | `Web` `UI` | ❌ |
| 11 | `akansha-demo` | **Wellness Creator Site** | Demo Website | 2026 | `Booking, media kit and home — one file.` | `A single-file HTML demo site for a psychology and wellness creator, with booking, media kit and home pages, in a deep blue and yellow scheme.` | `HTML` `CSS` `JS` | ❌ |

> The agent must render **all 11** entries. Order = table order. Items 01–04 → Tier A (sticky stack). Items 05–11 → Tier B (list-hover). The owner can toggle `featured` to move any project between tiers.

### 14.4 Tier A card — exact structure
**Left (text) column**
1. Top row: mono `01 / 11` (crimson) + mono category chip (hairline pill).
2. **Title** — Fraunces 800, `--fs-h2`, bone. Word-mask reveal.
3. **Tagline** — Instrument Serif italic, `--fs-h3`, bone-dim.
4. **Description** — Manrope body, bone-dim, max `44ch`.
5. **Stack chips** — mono 11px caps, hairline pill, `0.05s` stagger pop-in; hover → chip fills bone-ghost.
6. **Button row (MANDATORY):**
   - **`Live ↗`** — primary pill, crimson fill, ink text, `target="_blank" rel="noopener noreferrer"`, links to `liveUrl`. Hover: fill wipes to bone from left; the `↗` icon moves `translate(3px,-3px)`.
   - **`Code`** — ghost pill with GitHub icon (hairline), links to `repoUrl`. Hover: border crimson, icon rotates `-12deg`.
   - Both are `MagneticButton`s (strength `0.3`).
   - If a URL is `TODO_…`: button renders `aria-disabled="true"`, `opacity .4`, `cursor: not-allowed`, tooltip **"Link coming soon"**.
7. Bottom: mono `YEAR — 2026`.

**Right (preview) column**
- Rounded `--r-lg` panel with hairline border. Contents:
  - **Primary:** a screenshot of the live site at `/public/assets/projects/<slug>.webp`. **The agent must capture screenshots of each hosted project** (headless browser at 1440×900) and save them there. If the capture is unavailable, render a **generated cover**: ink background, giant outlined initials of the project (Fraunces 800, `-webkit-text-stroke`), the sparkle, and a faint crimson radial — never a blank box.
  - **Browser chrome** strip on top: three 8px dots (bone-faint), a URL pill showing the live domain in mono.
  - **Mouse-follow spotlight**: radial gradient (`300px`, `rgba(244,239,228,0.10)`) following the cursor within the card.
  - **3D tilt**: ±6deg, `perspective 1200px`; shine layer moves opposite.
  - **Cursor** over the panel: `[data-cursor="view"]` ring "VIEW"; **clicking the panel opens `liveUrl`**.
  - **Hover**: screenshot slowly **auto-scrolls vertically** (CSS `object-position` from `top` to `bottom` over `6s linear`), emulating a page scroll; reverses on leave.

### 14.5 Tier B row — exact structure
Columns: `index` · `Title (big)` · `category` · `year` · `[ Live ↗ ] [ Code ]`. Same button rules as above, but compact (40px tall). Whole row is also keyboard-focusable and triggers the floating preview on focus. Mobile: rows stack — title on top, mono meta beneath, buttons full-width side by side.

### 14.6 "See all on GitHub" closer
Below Tier B: a giant link row — `See every repository on GitHub ↗` (Fraunces 800, `--fs-h2`) → `https://github.com/prakharrai12`. On hover the text **fills left→right with crimson** via `background-clip: text` gradient sweep, and a sparkle follows the cursor. Cursor state: `open`.

### 14.7 Optional filters
A mono filter bar above Tier B: `ALL · WEB · AI · HARDWARE · CLIENT`. Clicking **FLIP-animates** (GSAP Flip) rows in/out; active filter has a crimson underline that slides between options (`0.5s expo.out`).

---

## 15. SECTION 06 — SERVICES (prikaushion)

`id="services"` · `data-bg="grad-wine-spot"` · crimson spotlight on the right.

### 15.1 SectionHeader
Meta: `(04)` · `PRIKAUSHION STUDIO`. Title: `What prikaushion` / `can *build* for you`. Ghost word: `SERVICES`. Intro: `prikaushion is my umbrella — web, apps, and finance tools — built for businesses that deserve better than a template.`

### 15.2 Layout: horizontal pinned scroll
Section **pins** while the user scrolls vertically; a horizontal track of **4 large panels** (each `70vw` × `62vh`, gap `4vw`) translates `x` from `0` to `-(trackWidth - viewport)` (scrub 1). A mono progress counter `01/04` updates; a crimson progress line fills below.

### 15.3 Panels (exact copy)
| # | Title | Copy | Deliverables (bullets in mono) |
|---|---|---|---|
| 01 | **Websites for local business** | `Most nearby businesses have no website — or a weak one. I build fast, brand-matched sites that make them look as good online as they are in person.` | `Brand-matched design` · `Mobile-first build` · `SEO basics` · `Launch support` |
| 02 | **Web apps & dashboards** | `From calculators to full platforms — React frontends, clean APIs, secure by default.` | `React / Vite` · `API integration` · `Auth & security pass` · `Deployment` |
| 03 | **AI-powered products** | `RAG assistants, sentiment tools and smart automations that turn raw data into decisions.` | `RAG pipelines` · `FastAPI backends` · `Prompt engineering` · `Evaluation` |
| 04 | **Workshops & teaching** | `Hands-on AI, coding and prompt-engineering sessions for schools and student groups, ages 6 to 16.` | `Lesson plans` · `Live sessions` · `Student projects` · `Certificates` |

Each panel: huge Fraunces number (`--fs-mega`, outline only, 1px bone-ghost) behind the title; a **crimson corner bracket** (L-shaped hairlines) at top-left and bottom-right that **expands** (`scale 0.6→1`) on hover; the panel **tilts** and the whole track subtly **skews** by scroll velocity (`skewX ±4deg`).

### 15.4 CTA at the end of the track
A final slim panel: `Have a business that needs a better front door?` (Fraunces 300) + `Let's talk →` magnetic pill linking to `#contact`.

---

## 16. SECTION 07 — TOOLKIT / SKILLS

`id="toolkit"` · `data-bg="grad-void"`.

### 16.1 SectionHeader
Meta: `(05)` · `TOOLKIT`. Title: `The tools` / `of the *trade*`. Ghost word: `TOOLKIT`.

### 16.2 Layout: "constellation" + grouped lists
**Left:** an interactive **canvas/SVG constellation** (≈ 520px square, hidden < 900px or replaced by a static list): skills as **nodes** (small circles) connected by hairline edges into a star-map echoing the logo's sparkles. Node colour: bone; core skills crimson. Hovering a node enlarges it (`scale 1.8`), highlights its connected edges in crimson, and shows a mono label. Nodes **gently float** (Perlin drift, ±6px) and are **pushed away** by the cursor (radius 120px).
**Right:** grouped lists with hairline separators:

| Group | Items |
|---|---|
| **Frontend** | `React` · `TypeScript` · `Vite` · `Tailwind CSS` · `HTML/CSS/JS` · `GSAP` · `Framer Motion` |
| **Backend & Data** | `Python` · `FastAPI` · `REST APIs` |
| **AI** | `RAG` · `Sentiment analysis` · `Prompt engineering` · `Ollama (local LLMs)` |
| **Embedded / IoT** | `ESP32-S3` · `ESP32-P4` · `Sensors & servos` |
| **Workflow** | `Google Antigravity` · `Git & GitHub` · `Cloudflare Pages` · `Excel (intermediate)` |
| **Languages** | `English — intermediate–advanced` · `Hindi — advanced` · `Japanese — learning` · `Spanish — learning` |

Each item is a line: name left (Manrope 600), a **skill bar** right (2px hairline, crimson fill) — **only for Frontend, Backend and AI groups** — filling to the value on enter (`1.4s expo.out`, staggered): React 90, TypeScript 70, Vite 85, Tailwind 90, HTML/CSS/JS 92, GSAP 75, Framer Motion 70, Python 78, FastAPI 70, REST 75, RAG 65, Sentiment 60, Prompt Eng 88, Ollama 60. (Owner may edit in `skills.ts`.) Group headings: mono caps, crimson index.

Hovering an item **highlights the matching constellation node** and vice-versa (bi-directional hover linking).

---

## 17. SECTION 08 — EDUCATION & CLUBS

`id="education"` · `data-bg="grad-smoke"` · glow bottom-right.

### 17.1 SectionHeader
Meta: `(06)` · `EDUCATION`. Title: `Always` / `*learning*`. Ghost word: `LEARN`.

### 17.2 Layout: two "index card" columns
**Card 1 — Academics**
- `Diploma in Computer Science Engineering` (Fraunces 800, `--fs-h3`)
- `Amity University, Greater Noida Campus` (Manrope)
- Mono: `SEP 2024 — MAY 2027` · `5TH SEMESTER` · `CGPA 7.43 (SO FAR)`
- A **CGPA ring**: SVG circle, stroke crimson, `stroke-dashoffset` animating to `7.43/10` (`1.6s expo.out`), number counts inside in Fraunces.

**Card 2 — Clubs & Roles**
- `Aegis` — `Core member · Student coordinator for events`
- `Aarohan` — `Member · Cultural club`
(Each as a hover-reveal row with hairlines; the hovered row's icon (sparkle) rotates 180°.)

**Card 3 (wide, below) — Courses & Certificates**
- `Python & AI Summer Camp — Rancho Labs × IIT Delhi IHFC (2024)`
- `STEM Educator Internship Certificate — Vision Sports School (2026)`
- `NTCC Internship-I (PTCHIN101) — Amity Polytechnic (2026)`

Cards **lift** on hover (`y -8`, hairline brightens, soft crimson under-glow). On enter, cards **stagger-rise** with `rotateX 12 → 0` and `y 60 → 0` (`1.1s expo.out`, `0.15s` stagger).

---

## 18. SECTION 09 — SOCIALS (COLOUR-TRANSITION, FULLY INTERACTIVE)

`id="socials"` · `data-bg="grad-void"` · This section is built around **colour transitions on hover** — the "wow" moment.

### 18.1 SectionHeader
Meta: `(07)` · `SOCIALS`. Title: `Find me` / `*elsewhere*`. Ghost word: `SOCIAL`. Intro: `Four places I actually show up. Pick one.`

### 18.2 Layout: giant interactive rows
Four **full-width rows**, each ~`22vh` tall (min 140px), separated by hairlines, stacked vertically.

Each row contains, left→right:
1. Mono index `01`…`04`.
2. **Platform name** in Fraunces 800, `clamp(3.5rem, 11vw, 11rem)`, bone, tracking `-0.04em`.
3. Right-aligned: mono handle (e.g. `@prakharrai12`), then a **circular arrow button** (56px, hairline) with `↗`.

| # | Platform | Handle shown | URL source | Flood colours (hover) |
|---|---|---|---|---|
| 01 | **GitHub** | `@prakharrai12` | `site.socials.github.url` | `#0D1117 → #30363D → #F4EFE4` (monochrome silver flood) |
| 02 | **LinkedIn** | `Prakhar Kaushik` | `site.socials.linkedin.url` | `#0A66C2 → #004182` (LinkedIn blue — **allowed here only**) |
| 03 | **Instagram** | `@your_handle` | `site.socials.instagram.url` | `#F58529 → #DD2A7B → #8134AF → #515BD4` (Instagram gradient — **allowed here only**) |
| 04 | **Email** | `prakhar1532006@gmail.com` | `mailto:` | `--grad-crimson-flood` (brand crimson) |

> The brand-colour exception applies **only** to the hover flood on this section. Outside hover these rows are pure black/bone.

### 18.3 The colour-flood hover (exact mechanics)
1. Each row has an absolutely-positioned **flood layer** (`inset:0`) with the platform's gradient, using `clip-path: circle(0% at var(--mx) var(--my))`.
2. `--mx`/`--my` are set on `pointerenter` to the **entry point of the cursor** (relative to the row) so the colour **expands out of where you touched it**.
3. On hover: animate `clip-path` to `circle(150% at var(--mx) var(--my))` over `0.7s`, `cubic-bezier(0.76, 0, 0.24, 1)`.
4. On `pointerleave`: update `--mx/--my` to the **exit point** and collapse `circle(150%…) → circle(0%…)` over `0.55s` — colour retreats toward where you left.
5. During flood: platform name colour transitions to the contrasting colour (`--ink` on GitHub silver/crimson; `#fff` on LinkedIn/Instagram) over `0.4s`; hairline brightens; handle text slides `x -8px`; arrow button fills bone with ink arrow and **rotates 45° → 0**.
6. **Page-level echo:** while a row is hovered, the **global background journey layer** receives a tinted radial glow in the platform colour at 18% opacity, centred at the row — the whole page subtly shifts hue, returning to black on leave (`0.8s`).
7. **Floating preview card** follows the cursor (lerp `0.14`): a 220×140 mini card showing the platform icon (large, 1.5 stroke SVG), the handle, and a mono line (`GITHUB — 11 REPOS · OPEN SOURCE`, `LINKEDIN — LET'S CONNECT`, `INSTAGRAM — BEHIND THE BUILDS`, `EMAIL — REPLY WITHIN 24H`). Fades/scale-in on enter (`0.3s`). Hidden on touch.
8. **Cursor** = `[data-cursor="open"]` ("OPEN ↗").
9. **Click:** a **ripple** of the platform colour expands from the click point filling the viewport for `0.45s` *just before* opening the link in a new tab (`target="_blank" rel="noopener noreferrer"`); then the ripple recedes. For `mailto:` do not ripple-block — just fire.
10. **Touch devices (no hover):** rows flood automatically when they enter the viewport centre (`ScrollTrigger`, toggle actions), one at a time, and tapping opens the link.
11. **Keyboard:** rows are focusable; focus triggers the same flood from the centre; Enter opens the link.

### 18.4 Magnetic social dock (below the rows)
A small row of **4 circular icon buttons** (64px, hairline) with magnetic pull (`strength 0.45`), each icon redrawn as a 1.5px stroke SVG. Hover: circle fills with the platform's colour (instant for icons, `0.3s`), icon turns white/ink, tooltip appears above (mono). These are for quick access / mobile.

### 18.5 Section-in transition
As Socials enters, the previous (smoke grey) background **melts to pure black** while a **single crimson sparkle** large (`40vw`, opacity 0.05) slowly rotates behind the rows.

---

## 19. SECTION 10 — CONTACT

`id="contact"` · `data-bg="grad-paper"` — **the inversion to cream paper (see 7.4).**

### 19.1 SectionHeader (ink on paper)
Meta: `(08)` · `CONTACT`. Title: `Let's make` / `something *iconic*`. Ghost word: `HELLO`. (Title in `--paper-ink`; italic word in crimson; ghost outline in `rgba(10,10,11,0.07)`.)

### 19.2 Layout
Two columns. **Left:** big pitch + direct links. **Right:** the contact form.

**Left copy (exact):**
- Lead (Fraunces 300, `--fs-h3`, ink): `Got a business without a proper website? A project that deserves better design? A workshop for your school? Tell me about it.`
- Mono details list:
  ```
  EMAIL ......... prakhar1532006@gmail.com
  STUDIO ........ prikaushionv@gmail.com
  BASED IN ...... New Delhi, India
  RESPONSE ...... Within 24 hours
  ```
  (Do **not** show any phone number.) Each email is a copy-to-clipboard link: click → text swaps to `COPIED ✓` for 1.6s and a **crimson underline** sweeps.
- A **giant "Say hello" circular button** (180px, crimson fill, ink text, sparkle orbiting) that opens `mailto:prakhar1532006@gmail.com`; magnetic (`0.5`); its text rotates in a circle on hover.

**Right: form** (fields; use `Formspree`/`mailto` fallback — implement as `mailto:` composition by default so no backend is needed; leave an `onSubmit` hook comment for Formspree):
1. `Your name` (text)
2. `Email` (email)
3. `What are you building?` (select chips: `Website` · `Web app` · `AI product` · `Workshop` · `Something else`) — chip multi-select, selected chips fill ink with paper text.
4. `Tell me more` (textarea)
5. Submit: **"Send it"** pill (ink fill, paper text) with arrow.

**Field styling:** no boxes — only a **bottom hairline** (`1px`, ink 22%). Labels are mono caps and **float up** on focus. On focus, a **crimson line draws** under the field left→right (`0.5s`). Validation errors: mono red text slides down; field underline turns crimson and **shakes** (`x ±6px`, `0.4s`).
Submit success: form content **dissolves** and is replaced by `Message ready — your mail app just opened.` with a crimson sparkle spinning in.

### 19.3 Contact reveal
As the paper background tweens in, left-column elements slide `y 40→0` staggered; form fields rise one by one (`0.08s`); the "Say hello" button **scales from 0 with an overshoot-free expo.out** (`1.2s`).

---

## 20. FOOTER

`data-bg="ink"` — page flips back to black; text colours revert to bone.

### 20.1 Content
1. **Giant wordmark** across full width: `prikaushion` in Fraunces 800, `clamp(5rem, 22vw, 24rem)`, bone, tracking `-0.05em`; the **K in crimson**. On scroll into view, letters **rise from below** with a stagger; on hover, each letter lifts `y -2vw` with spring-less `power3.out` as the cursor passes (a "piano" effect).
2. **Top row:** nav links (mono) · `BACK TO TOP ↑` (magnetic, scrolls to top with Lenis `duration 2`).
3. **Middle row:** the orbit arc divider; sparkle.
4. **Bottom row (mono 11px):** `© 2026 PRAKHAR KAUSHIK / PRIKAUSHION` · `DESIGNED & BUILT IN NEW DELHI` · `LOCAL TIME — [live clock IST]` (updates every second, tabular nums).
5. A small **"Built with taste"** easter egg: clicking the K in the wordmark triggers the sparkle-burst (as in 10.5) and a one-time mono toast `YOU FOUND THE K.`

---

## 21. MOTION LIBRARY (every animation defined)

**Easings (define as constants in `/src/lib/ease.ts`):**
```
expoOut:   "expo.out"                  / cubic-bezier(0.16, 1, 0.3, 1)
expoInOut: "expo.inOut"                / cubic-bezier(0.87, 0, 0.13, 1)
quartOut:  "power4.out"                / cubic-bezier(0.25, 1, 0.5, 1)
smooth:    cubic-bezier(0.22, 1, 0.36, 1)
flood:     cubic-bezier(0.76, 0, 0.24, 1)
```
**Durations:** micro `0.2–0.35s`, UI `0.4–0.7s`, reveal `0.9–1.4s`, ambient loops `6–60s`.

| Name | Used for | Definition |
|---|---|---|
| `charReveal` | All section titles | chars `y 110%, rotZ 4deg, op 0 → 0, 0, 1`; `1.1s`; `expoOut`; stagger `0.025` |
| `lineMask` | Role/titles in lists | wrapper `overflow:hidden`; inner `yPercent 100 → 0`; `1s`; `expoOut` |
| `fadeUp` | Paragraphs | `y 24 → 0`, `op 0 → 1`; `0.9s`; `power3.out` |
| `clipWipe` | Images | `clip-path inset(100% 0 0 0) → inset(0)`; `1.4s`; `expoInOut` |
| `rulesDraw` | Hairlines | `scaleX 0 → 1`, origin left; `1.4s`; `expoInOut` |
| `ghostParallax` | Ghost words | `x +8vw → -8vw`; scrub 1 |
| `counterUp` | Stats | `0 → N`; `2s`; `power2.out` |
| `barFill` | Skill bars | `scaleX 0 → v`; `1.4s`; `expoOut`; stagger `0.06` |
| `magnetic` | Buttons | pointer within 1.4× radius pulls element by `strength × delta`; release `0.6s` elastic-free `power3.out` |
| `tilt` | Cards | `rotateX/Y ±6deg` on pointer; reset `0.8s` `power3.out` |
| `spotlight` | Cards/rows | CSS var `--mx/--my` → `radial-gradient(260px at var(--mx) var(--my), rgba(244,239,228,.10), transparent 70%)` |
| `flood` | Socials | `clip-path circle()` expansion — see 18.3 |
| `sparkleBurst` | K click, footer | 12 sparkles; radial angle `i*30°`; distance `60–140px`; `scale 0.4 → 1 → 0`; `0.9s`; `power2.out` |
| `velocitySkew` | Services track, marquee | `skewX = clamp(velocity*0.02, -4, 4)deg` |
| `bgJourney` | Page background | see 7.4 |
| `navHide` | Nav | `yPercent 0 ↔ -100`; `0.5s`; `expoOut` |

**Scroll triggers:** content reveals use `start: "top 82%"`, `once: true`; scrubbed effects use `scrub: 1` (never `true` — the 1s lag is the "weighty" feel); pinned sections use `anticipatePin: 1`.

---

## 22. BUILD ORDER

1. **Phase 0 — Setup:** Vite + React + TS, Tailwind, fonts (`@fontsource`), GSAP + ScrollTrigger, Lenis, Framer Motion, lucide-react. Create `/config/*`. Create design tokens in `globals.css` and Tailwind theme extension.
2. **Phase 1 — Assets:** create/derive all brand assets (Section 1.1), portrait processing (1.2), project screenshots (14.4).
3. **Phase 2 — Foundations:** grain, scroll progress, custom cursor, Lenis wiring, `BackgroundJourney` (7.4), `SectionHeader`, `SplitText`, `MagneticButton`, `Marquee`.
4. **Phase 3 — Shell:** preloader, nav (desktop + mobile), footer.
5. **Phase 4 — Sections in order:** Hero → Marquee → About → Work → Projects → Services → Toolkit → Education → Socials → Contact.
6. **Phase 5 — Section bridges** (6.2) and cross-section colour transitions (7.4).
7. **Phase 6 — Polish:** easter eggs, tooltips, empty states for TODO links, focus states, reduced-motion, mobile pass.
8. **Phase 7 — QA & performance:** Lighthouse, cross-browser, real-device touch test.
9. **Phase 8 — Deploy** to the owner's hosting target with correct `base`.

---

## 23. ACCEPTANCE CHECKLIST

**Brand & feel**
- [ ] Palette uses only ink/obsidian/charcoal/oxblood/burgundy/crimson/bone (+ social brand colours on hover in Socials only).
- [ ] No purple/blue/pink AI gradient anywhere outside the Socials hover.
- [ ] Looks classy, dark, editorial — not a template.
- [ ] Logo is used correctly (preloader on cream; derived marks elsewhere).

**Typography**
- [ ] Every section title follows 5.2 with the crimson Instrument Serif italic word.
- [ ] Fraunces variable axes are active (weight reacts on hero name).
- [ ] Mono labels everywhere for indices/meta.

**Section separation**
- [ ] Every section has the SectionHeader with meta row, drawing rule, sparkle, ghost word, title.
- [ ] Section bridges with marquee + orbit arc between sections.

**Colour journey**
- [ ] Background shifts per the 7.4 table while scrolling; glow position drifts.
- [ ] Contact inverts to cream and flips text colours; footer returns to black.

**Interactivity**
- [ ] Custom cursor states all work (default, link, view, drag, open, text).
- [ ] Magnetic buttons, tilt cards, spotlight, hover dimming on Work, bi-directional hover in Toolkit.
- [ ] Socials flood from the pointer entry point and retreat to the exit point; page-level tint echoes.
- [ ] Hero name responds to cursor; K reacts and bursts on click.

**Content**
- [ ] About has the portrait (arched, parallax, rotating stamp) and all exact copy.
- [ ] Work lists all six entries with the exact data.
- [ ] **Projects lists all 11 with working Live and Code buttons** (disabled with tooltip when URL is `TODO`).
- [ ] Socials: GitHub, LinkedIn, Instagram, Email — all from `site.ts`.
- [ ] No phone number shown anywhere.

**Quality**
- [ ] 60fps scroll on mid-range laptop; no layout shift; images lazy-loaded.
- [ ] `prefers-reduced-motion` respected.
- [ ] Mobile (360px) and tablet (768px) fully usable; touch alternatives implemented.
- [ ] Keyboard navigation + visible focus states.
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

---

## 24. PERFORMANCE, ACCESSIBILITY, RESPONSIVE, SEO

### 24.1 Performance
- Animate only `transform`, `opacity`, `clip-path`, and CSS variables; never animate `width/height/top/left`.
- `will-change: transform` only on actively animating elements, removed after.
- Images: WebP/AVIF, `srcset`, explicit `width/height`, `loading="lazy"` below the fold, blur-up placeholders.
- Fonts: self-hosted, subsetted to Latin, `font-display: swap`, preload Fraunces + Manrope.
- Code-split heavy sections (Toolkit constellation, Services horizontal track) with `React.lazy`.
- Kill all ScrollTriggers on unmount; `ScrollTrigger.refresh()` after fonts and images load.
- Cap devicePixelRatio for canvas at 2.

### 24.2 Responsive breakpoints
`360 · 480 · 768 · 900 · 1200 · 1440 · 1920`.
- `< 900px`: hide right-edge section dots, constellation, floating previews, custom cursor; Projects Tier A becomes a **vertical card list without sticky stacking** (keep tilt off); Services becomes **horizontal swipe** with scroll-snap; Socials uses auto-flood on scroll; name sizes via the fluid clamp scale; stats 2×2.
- `≥ 1920px`: constrain content to `1440px`; allow background glows and ghost words to extend.

### 24.3 Accessibility
- Semantic landmarks (`header`, `nav`, `main`, `section[aria-labelledby]`, `footer`).
- Section titles are real `h2`s; split-char spans use `aria-hidden` with a visually-hidden full text.
- All icon-only buttons have `aria-label`.
- Contrast: bone on ink ≥ 12:1; crimson `#E01B24` on ink ≈ 4.6:1 (use for large text, icons, and UI only — never for small body text).
- Disabled `TODO` links: `aria-disabled="true"` + tooltip text exposed via `aria-describedby`.
- Skip-to-content link visible on focus.
- Marquees pause on focus/hover and are `aria-hidden` with static text alternative.

### 24.4 SEO & meta
```html
<title>Prakhar Kaushik — Frontend Developer & Educator | prikaushion</title>
<meta name="description" content="Portfolio of Prakhar Kaushik (VishRim) — frontend developer, educator and founder of prikaushion. Premium websites, web apps and AI products, built in New Delhi." />
<meta property="og:title" content="Prakhar Kaushik — prikaushion" />
<meta property="og:description" content="Dark, crafted, interactive web experiences. Projects, work and ways to get in touch." />
<meta property="og:image" content="/assets/brand/og-image.png" />
<meta name="theme-color" content="#0A0A0B" />
```
Add JSON-LD `Person` schema (name, alias, jobTitle, url, sameAs = GitHub/LinkedIn/Instagram, email, address locality "New Delhi"). Add `sitemap.xml`, `robots.txt`, canonical URL.

---

## 25. THINGS YOU MUST NOT DO

- ❌ Do not use purple, teal, neon-blue or pink gradients (except inside the Socials hover flood).
- ❌ Do not use lorem ipsum or placeholder copy — every word is provided here.
- ❌ Do not invent project URLs, social handles or a phone number. Use `TODO_` placeholders and the disabled-state pattern.
- ❌ Do not use emoji as UI icons.
- ❌ Do not use a uniform card-grid layout as the main structure of Projects or Services.
- ❌ Do not use bounce/elastic easing or fast, twitchy transitions.
- ❌ Do not drop the grain, the cursor, the colour journey, the section-title formula, or the preloader.
- ❌ Do not shrink the type scale for "safety" — large confident type is the identity.
- ❌ Do not hide scroll animations on desktop to "simplify"; only degrade for `prefers-reduced-motion` and touch.
- ❌ Do not ship until every box in Section 23 is ticked.

---

### FINAL NOTE TO THE AGENT
When a detail is not specified, choose the option that is **darker, quieter, larger in type, and more restrained in colour** — then add one unexpected, tasteful interaction. The standard is: *someone opens this on a phone at 2 AM, scrolls for ten seconds, and thinks "who made this?"*# PRIKAUSHION PORTFOLIO — MASTER BUILD SPEC
### For: Google Antigravity (agentic build) · Owner: Prakhar Kaushik ("VishRim") · Brand: prikaushion

> **READ THIS FIRST, AGENT.**
> You are building a **premium, dark, sophisticated, editorial portfolio website**. It must **not** look like a typical AI-generated template. Every detail in this file is intentional. Where this file gives an exact value (hex, ms, easing, px, copy), use it **exactly**. Where it says "must", it is non-negotiable. Do not simplify, do not skip sections, do not substitute fonts, do not replace the copy with lorem ipsum.
>
> Work in the **build order in Section 22**. After each phase, run the **acceptance checklist in Section 23** for that phase before moving on.

---

## TABLE OF CONTENTS

0. Vision & the "Not AI-looking" Rules
1. Assets Provided & How to Use Them
2. Config File (fill-in values: links, handles)
3. Tech Stack & Project Structure
4. Design Tokens (Color, Gradients, Type, Spacing, Radius, Shadows, Grain)
5. Typography System (the section-heading font in depth)
6. Section Separator System (how every section is divided)
7. Global Behaviours (smooth scroll, cursor, scroll progress, background colour-journey)
8. Preloader / Intro Sequence
9. Navigation
10. Section 01 — HOME (Hero)
11. Section 02 — MARQUEE STRIP
12. Section 03 — ABOUT ME
13. Section 04 — WORK / EXPERIENCE
14. Section 05 — PROJECTS
15. Section 06 — SERVICES (prikaushion)
16. Section 07 — TOOLKIT / SKILLS
17. Section 08 — EDUCATION & CLUBS
18. Section 09 — SOCIALS (colour-transition interactive)
19. Section 10 — CONTACT
20. Footer
21. Motion Library (every animation, defined)
22. Build Order
23. Acceptance Checklist
24. Performance, Accessibility, Responsive, SEO
25. Things You Must NOT Do

---

## 0. VISION & THE "NOT AI-LOOKING" RULES

**One-line vision:** *A dark, cinematic, editorial portfolio where black ink, a single blood-red accent and warm bone-white paper-grain tones — pulled straight from the prikaushion logo — make a 20-year-old builder look like a studio.*

**Mood words:** classy · dark · sophisticated · editorial · cinematic · confident · crafted · premium · tactile · alive.

**Reference feel (do not copy, absorb):** high-end design-studio sites, fashion lookbooks, A24 film-poster typography, award-winning Awwwards-style portfolios. Slow, weighty, deliberate motion. Large type. Generous negative space. Hairline rules. One accent colour used sparingly.

### The "Not AI-looking" rules (violating any of these = fail)
1. **No purple/blue/pink "AI gradients".** The only gradient hues allowed are: black, charcoal, oxblood/burgundy, crimson, ember (deep orange-red, tiny amounts) and warm bone.
2. **No uniform three-column card grid of identical glassmorphism boxes** as the main layout of any section. Layouts must vary section to section (asymmetric, overlapping, sticky, horizontal, list-hover, etc.).
3. **No emoji as icons.** Use inline SVG (Lucide-style 1.5px stroke) or custom shapes. The only decorative glyph family is the **four-point star / sparkle** from the logo.
4. **No centred-everything layout.** Use left-aligned editorial layouts with deliberate asymmetry; centre only where the spec says so.
5. **No default system/Inter-only typography.** Use the type system in Section 5 exactly.
6. **No generic "Welcome to my portfolio" copy.** Use the copy in this file.
7. **No stock illustrations, no 3D blob shapes, no floating dashboard mockups.**
8. **No drop-shadow soup.** Depth comes from layered tone, hairline borders (`1px` at low-opacity bone) and light (radial spotlights), not from big blurry shadows.
9. **No bouncy/elastic easing on UI.** Motion is smooth, expo/quart-out, weighty.
10. **Every interactive element must have a designed hover, focus, and active state.**

---

## 1. ASSETS PROVIDED & HOW TO USE THEM

The owner has attached two images. Save them into the project exactly as below (the agent should copy the uploaded files into these paths and then create the derived versions described).

| Uploaded file | Save as | Purpose |
|---|---|---|
| Logo image (cream background, black distressed brush lettering "PRIKAUSHION", with a large **red K-shaped starburst**, orbit arcs and four-point sparkles) | `/public/assets/brand/logo-original.png` | Preloader, OG image, footer badge |
| Portrait photo (man, pink-and-white striped polo, thumbs up, olive duffel bag, standing before a "Faraway — International Hackathon — Round 2 — AUG 2026" banner) | `/public/assets/images/prakhar-portrait-original.jpg` | About Me hero image |

### 1.1 Derived brand assets the agent must create
1. `/public/assets/brand/logo-mark-k.svg` — a vector recreation of **just the red K starburst** (the large crimson K with the sharp spike going up-right and the long thin spike going down-right). Used as favicon, cursor easter egg, section-divider star, loader glyph. Colour `#E01B24`.
2. `/public/assets/brand/sparkle.svg` — a clean **four-point star** (concave diamond/sparkle). Two versions: crimson `#E01B24` and bone `#F4EFE4`. Used in dividers, marquee separators, hover effects.
3. `/public/assets/brand/logo-bone-on-transparent.png` — the logo with the cream background removed and the black lettering recoloured to bone `#F4EFE4`, keeping the red K as-is. Used on dark surfaces (nav, footer). If clean background removal is not possible, the agent must instead render the nav wordmark as live text (see Section 9) and use the original logo only on cream surfaces.
4. `/public/favicon.svg` and `/public/favicon-32.png` — the red K mark on a `#0A0A0B` rounded square.
5. `/public/assets/brand/og-image.png` — 1200×630. Left: bone-on-black logo. Right: "Prakhar Kaushik — Builder of Interfaces". Black `#0A0A0B` background with grain.

### 1.2 Portrait treatment (About Me)
The photo is a portrait (9:16-ish) with a busy banner background. Treatment rules:
1. Crop to a **4:5 portrait** centred on face and shoulders, thumbs-up hands visible. Save as `/public/assets/images/prakhar-portrait.webp` (quality 85, max width 1400px) plus a 700px version.
2. Apply a **cinematic grade in CSS** (not baked): `filter: grayscale(0.15) contrast(1.08) saturate(0.9)`.
3. Overlay a **dark-to-transparent gradient from the bottom** (`linear-gradient(to top, rgba(10,10,11,0.85), transparent 55%)`) and a **red-tinted multiply layer at 12% opacity** on hover only.
4. Frame: **arched top** (border-radius `999px 999px 0 0` at the top corners, 0 at the bottom) — a doorway/arch shape — with a 1px bone border at 18% opacity offset 14px outside the image (an "echo frame").
5. A small rotated **stamp badge** overlapping the bottom-right corner: circular text "FARAWAY · INTERNATIONAL HACKATHON · ROUND 2 · AUG 2026 ·" rotating slowly (see Section 12.4). Center of the stamp holds the sparkle.
6. Photo must be lazy-loaded with a blur-up placeholder (20px base64 blur).

---

## 2. CONFIG FILE (FILL-IN VALUES)

Create `/src/config/site.ts`. **All links in the site must come from this file** so the owner can edit in one place. Pre-fill what is known; leave clearly-marked `TODO` for what is not and make the UI degrade gracefully (a button whose URL is `TODO` renders as disabled with tooltip "Link coming soon").

```ts
export const site = {
  name: "Prakhar Kaushik",
  alias: "VishRim",
  brand: "prikaushion",
  role: "Frontend Developer · Builder · Educator",
  location: "New Delhi, India",
  email: "prakhar1532006@gmail.com",
  brandEmail: "prikaushionv@gmail.com",
  // phone intentionally NOT displayed publicly. Do not render a phone number anywhere.
  socials: {
    github:   { label: "GitHub",   handle: "prakharrai12",        url: "https://github.com/prakharrai12" },
    linkedin: { label: "LinkedIn", handle: "Prakhar Kaushik",     url: "TODO_LINKEDIN_URL" },   // e.g. https://www.linkedin.com/in/<slug>
    instagram:{ label: "Instagram",handle: "TODO_INSTAGRAM_HANDLE",url: "TODO_INSTAGRAM_URL" },  // e.g. https://instagram.com/<handle>
    email:    { label: "Email",    handle: "prakhar1532006@gmail.com", url: "mailto:prakhar1532006@gmail.com" },
  },
  resumeUrl: "TODO_RESUME_PDF",  // optional: /public/Prakhar-Kaushik-CV.pdf
};
```

Create `/src/config/projects.ts` using the schema and the pre-filled list in **Section 14.3**. Every project has `liveUrl` and `repoUrl`. The owner states **all projects are already hosted**, so each card **must** render a working **"Live"** button and a **"Code"** button using these URLs. Use `TODO_` placeholders where the exact URL is unknown (see 14.3); do not invent URLs.

---

## 3. TECH STACK & PROJECT STRUCTURE

**Framework:** Vite + React 18 + TypeScript.
**Styling:** Tailwind CSS v3 + CSS variables (tokens in Section 4) + a small `globals.css` for grain, selection, scrollbar and cursor rules.
**Animation:**
- **GSAP 3 + ScrollTrigger + SplitText-equivalent** (if SplitText is unavailable, write a tiny `splitText()` utility that wraps characters/words/lines in `<span>` with `overflow:hidden` masks).
- **Lenis** for smooth scrolling (`lerp: 0.085`, `wheelMultiplier: 0.9`, `smoothTouch: false`).
- **Framer Motion** only for component enter/exit (nav menu, modals, tooltip), not for scroll choreography.
**Optional 3D/WebGL:** none required. Do **not** add Three.js unless Section 10.7 is implemented as an optional enhancement. Prioritise 60fps.
**Fonts:** Google Fonts via `@fontsource` packages (self-hosted, `font-display: swap`): Fraunces (variable, with `opsz`, `SOFT`, `WONK` axes), Instrument Serif (400, italic), Manrope (300–800), JetBrains Mono (400, 500).
**Icons:** `lucide-react` (stroke 1.5) + custom SVG for the sparkle and K mark.
**Deploy target:** static hosting (GitHub Pages / Cloudflare Pages / Vercel). Use relative-safe `base` config.

```
/src
  /assets (fonts handled by @fontsource)
  /components
    Preloader.tsx
    CustomCursor.tsx
    ScrollProgress.tsx
    BackgroundJourney.tsx      // the scroll-driven colour/gradient system
    Grain.tsx
    Nav.tsx
    MagneticButton.tsx
    SectionHeader.tsx          // the reusable section separator (Section 6)
    SplitText.tsx
    Marquee.tsx
    ProjectCard.tsx
    SocialRow.tsx
    ...
  /sections
    Hero.tsx  About.tsx  Work.tsx  Projects.tsx
    Services.tsx  Toolkit.tsx  Education.tsx  Socials.tsx  Contact.tsx  Footer.tsx
  /config   site.ts  projects.ts  experience.ts  skills.ts
  /hooks    useMagnetic.ts  useScrollTheme.ts  useReducedMotion.ts  useMediaQuery.ts
  /lib      gsap.ts (register plugins)  lenis.ts  utils.ts
  main.tsx  App.tsx  globals.css
/public/assets/{brand,images,projects}
```

---

## 4. DESIGN TOKENS

### 4.1 Colour (define as CSS variables on `:root`)

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0A0A0B` | Deepest background, near-black |
| `--obsidian` | `#0F0E10` | Default surface |
| `--charcoal` | `#161417` | Raised surface / cards |
| `--graphite` | `#221F24` | Borders-on-fill, hover surface |
| `--oxblood` | `#4A0A10` | Deep red-brown for gradient washes |
| `--burgundy` | `#7A0F18` | Mid wine tone for gradient washes |
| `--crimson` | `#E01B24` | **Primary accent** (the logo red). Use sparingly. |
| `--crimson-glow` | `#FF3B3B` | Hover/glow variant of crimson |
| `--ember` | `#FF5A36` | Tiny highlights only (1% of UI) |
| `--bone` | `#F4EFE4` | Primary text on dark; the logo's cream paper colour |
| `--bone-dim` | `rgba(244,239,228,0.64)` | Secondary text |
| `--bone-faint` | `rgba(244,239,228,0.14)` | Hairlines / borders |
| `--bone-ghost` | `rgba(244,239,228,0.06)` | Ghost outlines / giant background words |
| `--paper` | `#F4EFE4` | Cream surfaces (Contact section inversion, preloader) |
| `--paper-ink` | `#0A0A0B` | Text on cream |

**Accent usage rule:** crimson appears as: the K mark, hairline-rule leading ends, primary buttons, link underlines on hover, the active nav item dot, cursor ring on interactive elements, tiny sparkles, and the scroll-progress bar. **Never** use crimson as a large body-text colour and never as a full-section flat background (it is allowed as a *gradient wash* with ≤ 35% opacity, and as the Socials hover flood).

### 4.2 Gradient recipes (named — used by the Background Journey in 7.4)

- `--grad-void`: `radial-gradient(120% 80% at 70% 10%, #1a0d10 0%, #0A0A0B 55%)`
- `--grad-ember-haze`: `radial-gradient(90% 70% at 20% 0%, rgba(122,15,24,0.55) 0%, rgba(10,10,11,0) 60%), #0A0A0B`
- `--grad-oxblood-deep`: `linear-gradient(180deg, #0A0A0B 0%, #2a070c 55%, #4A0A10 100%)`
- `--grad-wine-spot`: `radial-gradient(70% 60% at 85% 40%, rgba(224,27,36,0.28) 0%, rgba(74,10,16,0.35) 35%, #0A0A0B 75%)`
- `--grad-smoke`: `linear-gradient(180deg, #0F0E10 0%, #161417 100%)`
- `--grad-crimson-flood`: `linear-gradient(110deg, #7A0F18 0%, #E01B24 60%, #FF3B3B 100%)` (Socials hover only)
- `--grad-paper`: `linear-gradient(180deg, #F4EFE4 0%, #EDE6D6 100%)` (Contact section)

### 4.3 Spacing / layout
- Base unit `4px`. Section vertical padding: `clamp(96px, 14vw, 220px)` top & bottom.
- Max content width: `1440px`; side gutters `clamp(20px, 5vw, 80px)`.
- 12-column grid, column gap `clamp(16px, 2vw, 32px)`.
- Radius scale: `--r-xs 6px`, `--r-sm 10px`, `--r-md 16px`, `--r-lg 28px`, `--r-pill 999px`. Prefer **sharp or large** radii; avoid mid-radius "SaaS card" 12px everywhere. Project cards use `--r-lg`; buttons use `--r-pill`; hairline panels use `--r-xs`.

### 4.4 Borders & shadows
- Hairline: `1px solid var(--bone-faint)`.
- Hover hairline: `1px solid rgba(244,239,228,0.38)`.
- Elevation (rare): `0 30px 80px -30px rgba(0,0,0,0.75)`.
- Red glow (hover only): `0 0 0 1px rgba(224,27,36,0.5), 0 20px 60px -20px rgba(224,27,36,0.45)`.

### 4.5 Film grain (global, mandatory)
- Fixed full-screen `<div class="grain">` above content, `pointer-events:none`, `z-index: 90`.
- Use an inline SVG `feTurbulence` noise (`baseFrequency 0.8`, `numOctaves 2`) as a tiled background, `opacity: 0.07`, `mix-blend-mode: overlay`.
- **Animate** it: shift `background-position` through 6 steps at `steps(6)` every `0.9s` infinitely to create subtle film flicker. Disable under `prefers-reduced-motion`.

### 4.6 Selection, scrollbar, focus
- `::selection { background: var(--crimson); color: var(--ink); }`
- Hide native scrollbar on desktop and show the custom scroll-progress (Section 7.3).
- Focus-visible: `outline: 2px solid var(--crimson); outline-offset: 4px;` — never remove focus outlines.

---

## 5. TYPOGRAPHY SYSTEM

This is the heart of the "classy" feel. **Use exactly these four families.**

| Role | Family | Details |
|---|---|---|
| **Section titles / Display** | **Fraunces** (variable) | `font-variation-settings: "opsz" 144, "SOFT" 30, "WONK" 1;` Weight **300** for the main word, **800** for emphasised word. Tracking `-0.035em`. Line-height `0.88`. |
| **Accent / italic whisper words** | **Instrument Serif** *italic* | Used for one word inside every section title, in crimson or bone. Tracking `-0.01em`. |
| **Body & UI** | **Manrope** | Body 17px/1.7 weight 400 (bone-dim). UI labels 14px weight 600. |
| **Labels, numbers, metadata** | **JetBrains Mono** | 12px, uppercase, tracking `0.18em`. Used for section indices "(01)", dates, tags, captions. |

### 5.1 Type scale (fluid)
```
--fs-mega:   clamp(5.5rem, 17vw, 17rem);   /* hero name, giant section ghost words */
--fs-title:  clamp(3.5rem, 11vw, 11rem);   /* section titles */
--fs-h2:     clamp(2.2rem, 5vw, 4.5rem);
--fs-h3:     clamp(1.5rem, 2.4vw, 2.25rem);
--fs-lead:   clamp(1.15rem, 1.6vw, 1.6rem);
--fs-body:   1.0625rem;
--fs-small:  0.875rem;
--fs-mono:   0.75rem;
```

### 5.2 Section-title formula (apply to EVERY section title)
Each section title is **two lines**, mixing three styles:

```
Line 1:  Fraunces 300, bone                    → the "setup" word
Line 2:  Fraunces 800, bone  +  one Instrument Serif italic word in crimson
```

Examples (exact copy used later):
- **HOME** → *(hero has its own treatment, see 10)*
- **ABOUT** → line 1: `The person` / line 2: `behind the *pixels*`
- **WORK** → line 1: `Where I've` / line 2: `put in the *hours*`
- **PROJECTS** → line 1: `Selected` / line 2: `*work*, shipped`
- **SERVICES** → line 1: `What prikaushion` / line 2: `can *build* for you`
- **TOOLKIT** → line 1: `The tools` / line 2: `of the *trade*`
- **EDUCATION** → line 1: `Always` / line 2: `*learning*`
- **SOCIALS** → line 1: `Find me` / line 2: `*elsewhere*`
- **CONTACT** → line 1: `Let's make` / line 2: `something *iconic*`

(Words between `*asterisks*` = Instrument Serif italic in crimson.)

### 5.3 Title reveal animation (applies to every section title)
1. Split each title into **lines → words → characters**, each line wrapped in `overflow: hidden`.
2. Initial state: each character `translateY(110%) rotateZ(4deg)`, `opacity: 0`.
3. Trigger when the title's top hits `80%` of viewport (`ScrollTrigger start: "top 80%"`, `once: true`).
4. Animate characters to `translateY(0) rotateZ(0)`, `opacity: 1`, `duration: 1.1s`, `ease: "expo.out"`, `stagger: 0.025s` per character, line 2 delayed `0.18s` after line 1.
5. The crimson italic word additionally animates `letter-spacing` from `0.2em` → `-0.01em` over `1.4s` with `power4.out`.

---

## 6. SECTION SEPARATOR SYSTEM

Every section (except Hero and Footer) begins with the `<SectionHeader>` component. This is what visually *separates* sections. It must be identical in structure but with different content per section.

### 6.1 Anatomy (top to bottom)
1. **Meta row** (flex, space-between, full width):
   - Left: mono label `(01)` — section number in parentheses, crimson.
   - Centre-left: mono caps section name, e.g. `ABOUT ME`, bone-dim.
   - Right: mono `SCROLL ↓` with a tiny 12px arrow that bobs `translateY 0→4px` (1.6s, sine, infinite).
2. **Hairline rule** directly below, full width, 1px, `--bone-faint`. On enter, a **crimson 1px line draws over it** left→right (`scaleX 0→1`, `transform-origin: left`, `duration 1.4s`, `expo.inOut`). At the end of the line, a **sparkle (crimson, 18px)** appears with `scale 0→1`, `rotate -90→0`, `0.6s`, then slowly rotates continuously (`360deg / 14s linear infinite`).
3. **Giant ghost word** behind the title: the section name in Fraunces 800, `--fs-mega`, **outline only** (`-webkit-text-stroke: 1px var(--bone-ghost)`, transparent fill), positioned absolutely behind, offset left `-2vw`. It **parallax-scrubs** horizontally: `x` from `+8vw` to `-8vw` across the section's scroll range (`scrub: 1`).
4. **Title** per Section 5.2 / 5.3, sitting over the ghost word.
5. **Intro line** (optional) — one sentence, Manrope `--fs-lead`, bone-dim, max-width `46ch`, fades up (`y 24→0`, `opacity 0→1`, `0.9s`, `power3.out`) `0.5s` after the title.

### 6.2 Section transitions (between sections)
Between consecutive sections, insert a `<SectionBridge>` (height `18vh`) containing:
- A **horizontal marquee of sparkles and the next section's name**: `✦ NEXT — PROJECTS ✦ NEXT — PROJECTS ✦` (use the sparkle SVG, not the text glyph), mono caps 12px, bone at 30% opacity, scrolling right-to-left at 40px/s, pausing on hover.
- The **page background colour** is mid-tween here (see 7.4) so the bridge visibly sits between two colour worlds.
- A **thin curved orbit arc** (SVG path echoing the logo's orbit swoosh), crimson 1px, that **draws itself** (`stroke-dashoffset`) as the bridge scrolls through the viewport (`scrub: 1`).

---

## 7. GLOBAL BEHAVIOURS

### 7.1 Smooth scroll (Lenis)
- Initialise Lenis once; connect to GSAP ticker: `gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0);`
- `lenis.on('scroll', ScrollTrigger.update)`.
- Anchor links use `lenis.scrollTo(target, { offset: -80, duration: 1.6, easing: t => 1 - Math.pow(1 - t, 4) })`.
- While the preloader or mobile menu is open, call `lenis.stop()`; resume with `lenis.start()` after.

### 7.2 Custom cursor (desktop / fine pointer only)
Two elements, `position: fixed`, `pointer-events: none`, `z-index: 100`, hidden on touch devices:
1. **Dot** — 8px bone circle, follows pointer instantly.
2. **Ring** — 40px circle, 1px bone border at 50% opacity, follows with lerp `0.16`.
`mix-blend-mode: difference` on both.

**States:**
| Target | Ring behaviour |
|---|---|
| Default | 40px ring |
| Any `a`, `button`, `[data-cursor="link"]` | Ring scales to 64px, border becomes crimson, dot hides |
| `[data-cursor="view"]` (project cards) | Ring becomes 96px **filled crimson**, shows mono text **"VIEW"** in `--ink` |
| `[data-cursor="drag"]` | Ring 96px, text **"DRAG"** |
| `[data-cursor="open"]` (social rows) | Ring 110px filled bone, text **"OPEN ↗"** in `--ink` |
| Text selection / inputs | Ring becomes a 2px × 28px vertical bar |
| Pointer leaves window | Fade out 0.2s |
Transitions between states: `0.35s`, `cubic-bezier(0.22, 1, 0.36, 1)`.

### 7.3 Scroll progress
- A **fixed 2px bar at the very top**, full width, crimson, `scaleX` bound to scroll progress (`transform-origin: left`), `z-index: 95`.
- A **fixed right-edge vertical indicator** (desktop only): a thin 1px vertical line (`60vh` tall) with **10 tiny dots** (one per section). The active section dot is a crimson filled circle 8px with a pulsing ring; inactive dots are 4px bone-at-30%. Hovering a dot shows a tooltip with the section name (mono caps) and clicking smooth-scrolls to it.

### 7.4 BACKGROUND COLOUR-JOURNEY (the gradient transition as you scroll) — MANDATORY
The page background **continuously shifts colour/gradient as the user scrolls**, section to section, like moving through rooms of different light. Implementation spec:

1. A fixed full-screen layer `<div id="bg-journey">` at `z-index: -1`, containing **two stacked gradient layers** `A` and `B` (each `position: absolute; inset:0`). Layer `B` is cross-faded over `A`.
2. Each section declares `data-bg="<gradient-name>"` and `data-accent-x`, `data-accent-y` (percent position of its radial glow).
3. Use one `ScrollTrigger` **per section boundary** with `start: "top 60%"`, `end: "top 10%"`, `scrub: 1.2`. As the next section enters, tween layer B's opacity `0 → 1` while its gradient is set to the incoming section's gradient; when complete, copy B → A and reset.
4. In addition, tween **CSS variables** `--glow-x`, `--glow-y` (percent) so the radial "light source" visibly **drifts** across the screen as you scroll.
5. Also tween a `--noise-boost` variable (grain opacity `0.07 → 0.10 → 0.07`) at each boundary for a subtle "projector flicker".

**Section → background map (exact):**

| # | Section | Gradient | Glow position | Vibe |
|---|---|---|---|---|
| 1 | Home | `--grad-void` | 70% 10% | Black with a faint warm vignette |
| 2 | Marquee/bridge | tween | — | Void → ember haze |
| 3 | About | `--grad-ember-haze` | 20% 0% | Smoky wine glow top-left |
| 4 | Work | `--grad-smoke` | 50% 50% | Cool, neutral graphite — a breather |
| 5 | Projects | `--grad-oxblood-deep` | 50% 100% | Deep wine rising from the bottom |
| 6 | Services | `--grad-wine-spot` | 85% 40% | Crimson spotlight on the right |
| 7 | Toolkit | `--grad-void` | 30% 20% | Return to pure black, minimal |
| 8 | Education | `--grad-smoke` | 80% 80% | Graphite, quiet |
| 9 | Socials | `--grad-void` → crimson flood on hover | per row | Black, with **colour floods** per social |
| 10 | Contact | `--grad-paper` | — | **Inversion to cream paper** (the logo's own background) |
| 11 | Footer | `--ink` | — | Back to black |

**The Contact inversion is a key moment:** as Contact enters, the page background tweens from black to bone cream, text colour variables flip (`--text: var(--ink)`, `--text-dim: rgba(10,10,11,0.62)`, hairlines to `rgba(10,10,11,0.16)`) over `1.2s`, and the cursor ring blend mode keeps it visible. When the footer enters, it flips back to black.

### 7.5 Reduced motion
Under `prefers-reduced-motion: reduce`: disable grain animation, parallax, marquee auto-scroll (leave static), char-split reveals (use a simple `opacity` fade 0.4s), Lenis smoothing (use native scroll), and cursor trail. The background colour journey becomes **instant section-based colour changes** (no scrub).

---

## 8. PRELOADER / INTRO SEQUENCE

A full-screen preloader that runs **once per session** (`sessionStorage` flag). Total duration ≈ 3.6s. Surface: **cream paper** (`--paper`) with grain — deliberately the same cream as the logo image so the logo appears to "belong".

**Timeline (exact):**
1. `0.0s` — Cream screen. Centre: the **original logo** (`logo-original.png`), initial `opacity: 0`, `scale: 0.92`, `filter: blur(8px)`.
2. `0.2s → 1.0s` — Logo fades in to `opacity 1`, `scale 1`, `blur 0` (`expo.out`).
3. `0.4s → 2.6s` — A **mono counter** bottom-left counts `000 → 100` (`JetBrains Mono`, 12px, tracking 0.2em), with text `LOADING THE EXPERIENCE` beside it. Bottom-right: `EST. 2026 — NEW DELHI`.
4. `0.6s → 2.6s` — A **1px crimson progress line** across the bottom edge, `scaleX 0 → 1`.
5. `1.2s` — The four small sparkles around the logo **pulse** (`scale 1 → 1.4 → 1`, `0.8s`, staggered `0.12s`).
6. `2.7s` — Logo scales to `1.08` and fades `opacity → 0` (`0.5s`, `power2.in`).
7. `3.0s → 3.9s` — **Curtain reveal**: the cream surface splits into **two halves** (top/bottom) that slide away (`yPercent: -100` and `+100`, `1.0s`, `expo.inOut`) revealing the dark hero beneath. At the same time a **crimson 2px line** flashes along the seam and fades.
8. `3.4s` — Hero entrance (Section 10.8) begins, overlapping the curtain.
9. After completion: unmount preloader, `lenis.start()`.

Skip behaviour: if `sessionStorage.seen === "1"`, play a **short 0.9s version** (logo flashes, curtain). A hidden "Skip" mono button appears at top-right after 1s.

---

## 9. NAVIGATION

### 9.1 Layout
- **Fixed top**, height `84px`, full width, `z-index: 80`, padding `0 var(--gutter)`.
- Left: **wordmark** — the live-text `prikaushion` in Fraunces 800, 22px, bone, letter-spacing `-0.02em`; the letter **K** (4th letter: pri**k**aushion) is crimson and slightly larger (`1.12em`) echoing the logo's red K. Hover: the K does a quick `rotate(20deg) scale(1.2)` and a sparkle pops at its top-right.
- Centre/right (desktop): links — `Home · About · Work · Projects · Services · Toolkit · Socials · Contact`, mono caps 12px, tracking `0.18em`. Active link has a **6px crimson dot** before it. Hover: text becomes bone (from bone-dim) and a **hairline underline draws** left→right (`0.4s`).
- Far right: **"Hire me"** pill button (`MagneticButton`), crimson border, transparent fill, on hover fills crimson with `--ink` text, arrow `↗` rotates 45deg. Links to `#contact`.

### 9.2 Scroll behaviour
- At top: transparent background.
- After scrolling `>80px`: nav gains a **blurred dark glass** background (`backdrop-filter: blur(14px) saturate(120%)`, `background: rgba(10,10,11,0.55)`, 1px bottom hairline).
- **Hide on scroll down, show on scroll up** (`translateY(-100%)` over `0.5s expo.out`, threshold 12px).
- When Contact (cream) section is under the nav, nav text colours flip to ink automatically.

### 9.3 Mobile menu (< 900px)
- Right: a **two-line hamburger** (two 1px lines, 24px wide, 6px apart). On open, lines rotate into an **X** (`0.5s`).
- Opens a **full-screen overlay**, `--ink` with grain and a crimson radial glow bottom-left.
- Menu links are **huge** Fraunces 800 (`clamp(3rem, 12vw, 6rem)`), stacked, each preceded by a mono index `01`…`08`. They **reveal with a mask slide-up stagger** (`0.07s` per item, `0.9s`, `expo.out`).
- Bottom row: socials as mono links + email.
- Closing: items slide down & overlay fades `0.5s`.

---

## 10. SECTION 01 — HOME (HERO)

`id="home"` · `data-bg="grad-void"` · min-height `100svh`.

### 10.1 Layout
Full-viewport, asymmetric, left-aligned. Content block anchored to the **bottom-left** with generous top space. Right side holds an interactive visual (10.5).

### 10.2 Copy (exact)
- **Top-left mono kicker** (reveals first): `● AVAILABLE FOR FREELANCE — 2026` — the dot is a **pulsing green-free** indicator: use **crimson** dot, pulsing (`scale 1→1.8`, `opacity 1→0`, `1.6s`, infinite).
- **Name (Fraunces, `--fs-mega`)**, three stacked lines with masked reveal:
  - Line 1: `PRAKHAR` — Fraunces 300, bone.
  - Line 2: `KAUSHIK` — Fraunces 800, bone, with the **K** in crimson.
  - Line 3 (smaller, Instrument Serif italic, `--fs-h2`, crimson): `a.k.a. VishRim`
- **Role line** (Manrope `--fs-lead`, bone-dim, max `38ch`): `I design and build frontends that feel expensive — and teach the next generation to code.`
- **Meta row** (mono caps 12px, three items separated by sparkle dividers): `NEW DELHI, IN` · `FRONTEND DEV` · `EDUCATOR`
- **CTA group:**
  1. Primary `MagneticButton`: **"See my work"** + arrow-down icon → smooth-scrolls to `#projects`. Style: pill, crimson fill, ink text, 56px tall, padding `0 32px`. Hover: fill slides from bottom to bone, text ink; arrow bobs.
  2. Secondary: **"Download CV"** ghost pill (hairline bone border). Hover: border becomes crimson, text crimson. If `resumeUrl` is TODO, render disabled with tooltip "CV coming soon".
- **Bottom-right scroll cue:** a vertical mono text `SCROLL` rotated `-90deg` with a 60px line beneath that animates `scaleY 0→1→0` on loop (`2s`).

### 10.3 Hero name interactivity
- **Per-letter magnetic repel**: characters of the name subtly move away from the cursor within a 140px radius (max displacement 14px), springing back with `power3.out`.
- **Variable-font weight reaction**: as the cursor moves horizontally across the name, each letter's Fraunces weight interpolates between `300 ↔ 800` based on distance to the cursor (closer = heavier). Use `font-variation-settings: "wght" X`.
- On touch devices, replace with a gentle auto-oscillation (weight wave, `4s` loop).

### 10.4 Ambient background in hero
- Faint **star field**: ~40 tiny sparkles (2–6px) scattered, each twinkling with random `opacity 0.2↔0.9` over `2–5s`, a few in crimson. Positions fixed at build time (seeded), parallax-drifting at `0.03–0.12` of scroll speed.
- A **huge soft crimson radial glow** (`60vw`, blur 120px, opacity 0.18) following the cursor with `lerp 0.05` (very laggy, atmospheric).
- A **thin orbit arc SVG** (echoing the logo's swoosh) across the hero, crimson 1px, slowly rotating `360deg / 60s`.

### 10.5 Right-side interactive element: "THE K"
An oversized **red K starburst** (the logo mark SVG), `~38vw` wide, partially cropped off the right edge, `opacity: 0.9`.
- Idle: slow `rotate ±3deg` sway (`8s`, sine, yoyo).
- On mouse move: tilts in 3D toward the cursor (`rotateX/rotateY` ±10deg, `perspective: 1200px`), and its **spikes elongate** slightly (`scaleX` of the long spike path 1 → 1.06).
- On click: emits a **burst of 12 small sparkles** radiating outward that fade (`0.9s`), and the K does a quick `scale 1 → 1.08 → 1`.
- On scroll: parallax `y` at `-0.25` and rotate `0 → 18deg` over hero scroll range.

### 10.6 Scroll-out
As the hero leaves, the name lines slide **up at different speeds** (line 1: `-12%`, line 2: `-20%`, line 3: `-30%`), opacity to 0.4, and the K scales to 1.15.

### 10.7 Optional enhancement (only if all else is done)
A `canvas` ink-splatter that trails the cursor in black/crimson on the cream-free dark surface, fading in 1.2s. Skip on mobile.

### 10.8 Hero entrance (after preloader)
Staggered timeline, starting at `3.4s`: kicker (`0.0s`) → name line 1 chars (`0.1s`) → line 2 (`0.28s`) → line 3 (`0.46s`) → role line (`0.7s`, y 30→0, opacity) → meta row (`0.85s`) → CTAs (`1.0s`, scale `0.9→1` + opacity) → the K fades/scales in from `0.7` (`0.2s`, `1.6s`, `expo.out`) → star field fades in (`1.2s`).

---

## 11. SECTION 02 — MARQUEE STRIP

Immediately under the hero, full-bleed band (height `120px`), top and bottom hairlines.
- **Two rows** scrolling in **opposite directions** (row 1 → left at 60px/s; row 2 → right at 45px/s).
- Row 1 text (Fraunces 800, `clamp(2rem,5vw,4.5rem)`, bone, with sparkle separators in crimson):
  `FRONTEND DEVELOPMENT ✦ UI/UX DESIGN ✦ REACT ✦ INTERACTIVE WEB ✦ EDUCATION ✦ IoT TINKERING ✦`
- Row 2 text (Fraunces 300 italic **outline only**, `-webkit-text-stroke: 1px bone`, transparent fill):
  `PRIKAUSHION ✦ BUILT IN NEW DELHI ✦ OPEN FOR PROJECTS ✦ PRIKAUSHION ✦`
- **Scroll-velocity reaction:** marquee speed multiplies by `1 + |scrollVelocity| * 0.02` (clamped to 4×) and **direction flips** when scroll direction reverses.
- **Hover:** the hovered row pauses; characters under the cursor swap to crimson.

---

## 12. SECTION 03 — ABOUT ME

`id="about"` · `data-bg="grad-ember-haze"` · glow at top-left.

### 12.1 SectionHeader
Meta: `(01)` · `ABOUT ME`. Title: `The person` / `behind the *pixels*`. Ghost word: `ABOUT`.

### 12.2 Layout (desktop)
12-col grid. **Left (cols 1–5):** portrait (Section 1.2) sticky (`position: sticky; top: 12vh`). **Right (cols 7–12):** scrolling text column. Mobile: portrait on top (arched), text below.

### 12.3 Copy (exact, in order)
1. **Lead paragraph** (Fraunces 300, `--fs-h3`, bone, line-height 1.25; the words *builder*, *educator*, and *iconic* are Instrument Serif italic crimson):
   > "I'm Prakhar — a *builder* and *educator* from New Delhi, obsessed with making the web feel crafted, not generated."
2. **Body paragraph 1** (Manrope body, bone-dim):
   > "I'm a diploma student in Computer Science Engineering at Amity University, Greater Noida, and I spend most of my days building frontend web applications — from student housing platforms and finance tools to hackathon websites and AI products. Everything I make starts with one question: *would someone pay for this because of how it feels?*"
3. **Body paragraph 2:**
   > "Alongside building, I teach. I've taught AI, coding, Scratch and prompt engineering to students from Grade 1 to 8, because the best way to understand something is to make a child understand it too."
4. **Body paragraph 3:**
   > "I also tinker with hardware — ESP32 boards, sensors, a desktop AI companion robot — because the web is only half the world. Under **prikaushion**, my umbrella brand, I take on freelance work, build products, and slowly turn ideas into companies."
5. **Pull-quote** (Instrument Serif italic, `--fs-h2`, crimson, with a hairline above and a sparkle):
   > "Classy over loud. Crafted over fast."

### 12.4 Stats row (animated counters)
Four stat blocks in a row (2×2 on mobile), each with mono label under a big Fraunces number, hairline separators. Numbers **count up** on enter (`2s`, `power2.out`, tabular numerals):
| Number | Label |
|---|---|
| `10+` | `PROJECTS SHIPPED` |
| `1–8` | `GRADES TAUGHT` |
| `4+` | `CLIENT & EVENT SITES` |
| `2026` | `YEAR I WENT FULL BUILDER` |
*(The agent must keep these exact labels. If the owner edits numbers, they edit them in `site.ts`.)*

### 12.5 Facts list ("Quick facts") — mono rows with hairlines
```
BASED IN ........ New Delhi, India
STUDYING ........ Diploma in CSE · Amity University, Greater Noida
LANGUAGES ....... English · Hindi · Learning Japanese & Spanish
CLUBS ........... Aegis (core) · Aarohan (cultural)
WORK STYLE ...... Flexible with any routine or shift
ALIAS ........... VishRim
```
Rows reveal sequentially (`0.08s` stagger, `x -20 → 0`, opacity). Dots between label and value are an animated dotted leader that **extends** on reveal.

### 12.6 Portrait interactions (details)
- **Arched frame** with the echo frame offset (Section 1.2).
- **Parallax inside the frame:** image `scale 1.15` and moves `y: -6% → 6%` across the scroll range so it feels like looking through a window.
- **Hover:** red multiply tint fades in (`0.5s`), image `scale → 1.2`, and the cursor ring becomes `[data-cursor="view"]`-style with text **"HI 👋"** → **do not use emoji** → use text **"HELLO"**.
- **Mouse tilt:** the whole frame tilts ±5deg toward the cursor (`perspective 1000px`).
- **Rotating stamp badge** bottom-right: SVG circular text path, `FARAWAY · INTERNATIONAL HACKATHON · ROUND 2 · AUG 2026 ·`, mono 9px caps, bone, rotating `360deg / 20s linear infinite`; slows to a stop on hover; centre holds the crimson sparkle. Stamp is `120px` (desktop), `88px` (mobile).
- **Reveal on enter:** a **clip-path wipe** — `inset(100% 0 0 0)` → `inset(0 0 0 0)` over `1.4s expo.inOut` — while the image counter-scales `1.4 → 1.15`.
- **Caption** under portrait (mono 11px, bone-dim): `FIG. 01 — PRAKHAR, FARAWAY INTERNATIONAL HACKATHON, ROUND 2.`

### 12.7 Gradient & scroll feel
As About scrolls, the **glow drifts** from top-left to centre; the paragraphs have **scroll-linked opacity** — each paragraph is `0.25` opacity until it crosses the viewport centre, then animates to `1` (`scrub`), creating a reading-focus effect.

---

## 13. SECTION 04 — WORK / EXPERIENCE

`id="work"` · `data-bg="grad-smoke"`.

### 13.1 SectionHeader
Meta: `(02)` · `WORK & EXPERIENCE`. Title: `Where I've` / `put in the *hours*`. Ghost word: `WORK`.

### 13.2 Layout: vertical interactive timeline
- Left: a **1px vertical line** running the full height of the list. A **crimson fill line** grows downward with scroll (`scaleY` scrubbed to section progress).
- Each entry is a row: **left column** (cols 1–3) holds mono date + location; **right column** (cols 4–12) holds role, org, description, tags.
- Each entry has a **node** on the line: a 12px circle. Inactive = hollow bone-faint; as the crimson line passes it, it **fills crimson** with a ripple ring (`scale 1→2.4`, `opacity .6→0`, `0.9s`).
- **Hover on a row:** all other rows dim to `0.35` opacity (`0.4s`), the hovered row's title shifts `x +12px` and a **spotlight radial gradient** follows the cursor inside the row; arrow icon slides in on the right.

### 13.3 Entries (exact data → `/src/config/experience.ts`)

| # | Date | Role | Organisation / Place | Description | Tags |
|---|---|---|---|---|---|
| 1 | `Aug – Nov 2026` | **Website Developer & Core Organiser** | Hacks 2026 — hosted by NARI | `Built the official hackathon website (thehacks.in) and am organising the event on 22 Nov 2026 — managing crowd flow and handling participant queries as a core organiser.` | `React` `Vite` `Tailwind` `Event Ops` |
| 2 | `31 Aug – 11 Oct 2026` | **Internship — Web & AI Projects** | Amity Polytechnic, AUGN Campus | `Six-week internship delivering four projects — Finculator, VipraPulse (AI brand-intelligence), an event-hosting platform, and an Indian-meal calorie tracker.` | `Python` `FastAPI` `React` `AI` |
| 3 | `28 May – 28 Jun 2026` | **STEM Educator (AI & Coding)** | Vision Sports School & Vision Basketball India | `Taught AI, coding, Scratch and prompt engineering to students from Grade 1 to 8 as a summer intern. Certificate available on LinkedIn.` | `Teaching` `AI` `Scratch` `Prompt Eng.` |
| 4 | `2026` | **Freelance Web Developer** | Joyra (gifting) · Radix Aroma (essential oils) · Local clients | `Designed and built websites for local businesses — a gifting store and an essential-oils brand — from brand-matched UI to launch.` | `Freelance` `UI/UX` `Branding` |
| 5 | `30 Aug – 2 Sep 2025` | **Head Volunteer** | Technoxian World Cup 9.0 · AICRA · Noida Stadium Complex | `Led on-ground event operations at an international robotics and AI championship.` | `Events` `Leadership` |
| 6 | `20 May – 4 Jun 2024` | **Python & AI Summer Camp** | Rancho Labs × IIT Delhi IHFC | `Completed an intensive Python and AI summer programme in collaboration with IIT Delhi's IHFC.` | `Python` `AI` |

### 13.4 Entry reveal animation
Each row on enter: date slides from `x -30`, role title performs the **line-mask reveal** (`yPercent 100→0`, `1s`, `expo.out`), description fades up (`y 20→0`, `0.8s`, delay `0.15s`), tags pop in with `0.05s` stagger (`scale 0.8→1`, `opacity`).

---

## 14. SECTION 05 — PROJECTS

`id="projects"` · `data-bg="grad-oxblood-deep"` · The visual centrepiece. Every project **must** have visible, working **Live** and **Code** buttons.

### 14.1 SectionHeader
Meta: `(03)` · `SELECTED WORK`. Title: `Selected` / `*work*, shipped`. Ghost word: `PROJECTS`. Intro line: `Every project below is live. Open it, click around, break it — then tell me what you'd improve.`

### 14.2 Layout — two tiers

**Tier A: Featured projects (first 4) — "Sticky stack" scroll.**
- Section pins; cards are **full-width, ~78vh tall**, stacked with `position: sticky; top: 12vh`. As the next card scrolls up it covers the previous, which **scales down to `0.94`**, **dims to `0.5` brightness**, and shifts up `-3vh` (scrub). Card `z-index` increments.
- Card layout (desktop): left 40% = text, right 60% = preview.

**Tier B: More projects — "List-hover" rows.**
- Remaining projects appear as a **minimalist table list**: big index number, project name (Fraunces 800, `--fs-h2`), mono category, year, and two inline buttons.
- On row hover: a **floating preview image** (240×160, arched corner) follows the cursor with lerp `0.12`, slightly rotating by movement direction (`±6deg`); row background gains a crimson-to-transparent wash from the left (`--grad-crimson-flood` at 12% opacity); the title shifts `x +16px`.

### 14.3 Project data (exact → `/src/config/projects.ts`)

Schema:
```ts
type Project = {
  slug: string; index: string; title: string; category: string; year: string;
  tagline: string; description: string; stack: string[];
  liveUrl: string; repoUrl: string; featured: boolean;
  accent?: string; // optional per-card glow colour (must stay within the red/black/bone family unless the project's own brand colour is shown only as a tiny chip)
};
```

Pre-filled list (**`liveUrl`/`repoUrl` use `TODO_…` unless known; all projects are already hosted, the owner will paste the links — render the buttons regardless and make TODO links disabled-with-tooltip**; base GitHub profile is `https://github.com/prakharrai12`):

| Idx | slug | Title | Category | Year | Tagline | Description | Stack | Featured |
|---|---|---|---|---|---|---|---|---|
| 01 | `hacks-2026` | **Hacks 2026 — NARI Hackathon** | Event Website | 2026 | `The official home of NARI's flagship hackathon.` | `A poster-matched, high-contrast event site covering themes, mentors, prize pool of ₹1 lakh+ and pre-placement offers, with registration routed through Unstop. Live at thehacks.in.` | `React` `Vite` `Tailwind` | ✅ live: `https://thehacks.in` |
| 02 | `vipra-pulse` | **VipraPulse** | AI Product | 2026 | `Brand intelligence from what customers actually say.` | `An AI marketing assistant that reads reviews and Reddit mentions and answers grounded questions via RAG — comparing real customer sentiment against a brand's own claims.` | `React` `Vite` `FastAPI` `RAG` `Sentiment` | ✅ |
| 03 | `finculator` | **Finculator** | Web App | 2026 | `Finance maths, made friendly.` | `A production-minded finance calculator web app, hardened against the OWASP-style checklist (auth, input sanitisation, headers, rate limiting) and deployed on Cloudflare Pages.` | `React` `Cloudflare Pages` `Security` | ✅ |
| 04 | `radix-aroma` | **Radix Aroma** | Brand Website | 2026 | `Nature's Tributary — essential oils & contract farming.` | `A classic, brand-matched site for an essential-oils label and a contract-farming marketplace with a Sell/Buy model for farmers and buyers across India. Launch oils: Lemongrass, Vetiver, Basil, Citronella, Jojoba.` | `Next.js` `Tailwind` `Branding` | ✅ |
| 05 | `nooq` | **nooq** | Platform | 2026 | `Student housing, designed properly.` | `A comprehensive React student-housing platform with a deep indigo UI system and full multi-page interactivity.` | `React` `UI/UX` | ❌ |
| 06 | `amisphere` | **Amisphere** | College Website | 2026 | `The college site, rebuilt.` | `An improved, security-hardened and fully polished re-imagining of the official college website.` | `React` `Security` `UX` | ❌ |
| 07 | `desical` | **DesiCal** | Mobile App | 2026 | `An Indian food calorie tracker that knows dal from dosa.` | `A Python/Flet calorie tracker with a pre-loaded Indian food database — scan, search or choose — installable as a mobile app.` | `Python` `Flet` | ❌ |
| 08 | `nova` | **NOVA** | Hardware + AI | 2026 | `A desktop AI companion robot.` | `ESP32-S3 body with a TFT face, pan/tilt servos, touch, mic and speaker; a local Ollama (qwen2.5:3b) brain and a desktop app called NOVA AI Studio.` | `ESP32-S3` `Ollama` `Python` | ❌ |
| 09 | `access-control` | **P4-EYE Access Control** | IoT | 2026 | `Multi-factor access, face + Morse.` | `An ESP32-P4-EYE access system combining face recognition with a dynamic challenge-response second factor, PIR wake and servo/relay actuation, with a web simulator demo.` | `ESP32-P4` `IoT` `React` | ❌ |
| 10 | `joyra` | **Joyra** | E-commerce Site | 2026 | `Gifting, but make it effortless.` | `A client website for a gifting brand.` | `Web` `UI` | ❌ |
| 11 | `akansha-demo` | **Wellness Creator Site** | Demo Website | 2026 | `Booking, media kit and home — one file.` | `A single-file HTML demo site for a psychology and wellness creator, with booking, media kit and home pages, in a deep blue and yellow scheme.` | `HTML` `CSS` `JS` | ❌ |

> The agent must render **all 11** entries. Order = table order. Items 01–04 → Tier A (sticky stack). Items 05–11 → Tier B (list-hover). The owner can toggle `featured` to move any project between tiers.

### 14.4 Tier A card — exact structure
**Left (text) column**
1. Top row: mono `01 / 11` (crimson) + mono category chip (hairline pill).
2. **Title** — Fraunces 800, `--fs-h2`, bone. Word-mask reveal.
3. **Tagline** — Instrument Serif italic, `--fs-h3`, bone-dim.
4. **Description** — Manrope body, bone-dim, max `44ch`.
5. **Stack chips** — mono 11px caps, hairline pill, `0.05s` stagger pop-in; hover → chip fills bone-ghost.
6. **Button row (MANDATORY):**
   - **`Live ↗`** — primary pill, crimson fill, ink text, `target="_blank" rel="noopener noreferrer"`, links to `liveUrl`. Hover: fill wipes to bone from left; the `↗` icon moves `translate(3px,-3px)`.
   - **`Code`** — ghost pill with GitHub icon (hairline), links to `repoUrl`. Hover: border crimson, icon rotates `-12deg`.
   - Both are `MagneticButton`s (strength `0.3`).
   - If a URL is `TODO_…`: button renders `aria-disabled="true"`, `opacity .4`, `cursor: not-allowed`, tooltip **"Link coming soon"**.
7. Bottom: mono `YEAR — 2026`.

**Right (preview) column**
- Rounded `--r-lg` panel with hairline border. Contents:
  - **Primary:** a screenshot of the live site at `/public/assets/projects/<slug>.webp`. **The agent must capture screenshots of each hosted project** (headless browser at 1440×900) and save them there. If the capture is unavailable, render a **generated cover**: ink background, giant outlined initials of the project (Fraunces 800, `-webkit-text-stroke`), the sparkle, and a faint crimson radial — never a blank box.
  - **Browser chrome** strip on top: three 8px dots (bone-faint), a URL pill showing the live domain in mono.
  - **Mouse-follow spotlight**: radial gradient (`300px`, `rgba(244,239,228,0.10)`) following the cursor within the card.
  - **3D tilt**: ±6deg, `perspective 1200px`; shine layer moves opposite.
  - **Cursor** over the panel: `[data-cursor="view"]` ring "VIEW"; **clicking the panel opens `liveUrl`**.
  - **Hover**: screenshot slowly **auto-scrolls vertically** (CSS `object-position` from `top` to `bottom` over `6s linear`), emulating a page scroll; reverses on leave.

### 14.5 Tier B row — exact structure
Columns: `index` · `Title (big)` · `category` · `year` · `[ Live ↗ ] [ Code ]`. Same button rules as above, but compact (40px tall). Whole row is also keyboard-focusable and triggers the floating preview on focus. Mobile: rows stack — title on top, mono meta beneath, buttons full-width side by side.

### 14.6 "See all on GitHub" closer
Below Tier B: a giant link row — `See every repository on GitHub ↗` (Fraunces 800, `--fs-h2`) → `https://github.com/prakharrai12`. On hover the text **fills left→right with crimson** via `background-clip: text` gradient sweep, and a sparkle follows the cursor. Cursor state: `open`.

### 14.7 Optional filters
A mono filter bar above Tier B: `ALL · WEB · AI · HARDWARE · CLIENT`. Clicking **FLIP-animates** (GSAP Flip) rows in/out; active filter has a crimson underline that slides between options (`0.5s expo.out`).

---

## 15. SECTION 06 — SERVICES (prikaushion)

`id="services"` · `data-bg="grad-wine-spot"` · crimson spotlight on the right.

### 15.1 SectionHeader
Meta: `(04)` · `PRIKAUSHION STUDIO`. Title: `What prikaushion` / `can *build* for you`. Ghost word: `SERVICES`. Intro: `prikaushion is my umbrella — web, apps, and finance tools — built for businesses that deserve better than a template.`

### 15.2 Layout: horizontal pinned scroll
Section **pins** while the user scrolls vertically; a horizontal track of **4 large panels** (each `70vw` × `62vh`, gap `4vw`) translates `x` from `0` to `-(trackWidth - viewport)` (scrub 1). A mono progress counter `01/04` updates; a crimson progress line fills below.

### 15.3 Panels (exact copy)
| # | Title | Copy | Deliverables (bullets in mono) |
|---|---|---|---|
| 01 | **Websites for local business** | `Most nearby businesses have no website — or a weak one. I build fast, brand-matched sites that make them look as good online as they are in person.` | `Brand-matched design` · `Mobile-first build` · `SEO basics` · `Launch support` |
| 02 | **Web apps & dashboards** | `From calculators to full platforms — React frontends, clean APIs, secure by default.` | `React / Vite` · `API integration` · `Auth & security pass` · `Deployment` |
| 03 | **AI-powered products** | `RAG assistants, sentiment tools and smart automations that turn raw data into decisions.` | `RAG pipelines` · `FastAPI backends` · `Prompt engineering` · `Evaluation` |
| 04 | **Workshops & teaching** | `Hands-on AI, coding and prompt-engineering sessions for schools and student groups, ages 6 to 16.` | `Lesson plans` · `Live sessions` · `Student projects` · `Certificates` |

Each panel: huge Fraunces number (`--fs-mega`, outline only, 1px bone-ghost) behind the title; a **crimson corner bracket** (L-shaped hairlines) at top-left and bottom-right that **expands** (`scale 0.6→1`) on hover; the panel **tilts** and the whole track subtly **skews** by scroll velocity (`skewX ±4deg`).

### 15.4 CTA at the end of the track
A final slim panel: `Have a business that needs a better front door?` (Fraunces 300) + `Let's talk →` magnetic pill linking to `#contact`.

---

## 16. SECTION 07 — TOOLKIT / SKILLS

`id="toolkit"` · `data-bg="grad-void"`.

### 16.1 SectionHeader
Meta: `(05)` · `TOOLKIT`. Title: `The tools` / `of the *trade*`. Ghost word: `TOOLKIT`.

### 16.2 Layout: "constellation" + grouped lists
**Left:** an interactive **canvas/SVG constellation** (≈ 520px square, hidden < 900px or replaced by a static list): skills as **nodes** (small circles) connected by hairline edges into a star-map echoing the logo's sparkles. Node colour: bone; core skills crimson. Hovering a node enlarges it (`scale 1.8`), highlights its connected edges in crimson, and shows a mono label. Nodes **gently float** (Perlin drift, ±6px) and are **pushed away** by the cursor (radius 120px).
**Right:** grouped lists with hairline separators:

| Group | Items |
|---|---|
| **Frontend** | `React` · `TypeScript` · `Vite` · `Tailwind CSS` · `HTML/CSS/JS` · `GSAP` · `Framer Motion` |
| **Backend & Data** | `Python` · `FastAPI` · `REST APIs` |
| **AI** | `RAG` · `Sentiment analysis` · `Prompt engineering` · `Ollama (local LLMs)` |
| **Embedded / IoT** | `ESP32-S3` · `ESP32-P4` · `Sensors & servos` |
| **Workflow** | `Google Antigravity` · `Git & GitHub` · `Cloudflare Pages` · `Excel (intermediate)` |
| **Languages** | `English — intermediate–advanced` · `Hindi — advanced` · `Japanese — learning` · `Spanish — learning` |

Each item is a line: name left (Manrope 600), a **skill bar** right (2px hairline, crimson fill) — **only for Frontend, Backend and AI groups** — filling to the value on enter (`1.4s expo.out`, staggered): React 90, TypeScript 70, Vite 85, Tailwind 90, HTML/CSS/JS 92, GSAP 75, Framer Motion 70, Python 78, FastAPI 70, REST 75, RAG 65, Sentiment 60, Prompt Eng 88, Ollama 60. (Owner may edit in `skills.ts`.) Group headings: mono caps, crimson index.

Hovering an item **highlights the matching constellation node** and vice-versa (bi-directional hover linking).

---

## 17. SECTION 08 — EDUCATION & CLUBS

`id="education"` · `data-bg="grad-smoke"` · glow bottom-right.

### 17.1 SectionHeader
Meta: `(06)` · `EDUCATION`. Title: `Always` / `*learning*`. Ghost word: `LEARN`.

### 17.2 Layout: two "index card" columns
**Card 1 — Academics**
- `Diploma in Computer Science Engineering` (Fraunces 800, `--fs-h3`)
- `Amity University, Greater Noida Campus` (Manrope)
- Mono: `SEP 2024 — MAY 2027` · `5TH SEMESTER` · `CGPA 7.43 (SO FAR)`
- A **CGPA ring**: SVG circle, stroke crimson, `stroke-dashoffset` animating to `7.43/10` (`1.6s expo.out`), number counts inside in Fraunces.

**Card 2 — Clubs & Roles**
- `Aegis` — `Core member · Student coordinator for events`
- `Aarohan` — `Member · Cultural club`
(Each as a hover-reveal row with hairlines; the hovered row's icon (sparkle) rotates 180°.)

**Card 3 (wide, below) — Courses & Certificates**
- `Python & AI Summer Camp — Rancho Labs × IIT Delhi IHFC (2024)`
- `STEM Educator Internship Certificate — Vision Sports School (2026)`
- `NTCC Internship-I (PTCHIN101) — Amity Polytechnic (2026)`

Cards **lift** on hover (`y -8`, hairline brightens, soft crimson under-glow). On enter, cards **stagger-rise** with `rotateX 12 → 0` and `y 60 → 0` (`1.1s expo.out`, `0.15s` stagger).

---

## 18. SECTION 09 — SOCIALS (COLOUR-TRANSITION, FULLY INTERACTIVE)

`id="socials"` · `data-bg="grad-void"` · This section is built around **colour transitions on hover** — the "wow" moment.

### 18.1 SectionHeader
Meta: `(07)` · `SOCIALS`. Title: `Find me` / `*elsewhere*`. Ghost word: `SOCIAL`. Intro: `Four places I actually show up. Pick one.`

### 18.2 Layout: giant interactive rows
Four **full-width rows**, each ~`22vh` tall (min 140px), separated by hairlines, stacked vertically.

Each row contains, left→right:
1. Mono index `01`…`04`.
2. **Platform name** in Fraunces 800, `clamp(3.5rem, 11vw, 11rem)`, bone, tracking `-0.04em`.
3. Right-aligned: mono handle (e.g. `@prakharrai12`), then a **circular arrow button** (56px, hairline) with `↗`.

| # | Platform | Handle shown | URL source | Flood colours (hover) |
|---|---|---|---|---|
| 01 | **GitHub** | `@prakharrai12` | `site.socials.github.url` | `#0D1117 → #30363D → #F4EFE4` (monochrome silver flood) |
| 02 | **LinkedIn** | `Prakhar Kaushik` | `site.socials.linkedin.url` | `#0A66C2 → #004182` (LinkedIn blue — **allowed here only**) |
| 03 | **Instagram** | `@your_handle` | `site.socials.instagram.url` | `#F58529 → #DD2A7B → #8134AF → #515BD4` (Instagram gradient — **allowed here only**) |
| 04 | **Email** | `prakhar1532006@gmail.com` | `mailto:` | `--grad-crimson-flood` (brand crimson) |

> The brand-colour exception applies **only** to the hover flood on this section. Outside hover these rows are pure black/bone.

### 18.3 The colour-flood hover (exact mechanics)
1. Each row has an absolutely-positioned **flood layer** (`inset:0`) with the platform's gradient, using `clip-path: circle(0% at var(--mx) var(--my))`.
2. `--mx`/`--my` are set on `pointerenter` to the **entry point of the cursor** (relative to the row) so the colour **expands out of where you touched it**.
3. On hover: animate `clip-path` to `circle(150% at var(--mx) var(--my))` over `0.7s`, `cubic-bezier(0.76, 0, 0.24, 1)`.
4. On `pointerleave`: update `--mx/--my` to the **exit point** and collapse `circle(150%…) → circle(0%…)` over `0.55s` — colour retreats toward where you left.
5. During flood: platform name colour transitions to the contrasting colour (`--ink` on GitHub silver/crimson; `#fff` on LinkedIn/Instagram) over `0.4s`; hairline brightens; handle text slides `x -8px`; arrow button fills bone with ink arrow and **rotates 45° → 0**.
6. **Page-level echo:** while a row is hovered, the **global background journey layer** receives a tinted radial glow in the platform colour at 18% opacity, centred at the row — the whole page subtly shifts hue, returning to black on leave (`0.8s`).
7. **Floating preview card** follows the cursor (lerp `0.14`): a 220×140 mini card showing the platform icon (large, 1.5 stroke SVG), the handle, and a mono line (`GITHUB — 11 REPOS · OPEN SOURCE`, `LINKEDIN — LET'S CONNECT`, `INSTAGRAM — BEHIND THE BUILDS`, `EMAIL — REPLY WITHIN 24H`). Fades/scale-in on enter (`0.3s`). Hidden on touch.
8. **Cursor** = `[data-cursor="open"]` ("OPEN ↗").
9. **Click:** a **ripple** of the platform colour expands from the click point filling the viewport for `0.45s` *just before* opening the link in a new tab (`target="_blank" rel="noopener noreferrer"`); then the ripple recedes. For `mailto:` do not ripple-block — just fire.
10. **Touch devices (no hover):** rows flood automatically when they enter the viewport centre (`ScrollTrigger`, toggle actions), one at a time, and tapping opens the link.
11. **Keyboard:** rows are focusable; focus triggers the same flood from the centre; Enter opens the link.

### 18.4 Magnetic social dock (below the rows)
A small row of **4 circular icon buttons** (64px, hairline) with magnetic pull (`strength 0.45`), each icon redrawn as a 1.5px stroke SVG. Hover: circle fills with the platform's colour (instant for icons, `0.3s`), icon turns white/ink, tooltip appears above (mono). These are for quick access / mobile.

### 18.5 Section-in transition
As Socials enters, the previous (smoke grey) background **melts to pure black** while a **single crimson sparkle** large (`40vw`, opacity 0.05) slowly rotates behind the rows.

---

## 19. SECTION 10 — CONTACT

`id="contact"` · `data-bg="grad-paper"` — **the inversion to cream paper (see 7.4).**

### 19.1 SectionHeader (ink on paper)
Meta: `(08)` · `CONTACT`. Title: `Let's make` / `something *iconic*`. Ghost word: `HELLO`. (Title in `--paper-ink`; italic word in crimson; ghost outline in `rgba(10,10,11,0.07)`.)

### 19.2 Layout
Two columns. **Left:** big pitch + direct links. **Right:** the contact form.

**Left copy (exact):**
- Lead (Fraunces 300, `--fs-h3`, ink): `Got a business without a proper website? A project that deserves better design? A workshop for your school? Tell me about it.`
- Mono details list:
  ```
  EMAIL ......... prakhar1532006@gmail.com
  STUDIO ........ prikaushionv@gmail.com
  BASED IN ...... New Delhi, India
  RESPONSE ...... Within 24 hours
  ```
  (Do **not** show any phone number.) Each email is a copy-to-clipboard link: click → text swaps to `COPIED ✓` for 1.6s and a **crimson underline** sweeps.
- A **giant "Say hello" circular button** (180px, crimson fill, ink text, sparkle orbiting) that opens `mailto:prakhar1532006@gmail.com`; magnetic (`0.5`); its text rotates in a circle on hover.

**Right: form** (fields; use `Formspree`/`mailto` fallback — implement as `mailto:` composition by default so no backend is needed; leave an `onSubmit` hook comment for Formspree):
1. `Your name` (text)
2. `Email` (email)
3. `What are you building?` (select chips: `Website` · `Web app` · `AI product` · `Workshop` · `Something else`) — chip multi-select, selected chips fill ink with paper text.
4. `Tell me more` (textarea)
5. Submit: **"Send it"** pill (ink fill, paper text) with arrow.

**Field styling:** no boxes — only a **bottom hairline** (`1px`, ink 22%). Labels are mono caps and **float up** on focus. On focus, a **crimson line draws** under the field left→right (`0.5s`). Validation errors: mono red text slides down; field underline turns crimson and **shakes** (`x ±6px`, `0.4s`).
Submit success: form content **dissolves** and is replaced by `Message ready — your mail app just opened.` with a crimson sparkle spinning in.

### 19.3 Contact reveal
As the paper background tweens in, left-column elements slide `y 40→0` staggered; form fields rise one by one (`0.08s`); the "Say hello" button **scales from 0 with an overshoot-free expo.out** (`1.2s`).

---

## 20. FOOTER

`data-bg="ink"` — page flips back to black; text colours revert to bone.

### 20.1 Content
1. **Giant wordmark** across full width: `prikaushion` in Fraunces 800, `clamp(5rem, 22vw, 24rem)`, bone, tracking `-0.05em`; the **K in crimson**. On scroll into view, letters **rise from below** with a stagger; on hover, each letter lifts `y -2vw` with spring-less `power3.out` as the cursor passes (a "piano" effect).
2. **Top row:** nav links (mono) · `BACK TO TOP ↑` (magnetic, scrolls to top with Lenis `duration 2`).
3. **Middle row:** the orbit arc divider; sparkle.
4. **Bottom row (mono 11px):** `© 2026 PRAKHAR KAUSHIK / PRIKAUSHION` · `DESIGNED & BUILT IN NEW DELHI` · `LOCAL TIME — [live clock IST]` (updates every second, tabular nums).
5. A small **"Built with taste"** easter egg: clicking the K in the wordmark triggers the sparkle-burst (as in 10.5) and a one-time mono toast `YOU FOUND THE K.`

---

## 21. MOTION LIBRARY (every animation defined)

**Easings (define as constants in `/src/lib/ease.ts`):**
```
expoOut:   "expo.out"                  / cubic-bezier(0.16, 1, 0.3, 1)
expoInOut: "expo.inOut"                / cubic-bezier(0.87, 0, 0.13, 1)
quartOut:  "power4.out"                / cubic-bezier(0.25, 1, 0.5, 1)
smooth:    cubic-bezier(0.22, 1, 0.36, 1)
flood:     cubic-bezier(0.76, 0, 0.24, 1)
```
**Durations:** micro `0.2–0.35s`, UI `0.4–0.7s`, reveal `0.9–1.4s`, ambient loops `6–60s`.

| Name | Used for | Definition |
|---|---|---|
| `charReveal` | All section titles | chars `y 110%, rotZ 4deg, op 0 → 0, 0, 1`; `1.1s`; `expoOut`; stagger `0.025` |
| `lineMask` | Role/titles in lists | wrapper `overflow:hidden`; inner `yPercent 100 → 0`; `1s`; `expoOut` |
| `fadeUp` | Paragraphs | `y 24 → 0`, `op 0 → 1`; `0.9s`; `power3.out` |
| `clipWipe` | Images | `clip-path inset(100% 0 0 0) → inset(0)`; `1.4s`; `expoInOut` |
| `rulesDraw` | Hairlines | `scaleX 0 → 1`, origin left; `1.4s`; `expoInOut` |
| `ghostParallax` | Ghost words | `x +8vw → -8vw`; scrub 1 |
| `counterUp` | Stats | `0 → N`; `2s`; `power2.out` |
| `barFill` | Skill bars | `scaleX 0 → v`; `1.4s`; `expoOut`; stagger `0.06` |
| `magnetic` | Buttons | pointer within 1.4× radius pulls element by `strength × delta`; release `0.6s` elastic-free `power3.out` |
| `tilt` | Cards | `rotateX/Y ±6deg` on pointer; reset `0.8s` `power3.out` |
| `spotlight` | Cards/rows | CSS var `--mx/--my` → `radial-gradient(260px at var(--mx) var(--my), rgba(244,239,228,.10), transparent 70%)` |
| `flood` | Socials | `clip-path circle()` expansion — see 18.3 |
| `sparkleBurst` | K click, footer | 12 sparkles; radial angle `i*30°`; distance `60–140px`; `scale 0.4 → 1 → 0`; `0.9s`; `power2.out` |
| `velocitySkew` | Services track, marquee | `skewX = clamp(velocity*0.02, -4, 4)deg` |
| `bgJourney` | Page background | see 7.4 |
| `navHide` | Nav | `yPercent 0 ↔ -100`; `0.5s`; `expoOut` |

**Scroll triggers:** content reveals use `start: "top 82%"`, `once: true`; scrubbed effects use `scrub: 1` (never `true` — the 1s lag is the "weighty" feel); pinned sections use `anticipatePin: 1`.

---

## 22. BUILD ORDER

1. **Phase 0 — Setup:** Vite + React + TS, Tailwind, fonts (`@fontsource`), GSAP + ScrollTrigger, Lenis, Framer Motion, lucide-react. Create `/config/*`. Create design tokens in `globals.css` and Tailwind theme extension.
2. **Phase 1 — Assets:** create/derive all brand assets (Section 1.1), portrait processing (1.2), project screenshots (14.4).
3. **Phase 2 — Foundations:** grain, scroll progress, custom cursor, Lenis wiring, `BackgroundJourney` (7.4), `SectionHeader`, `SplitText`, `MagneticButton`, `Marquee`.
4. **Phase 3 — Shell:** preloader, nav (desktop + mobile), footer.
5. **Phase 4 — Sections in order:** Hero → Marquee → About → Work → Projects → Services → Toolkit → Education → Socials → Contact.
6. **Phase 5 — Section bridges** (6.2) and cross-section colour transitions (7.4).
7. **Phase 6 — Polish:** easter eggs, tooltips, empty states for TODO links, focus states, reduced-motion, mobile pass.
8. **Phase 7 — QA & performance:** Lighthouse, cross-browser, real-device touch test.
9. **Phase 8 — Deploy** to the owner's hosting target with correct `base`.

---

## 23. ACCEPTANCE CHECKLIST

**Brand & feel**
- [ ] Palette uses only ink/obsidian/charcoal/oxblood/burgundy/crimson/bone (+ social brand colours on hover in Socials only).
- [ ] No purple/blue/pink AI gradient anywhere outside the Socials hover.
- [ ] Looks classy, dark, editorial — not a template.
- [ ] Logo is used correctly (preloader on cream; derived marks elsewhere).

**Typography**
- [ ] Every section title follows 5.2 with the crimson Instrument Serif italic word.
- [ ] Fraunces variable axes are active (weight reacts on hero name).
- [ ] Mono labels everywhere for indices/meta.

**Section separation**
- [ ] Every section has the SectionHeader with meta row, drawing rule, sparkle, ghost word, title.
- [ ] Section bridges with marquee + orbit arc between sections.

**Colour journey**
- [ ] Background shifts per the 7.4 table while scrolling; glow position drifts.
- [ ] Contact inverts to cream and flips text colours; footer returns to black.

**Interactivity**
- [ ] Custom cursor states all work (default, link, view, drag, open, text).
- [ ] Magnetic buttons, tilt cards, spotlight, hover dimming on Work, bi-directional hover in Toolkit.
- [ ] Socials flood from the pointer entry point and retreat to the exit point; page-level tint echoes.
- [ ] Hero name responds to cursor; K reacts and bursts on click.

**Content**
- [ ] About has the portrait (arched, parallax, rotating stamp) and all exact copy.
- [ ] Work lists all six entries with the exact data.
- [ ] **Projects lists all 11 with working Live and Code buttons** (disabled with tooltip when URL is `TODO`).
- [ ] Socials: GitHub, LinkedIn, Instagram, Email — all from `site.ts`.
- [ ] No phone number shown anywhere.

**Quality**
- [ ] 60fps scroll on mid-range laptop; no layout shift; images lazy-loaded.
- [ ] `prefers-reduced-motion` respected.
- [ ] Mobile (360px) and tablet (768px) fully usable; touch alternatives implemented.
- [ ] Keyboard navigation + visible focus states.
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

---

## 24. PERFORMANCE, ACCESSIBILITY, RESPONSIVE, SEO

### 24.1 Performance
- Animate only `transform`, `opacity`, `clip-path`, and CSS variables; never animate `width/height/top/left`.
- `will-change: transform` only on actively animating elements, removed after.
- Images: WebP/AVIF, `srcset`, explicit `width/height`, `loading="lazy"` below the fold, blur-up placeholders.
- Fonts: self-hosted, subsetted to Latin, `font-display: swap`, preload Fraunces + Manrope.
- Code-split heavy sections (Toolkit constellation, Services horizontal track) with `React.lazy`.
- Kill all ScrollTriggers on unmount; `ScrollTrigger.refresh()` after fonts and images load.
- Cap devicePixelRatio for canvas at 2.

### 24.2 Responsive breakpoints
`360 · 480 · 768 · 900 · 1200 · 1440 · 1920`.
- `< 900px`: hide right-edge section dots, constellation, floating previews, custom cursor; Projects Tier A becomes a **vertical card list without sticky stacking** (keep tilt off); Services becomes **horizontal swipe** with scroll-snap; Socials uses auto-flood on scroll; name sizes via the fluid clamp scale; stats 2×2.
- `≥ 1920px`: constrain content to `1440px`; allow background glows and ghost words to extend.

### 24.3 Accessibility
- Semantic landmarks (`header`, `nav`, `main`, `section[aria-labelledby]`, `footer`).
- Section titles are real `h2`s; split-char spans use `aria-hidden` with a visually-hidden full text.
- All icon-only buttons have `aria-label`.
- Contrast: bone on ink ≥ 12:1; crimson `#E01B24` on ink ≈ 4.6:1 (use for large text, icons, and UI only — never for small body text).
- Disabled `TODO` links: `aria-disabled="true"` + tooltip text exposed via `aria-describedby`.
- Skip-to-content link visible on focus.
- Marquees pause on focus/hover and are `aria-hidden` with static text alternative.

### 24.4 SEO & meta
```html
<title>Prakhar Kaushik — Frontend Developer & Educator | prikaushion</title>
<meta name="description" content="Portfolio of Prakhar Kaushik (VishRim) — frontend developer, educator and founder of prikaushion. Premium websites, web apps and AI products, built in New Delhi." />
<meta property="og:title" content="Prakhar Kaushik — prikaushion" />
<meta property="og:description" content="Dark, crafted, interactive web experiences. Projects, work and ways to get in touch." />
<meta property="og:image" content="/assets/brand/og-image.png" />
<meta name="theme-color" content="#0A0A0B" />
```
Add JSON-LD `Person` schema (name, alias, jobTitle, url, sameAs = GitHub/LinkedIn/Instagram, email, address locality "New Delhi"). Add `sitemap.xml`, `robots.txt`, canonical URL.

---

## 25. THINGS YOU MUST NOT DO

- ❌ Do not use purple, teal, neon-blue or pink gradients (except inside the Socials hover flood).
- ❌ Do not use lorem ipsum or placeholder copy — every word is provided here.
- ❌ Do not invent project URLs, social handles or a phone number. Use `TODO_` placeholders and the disabled-state pattern.
- ❌ Do not use emoji as UI icons.
- ❌ Do not use a uniform card-grid layout as the main structure of Projects or Services.
- ❌ Do not use bounce/elastic easing or fast, twitchy transitions.
- ❌ Do not drop the grain, the cursor, the colour journey, the section-title formula, or the preloader.
- ❌ Do not shrink the type scale for "safety" — large confident type is the identity.
- ❌ Do not hide scroll animations on desktop to "simplify"; only degrade for `prefers-reduced-motion` and touch.
- ❌ Do not ship until every box in Section 23 is ticked.

---

### FINAL NOTE TO THE AGENT
When a detail is not specified, choose the option that is **darker, quieter, larger in type, and more restrained in colour** — then add one unexpected, tasteful interaction. The standard is: *someone opens this on a phone at 2 AM, scrolls for ten seconds, and thinks "who made this?"*
</USER_REQUEST>
<ADDITIONAL_METADATA>
The current local time is: 2026-11-11T20:51:43+05:30.

The user has uploaded 2 image(s):
- C:/Users/prakh/.gemini/antigravity/brain/9e12d335-aa8a-485b-a587-cea1539fe0f7/.user_uploaded/media_1794410485547_e285f30d.jpg
- C:/Users/prakh/.gemini/antigravity/brain/9e12d335-aa8a-485b-a587-cea1539fe0f7/.user_uploaded/media_1794410493921_8e5d8c3a.jpg
You can embed these images in an artifact if you need the USER to review them.
</ADDITIONAL_METADATA>
<USER_SETTINGS_CHANGE>
The user changed setting `Model Selection` from None to Gemini 3.8 Flash (High). No need to comment on this change if the user doesn't ask about it. If reporting what model you are, please use a human readable name instead of the exact string.
</USER_SETTINGS_CHANGE>