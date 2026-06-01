interface LogoProps {
  className?: string;
  tone?: "light" | "dark"; // surface the logo sits on
}

/** Orange lightning mark + serif wordmark. */
export default function Logo({ className = "", tone = "light" }: LogoProps) {
  const text = tone === "dark" ? "text-white" : "text-navy";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 24 24" className="h-[26px] w-[26px]" aria-hidden>
        <path
          d="M14 2.5 6.5 13.2H11l-1.4 8.3L18 10.4h-4.6L15.6 2.5z"
          fill="#D1501F"
        />
      </svg>
      <span className={`font-display text-xl font-semibold tracking-tight ${text}`}>
        Thunder Capital
      </span>
    </span>
  );
}
