/**
 * Single source of truth for the 3x3 Subscription Matrix + Whole House Bundle.
 * TechOps, SalesOps, RevOps (each with Starter, Growth, Full Fractional tiers)
 * plus the Whole House Bundle ($1,125/mo for all three top tiers).
 */

export type PillarKey = "tech" | "sales" | "rev";

export const PILLAR_INFO: Record<
  PillarKey,
  {
    name: string;
    nickname: string;
    tabLabel: string;
    valueProp: string;
    tagline: string;
  }
> = {
  tech: {
    name: "TechOps",
    nickname: "The Toolkit",
    tabLabel: "TechOps (The Toolkit)",
    valueProp:
      "Keep the crew working and your software running without paying $60k a year for an IT guy.",
    tagline: "Field tablets, metal shop Wi-Fi, email spam defense, and instant lockouts.",
  },
  sales: {
    name: "SalesOps",
    nickname: "The Front Door",
    tabLabel: "SalesOps (The Front Door)",
    valueProp:
      "Catch every lead, send quotes faster from the driveway, and chase down approvals automatically.",
    tagline: "Driveway quoting, instant lead-to-SMS routing, and automated estimate follow-ups.",
  },
  rev: {
    name: "RevOps",
    nickname: "The Vault",
    tabLabel: "RevOps (The Vault)",
    valueProp:
      "Bridge the field to the office, collect the cash, and defend your profit margin.",
    tagline: "Timecard-to-payroll flow, automatic billing, QuickBooks sync, and job costing.",
  },
};

export const TECH_PLAN_IDS = [
  "tech-keep-it-running",
  "tech-field-to-office",
  "tech-outsourced-it",
] as const;

export const SALES_PLAN_IDS = [
  "sales-lead-capture",
  "sales-pipeline-builder",
  "sales-machine",
] as const;

export const REV_PLAN_IDS = [
  "rev-leak-plugger",
  "rev-the-bridge",
  "rev-open-book-ops",
] as const;

export const BUNDLE_ID = "whole-house-bundle" as const;

export const STANDALONE_PLAN_IDS = [
  ...TECH_PLAN_IDS,
  ...SALES_PLAN_IDS,
  ...REV_PLAN_IDS,
] as const;

export const PLAN_IDS = [...STANDALONE_PLAN_IDS, BUNDLE_ID] as const;
export type PlanId = (typeof PLAN_IDS)[number];

export const INTEREST_VALUES = [...PLAN_IDS, "checkup"] as const;
export type Interest = (typeof INTEREST_VALUES)[number];

export interface PlanFeature {
  title: string;
  detail: string;
}

export interface Plan {
  id: PlanId;
  pillar?: PillarKey;
  tierNumber: string;
  tierLabel: string;
  name: string;
  shortName: string;
  price: number;
  hours: number;
  bestFor: string;
  crewRange: string;
  maxCrew: number;
  featured?: boolean;
  includesPrevious?: string;
  cta: string;
  features: PlanFeature[];
}

