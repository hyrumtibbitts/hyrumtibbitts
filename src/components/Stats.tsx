import { STATS } from "../lib/content";

export default function Stats() {
  return (
    <section className="border-b border-line bg-surface-subtle">
      <div className="container-px">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.value}
              className="border-line px-2 py-8 text-center sm:py-10 lg:border-l lg:first:border-l-0"
            >
              <dt className="text-lg font-medium tracking-tight text-ink">
                {stat.value}
              </dt>
              <dd className="mt-1 text-sm text-ink-3">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
