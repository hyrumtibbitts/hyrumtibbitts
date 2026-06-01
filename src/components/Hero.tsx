import { ArrowRight, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy text-white">
      {/* Soft, warm glow + faint lightning watermark — texture, not noise. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-[-12rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[140px]" />
        <svg
          className="absolute -right-10 top-4 hidden h-[125%] w-auto text-white/[0.035] lg:block"
          viewBox="0 0 100 200"
          fill="currentColor"
          aria-hidden
        >
          <path d="M58 0 20 112h30l-14 88 60-120H66L84 0z" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      </div>

      <div className="container-px relative">
        <div className="mx-auto max-w-3xl animate-fade-up py-28 text-center sm:py-36">
          <span className="label label-on-navy justify-center">
            Perpetual holding company
          </span>

          <h1 className="mt-6 text-balance font-display text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl">
            A permanent home for businesses{" "}
            <span className="text-orange-400">worth keeping.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-navy-100">
            Thunder Capital is a people-first, operator-led holding company. We
            acquire high-quality, cash-flowing companies in essential industries
            — and hold them for good.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#contact" className="btn-primary w-full sm:w-auto">
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#approach" className="btn-on-navy w-full sm:w-auto">
              How we work
            </a>
          </div>

          <p className="mt-10 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-label text-navy-200">
            <Zap className="h-3.5 w-3.5 text-orange-400" />
            Forged from the Wheaton Thunder
          </p>
        </div>
      </div>
    </section>
  );
}