export const TECHOPS_PLANS: Plan[] = [
  {
    id: "tech-keep-it-running",
    pillar: "tech",
    tierNumber: "01",
    tierLabel: "Starter",
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
        title: "Fixing email spam issues",
        detail: "Stop estimates and invoices from landing in customer junk folders.",
      },
      {
        title: "New hire setup & lockout",
        detail: "Fast email and login setup for new hires; instant revocation upon exit.",
      },
      {
        title: "Remote tablet & printer troubleshooting",
        detail: "Frozen tablet or jammed office printer? Call us. We fix it over the phone.",
      },
    ],
  },
  {
    id: "tech-field-to-office",
    pillar: "tech",
    tierNumber: "02",
    tierLabel: "Growth",
    name: "The \u201CField to Office\u201D Plan",
    shortName: "Field to Office",
    price: 299,
    hours: 12,
    bestFor: "Growing crews",
    crewRange: "5\u201315 workers",
    maxCrew: 15,
    featured: true,
    includesPrevious: "Everything in Keep It Running, plus:",
    cta: "Deploy Field to Office",
    features: [
      {
        title: "Mobile device lockdown",
        detail: "Lock work phones and tablets down to work apps and block unauthorized downloads.",
      },
      {
        title: "Timeclock app syncing maintenance",
        detail: "Ensure field punch times sync reliably so crew hours are never lost or corrupted.",
      },
      {
        title: "Lost device remote wipe",
        detail: "Instantly wipe company data and customer info if a tablet goes missing in the field.",
      },
    ],
  },
  {
    id: "tech-outsourced-it",
    pillar: "tech",
    tierNumber: "03",
    tierLabel: "Full Fractional",
    name: "The \u201COutsourced IT\u201D Plan",
    shortName: "Outsourced IT",
    price: 375,
    hours: 25,
    bestFor: "Established fleets",
    crewRange: "15\u201335 workers",
    maxCrew: 35,
    includesPrevious: "Everything in Field to Office, plus:",
    cta: "Retain Outsourced IT",
    features: [
      {
        title: "Fixing metal shop Wi-Fi dead zones",
        detail: "Commercial-grade signal that actually reaches the back of the metal building and yard.",
      },
      {
        title: "Automated daily backups",
        detail: "Job photos, bids, and contracts backed up automatically every single night.",
      },
      {
        title: "Priority on-site dispatch in Springfield",
        detail: "When remote fixes won\u2019t cut it, priority in-person dispatch to your shop or yard.",
      },
    ],
  },
];

export const SALESOPS_PLANS: Plan[] = [
  {
    id: "sales-lead-capture",
    pillar: "sales",
    tierNumber: "01",
    tierLabel: "Starter",
    name: "The \u201CLead Capture\u201D Plan",
    shortName: "Lead Capture",
    price: 195,
    hours: 5,
    bestFor: "Owner-operators",
    crewRange: "2\u20135 workers",
    maxCrew: 5,
    cta: "Start With Lead Capture",
    features: [
      {
        title: "Unified lead routing to your phone",
        detail: "Website forms, quote requests, and Facebook messages texted straight to dispatch phones.",
      },
      {
        title: "Standardized mobile quote templates",
        detail: "Send clean, professional quotes right from the driveway before leaving the customer\u2019s house.",
      },
      {
        title: "Instant lead notifications",
        detail: "Never let a hot quote request sit in an unchecked email inbox for days.",
      },
    ],
  },
  {
    id: "sales-pipeline-builder",
    pillar: "sales",
    tierNumber: "02",
    tierLabel: "Growth",
    name: "The \u201CPipeline Builder\u201D Plan",
    shortName: "Pipeline Builder",
    price: 299,
    hours: 12,
    bestFor: "Growing crews",
    crewRange: "5\u201315 workers",
    maxCrew: 15,
    featured: true,
    includesPrevious: "Everything in Lead Capture, plus:",
    cta: "Deploy Pipeline Builder",
    features: [
      {
        title: "Automated \u201Cno-touch\u201D estimate follow-ups",
        detail: "Polite automated text and email nudges sent on schedule until the customer approves or declines.",
      },
      {
        title: "Field canvassing app setups",
        detail: "Mobile lead tracking and territory mapping configured for your door-to-door or storm crews.",
      },
      {
        title: "Quote win/loss dashboard",
        detail: "Clear weekly report showing which services are closing and which bids went cold.",
      },
    ],
  },
  {
    id: "sales-machine",
    pillar: "sales",
    tierNumber: "03",
    tierLabel: "Full Fractional",
    name: "The \u201CSales Machine\u201D Plan",
    shortName: "The Sales Machine",
    price: 375,
    hours: 25,
    bestFor: "Established fleets",
    crewRange: "15\u201335 workers",
    maxCrew: 35,
    includesPrevious: "Everything in Pipeline Builder, plus:",
    cta: "Retain Sales Machine",
    features: [
      {
        title: "Live sales scoreboards on office TVs",
        detail: "Real-time leaderboard showing weekly revenue, quotes sent, and closing rates on your shop TV.",
      },
      {
        title: "Automated lead qualification text-bots",
        detail: "Pre-screen incoming requests for budget and urgency via text before you roll a truck.",
      },
      {
        title: "Storm & seasonal outreach sequences",
        detail: "Automated past-customer re-activation campaigns for seasonal maintenance or storm bids.",
      },
    ],
  },
];

