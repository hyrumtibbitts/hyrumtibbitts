import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";

export default function Pitch() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No backend wired up — this is a marketing demo. Surface a confirmation.
    setSent(true);
  };

  return (
    <section id="pitch" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-px">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900 p-8 sm:p-12 lg:p-16">
          {/* glow */}
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-thunder-600/30 blur-[100px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-storm-600/30 blur-[100px]"
            aria-hidden
          />

          <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="eyebrow">
                <Zap className="h-3.5 w-3.5" /> For business owners
              </span>
              <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                Thinking about your next chapter?
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-300">
                If you've built a great business and care about where it goes
                next — your people, your customers, your legacy — we'd love to
                talk. Every conversation is confidential and there's no pressure.
              </p>
              <p className="mt-6 text-sm text-slate-400">
                Prefer email?{" "}
                <a
                  href="mailto:hello@thundercap.co"
                  className="font-medium text-thunder-400 underline-offset-4 hover:underline"
                >
                  hello@thundercap.co
                </a>
              </p>
            </div>

            {sent ? (
              <div className="flex flex-col items-start justify-center rounded-2xl border border-thunder-500/30 bg-thunder-500/5 p-8">
                <CheckCircle2 className="h-10 w-10 text-thunder-400" />
                <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                  Thanks — we've got it.
                </h3>
                <p className="mt-2 text-slate-300">
                  A partner will be in touch shortly. In the meantime, keep
                  building.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your name" name="name" placeholder="Jane Owner" />
                  <Field
                    label="Work email"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                  />
                </div>
                <Field label="Company" name="company" placeholder="Your business" />
                <div>
                  <label
                    htmlFor="pitch-msg"
                    className="mb-1.5 block text-sm font-medium text-slate-300"
                  >
                    Tell us about your business
                  </label>
                  <textarea
                    id="pitch-msg"
                    name="message"
                    rows={4}
                    required
                    placeholder="What you do, your industry, and what you're hoping for in the next chapter."
                    className="w-full resize-none rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition focus:border-thunder-500/60 focus:outline-none focus:ring-2 focus:ring-thunder-500/30"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Start the conversation <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}

function Field({ label, name, type = "text", placeholder }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={`pitch-${name}`}
        className="mb-1.5 block text-sm font-medium text-slate-300"
      >
        {label}
      </label>
      <input
        id={`pitch-${name}`}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition focus:border-thunder-500/60 focus:outline-none focus:ring-2 focus:ring-thunder-500/30"
      />
    </div>
  );
}
