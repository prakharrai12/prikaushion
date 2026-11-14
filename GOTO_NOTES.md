# THE CODER'S GO-TO — RECON & ARCHITECTURE NOTES
**Feature:** Self-contained music player add-on  
**Target:** prikaushion portfolio  
**Status:** Recon Complete · Implementation In Progress

---

## 1. RECON FINDINGS

### 1.1 Placement & Section Ordering
- **Mount Point:** Directly in page flow between `Toolkit` and `Education` with `id="go-to"`.
- **Background Gradient:** `data-bg="grad-void"`. `BackgroundJourney` automatically detects `[data-bg]` sections.
- **Section Bridge:** 
  - Bridge from `Toolkit` -> `The Coder's Go-To`: `nextSection="THE CODER'S GO-TO"`
  - Bridge from `The Coder's Go-To` -> `Education`: `nextSection="EDUCATION & CLUBS"`
- **Section Numbering (Sequential):**
  - `(01)` About Me
  - `(02)` Work
  - `(03)` Projects
  - `(04)` Services
  - `(05)` Toolkit
  - **`(06)` The Coder's Go-To**
  - `(07)` Education & Clubs
  - `(08)` Socials
  - `(09)` Contact

### 1.2 Component & System Reuse
- **SectionHeader:** Reused directly with `index="06"`, `metaName="THE CODER'S GO-TO"`, `ghostWord="PLAYLIST"`, `line1="The coder's"`, `line2="*go-to*"`, and `intro="What's in my headphones when the commits get serious. Press play — I'll keep it low."`.
- **Lenis:** Reused via `getLenis()?.stop()` and `getLenis()?.start()` during Immersive view open/close. `data-lenis-prevent` added to lyrics scrolling container and queue drawer.
- **GSAP:** Reused via `src/lib/gsap.ts`. Scoped context lifecycle with cleanup on unmount.
- **Grain:** Reusing existing `.grain-overlay` and SVG data URI via `--grain-svg` token.
- **Cursor:** Extended `CustomCursor.tsx` to handle `data-cursor="play"`, `data-cursor="pause"`, `data-cursor="drag"`, and `data-cursor="jump"`.
- **ScrollProgress:** Added `{ id: 'go-to', name: "THE CODER'S GO-TO" }` between Toolkit and Education.

### 1.3 Z-Index Strict Hierarchy
- Content / sections: `1–20`
- Nav: `80`
- Launcher + Dock: `85`
- Immersive View: `89` (covers nav and sections, strictly below grain)
- Film Grain Overlay: `90`
- Scroll Progress Bar: `95`
- Toasts: `97`
- Custom Cursor: `100`

### 1.4 State Machine & Collision Safety
- States: `HIDDEN` (56px disc), `DOCKED` (glass mini-player pill), `SECTION` (inline 12-col layout), `IMMERSIVE` (full-screen Spotify-style view).
- Hide ≠ Pause: Hiding the dock retains playback.
- Footer avoidance: Dock/Launcher lifts by `var(--space-7)` (48px) when footer enters viewport.
- Mobile collision: Mobile dock spans full width minus 12px gutters; sticky Hire pill temporarily hides (`opacity: 0, pointer-events: none`) while dock is visible.
- Contact section safety: Launcher and Dock retain dark glass (`rgba(10,10,11,0.82)`) on the cream paper theme.

### 1.5 CSP & Security
- Add `media-src 'self' blob:;` to `vercel.json` Content-Security-Policy.
- Pure React text rendering for lyrics (zero `dangerouslySetInnerHTML`).
- Strict URL validation on external links with `rel="noopener noreferrer"`.

