import Reveal from "./Reveal";
import { STATS } from "../lib/content";

export default function Stats() {
  return (
    <section className="border-b border-brand/10 bg-surface">
      <div className="container-px grid grid-cols-2 gap-px overflow-hidden rounded-none border-x border-brand/10 bg-brand/10 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.06}>
            <div className="h-full bg-surface px-5 py-10 text-center">
              <div className="font-display text-2xl font-bold uppercase tracking-tight text-brand sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-ink-soft">
                {stat.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
