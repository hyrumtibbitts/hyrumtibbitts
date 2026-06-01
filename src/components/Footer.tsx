import Logo from "./Logo";
import { NAV_LINKS } from "../lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface-subtle">
      <div className="container-px py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-2">
              A people-first, operator-led perpetual holding company acquiring
              and growing essential businesses for the long term.
            </p>
            <p className="mt-4 text-sm text-ink-3">Wheaton, Illinois</p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Footer">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded text-sm text-ink-2 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:hello@thundercap.co"
              className="rounded text-sm text-ink-2 transition-colors hover:text-ink"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Thunder Capital LLC</p>
          <p className="flex items-center gap-5">
            <a href="#" className="rounded transition-colors hover:text-ink">
              Privacy
            </a>
            <a href="#" className="rounded transition-colors hover:text-ink">
              Terms
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
