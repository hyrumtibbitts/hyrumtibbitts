import { VALUE_WORDS } from "../lib/content";

/** Static, high-contrast values band (no looping motion, per design rules). */
export default function Marquee() {
  return (
    <section className="bg-brand py-10 text-white">
      <div className="container-px">
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-sm font-medium">
          {VALUE_WORDS.map((word, i) => (
            <li key={word} className="flex items-center gap-3">
              {i > 0 && (
                <span className="text-accent-400" aria-hidden>
                  &#47;
                </span>
              )}
              <span className="rounded-md bg-white/5 px-3 py-1.5 text-brand-100">
                {word}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
