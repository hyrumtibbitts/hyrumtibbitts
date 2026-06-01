import { ArrowRight, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand pt-16 text-white">
      {/* Subtle structured grid — a purposeful brand texture, not decoration. */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-brand [background-size:56px_56px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_0%,#000_50%,transparent_100%)]"
        aria-hidden
      />

      <div className="container-px relative pb-24 pt-20 sm:pt-24">
        <div className="mx-auto max-w-3xl animate-fade-up text-center">
          <span className="eyebrow eyebrow-on-dark mx-auto">
            <Zap className="h-3.5 w-3.5" /> A perpetual holding company
          </span>

          <h1 className="mt-7 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            We acquire and grow businesses built to{" "}
            <span className="text-accent-400">endure.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-100">
            Thunder Capital is a people-first, operator-led owner of
            high-quality, cash-flowing companies. We partner with management
            teams and long-term, aligned investors to build businesses that last
            — and we hold them for good.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#pitch" className="btn-primary w-full sm:w-auto">
              For business owners <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#approach" className="btn-on-dark w-full sm:w-auto">
              Our approach
            </a>
          </div>

          <p className="mt-8 text-xs font-medium uppercase tracking-[0.16em] text-brand-200">
            Forged from the Wheaton Thunder · Stewards of essential businesses
          </p>
        </div>
      </div>
    </section>
  );
}
