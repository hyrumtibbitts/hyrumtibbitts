import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { PORTFOLIO } from "../lib/content";

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative scroll-mt-20 border-t border-white/10 bg-ink-900/40 py-24 sm:py-32"
    >
      <div className="container-px">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <span className="eyebrow">Our businesses</span>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              The Thunder family of companies.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              A representative look at the kinds of essential businesses we own
              and operate. Once a company joins the family, it stays — we're its
              permanent home.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) * 0.08}>
              <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-6 transition duration-300 hover:-translate-y-1 hover:border-thunder-500/40">
                <div className="absolute right-5 top-5 text-slate-600 transition group-hover:text-thunder-400">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-800 font-display text-lg font-bold text-thunder-400 ring-1 ring-white/10">
                    {c.name.charAt(0)}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {c.blurb}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-medium">
                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-slate-300 ring-1 ring-white/10">
                    {c.sector}
                  </span>
                  <span className="rounded-full bg-thunder-500/10 px-2.5 py-1 text-thunder-300 ring-1 ring-thunder-500/20">
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
