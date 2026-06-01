# Thunder Capital — Marketing Site

A modern, premium landing page for **Thunder Capital LLC**, a people-first,
operator-led **perpetual holding company** that acquires and grows
high-quality, cash-flowing businesses in essential industries — and holds them
for the long term.

The visual design pairs the **typeui.sh Elegant** foundation (typography-led,
generous whitespace, hairline detailing) with the **Wheaton Thunder** identity —
authentic navy and orange — for a warm, genuine, established feel. Deep-navy
hero and footer bookend a warm cream center, with Wheaton orange threaded
through as the accent.

## Design system

Tokens live in `tailwind.config.js`:

| Token | Value | Usage |
| --- | --- | --- |
| `navy` (+ shades) | `#192C4E` | Wheaton navy — hero, contact, footer, headings |
| `orange` (+ shades) | `#D1501F` | Wheaton orange — CTAs, accents, links, marks |
| `surface` (+ `subtle`/`card`) | `#FBF8F3` / `#F3EDE2` / `#FFFFFF` | Warm cream ground + cards |
| `ink` (+ `2`/`3`/`4`) | `#1B2A41` … `#9AA6B2` | Text hierarchy |
| `line` (+ `strong`) | `#E8E0D3` / `#D8CDBB` | Warm hairlines |
| `success`/`warning`/`danger` | `#16A34A` / `#D97706` / `#DC2626` | States |

- **Type:** Fraunces (serif) for display headings — warmth and character — with
  Inter for body, on the 14/16/18/24/32/40 scale.
- **Accessibility:** WCAG 2.2 AA — visible `:focus-visible` rings, generous hit
  areas, accessible text/background pairings (e.g. `orange-600` fills carry
  white text; small orange text uses `orange-700` on cream).
- **Motion:** a single, subtle fade-up on the hero; nothing decorative.

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (Wheaton design tokens)
- **lucide-react** icons (used sparingly)

## Sections

| Section | Purpose |
| --- | --- |
| Hero | Positioning: a permanent home for good businesses |
| Stats | A quiet row of operating qualities |
| About | The firm's philosophy, in its own words |
| Focus | The essential industries it concentrates on |
| Approach | How it operates as an owner + a respectful acquisition process |
| Criteria | "What we look for" — honest, concrete acquisition criteria |
| Team | The operators behind the firm |
| Contact | A confidential contact form aimed at business owners |

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
- Team members and the email address are illustrative placeholders. Replace the
  content in `src/lib/content.ts` with real details.
- All design tokens and fonts are defined in `tailwind.config.js`.
