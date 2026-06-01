interface LogoProps {
  className?: string;
  withWordmark?: boolean;
}

export default function Logo({ className = "", withWordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-ink-800 ring-1 ring-white/10">
        <span className="absolute inset-0 rounded-xl bg-thunder-500/20 blur-md" aria-hidden />
        <svg viewBox="0 0 24 24" className="relative h-5 w-5" aria-hidden>
          <defs>
            <linearGradient id="logobolt" x1="0" y1="0" x2="24" y2="24">
              <stop stopColor="#ff9c63" />
              <stop offset="0.6" stopColor="#f25c0a" />
              <stop offset="1" stopColor="#d94a00" />
            </linearGradient>
          </defs>
          <path
            d="M13 2 6 13h4l-1.5 9L18 10h-4.5L16 2z"
            fill="url(#logobolt)"
          />
        </svg>
      </span>
      {withWordmark && (
        <span className="font-display text-lg font-bold tracking-tight text-white">
          Thunder<span className="text-thunder-400">Capital</span>
        </span>
      )}
    </span>
  );
}
