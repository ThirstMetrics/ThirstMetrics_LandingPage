# ThirstMetrics Landing Page

Texas alcohol sales intelligence — a Next.js marketing landing page with beta access form, business email validation, and Contact Us form.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 3.4 + custom brand tokens
- **Motion:** Framer Motion 11
- **Icons:** Lucide React
- **Typography:** Inter + JetBrains Mono (via `next/font/google`)
- **Utilities:** clsx + tailwind-merge

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
```

Deploy to Vercel, Netlify, or any Node.js host.

## File Tree

```
src/
├── app/
│   ├── api/
│   │   └── beta-access/
│   │       └── route.ts        # POST endpoint: email blocklist + MX record validation
│   ├── globals.css              # Tailwind layers, section utilities, light theme
│   ├── layout.tsx               # Root layout, Inter + JetBrains Mono fonts, metadata
│   └── page.tsx                 # Assembles all 11 sections
├── components/
│   ├── BetaForm.tsx             # Reusable beta access form (hero/section variants)
│   ├── ContactForm.tsx          # Contact Us form with dropdown + conditional Spotlight fields
│   ├── FAQ.tsx                  # 8-question accordion
│   ├── FeatureGrid.tsx          # 6-card differentiator grid
│   ├── FinalCTA.tsx             # Final CTA section using BetaForm
│   ├── Footer.tsx               # Footer with nav links
│   ├── Header.tsx               # Sticky header, translucent on scroll, mobile nav
│   ├── HeroRotator.tsx          # Full-bleed crossfade slideshow + BetaForm card
│   ├── PhotoBand.tsx            # Full-width photo band with overlay statement
│   ├── ProductWalkthrough.tsx   # 3-step walkthrough (Filter → Validate → Plan routes)
│   ├── SpotlightSection.tsx     # Coming-soon Spotlight teaser with CTA
│   └── TrustBar.tsx             # Proof bar (6 capability items with icons)
├── constants/
│   ├── email-blocklist.ts       # 20 blocked free/personal email domains + isBlockedDomain()
│   └── us-states.ts             # 50 US states + DC (value/label pairs for dropdowns)
└── lib/
    ├── motion.ts                # Framer Motion variants (revealUp, stagger, slide, etc.)
    └── utils.ts                 # cn() utility (clsx + tailwind-merge)

public/images/
├── hero/                        # 7 hero slideshow images (1920x1080+)
│   ├── dallas-skyline.jpg
│   ├── bottled-blonde.jpg
│   ├── matts-el-rancho.jpg
│   ├── stubbs-austin.jpg
│   ├── steak-48.jpg
│   ├── pappas-bros.jpg
│   └── ocean-prime.jpg
├── walkthrough/                 # 3 product UI screenshots
│   ├── filter.png
│   ├── validate.png
│   └── routes.png
├── photo-band.jpg               # Full-width band image (2400x800+)
└── PLACEHOLDER_README.md        # Describes each image slot
```

## Page Sections (in order)

1. **Header** — Sticky nav with transparent→frosted glass on scroll; mobile hamburger
2. **HeroRotator** — Full-bleed 7-image crossfade (6s cycle) with two-column layout: copy left, BetaForm right in glassmorphic card
3. **TrustBar** — 6 proof items (public TX receipts, metroplex filters, DBA resolution, etc.)
4. **FeatureGrid** — 6 feature cards with hover effects
5. **PhotoBand** — Full-width photo with dark overlay and statement
6. **ProductWalkthrough** — 3-step walkthrough: Filter → Validate → Plan Routes
7. **SpotlightSection** — Dark gradient section, coming-soon teaser with CTA → `#contact`
8. **FAQ** — 8-question animated accordion
9. **FinalCTA** — Beta access form (section variant) with trust badges
10. **ContactForm** — Contact Us form with dropdown + conditional Spotlight fields
11. **Footer** — Logo, product/company/legal columns

## Beta Access Form

The `BetaForm` component is used in two places:

- **HeroRotator** (right column, `variant="hero"`) — translucent white-on-dark inputs
- **FinalCTA** (`variant="section"`) — white bordered inputs on light background

### Validation Flow

1. **Client-side** (instant): Required field check, email format regex, blocklist check via `isBlockedDomain()`
2. **Server-side** (`POST /api/beta-access`): Re-validates all fields, re-checks blocklist, verifies MX records via `node:dns/promises resolveMx()`
3. **On success**: Redirects to `https://betatexas.thirstmetrics.com` (no PII in URL)
4. **On error**: Displays friendly inline message (e.g., "Please use your work email")

### Blocked Domains

The blocklist in `src/constants/email-blocklist.ts` includes 20 free/personal providers:
`gmail.com`, `yahoo.com`, `outlook.com`, `hotmail.com`, `icloud.com`, `protonmail.com`, `proton.me`, `aol.com`, `mail.com`, `zoho.com`, `yandex.com`, `gmx.com`, `live.com`, `msn.com`, `me.com`, `fastmail.com`, `tutanota.com`, `hushmail.com`, `inbox.com`, `pm.me`

To add more domains, edit the `BLOCKED_EMAIL_DOMAINS` array.

## Contact Form

`ContactForm` is a separate form at `#contact` with:
- Full Name, Work Email, Company (all required with business email validation)
- Reason dropdown: ThirstMetrics Texas / Spotlight / Custom Data Solution
- **Conditional fields** when "Spotlight" is selected: textarea + US state dropdown
- Does **not** redirect on submit — currently logs payload to console
- Shows success state with animated checkmark

**TODO:** Replace `console.log` in `ContactForm.tsx` with a real CRM integration or API endpoint.

## Swapping Images

All placeholder images are SVG stubs saved with their target extensions.
Replace each file with a real raster image at the recommended dimensions:

| Path | Size | Subject |
|------|------|---------|
| `/images/hero/dallas-skyline.jpg` | 1920x1080 | Dallas skyline at dusk |
| `/images/hero/bottled-blonde.jpg` | 1920x1080 | Bottled Blonde Dallas interior/patio |
| `/images/hero/matts-el-rancho.jpg` | 1920x1080 | Matt's El Rancho Austin |
| `/images/hero/stubbs-austin.jpg` | 1920x1080 | Stubb's Austin venue |
| `/images/hero/steak-48.jpg` | 1920x1080 | Steak 48 dining room |
| `/images/hero/pappas-bros.jpg` | 1920x1080 | Pappas Bros Steakhouse bar |
| `/images/hero/ocean-prime.jpg` | 1920x1080 | Ocean Prime Galleria Houston |
| `/images/photo-band.jpg` | 2400x800 | Wide-angle bar/restaurant scene |
| `/images/walkthrough/filter.png` | 800x600 | Filter UI screenshot |
| `/images/walkthrough/validate.png` | 800x600 | Account detail screenshot |
| `/images/walkthrough/routes.png` | 800x600 | Export / map view screenshot |

## Theme Tokens

Brand colors are defined in `tailwind.config.ts` under `brand` (deep teal)
and `accent` (cyan). The palette names changed from `teal`/`cyan` to
`brand`/`accent` to avoid collision with Tailwind defaults.

Custom shadows: `soft`, `card`, `card-hover`, `glow` — defined in `tailwind.config.ts`.

## Motion & Accessibility

- All scroll reveals use `whileInView` with `viewport={{ once: true }}`.
- Hero slideshow respects `prefers-reduced-motion` and stops cycling.
- Global CSS disables all animations/transitions when reduced motion is on.
- ContactForm Spotlight fields animate in/out with Framer Motion.
