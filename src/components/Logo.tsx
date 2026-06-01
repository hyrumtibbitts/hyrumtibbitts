interface LogoProps {
  className?: string;
  withWordmark?: boolean;
  tone?: "light" | "dark"; // surface the logo sits on
}

export default function Logo({
  className = "",
  withWordmark = true,
  tone = "light",
}: LogoProps) {
  const wordmark = tone === "dark" ? "text-white" : "text-brand";
  const accent = tone === "dark" ? "text-accent-400" : "text-accent-700";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-md bg-brand">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path d="M13 2 6 13h4l-1.5 9L18 10h-4.5L16 2z" fill="#FF5F03" />
        </svg>
      </span>
      {withWordmark && (
        <span className={`font-display text-xl font-bold tracking-tight ${wordmark}`}>
          THUNDER<span className={accent}>CAPITAL</span>
        </span>
      )}
    </span>
  );
}
