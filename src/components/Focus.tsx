import Reveal from "./Reveal";
import { SECTORS } from "../lib/content";

export default function Focus() {
  return (
    <section id="focus" className="relative scroll-mt-20 bg-surface py-24 sm:py-32">
      <div className="container-px">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">Where we focus</span>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-brand sm:text-5xl">
              Essential industries, durable demand.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              We concentrate on businesses the world relies on every day — where
              disciplined operations, strong culture, and consistent demand
              create value that compounds over decades, not quarters.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SECTORS.map((sector, i) => {
            const Icon = sector.icon;
            return (
              <Reveal key={sector.title} delay={i * 0.08}>
                <div className="card h-full hover:shadow-card-hover">
                  <span className="inline-grid h-12 w-12 place-items-center rounded-lg bg-brand text-accent-400">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-brand">
                    {sector.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                    {sector.blurb}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
