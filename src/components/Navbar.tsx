import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS } from "../lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled
          ? "border-brand/10 bg-surface/90 backdrop-blur"
          : "border-transparent bg-surface"
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between">
        <a href="#top" className="shrink-0 rounded-md" aria-label="Thunder Capital home">
          <Logo />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md text-sm font-medium text-ink-soft transition-colors hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a href="#pitch" className="btn-primary">
            Get in touch <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button
          className="grid h-11 w-11 place-items-center rounded-md border border-brand/15 text-brand md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-brand/10 bg-surface md:hidden">
          <div className="container-px flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-surface-sunken"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pitch"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full"
            >
              Get in touch <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
