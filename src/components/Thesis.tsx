export default function Thesis() {
  return (
    <section id="about" className="scroll-mt-16 border-b border-line py-24 sm:py-28">
      <div className="container-px grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <span className="label">About</span>
          <h2 className="mt-5 h-section text-balance">
            Built for the long term.
          </h2>
        </div>

        <div className="lg:col-span-8 lg:max-w-2xl">
          <div className="space-y-5 text-lg leading-relaxed text-ink-2">
            <p>
              Thunder Capital is a perpetual holding company focused on acquiring
              and growing high-quality, cash-flowing businesses. We take a
              people-first, operator-led approach — developing leaders,
              strengthening operations, and partnering with long-term, aligned
              investors to build businesses that endure.
            </p>
            <p>
              We focus on essential industries where disciplined operations,
              strong culture, and consistent demand create durable value. As
              owners, our role is to work alongside management teams to
              professionalize systems, elevate leadership, and preserve the
              culture and legacy that made each business successful.
            </p>
          </div>

          <figure className="mt-10 border-l-2 border-orange-500 pl-6">
            <blockquote className="text-balance font-display text-2xl font-medium italic leading-snug tracking-tight text-navy">
              “We prioritize thoughtful growth, operational excellence, and
              responsible stewardship of capital — partnering with people who
              want to be part of something bigger than themselves.”
            </blockquote>
            <figcaption className="mt-4 text-sm text-ink-3">
              <span className="font-medium text-ink">Marcus Hale</span> · Founder
              &amp; Managing Partner
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
