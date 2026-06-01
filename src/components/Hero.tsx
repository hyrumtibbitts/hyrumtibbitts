import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="border-b border-line">
      <div className="container-px">
        <div className="mx-auto max-w-3xl animate-fade-up py-28 text-center sm:py-36">
          <span className="label justify-center">Perpetual holding company</span>

          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl">
            A permanent home for good businesses.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-2">
            Thunder Capital is a people-first, operator-led holding company. We
            acquire high-quality, cash-flowing companies in essential industries
            — and hold them for the long term.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-x-6 gap-y-3 sm:flex-row">
            <a href="#contact" className="btn-primary w-full sm:w-auto">
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#approach" className="btn-text">
              How we work
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
