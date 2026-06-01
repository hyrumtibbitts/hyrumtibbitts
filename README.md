# Thunder Capital — Marketing Site

A modern, premium landing page for **Thunder Capital LLC**, a people-first,
operator-led **perpetual holding company** that acquires and grows
high-quality, cash-flowing businesses in essential industries — and holds them
for the long term.

The visual design follows the **typeui.sh Elegant design system** — minimal,
near-monochrome, and typography-led — for a clean, genuine, high-end feel.

## Design system (typeui.sh Elegant)

Restraint is the point: a near-monochrome palette carried by an ink/neutral
text scale and hairline borders, with a single quiet accent used sparingly.
Tokens live in `tailwind.config.js`:

| Token | Value | Usage |
| --- | --- | --- |
| `ink` (+ `2`/`3`/`4`) | `#111827` … `#9CA3AF` | Text hierarchy |
| `line` (+ `strong`) | `#E5E7EB` / `#D1D5DB` | Hairline borders, dividers |
| `surface` (+ `subtle`) | `#FFFFFF` / `#F7F8FA` | Page + alternating sections |
| `accent` | `#3B82F6` | Links, focus rings, single indicators only |
| `success`/`warning`/`danger` | `#16A34A` / `#D97706` / `#DC2626` | States |

- **Type:** Inter (standing in for Google Sans) on the 14/16/18/24/32/40 scale,
  with Anonymous Pro for monospaced numerals. Hierarchy comes from weight and
  spacing, not heavy bold.
- **Accessibility:** WCAG 2.2 AA — visible `:focus-visible` rings on all
  interactive elements, generous hit areas, and high-contrast text.
- **Motion:** a single, subtle fade-up on the hero; nothing decorative.

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (Elegant design tokens)
- **lucide-react** icons (used sparingly, monochrome)

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
