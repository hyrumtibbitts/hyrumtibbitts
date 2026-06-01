import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { PORTFOLIO } from "../lib/content";

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative scroll-mt-20 bg-surface-sunken py-24 sm:py-32"
    >
      <div className="container-px">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <span className="eyebrow">Our businesses</span>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-brand sm:text-5xl">
              The Thunder family of companies.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              A representative look at the kinds of essential businesses we own
              and operate. Once a company joins the family, it stays — we're its
              permanent home.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) * 0.08}>
              <article className="group relative flex h-full flex-col justify-between rounded-xl border border-brand/10 bg-surface-card p-6 shadow-card transition-shadow duration-200 hover:shadow-card-hover">
                <div className="absolute right-5 top-5 text-ink-muted transition-colors group-hover:text-accent-600">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand font-display text-lg font-bold text-accent-400">
                    {c.name.charAt(0)}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-brand">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {c.blurb}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-medium">
                  <span className="rounded-md bg-surface-sunken px-2.5 py-1 text-ink-soft">
                    {c.sector}
                  </span>
                  <span className="rounded-md bg-accent-50 px-2.5 py-1 text-accent-700">
                    {c.tag}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
