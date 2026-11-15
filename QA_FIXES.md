# PRIKAUSHION PORTFOLIO — QA FIXES LOG

**Site:** https://prikaushion.vercel.app  
**Owner:** Prakhar Kaushik ("VishRim")  
**Branch:** `main`

---

## Phase B: Grid, Spacing & Visibility Fixes

### 1. Root-Cause Restoration of Tailwind Spacing Scale (DEF-01)
- **File:** `tailwind.config.js`
- **Before:**
  ```javascript
  spacing: {
    '1': 'var(--space-1)',
    ...
    '10': 'var(--space-10)', // = 128px!
    '11': 'var(--space-11)', // = 192px!
  }
  ```
- **After:**
  ```javascript
  spacing: {
    'space-1': 'var(--space-1)',
    ...
    'space-10': 'var(--space-10)',
    'space-11': 'var(--space-11)',
    'section-y': 'var(--section-y)',
    'gutter': 'var(--gutter)',
  }
  ```
- **Impact:**
  - Standard Tailwind utilities (`w-10`, `w-11`, `h-10`, `h-11`, `gap-10`, `p-10`) are restored to exact design specifications (40px / 44px).
  - Eliminates distortion of music player dock play/pause button (previously stretched into a 192px capsule).
  - Restores correct 40px height to Projects modal header bar (`h-10`).
  - Restores custom cursor ring dimensions (`w-10 h-10` = 40px × 40px).

### 2. Font Descender Breathing Room in Masked Headers (DEF-04)
- **File:** `src/globals.css`
- **Before:**
  ```css
  .title-line-mask {
    overflow: hidden;
    display: block;
  }
  ```
- **After:**
  ```css
  .title-line-mask {
    overflow: hidden;
    display: block;
    padding-bottom: 0.18em;
    margin-bottom: -0.18em;
    padding-top: 0.05em;
    margin-top: -0.05em;
  }
  ```
- **Impact:**
  - Fraunces Variable glyphs with long descenders (`g`, `y`, `p`, `j`, `q`) are no longer clipped at the bottom by mask boundaries across all section headers.

### 3. Intentional Mask Tagging for Marquee & Decorative Assets (DEF-05)
- **Files:** `src/sections/Hero.tsx`, `src/components/Marquee.tsx`, `src/components/SectionBridge.tsx`
- **Fix:** Added `data-intentional-mask="true"` to isolated container wrappers.
- **Impact:** Differentiates intentional bleeding art (e.g. infinite marquee tracks and right-bleeding starburst logo) from accidental layout overflows.

### 4. Sticky Header Inactive Visibility Hardening (DEF-06)
- **File:** `src/components/SectionHeader.tsx`
- **Fix:** Switched inactive state from `opacity-0` to `opacity-0 -translate-y-2 invisible pointer-events-none`.
- **Impact:** Completely excludes inactive sticky section headers from hit-testing, tap target collisions, and screen reader announcements.

### 5. Viewport Safe Units on Fixed Dock
- **File:** `src/features/codersGoTo/ui/Dock.tsx`
- **Fix:** Replaced `w-[calc(100vw-24px)]` with `w-[calc(100dvw-24px)] max-w-[420px]`.
- **Impact:** Ensures mobile browser dynamic scrollbars never cause sub-pixel horizontal shifting.
