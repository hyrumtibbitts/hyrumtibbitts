import { Linkedin, Twitter, Mail } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS } from "../lib/content";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      <div className="container-px py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="dark" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-100">
              Thunder Capital LLC — a people-first, operator-led perpetual
              holding company acquiring and growing essential businesses for the
              long term. Forged from the Wheaton Thunder.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Social href="#" label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Social>
              <Social href="#" label="X / Twitter">
                <Twitter className="h-5 w-5" />
              </Social>
              <Social href="mailto:hello@thundercap.co" label="Email">
                <Mail className="h-5 w-5" />
              </Social>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-8">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-200">
              Explore
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded text-brand-100 transition-colors hover:text-white focus-visible:ring-offset-brand-900"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-200">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-brand-100">
              <li>
                <a
                  href="mailto:hello@thundercap.co"
                  className="rounded transition-colors hover:text-white focus-visible:ring-offset-brand-900"
                >
                  hello@thundercap.co
                </a>
              </li>
              <li>Wheaton, Illinois</li>
              <li>
                <a
                  href="#pitch"
                  className="rounded text-accent-400 transition-colors hover:text-accent-100 focus-visible:ring-offset-brand-900"
                >
                  For business owners &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-brand-200 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Thunder Capital LLC. All rights
            reserved.
          </p>
          <p className="flex items-center gap-4">
            <a
              href="#"
              className="rounded transition-colors hover:text-white focus-visible:ring-offset-brand-900"
            >
              Privacy
            </a>
            <a
              href="#"
              className="rounded transition-colors hover:text-white focus-visible:ring-offset-brand-900"
            >
              Terms
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-md border border-white/15 text-brand-100 transition-colors hover:border-accent-400 hover:text-accent-400 focus-visible:ring-offset-brand-900"
    >
      {children}
    </a>
  );
}