export const REVOPS_PLANS: Plan[] = [
  {
    id: "rev-leak-plugger",
    pillar: "rev",
    tierNumber: "01",
    tierLabel: "Starter",
    name: "The \u201CLeak Plugger\u201D Plan",
    shortName: "Leak Plugger",
    price: 195,
    hours: 5,
    bestFor: "Owner-operators",
    crewRange: "2\u20135 workers",
    maxCrew: 5,
    cta: "Start With Leak Plugger",
    features: [
      {
        title: "Automated instant invoicing",
        detail: "Invoices generate and send automatically the minute a job is marked completed in the field.",
      },
      {
        title: "Polite unpaid invoice reminders",
        detail: "Friendly automated text and email nudges for overdue balances so you don\u2019t have to chase checks.",
      },
      {
        title: "Card payment link on every invoice",
        detail: "Give customers a 1-click text link to pay immediately via debit, credit, or bank transfer.",
      },
    ],
  },
  {
    id: "rev-the-bridge",
    pillar: "rev",
    tierNumber: "02",
    tierLabel: "Growth",
    name: "The \u201CBridge\u201D Plan",
    shortName: "The Bridge",
    price: 299,
    hours: 12,
    bestFor: "Growing crews",
    crewRange: "5\u201315 workers",
    maxCrew: 15,
    featured: true,
    includesPrevious: "Everything in Leak Plugger, plus:",
    cta: "Deploy The Bridge",
    features: [
      {
        title: "Field-app-to-QuickBooks data bridges",
        detail: "Crew hours, parts, and line items flow straight into QuickBooks with zero double-entry.",
      },
      {
        title: "Automated 5-star Google review requests",
        detail: "Review links texted to happy customers automatically the exact moment an invoice is settled.",
      },
      {
        title: "Daily cash-in reconciliation",
        detail: "Automatic matching between payment processor deposits and your operating bank account.",
      },
    ],
  },
  {
    id: "rev-open-book-ops",
    pillar: "rev",
    tierNumber: "03",
    tierLabel: "Full Fractional",
    name: "The \u201COpen-Book Ops\u201D Plan",
    shortName: "Open-Book Ops",
    price: 375,
    hours: 25,
    bestFor: "Established fleets",
    crewRange: "15\u201335 workers",
    maxCrew: 35,
    includesPrevious: "Everything in The Bridge, plus:",
    cta: "Retain Open-Book Ops",
    features: [
      {
        title: "Job costing audits (estimated vs. actuals)",
        detail: "Find out exactly which jobs made healthy gross margin and which ones quietly lost money.",
      },
      {
        title: "Open-book profit scoreboards for weekly huddles",
        detail: "Automated weekly scoreboard displays showing team labor efficiency and bonus targets.",
      },
      {
        title: "Automated complaint & warranty escalation",
        detail: "Job issues and callbacks route instantly to the owner or lead tech before reviews get hurt.",
      },
    ],
  },
];

export const WHOLE_HOUSE_BUNDLE: Plan = {
  id: "whole-house-bundle",
  tierNumber: "★",
  tierLabel: "All-In-One",
  name: "The Whole House Bundle",
  shortName: "Whole House Bundle",
  price: 1125,
  hours: 75,
  bestFor: "Growing & established fleets",
  crewRange: "10\u201335+ workers",
  maxCrew: Infinity,
  featured: true,
  cta: "Claim Whole House Bundle",
  features: [
    {
      title: "All 3 Full Fractional Subscriptions",
      detail: "Full Tier 3 TechOps (25 hrs) + Tier 3 SalesOps (25 hrs) + Tier 3 RevOps (25 hrs) — 75 total hours/mo.",
    },
    {
      title: "Priority Springfield On-Site Dispatch & Wi-Fi",
      detail: "Emergency hardware troubleshooting at your shop, metal building Wi-Fi fixes, and daily photo backups.",
    },
    {
      title: "Driveway Quoting, SMS Bots & TV Scoreboards",
      detail: "Unified lead routing, automated follow-up texts, quote qualification bots, and live sales leaderboards.",
    },
    {
      title: "Full QuickBooks Sync, Job Costing & Review Boost",
      detail: "Automated invoicing, zero double-entry timecards, weekly open-book huddle boards, and review generation.",
    },
  ],
};

