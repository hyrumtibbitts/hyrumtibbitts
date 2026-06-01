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
    <section id="pitch" className="relative scroll-mt-20 bg-surface py-24 sm:py-32">
      <div className="container-px">
        <div className="overflow-hidden rounded-2xl bg-brand p-8 text-white sm:p-12 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="eyebrow eyebrow-on-dark">
                <Zap className="h-3.5 w-3.5" /> For business owners
              </span>
              <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Thinking about your next chapter?
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-brand-100">
                If you've built a great business and care about where it goes
                next — your people, your customers, your legacy — we'd love to
                talk. Every conversation is confidential and there's no pressure.
              </p>
              <p className="mt-6 text-sm text-brand-200">
                Prefer email?{" "}
                <a
                  href="mailto:hello@thundercap.co"
                  className="rounded font-medium text-accent-400 underline-offset-4 hover:underline focus-visible:ring-offset-brand"
                >
                  hello@thundercap.co
                </a>
              </p>
            </div>

            {sent ? (
              <div className="flex flex-col items-start justify-center rounded-xl bg-surface-card p-8 text-ink">
                <CheckCircle2 className="h-10 w-10 text-success" />
                <h3 className="mt-4 font-display text-2xl font-semibold text-brand">
                  Thanks — we've got it.
                </h3>
                <p className="mt-2 text-ink-soft">
                  A partner will be in touch shortly. In the meantime, keep
                  building.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="grid gap-4 rounded-xl bg-surface-card p-6 text-ink sm:p-8"
              >
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
                  <label htmlFor="pitch-msg" className="field-label">
                    Tell us about your business
                  </label>
                  <textarea
                    id="pitch-msg"
                    name="message"
                    rows={4}
                    required
                    placeholder="What you do, your industry, and what you're hoping for in the next chapter."
                    className="field-input resize-none"
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
      <label htmlFor={`pitch-${name}`} className="field-label">
        {label}
      </label>
      <input
        id={`pitch-${name}`}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="field-input"
      />
    </div>
  );
}
