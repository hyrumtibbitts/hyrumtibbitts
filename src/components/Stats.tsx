import { STATS } from "../lib/content";

export default function Stats() {
  return (
    <section className="border-b border-line bg-surface-subtle">
      <div className="container-px">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.value}
              className="border-line px-4 py-9 text-center sm:py-11 lg:border-l lg:first:border-l-0"
            >
              <span className="mx-auto mb-3 block h-1 w-6 rounded-full bg-orange-500" aria-hidden />
              <dt className="font-display text-xl font-medium tracking-tight text-navy">
                {stat.value}
              </dt>
              <dd className="mt-1.5 text-sm text-ink-3">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
