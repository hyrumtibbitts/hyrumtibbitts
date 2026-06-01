interface LogoProps {
  className?: string;
  tone?: "light" | "dark"; // surface the logo sits on
}

/** Restrained wordmark with a small geometric mark. */
export default function Logo({ className = "", tone = "light" }: LogoProps) {
  const text = tone === "dark" ? "text-white" : "text-ink";
  const mark = tone === "dark" ? "border-white/40" : "border-ink";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className={`grid h-6 w-6 place-items-center rounded-[5px] border ${mark}`}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
          <path
            d="M13 3 7 13h4l-1 8 7-11h-4l2-7z"
            fill="currentColor"
            className={text}
          />
        </svg>
      </span>
      <span className={`text-[15px] font-semibold tracking-tight ${text}`}>
        Thunder Capital
      </span>
    </span>
  );
}
