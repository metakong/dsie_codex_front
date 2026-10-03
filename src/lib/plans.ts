/**
 * Single source of truth for subscription plans.
 * Consumed by the pricing grid, the cost calculator's recommendation,
 * the intake form dropdown, and server-side validation in /api/intake.
 */

export type PillarKey = "tech" | "sales" | "rev";

export const PILLAR_LABELS: Record<PillarKey, string> = {
  tech: "TechOps",
  sales: "SalesOps",
  rev: "RevOps",
};

export const PLAN_IDS = ["keep-it-running", "field-to-office", "outsourced-it"] as const;
export type PlanId = (typeof PLAN_IDS)[number];

/** Everything a visitor can pick in the intake dropdown. */
export const INTEREST_VALUES = [...PLAN_IDS, "checkup"] as const;
export type Interest = (typeof INTEREST_VALUES)[number];

export interface PlanFeature {
  pillar: PillarKey;
  title: string;
  detail: string;
}

export interface Plan {
  id: PlanId;
  tier: string;
  tierLabel: string;
  name: string;
  shortName: string;
  price: number;
  hours: number;
  bestFor: string;
  crewRange: string;
  /** Largest crew size this plan is recommended for. */
  maxCrew: number;
  featured?: boolean;
  /** Shown above the feature list when the plan builds on a lower tier. */
  includesPrevious?: string;
  cta: string;
  features: PlanFeature[];
}

export const PLANS: Plan[] = [
  {
    id: "keep-it-running",
    tier: "01",
    tierLabel: "Essential",
    name: "The \u201CKeep It Running\u201D Plan",
    shortName: "Keep It Running",
    price: 195,
    hours: 5,
    bestFor: "Owner-operators",
    crewRange: "2\u20135 workers",
    maxCrew: 5,
    cta: "Start With Keep It Running",
    features: [
      {
        pillar: "tech",
        title: "Fixing email spam issues",
        detail: "Your estimates and invoices land in customer inboxes, not junk folders.",
      },
      {
        pillar: "tech",
        title: "Remote tablet & printer troubleshooting",
        detail: "Frozen tablet or jammed printer? Call us. We fix it over the phone.",
      },
      {
        pillar: "sales",
        title: "Unified lead routing (texts to phone)",
        detail: "Website forms and quote requests go straight to your phone, all in one place.",
      },
      {
        pillar: "rev",
        title: "Automated invoicing",
        detail: "Finished jobs turn into invoices. No more kitchen-table paperwork.",
      },
      {
        pillar: "rev",
        title: "Polite invoice follow-ups",
        detail: "Late invoices get friendly follow-ups so you don\u2019t have to make the awkward call.",
      },
    ],
  },
  {
    id: "field-to-office",
    tier: "02",
    tierLabel: "Field & Crew",
    name: "The \u201CField to Office\u201D Plan",
    shortName: "Field to Office",
    price: 299,
    hours: 12,
    bestFor: "Growing crews",
    crewRange: "5\u201315 workers",
    maxCrew: 15,
    featured: true,
    includesPrevious: "Everything in Keep It Running, plus:",
    cta: "Start With Field to Office",
    features: [
      {
        pillar: "rev",
        title: "Timeclock-to-payroll syncing",
        detail: "Crew punch times flow straight into payroll. Nobody retypes timecards.",
      },
      {
        pillar: "tech",
        title: "Mobile device lockdown",
        detail: "Work devices stay locked to work apps, and we can wipe one if it goes missing.",
      },
      {
        pillar: "sales",
        title: "Automated estimate follow-ups",
        detail: "Unsigned quotes get automatic nudges until the customer says yes or no.",
      },
      {
        pillar: "rev",
        title: "Field-to-QuickBooks data bridges",
        detail: "Hours, parts, and jobs from the field land in QuickBooks on their own.",
      },
      {
        pillar: "sales",
        title: "Automated 5-star review texts",
        detail: "Happy customers get a review link by text the minute the job is closed out.",
      },
    ],
  },
  {
    id: "outsourced-it",
    tier: "03",
    tierLabel: "Dedicated",
    name: "The \u201COutsourced IT\u201D Plan",
    shortName: "Outsourced IT",
    price: 375,
    hours: 25,
    bestFor: "Established fleets",
    crewRange: "15\u201335 workers",
    maxCrew: Infinity,
    includesPrevious: "Everything in Field to Office, plus:",
    cta: "Start With Outsourced IT",
    features: [
      {
        pillar: "tech",
        title: "Priority on-site dispatch in Springfield",
        detail: "When it can\u2019t be fixed over the phone, priority dispatch to your shop or yard.",
      },
      {
        pillar: "tech",
        title: "Fixing metal shop Wi-Fi dead zones",
        detail: "Signal that actually reaches the back of the building and the yard.",
      },
      {
        pillar: "sales",
        title: "Live sales scoreboards on office TVs",
        detail: "New leads, open quotes, and won jobs on the shop TV, updated all day.",
      },
      {
        pillar: "rev",
        title: "Job costing audits",
        detail: "Find out which jobs made money and which ones quietly lost it.",
      },
      {
        pillar: "tech",
        title: "Automated data backups",
        detail: "Job photos, bids, and books backed up every night, so nothing gets lost.",
      },
    ],
  },
];

export const INTEREST_OPTIONS: { value: Interest; label: string }[] = [
  ...PLANS.map((p) => ({ value: p.id, label: `${p.shortName} \u2014 $${p.price}/mo` })),
  { value: "checkup", label: "Not sure yet \u2014 just the free checkup" },
];

export function recommendPlan(crewSize: number): Plan {
  return PLANS.find((p) => crewSize <= p.maxCrew) ?? PLANS[PLANS.length - 1];
}

/** Locale-pinned formatting so server and client render identical markup (avoids hydration mismatches). */
export const formatUSD = (n: number) =>
  `$${Math.round(n).toLocaleString("en-US")}`;
