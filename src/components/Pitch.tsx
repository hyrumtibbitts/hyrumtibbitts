import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";

export default function Pitch() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Front-end only — wire this to your CRM or email provider.
    setSent(true);
  };

  return (
    <section id="contact" className="scroll-mt-16 py-24 sm:py-28">
      <div className="container-px grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <span className="label">For business owners</span>
          <h2 className="mt-5 h-section text-balance">
            Thinking about your next chapter?
          </h2>
          <p className="lede mt-5 max-w-md">
            If you've built a great business and care about where it goes next,
            we'd value a conversation. Every one is confidential, and there's no
            pressure.
          </p>
          <p className="mt-6 text-sm text-ink-3">
            Prefer email?{" "}
            <a href="mailto:hello@thundercap.co" className="link-accent">
              hello@thundercap.co
            </a>
          </p>
        </div>

        <div className="lg:col-span-7">
          {sent ? (
            <div className="flex items-start gap-4 rounded-xl border border-line bg-surface-subtle p-8">
              <Check className="mt-0.5 h-6 w-6 shrink-0 text-success" aria-hidden />
              <div>
                <h3 className="text-lg font-medium tracking-tight text-ink">
                  Thank you — we've received it.
                </h3>
                <p className="mt-1.5 leading-relaxed text-ink-2">
                  Someone from the team will be in touch within a few business
                  days.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="rounded-xl border border-line p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" name="name" placeholder="Jane Owner" />
                <Field
                  label="Work email"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                />
              </div>
              <div className="mt-5">
                <Field label="Company" name="company" placeholder="Your business" />
              </div>
              <div className="mt-5">
                <label htmlFor="contact-msg" className="field-label">
                  A little about your business
                </label>
                <textarea
                  id="contact-msg"
                  name="message"
                  rows={4}
                  required
                  placeholder="What you do, your industry, and what you're hoping for."
                  className="field-input resize-none"
                />
              </div>
              <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
                Send message
              </button>
            </form>
          )}
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
      <label htmlFor={`contact-${name}`} className="field-label">
        {label}
      </label>
      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="field-input"
      />
    </div>
  );
}
