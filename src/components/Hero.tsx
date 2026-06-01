import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* faint grid */}
        <div className="absolute inset-0 bg-grid-faint [background-size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_55%,transparent_100%)]" />
        {/* storm glow */}
        <div className="absolute left-1/2 top-[-10rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-thunder-600/25 blur-[120px] animate-pulse-glow" />
        <div className="absolute right-[-8rem] top-24 h-[26rem] w-[26rem] rounded-full bg-storm-600/30 blur-[120px] animate-pulse-glow" />
        {/* lightning bolt accent */}
        <svg
          className="absolute right-[8%] top-10 hidden h-[26rem] w-auto opacity-[0.07] animate-flicker lg:block"
          viewBox="0 0 100 200"
          fill="none"
        >
          <path
            d="M58 0 18 110h34l-20 90 60-120H64L86 0z"
            fill="#f25c0a"
          />
        </svg>
      </div>

      <div className="container-px relative pb-24 pt-20 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow mx-auto">
            <Zap className="h-3.5 w-3.5" /> A perpetual holding company
          </span>

          <h1 className="mt-7 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            We acquire and grow
            <br className="hidden sm:block" /> businesses built to{" "}
            <span className="gradient-text">endure.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            Thunder Capital is a people-first, operator-led owner of
            high-quality, cash-flowing companies. We partner with management
            teams and long-term, aligned investors to build businesses that last
            — and we hold them for good.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#pitch" className="btn-primary w-full sm:w-auto">
              For business owners <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#approach" className="btn-ghost w-full sm:w-auto">
              Our approach
            </a>
          </div>

          <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            Forged from the Wheaton Thunder · Stewards of essential businesses
          </p>
        </motion.div>
      </div>

      {/* bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink-950" />
    </section>
  );
}
