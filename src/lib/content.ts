import {
  Building2,
  HeartPulse,
  Wrench,
  Factory,
  Settings2,
  Users,
  HeartHandshake,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "About", href: "#thesis" },
  { label: "Focus", href: "#focus" },
  { label: "Approach", href: "#approach" },
  { label: "Businesses", href: "#portfolio" },
  { label: "Team", href: "#team" },
] as const;

/** Values band — read as qualities, not vanity metrics. */
export const STATS = [
  { value: "Permanent", label: "Built to own for the long term" },
  { value: "Operators", label: "Hands-on, people-first ownership" },
  { value: "Essential", label: "Industries with durable demand" },
  { value: "Aligned", label: "Patient, like-minded investors" },
] as const;

export interface Sector {
  icon: LucideIcon;
  title: string;
  blurb: string;
}

export const SECTORS: Sector[] = [
  {
    icon: Building2,
    title: "Business & Industrial Services",
    blurb:
      "Mission-critical services with recurring revenue, loyal customers, and the kind of steady demand that compounds over decades.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare Services",
    blurb:
      "Care-delivery and support businesses where operational discipline and strong teams translate directly into better outcomes.",
  },
  {
    icon: Wrench,
    title: "Home & Essential Services",
    blurb:
      "The trusted local and regional operators that families and businesses can't do without, year in and year out.",
  },
  {
    icon: Factory,
    title: "Specialty Manufacturing & Distribution",
    blurb:
      "Defensible niches with real moats — durable products, deep relationships, and consistent cash generation.",
  },
];

export interface Principle {
  icon: LucideIcon;
  title: string;
  body: string;
}

/** "As owners, our role is to…" — straight from the operating philosophy. */
export const PRINCIPLES: Principle[] = [
  {
    icon: Settings2,
    title: "Professionalize systems",
    body: "We work alongside management to strengthen operations, sharpen reporting, and build the infrastructure a great business needs to scale.",
  },
  {
    icon: Users,
    title: "Develop & elevate leaders",
    body: "People come first. We invest in the leadership teams already in place and bring in talent to help them reach the next level.",
  },
  {
    icon: HeartHandshake,
    title: "Preserve culture & legacy",
    body: "The culture and reputation that made a business successful are assets we protect — not things we replace.",
  },
  {
    icon: ShieldCheck,
    title: "Steward capital responsibly",
    body: "Thoughtful growth over financial engineering. We hold for the long term and reinvest patiently, the way a true owner would.",
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
    body: "A confidential, no-pressure discussion about your business, your goals, and what the right next chapter looks like for you and your team.",
  },
  {
    step: "02",
    title: "Diligence with respect",
    body: "A straightforward, efficient process. We move quickly, keep things discreet, and treat your people and customers with care throughout.",
  },
  {
    step: "03",
    title: "Fair, clean terms",
    body: "A transparent offer built around a real long-term partnership — not a flip. We say what we mean and stand behind it.",
  },
  {
    step: "04",
    title: "Stewardship for the long run",
    body: "We become the permanent home for your business — preserving its culture, supporting its people, and growing it for decades.",
  },
];

export interface Business {
  name: string;
  sector: string;
  tag: string;
  blurb: string;
}

export const PORTFOLIO: Business[] = [
  {
    name: "Summit Mechanical",
    sector: "Home & Essential Services",
    tag: "Acquired · Operating",
    blurb: "Regional HVAC and facilities-maintenance provider with 30 years of loyal commercial clients.",
  },
  {
    name: "Cardinal Care Group",
    sector: "Healthcare Services",
    tag: "Acquired · Operating",
    blurb: "Multi-site outpatient and home-health network serving communities across the Midwest.",
  },
  {
    name: "Ironwood Industrial",
    sector: "Specialty Manufacturing",
    tag: "Acquired · Operating",
    blurb: "Precision components manufacturer supplying defensible, mission-critical niches.",
  },
  {
    name: "Meridian Facility Services",
    sector: "Business Services",
    tag: "Acquired · Operating",
    blurb: "Recurring-revenue commercial services with deep, multi-decade customer relationships.",
  },
  {
    name: "Beacon Distribution",
    sector: "Distribution",
    tag: "Acquired · Operating",
    blurb: "Specialty distributor with leading share in a fragmented, resilient end market.",
  },
  {
    name: "Heartland Logistics",
    sector: "Industrial Services",
    tag: "Acquired · Operating",
    blurb: "Asset-backed regional logistics operator with consistent demand and strong culture.",
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
    bio: "Operator and long-term owner who came up with the Wheaton Thunder. Spends his time alongside the leaders running our businesses.",
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
    bio: "Leads sourcing and diligence. Known for treating selling owners and their teams with patience, candor, and respect.",
    initials: "DO",
  },
  {
    name: "Sara Whitfield",
    role: "Partner, People & Culture",
    bio: "Builds the leadership-development and talent programs that help each business strengthen the team that made it great.",
    initials: "SW",
  },
];

/** Moving values band shown beneath the hero. */
export const VALUE_WORDS = [
  "Permanent Capital",
  "Operator-Led",
  "People-First",
  "Essential Industries",
  "Durable Demand",
  "Long-Term Stewardship",
  "Strong Culture",
  "Disciplined Operations",
] as const;
