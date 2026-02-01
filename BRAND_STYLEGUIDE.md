# ThirstMetrics Brand Style Guide

---

## 1. Brand Mini Style Guide

### Brand Position
- **Personality:** Precise, confident, forward-thinking. Data you can drink in.
- **Tone:** Authoritative but approachable. Never stuffy. Technical credibility without jargon overload.
- **Visual Language:** Clean geometric layouts, generous whitespace, data-visualization-inspired accents. Full-bleed color blocks create rhythm and gravitas.

### Color Philosophy
- Deep teal conveys **trust, depth, and intelligence** -- the credibility of a product that handles real metrics.
- Cyan accent is the **signal color** -- it draws the eye to CTAs, live data, and key numbers.
- Neutral slate palette keeps text readable and UI grounded without competing with brand colors.
- Use teal-to-cyan gradients sparingly for hero sections and premium moments only.

### Typography Rules
- **Inter** for all UI and body text. Its open counters and tall x-height maximize screen legibility.
- **JetBrains Mono** (or `font-mono` fallback) exclusively for numeric data, metrics, code snippets, and pricing figures.
- Never use more than 3 font weights on a single screen (400, 500, 700 recommended).
- Headings use tight tracking (`-0.02em` to `-0.03em`). Body uses default tracking.

### Layout Principles
- **Full-bleed sections**: Every major section spans 100vw with its own background color/treatment.
- **Content gutters**: Use `px-6` (mobile) / `px-12` (md) / `px-24` (xl) / `px-32` (2xl) for horizontal padding inside full-bleed sections. No narrow `max-w-7xl` wrappers.
- **Max-width for text only**: Prose blocks cap at `max-w-2xl` for readability. Grid layouts and cards can span the full gutter-to-gutter width.
- **Vertical rhythm**: Sections separated by `py-24` (mobile) / `py-32` (desktop) minimum.
- **Grid**: 12-column CSS grid on desktop. 4-column on mobile. Gap of `2rem` (32px).

### Imagery & Iconography
- Use geometric, line-style icons (Lucide or Phosphor). Stroke width 1.5px.
- Data visualizations use the brand palette. Never rainbow charts.
- Photography (if any): dark, desaturated, overlaid with teal tint at 60% opacity.

### Motion Guidelines (Framer Motion)
- **Scroll reveals**: Elements fade up with subtle Y-translation. Stagger children by 0.08s-0.12s.
- **Duration**: 0.5s-0.7s for section reveals. 0.2s-0.3s for micro-interactions.
- **Easing**: Use `[0.25, 0.1, 0.25, 1]` (ease-out cubic) for entrances. `[0.4, 0, 0.2, 1]` for exits.
- **Reduce motion**: Always respect `prefers-reduced-motion`. Disable transforms, keep opacity-only fade.
- **No bounce, no overshoot**: This is a data product. Motion should feel precise, not playful.

---

## 2. Theme Tokens

