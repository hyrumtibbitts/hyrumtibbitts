import Reveal from "./Reveal";
import { STATS } from "../lib/content";

export default function Stats() {
  return (
    <section className="relative border-y border-white/10 bg-ink-900/60">
      <div className="container-px grid grid-cols-2 gap-y-10 py-12 sm:py-14 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div className="px-2 text-center lg:border-r lg:border-white/10 lg:last:border-r-0">
              <div className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-slate-400">
                {stat.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
