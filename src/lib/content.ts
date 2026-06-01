export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Focus", href: "#focus" },
  { label: "Approach", href: "#approach" },
  { label: "Criteria", href: "#criteria" },
  { label: "Team", href: "#team" },
] as const;

/** Operating qualities, shown as a quiet stat row — not vanity metrics. */
export const STATS = [
  { value: "Permanent", label: "We hold for the long term" },
  { value: "Operator-led", label: "Hands-on, people-first ownership" },
  { value: "Essential", label: "Industries with durable demand" },
  { value: "Aligned", label: "Patient, like-minded capital" },
] as const;

export interface Sector {
  title: string;
  blurb: string;
}

export const SECTORS: Sector[] = [
  {
    title: "Business & industrial services",
    blurb:
      "Mission-critical services with recurring revenue and the kind of steady demand that compounds over decades.",
  },
  {
    title: "Healthcare services",
    blurb:
      "Care-delivery and support businesses where operational discipline and strong teams improve real outcomes.",
  },
  {
    title: "Home & essential services",
    blurb:
      "The trusted local and regional operators that families and businesses rely on, year in and year out.",
  },
  {
    title: "Specialty manufacturing & distribution",
    blurb:
      "Defensible niches with durable products, deep relationships, and consistent cash generation.",
  },
];

export interface Principle {
  title: string;
  body: string;
}

/** "As owners, our role is to…" — drawn from the operating philosophy. */
export const PRINCIPLES: Principle[] = [
  {
    title: "Professionalize systems",
    body: "We work alongside management to strengthen operations, sharpen reporting, and build the infrastructure a growing business needs.",
  },
  {
    title: "Develop and elevate leaders",
    body: "People come first. We invest in the leaders already in place and add talent to help them reach the next level.",
  },
  {
    title: "Preserve culture and legacy",
    body: "The culture and reputation that made a business successful are assets we protect — not things we replace.",
  },
  {
    title: "Steward capital responsibly",
    body: "Thoughtful growth over financial engineering. We hold for the long term and reinvest patiently, as a true owner would.",
  },
];

export interface Step {
  step: string;
  title: string;
  body: string;
}

/** For owners considering a sale — a transition that honors what they built. */
export const PROCESS: Step[] = [
  {
    step: "01",
    title: "An honest conversation",
    body: "A confidential, no-pressure discussion about your business, your goals, and the right next chapter for you and your team.",
  },
  {
    step: "02",
    title: "Diligence with respect",
    body: "A straightforward, efficient process. We move quickly, stay discreet, and treat your people and customers with care.",
  },
  {
    step: "03",
    title: "Fair, clean terms",
    body: "A transparent offer built around a genuine long-term partnership — not a flip. We say what we mean and stand behind it.",
  },
  {
    step: "04",
    title: "A permanent home",
    body: "We preserve your business's culture, support its people, and grow it patiently for the decades that follow.",
  },
];

export interface Criterion {
  title: string;
  detail: string;
}

/** What we look for — honest, concrete acquisition criteria. */
export const CRITERIA: Criterion[] = [
  {
    title: "Consistently profitable",
    detail: "Roughly $1M–$10M of EBITDA, with a multi-year record of steady earnings.",
  },
  {
    title: "Essential, durable demand",
    detail: "Products and services customers depend on through every cycle.",
  },
  {
    title: "A strong team in place",
    detail: "Capable leaders who want to keep building after a transition.",
  },
  {
    title: "A defensible position",
    detail: "Loyal customers, recurring revenue, or a real advantage in a niche.",
  },
  {
    title: "An owner seeking the right home",
    detail: "Founders and families who care where their business and people land.",
  },
  {
    title: "Based in North America",
    detail: "With a soft spot for the Midwest and the communities we know best.",
  },
];

export interface Person {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export const TEAM: Person[] = [
  {
    name: "Marcus Hale",
    role: "Founder & Managing Partner",
    bio: "Operator and long-term owner who came up with the Wheaton Thunder. Spends his days alongside the leaders running our businesses.",
    initials: "MH",
  },
  {
    name: "Priya Nair",
    role: "Partner, Operations",
    bio: "Two decades professionalizing the systems and finance functions of growing service businesses across the Midwest.",
    initials: "PN",
  },
  {
    name: "Daniel Okafor",
    role: "Partner, Acquisitions",
    bio: "Leads sourcing and diligence, and is known for treating selling owners and their teams with patience and candor.",
    initials: "DO",
  },
  {
    name: "Sara Whitfield",
    role: "Partner, People & Culture",
    bio: "Builds the leadership and talent programs that help each business strengthen the team that made it great.",
    initials: "SW",
  },
];
