import Reveal from "./Reveal";
import { PRINCIPLES, PROCESS } from "../lib/content";

export default function Approach() {
  return (
    <section id="approach" className="relative scroll-mt-20 border-t border-brand/10 bg-surface py-24 sm:py-32">
      <div className="container-px">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">How we operate</span>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-brand sm:text-5xl">
              What it means to have us as owners.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              We're not financial engineers chasing a quick flip. We're
              long-term owners who roll up our sleeves alongside the teams who
              built these businesses. Here's how we show up.
            </p>
          </Reveal>
        </div>

        {/* Principles */}
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {PRINCIPLES.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="card flex h-full gap-5">
                  <span className="inline-grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent-50 text-accent-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-brand">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Process — high-contrast brand panel */}
        <Reveal>
          <h3 className="mt-20 font-display text-2xl font-semibold text-brand">
            A transition that honors what you built.
          </h3>
        </Reveal>
        <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-brand/10 bg-brand/10 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.08}>
              <div className="h-full bg-brand p-6 text-white">
                <span className="font-mono text-sm font-bold text-accent-400">
                  {s.step}
                </span>
                <h4 className="mt-3 font-display text-lg font-semibold text-white">
                  {s.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-brand-100">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
