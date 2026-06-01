import { PRINCIPLES, PROCESS } from "../lib/content";

export default function Approach() {
  return (
    <section id="approach" className="scroll-mt-16 border-b border-line py-24 sm:py-28">
      <div className="container-px">
        <div className="max-w-prose">
          <span className="label">How we operate</span>
          <h2 className="mt-5 h-section text-balance">
            We act like owners, because we are.
          </h2>
          <p className="lede mt-5">
            We're not financial engineers chasing a quick flip. We're long-term
            owners who work alongside the teams who built these businesses.
          </p>
        </div>

        {/* Principles */}
        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="border-t border-line pt-6">
              <h3 className="font-display text-xl font-medium tracking-tight text-navy">
                {p.title}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-2">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mt-20 max-w-prose">
          <h3 className="font-display text-2xl font-medium tracking-tight text-navy">
            A transition that honors what you built.
          </h3>
        </div>
        <ol className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((s) => (
            <li key={s.step} className="border-t-2 border-navy pt-5">
              <span className="font-display text-2xl font-medium text-orange-500">
                {s.step}
              </span>
              <h4 className="mt-2 font-display text-lg font-medium tracking-tight text-navy">
                {s.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
