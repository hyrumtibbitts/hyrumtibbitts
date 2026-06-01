# Thunder Capital — Marketing Site

A modern, premium landing page for **Thunder Capital LLC**, a people-first,
operator-led **perpetual holding company** that acquires and grows
high-quality, cash-flowing businesses in essential industries — and holds them
for the long term.

The design leans into the firm's **Wheaton Thunder** heritage with an electric
orange-and-navy palette, a lightning motif, and a clean, dark, modern aesthetic.

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (custom Thunder brand theme)
- **Framer Motion** for scroll-reveal animations
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
