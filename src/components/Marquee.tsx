import { VALUE_WORDS } from "../lib/content";

export default function Marquee() {
  const row = [...VALUE_WORDS, ...VALUE_WORDS];
  return (
    <section className="border-y border-white/10 bg-ink-950 py-10">
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-10 pr-10">
          {row.map((word, i) => (
            <span key={`${word}-${i}`} className="flex items-center gap-10">
              <span className="whitespace-nowrap font-display text-lg font-semibold text-slate-400/80">
                {word}
              </span>
              <span className="text-thunder-500/60" aria-hidden>
                &#9889;
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
