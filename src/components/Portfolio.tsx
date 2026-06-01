import { Check } from "lucide-react";
import { CRITERIA } from "../lib/content";

export default function Portfolio() {
  return (
    <section id="criteria" className="scroll-mt-16 border-b border-line bg-surface-subtle py-24 sm:py-28">
      <div className="container-px grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <span className="label">What we look for</span>
          <h2 className="mt-5 h-section text-balance">
            The businesses we're built to own.
          </h2>
          <p className="lede mt-5">
            A simple set of things we care about. If most of these sound like
            your company, we'd value a conversation.
          </p>
        </div>

        <dl className="lg:col-span-8">
          {CRITERIA.map((c) => (
            <div
              key={c.title}
              className="flex gap-4 border-t border-line py-5 first:border-t-0 first:pt-0 sm:gap-5"
            >
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" aria-hidden />
              <div>
                <dt className="font-display text-lg font-medium tracking-tight text-navy">
                  {c.title}
                </dt>
                <dd className="mt-1 leading-relaxed text-ink-2">{c.detail}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
