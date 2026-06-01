import { TEAM } from "../lib/content";

export default function Team() {
  return (
    <section id="team" className="scroll-mt-16 border-b border-line py-24 sm:py-28">
      <div className="container-px">
        <div className="max-w-prose">
          <span className="label">The team</span>
          <h2 className="mt-5 h-section text-balance">
            Operators, not absentee owners.
          </h2>
          <p className="lede mt-5">
            A small, people-first team that spends its days alongside the leaders
            running our businesses.
          </p>
        </div>

        <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((person) => (
            <li key={person.name}>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-navy font-display text-sm font-medium text-white ring-2 ring-orange-500/30 ring-offset-2 ring-offset-surface">
                {person.initials}
              </span>
              <h3 className="mt-5 font-display text-lg font-medium tracking-tight text-navy">
                {person.name}
              </h3>
              <p className="text-sm font-medium text-orange-700">{person.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">
                {person.bio}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