export const PLANS_BY_PILLAR: Record<PillarKey, Plan[]> = {
  tech: TECHOPS_PLANS,
  sales: SALESOPS_PLANS,
  rev: REVOPS_PLANS,
};

export const ALL_PLANS: Plan[] = [
  ...TECHOPS_PLANS,
  ...SALESOPS_PLANS,
  ...REVOPS_PLANS,
  WHOLE_HOUSE_BUNDLE,
];

/** Options for the intake form dropdown with optgroups. */
export interface DropdownGroup {
  label: string;
  options: { value: Interest; label: string }[];
}

export const DROPDOWN_GROUPS: DropdownGroup[] = [
  {
    label: "⭐ Featured Bundle",
    options: [
      {
        value: "whole-house-bundle",
        label: "Whole House Bundle (Tech + Sales + RevOps) — $1,125/mo (75 hrs)",
      },
    ],
  },
  {
    label: "TechOps Plans (The Toolkit)",
    options: TECHOPS_PLANS.map((p) => ({
      value: p.id,
      label: `${p.shortName} — $${p.price}/mo (${p.hours} hrs)`,
    })),
  },
  {
    label: "SalesOps Plans (The Front Door)",
    options: SALESOPS_PLANS.map((p) => ({
      value: p.id,
      label: `${p.shortName} — $${p.price}/mo (${p.hours} hrs)`,
    })),
  },
  {
    label: "RevOps Plans (The Vault)",
    options: REVOPS_PLANS.map((p) => ({
      value: p.id,
      label: `${p.shortName} — $${p.price}/mo (${p.hours} hrs)`,
    })),
  },
  {
    label: "General Inquiry",
    options: [
      {
        value: "checkup",
        label: "Not sure yet — just the free checkup",
      },
    ],
  },
];

/** Maps URL search params or legacy aliases to a validated Interest enum value. */
export function normalizeInterest(val: string | null | undefined): Interest {
  if (!val) return "checkup";
  const trimmed = val.trim().toLowerCase();
  const legacyMap: Record<string, Interest> = {
    "keep-it-running": "tech-keep-it-running",
    "field-to-office": "tech-field-to-office",
    "outsourced-it": "tech-outsourced-it",
    "bundle": "whole-house-bundle",
    "whole-house": "whole-house-bundle",
    "whole-house-bundle": "whole-house-bundle",
    "checkup": "checkup",
  };
  if (legacyMap[trimmed]) return legacyMap[trimmed];
  if ((INTEREST_VALUES as readonly string[]).includes(trimmed)) {
    return trimmed as Interest;
  }
  return "checkup";
}

/** Suggests a plan or bundle based on crew size for the diagnostic calculator. */
export function recommendPlan(crewSize: number): Plan {
  if (crewSize >= 25) {
    return WHOLE_HOUSE_BUNDLE;
  }
  if (crewSize >= 15) {
    return TECHOPS_PLANS[2]; // Outsourced IT ($375)
  }
  if (crewSize >= 5) {
    return TECHOPS_PLANS[1]; // Field to Office ($299)
  }
  return TECHOPS_PLANS[0]; // Keep It Running ($195)
}

/** Locale-pinned formatting so server and client render identical markup (avoids hydration mismatches). */
export const formatUSD = (n: number) =>
  `$${Math.round(n).toLocaleString("en-US")}`;
