import { SECTORS } from "../lib/content";

export default function Focus() {
  return (
    <section id="focus" className="scroll-mt-16 border-b border-line bg-surface-subtle py-24 sm:py-28">
      <div className="container-px">
        <div className="max-w-prose">
          <span className="label">Where we focus</span>
          <h2 className="mt-5 h-section text-balance">
            Essential industries with durable demand.
          </h2>
          <p className="lede mt-5">
            We concentrate on businesses the world relies on every day, where
            disciplined operations and consistent demand compound over decades.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {SECTORS.map((sector, i) => (
            <div
              key={sector.title}
              className="group bg-surface-card p-7 transition-colors hover:bg-surface sm:p-8"
            >
              <span className="font-display text-2xl font-medium text-orange-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-navy">
                {sector.title}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-2">{sector.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