```typescript
// theme.ts -- Design tokens for ThirstMetrics

export const theme = {
  colors: {
    // === Brand ===
    teal: {
      50:  "#e6f5f5",
      100: "#b3e0e0",
      200: "#80cccc",
      300: "#4db8b8",
      400: "#26a8a8",
      500: "#0d7377",  // Primary brand teal
      600: "#0a5f63",
      700: "#084c4f",
      800: "#063a3c",
      900: "#042829",
      950: "#021a1b",
    },
    cyan: {
      50:  "#e6fcfc",
      100: "#b3f5f6",
      200: "#80eff0",
      300: "#4de8ea",
      400: "#22d3e6",  // Primary accent cyan
      500: "#17b8cc",
      600: "#0e9aab",
      700: "#097c8a",
      800: "#065e69",
      900: "#034048",
    },
    // === Neutrals (Slate) ===
    slate: {
      50:  "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      950: "#020617",
    },
    // === Semantic ===
    success: "#10b981",
    warning: "#f59e0b",
    error:   "#ef4444",
    info:    "#22d3e6",  // Maps to cyan.400

    // === Surface ===
    background: {
      primary:   "#020617",   // slate.950 -- dark mode default
      secondary: "#0f172a",   // slate.900
      tertiary:  "#1e293b",   // slate.800
      inverse:   "#f8fafc",   // slate.50  -- light panels
    },
    foreground: {
      primary:   "#f8fafc",   // slate.50
      secondary: "#94a3b8",   // slate.400
      muted:     "#64748b",   // slate.500
      inverse:   "#0f172a",   // slate.900
    },
  },

  gradients: {
    heroGlow:     "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(13,115,119,0.35), transparent)",
    tealToCyan:   "linear-gradient(135deg, #0d7377 0%, #22d3e6 100%)",
    ctaShimmer:   "linear-gradient(90deg, #0d7377, #22d3e6, #0d7377)",
    sectionDark:  "linear-gradient(180deg, #020617 0%, #0f172a 100%)",
    sectionMid:   "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
  },

  typography: {
    fontFamily: {
      sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
    },
    fontSize: {
      xs:   ["0.75rem",  { lineHeight: "1rem"   }],  // 12px
      sm:   ["0.875rem", { lineHeight: "1.25rem" }],  // 14px
      base: ["1rem",     { lineHeight: "1.5rem"  }],  // 16px
      lg:   ["1.125rem", { lineHeight: "1.75rem" }],  // 18px
      xl:   ["1.25rem",  { lineHeight: "1.75rem" }],  // 20px
      "2xl":["1.5rem",   { lineHeight: "2rem"    }],  // 24px
      "3xl":["1.875rem", { lineHeight: "2.25rem" }],  // 30px
      "4xl":["2.25rem",  { lineHeight: "2.5rem"  }],  // 36px
      "5xl":["3rem",     { lineHeight: "1.15"    }],  // 48px
      "6xl":["3.75rem",  { lineHeight: "1.1"     }],  // 60px
      "7xl":["4.5rem",   { lineHeight: "1.05"    }],  // 72px
    },
    fontWeight: {
      normal:   "400",
      medium:   "500",
      semibold: "600",
      bold:     "700",
    },
    letterSpacing: {
      tighter: "-0.03em",
      tight:   "-0.02em",
      normal:  "0em",
      wide:    "0.05em",   // For small caps / labels
    },
  },

  spacing: {
    section: {
      y:      { mobile: "6rem", desktop: "8rem" },     // py-24 / py-32
      gutter: { mobile: "1.5rem", md: "3rem", xl: "6rem", "2xl": "8rem" },
    },
    grid: {
      gap:    "2rem",       // 32px
      columns: { mobile: 4, tablet: 8, desktop: 12 },
    },
    component: {
      xs: "0.25rem",  // 4px
      sm: "0.5rem",   // 8px
      md: "1rem",     // 16px
      lg: "1.5rem",   // 24px
      xl: "2rem",     // 32px
      "2xl": "3rem",  // 48px
    },
  },

  borderRadius: {
    none: "0",
    sm:   "0.375rem",   // 6px  -- subtle rounding for inputs
    md:   "0.5rem",     // 8px  -- cards, buttons
    lg:   "0.75rem",    // 12px -- feature cards
    xl:   "1rem",       // 16px -- hero cards, modals
    "2xl":"1.5rem",     // 24px -- large panels
    full: "9999px",     // pills, avatars
  },

  shadows: {
    sm:    "0 1px 2px rgba(0, 0, 0, 0.3)",
    md:    "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)",
    lg:    "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3)",
    xl:    "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
    glow:  "0 0 20px rgba(34, 211, 230, 0.15), 0 0 60px rgba(13, 115, 119, 0.1)",
    glowStrong: "0 0 30px rgba(34, 211, 230, 0.25), 0 0 80px rgba(13, 115, 119, 0.15)",
    inner: "inset 0 2px 4px rgba(0, 0, 0, 0.3)",
  },

  borders: {
    width: {
      thin:   "1px",
      medium: "2px",
    },
    color: {
      subtle:  "rgba(148, 163, 184, 0.1)",   // slate.400 at 10%
      default: "rgba(148, 163, 184, 0.2)",   // slate.400 at 20%
      strong:  "rgba(148, 163, 184, 0.3)",   // slate.400 at 30%
      accent:  "rgba(34, 211, 230, 0.3)",    // cyan.400 at 30%
      accentStrong: "rgba(34, 211, 230, 0.5)", // cyan.400 at 50%
    },
  },

  motion: {
    // Framer Motion variants
    scrollReveal: {
      initial:  { opacity: 0, y: 30 },
      animate:  { opacity: 1, y: 0 },
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    staggerContainer: {
      animate: {
        transition: { staggerChildren: 0.1 },
      },
    },
    staggerItem: {
      initial:  { opacity: 0, y: 20 },
      animate:  { opacity: 1, y: 0 },
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    fadeIn: {
      initial:  { opacity: 0 },
      animate:  { opacity: 1 },
      transition: { duration: 0.4 },
    },
    scaleIn: {
      initial:  { opacity: 0, scale: 0.95 },
      animate:  { opacity: 1, scale: 1 },
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    // Micro-interactions
    buttonHover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    buttonTap: {
      scale: 0.98,
    },
    // Viewport trigger settings
    viewport: {
      once: true,
      amount: 0.2,
      margin: "-50px",
    },
  },
} as const;

export type Theme = typeof theme;
```

