# THE CODER'S GO-TO — MUSIC PLAYER ADD-ON

> A self-contained, editorial music player add-on for the **prikaushion** portfolio website (React + Vite + TypeScript + Tailwind CSS + GSAP + Lenis).

---

## 1. OVERVIEW

"The Coder's Go-To" is an isolated, non-intrusive listening experience designed to feel like an integral part of the portfolio's visual and interactive identity:
- **Silent by default**: Zero autoplay, zero automatic media requests before user gesture.
- **Section `(06)`**: Mounted in the page flow between *Toolkit* `(05)` and *Education & Clubs* `(07)`.
- **Circular 3D Orbit Carousel**: Elliptical perspective orbit with billboarded vinyl sleeves, spinning grooved record on play, progress arc, and planet dot.
- **Play / Hide Mechanism**: Fixed floating 56px launcher disc in the bottom-left corner morphing into a 380px glass mini-dock pill with full playback controls.
- **Spotify-Style Immersive View**: Dedicated modal layer (`z-index: 89`) with album art mouse-tilt, audio-driven reactive glow, and glassmorphic synchronized lyrics auto-scrolling with a "Back to live" recovery pill.
- **Strict Z-Index & System Harmony**: Never interferes with Custom Cursor (`100`), Toasts (`97`), ScrollProgress (`95`), Film Grain (`90`), or Nav (`80`).

---

## 2. HOW TO ADD TRACKS

Music, covers, and lyrics are strictly owner-supplied or licensed. To add your own tracks:

### Step 1: Place Your Media Files
- **Audio**: Place your MP3/OGG files in `/public/audio/`  
  *Example*: `/public/audio/deep-focus-01.mp3`  
  *Budget guideline*: 128–160 kbps MP3 (≈ 1–1.2 MB/min, ≤ 6 MB per track).
- **Cover Art**: Place 1:1 square artwork in `/public/covers/`  
  *Example*: `/public/covers/deep-focus-01.webp`  
  *Fallback*: If no cover is provided, the player automatically generates a deterministic SVG generative cover with the brand K-sparkle mark.
- **Lyrics (Optional)**: Place `.lrc` (synced) or `.txt` (plain) in `/public/lyrics/`  
  *Example*: `/public/lyrics/deep-focus-01.lrc`  
  *Format*: Standard LRC timestamps like `[00:15.30]Line of text`. Interludes of > 6 seconds are automatically animated.

### Step 2: Register in `playlist.ts`
Open `src/features/codersGoTo/data/playlist.ts` and update or add the track object:

```ts
{
  id: "track-01",
  title: "Midnight Compile",
  artist: "Prakhar Kaushik",
  durationSec: 184,
  mood: "focus", // "warm-up" | "focus" | "debug" | "ship" | "night" | "celebrate" | "cool-down"
  note: "Dark ambient synths with sub-bass for long refactoring sessions.",
  audio: {
    mp3: "/audio/deep-focus-01.mp3",
    ogg: "/audio/deep-focus-01.ogg", // optional
  },
  cover: {
    src640: "/covers/deep-focus-01.webp",
    src160: "/covers/deep-focus-01.webp",
    blur32: "/covers/deep-focus-01.webp",
  },
  accent: "#E01B24", // Per-track glow accent color
  lyrics: {
    kind: "synced", // "synced" | "plain" | "instrumental" | "none"
    lrcUrl: "/lyrics/deep-focus-01.lrc",
    source: "Original",
    license: "Owned",
  },
  credit: {
    license: "Owned", // "Owned" | "CC0" | "CC-BY" | "CC-BY-SA" | "Licensed"
    attribution: "Original Composition by Prakhar Kaushik",
    sourceUrl: "https://prikaushion.studio",
  },
  externalUrl: "https://open.spotify.com/...", // optional external platform link
}
```

---

## 3. HOW TO COMPLETELY REMOVE THE FEATURE

The feature was engineered to be completely isolated and cleanly removable:

1. In `src/App.tsx`:
   - Delete the lazy import:
     ```tsx
     const CodersGoTo = React.lazy(() => import('./features/codersGoTo'));
     ```
   - Delete the mounted component and its bridge:
     ```tsx
     <SectionBridge nextSection="THE CODER'S GO-TO" />
     <React.Suspense fallback={<div className="min-h-[60vh]" />}>
       <CodersGoTo />
     </React.Suspense>
     ```
2. Delete the directory `src/features/codersGoTo/`.
3. In `src/components/ScrollProgress.tsx`, remove `{ id: 'go-to', name: "THE CODER'S GO-TO" }`.
4. Restore section numbers in `Education.tsx` (`06`), `Socials.tsx` (`07`), `Contact.tsx` (`08`).

---

## 4. VERIFICATION & ACCESSIBILITY

- **Keyboard Support in Immersive View**:
  - `Space`: Play / Pause
  - `←` / `→`: Seek ±5 seconds
  - `Shift + ←` / `Shift + →`: Previous / Next track
  - `↑` / `↓`: Volume ±5%
  - `M`: Toggle Mute
  - `Q`: Toggle Queue Drawer
  - `Esc`: Close view
- **Screen Reader & ARIA**:
  - Full ARIA status announcements for track change and playback toggle.
  - Proper slider semantics on scrubber and volume controls.
  - Focus trap inside the modal layer with focus restored to the triggering button on close.
- **Performance**:
  - Lazy-loaded bundle: ~18.6 kB gzipped JS, ~1.3 kB gzipped CSS.
  - Web Audio Analyser (FFT 256) calculates real-time bass, mid, and high energy for equalizers and glows.

