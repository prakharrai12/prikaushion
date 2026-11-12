/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        obsidian: "var(--obsidian)",
        charcoal: "var(--charcoal)",
        graphite: "var(--graphite)",
        oxblood: "var(--oxblood)",
        burgundy: "var(--burgundy)",
        crimson: {
          DEFAULT: "var(--crimson)",
          glow: "var(--crimson-glow)",
        },
        ember: "var(--ember)",
        bone: {
          DEFAULT: "var(--bone)",
          dim: "var(--bone-dim)",
          faint: "var(--bone-faint)",
          ghost: "var(--bone-ghost)",
        },
        paper: {
          DEFAULT: "var(--paper)",
          ink: "var(--paper-ink)",
        },
      },
      fontFamily: {
        serif: ["'Instrument Serif'", "serif"],
        display: ["'Fraunces Variable'", "Fraunces", "serif"],
        sans: ["'Manrope'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        xs: "var(--r-xs)",
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        pill: "var(--r-pill)",
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0em",
        wide: "0.08em",
        widest: "0.18em",
      },
      spacing: {
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
        '7': 'var(--space-7)',
        '8': 'var(--space-8)',
        '9': 'var(--space-9)',
        '10': 'var(--space-10)',
        '11': 'var(--space-11)',
        'section-y': 'var(--section-y)',
      },
    },
  },
  plugins: [],
}

