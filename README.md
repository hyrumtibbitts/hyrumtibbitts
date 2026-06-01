# Thunder Capital — Marketing Site

A modern, premium landing page for **Thunder Capital LLC**, a people-first,
operator-led **perpetual holding company** that acquires and grows
high-quality, cash-flowing businesses in essential industries — and holds them
for the long term.

The visual design follows the **typeui.sh Enterprise design system** — a clean,
high-contrast, accessible enterprise aesthetic — while carrying the firm's
**Wheaton Thunder** heritage through the lightning mark and orange accent.

## Design system (typeui.sh Enterprise)

Tokens live in `tailwind.config.js`:

| Token | Value | Usage |
| --- | --- | --- |
| `brand` (primary) | `#072C2C` | Deep-teal panels, headings, footer |
| `accent` (secondary) | `#FF5F03` | CTAs, eyebrows, links, highlights |
| `surface` | `#EDEADE` | Page background |
| `surface.card` | `#FFFFFF` | Cards, form fields |
| `ink` | `#111827` | Body text |
| `success`/`warning`/`danger` | `#16A34A` / `#D97706` / `#DC2626` | States |

- **Type:** Oswald (display), Ubuntu (body), Ubuntu Mono (numerals/labels).
- **Accessibility:** WCAG 2.2 AA targets — visible `:focus-visible` rings on all
  interactive elements, ≥44px touch targets, and high-contrast text pairings
  (e.g. dark text on the orange CTA rather than failing white-on-orange).
- **Motion:** only a single purposeful fade-up on scroll; no looping/decorative
  animation, per the design rules.

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (Enterprise design tokens)
- **Framer Motion** for the scroll-reveal entrance
- **lucide-react** icons

## Sections

| Section | Purpose |
| --- | --- |
| Hero | Positioning: a perpetual holding company built to endure |
| Values band | Permanent capital · operator-led · people-first · essential industries |
| About | The firm's philosophy, adapted from its own words |
| Focus | The essential industries it concentrates on |
| Approach | How it operates as an owner + a respectful acquisition process |
| Businesses | A representative look at the Thunder family of companies |
| Team | The operators behind the firm |
| Get in touch | A confidential contact form aimed at business owners |

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build to ./dist
npm run preview  # preview the production build
```

## Notes

- The contact form is front-end only and shows a confirmation on submit; wire it
  to your backend / CRM / email provider of choice when ready.
- Company names, team members, metrics, and portfolio businesses are
  illustrative placeholders. Replace `src/lib/content.ts` with real content.
- All brand colors and fonts are defined in `tailwind.config.js`.
