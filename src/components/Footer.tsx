import Logo from "./Logo";
import { NAV_LINKS } from "../lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-900 text-white">
      <div className="container-px py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-sm">
            <Logo tone="dark" />
            <p className="mt-4 text-sm leading-relaxed text-navy-100">
              A people-first, operator-led perpetual holding company acquiring
              and growing essential businesses for the long term.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-navy-200">
              Wheaton, Illinois
            </p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Footer">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded text-sm text-navy-100 transition-colors hover:text-orange-300 focus-visible:ring-offset-navy-900"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:hello@thundercap.co"
              className="rounded text-sm text-navy-100 transition-colors hover:text-orange-300 focus-visible:ring-offset-navy-900"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-navy-200 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Thunder Capital LLC</p>
          <p className="flex items-center gap-5">
            <a
              href="#"
              className="rounded transition-colors hover:text-orange-300 focus-visible:ring-offset-navy-900"
            >
              Privacy
            </a>
            <a
              href="#"
              className="rounded transition-colors hover:text-orange-300 focus-visible:ring-offset-navy-900"
            >
              Terms
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