---

## 3. Tailwind Implementation Notes

### tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          50:  "#e6f5f5",
          100: "#b3e0e0",
          200: "#80cccc",
          300: "#4db8b8",
          400: "#26a8a8",
          500: "#0d7377",
          600: "#0a5f63",
          700: "#084c4f",
          800: "#063a3c",
          900: "#042829",
          950: "#021a1b",
        },
        cyan: {
          50:  "#e6fcfc",
          100: "#b3f5f6",
          200: "#80eff0",
          300: "#4de8ea",
          400: "#22d3e6",
          500: "#17b8cc",
          600: "#0e9aab",
          700: "#097c8a",
          800: "#065e69",
          900: "#034048",
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'glow':        '0 0 20px rgba(34,211,230,0.15), 0 0 60px rgba(13,115,119,0.1)',
        'glow-strong': '0 0 30px rgba(34,211,230,0.25), 0 0 80px rgba(13,115,119,0.15)',
      },
      backgroundImage: {
        'hero-glow':    'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(13,115,119,0.35), transparent)',
        'teal-to-cyan': 'linear-gradient(135deg, #0d7377 0%, #22d3e6 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
```

### Layout Utility Patterns

```
Full-bleed section:
  <section className="w-full bg-slate-950 px-6 md:px-12 xl:px-24 2xl:px-32 py-24 md:py-32">

Content grid inside a section:
  <div className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-8">

Prose block (capped width for readability, centered):
  <div className="max-w-2xl mx-auto">

Full-span card grid (no max-width):
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
```

### Component Class Recipes

```
Primary CTA button:
  className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white
    font-semibold px-8 py-3 rounded-lg shadow-glow
    hover:shadow-glow-strong transition-shadow"

Secondary button:
  className="border border-slate-400/20 text-slate-50
    font-medium px-6 py-3 rounded-lg
    hover:border-cyan-400/40 hover:text-cyan-400 transition-colors"

Feature card:
  className="bg-slate-800/50 border border-slate-400/10 rounded-xl p-8
    hover:border-cyan-400/30 transition-colors"

Metric number:
  className="font-mono text-5xl font-bold tracking-tight text-cyan-400"

Section heading:
  className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tighter text-slate-50"

Subheading / description:
  className="text-lg md:text-xl text-slate-400 leading-relaxed"

Subtle divider:
  className="w-full h-px bg-gradient-to-r from-transparent via-slate-400/20 to-transparent"

Glowing badge / tag:
  className="inline-flex items-center px-3 py-1 rounded-full
    bg-cyan-400/10 text-cyan-400 text-sm font-medium border border-cyan-400/20"
```

### Framer Motion Usage

```tsx
// Section reveal wrapper
import { motion } from "framer-motion";
import { theme } from "./theme";

function RevealSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={theme.motion.scrollReveal.initial}
      whileInView={theme.motion.scrollReveal.animate}
      viewport={theme.motion.viewport}
      transition={theme.motion.scrollReveal.transition}
    >
      {children}
    </motion.div>
  );
}

// Staggered list
function StaggerList({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={theme.motion.viewport}
      variants={theme.motion.staggerContainer}
    >
      {children}
    </motion.div>
  );
}

// Each child in a stagger list
function StaggerItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={theme.motion.staggerItem}>
      {children}
    </motion.div>
  );
}

// Accessible: respect prefers-reduced-motion
// In your root layout:
//   <motion.div style={{ willChange: "auto" }}>
// Framer Motion v10+ respects this automatically when using
//   useReducedMotion() hook.
```

### CSS Custom Properties (optional, for non-Tailwind use)

```css
:root {
  --color-teal-500: #0d7377;
  --color-cyan-400: #22d3e6;
  --color-bg-primary: #020617;
  --color-bg-secondary: #0f172a;
  --color-fg-primary: #f8fafc;
  --color-fg-secondary: #94a3b8;
  --shadow-glow: 0 0 20px rgba(34,211,230,0.15), 0 0 60px rgba(13,115,119,0.1);
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --gutter-mobile: 1.5rem;
  --gutter-md: 3rem;
  --gutter-xl: 6rem;
  --gutter-2xl: 8rem;
}
```
