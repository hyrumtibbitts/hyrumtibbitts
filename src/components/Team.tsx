import { Linkedin } from "lucide-react";
import Reveal from "./Reveal";
import { TEAM } from "../lib/content";

export default function Team() {
  return (
    <section id="team" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-px">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">The team</span>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Operators, not absentee owners.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-400">
              A people-first team that spends its days alongside the leaders
              running our businesses — developing talent, sharpening operations,
              and protecting what makes each company special.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((person, i) => (
            <Reveal key={person.name} delay={i * 0.08}>
              <div className="card h-full">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-thunder-500 to-storm-600 font-display text-lg font-bold text-white">
                    {person.initials}
                  </div>
                  <a
                    href="#"
                    aria-label={`${person.name} on LinkedIn`}
                    className="ml-auto text-slate-500 transition hover:text-thunder-400"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {person.name}
                </h3>
                <p className="text-sm font-medium text-thunder-400">
                  {person.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {person.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
