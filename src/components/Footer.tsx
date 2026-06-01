import { Linkedin, Twitter, Mail } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS } from "../lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="container-px py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Thunder Capital LLC — conviction-stage venture capital for the
              founders building what comes next. Forged from the Wheaton
              Thunder.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Social href="#" label="LinkedIn">
                <Linkedin className="h-4.5 w-4.5" />
              </Social>
              <Social href="#" label="X / Twitter">
                <Twitter className="h-4.5 w-4.5" />
              </Social>
              <Social href="mailto:hello@thundercap.co" label="Email">
                <Mail className="h-4.5 w-4.5" />
              </Social>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-8">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Explore
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href="mailto:hello@thundercap.co"
                  className="transition hover:text-white"
                >
                  hello@thundercap.co
                </a>
              </li>
              <li>Wheaton, Illinois</li>
              <li>
                <a href="#pitch" className="transition hover:text-thunder-400">
                  For business owners &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Thunder Capital LLC. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <a href="#" className="transition hover:text-slate-300">
              Privacy
            </a>
            <a href="#" className="transition hover:text-slate-300">
              Terms
            </a>
            <a href="#" className="transition hover:text-slate-300">
              Form ADV
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
      className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:border-thunder-500/40 hover:text-thunder-400"
    >
      {children}
    </a>
  );
}
