import { Quote } from "lucide-react";
import Reveal from "./Reveal";

export default function Thesis() {
  return (
    <section id="thesis" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-px grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="eyebrow">About Thunder Capital</span>
            <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-brand sm:text-5xl">
              Built for the long term. Built to endure.
            </h2>
          </Reveal>
        </div>

        <div className="space-y-6 text-lg leading-relaxed text-ink-soft lg:col-span-7">
          <Reveal delay={0.05}>
            <p>
              Thunder Capital is a perpetual holding company focused on
              acquiring and growing high-quality, cash-flowing businesses. We
              take a people-first, operator-led approach — developing leaders,
              strengthening operations, and partnering with long-term, aligned
              investors to build businesses that endure.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              We focus on essential industries where disciplined operations,
              strong culture, and consistent demand create durable value. As
              owners, our role is to work alongside management teams to
              professionalize systems, elevate leadership, and preserve the
              culture and legacy that made each business successful.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <figure className="mt-10 rounded-xl border border-brand/10 border-l-4 border-l-accent-500 bg-surface-card p-6 shadow-card">
              <Quote className="h-6 w-6 text-accent-600" />
              <blockquote className="mt-3 font-display text-xl font-semibold leading-snug text-brand">
                "We prioritize thoughtful growth, operational excellence, and
                responsible stewardship of capital — partnering with people who
                want to be part of something bigger than themselves."
              </blockquote>
              <figcaption className="mt-4 text-sm text-ink-muted">
                Marcus Hale, Founder &amp; Managing Partner
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
