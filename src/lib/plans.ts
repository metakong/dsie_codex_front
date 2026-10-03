/**
 * Single source of truth for The DSIE Codex LLC modular pricing architecture.
 * Interactive "Build-Your-Own Back Office" modular pricing structure.
 */

export type ModuleCategory = "base" | "tech" | "sales" | "rev";

export interface PricingModule {
  id: string;
  title: string;
  price: number;
  category: ModuleCategory;
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  isMandatory?: boolean;
  badge?: string;
}

export const BASE_RETAINER_MODULE: PricingModule = {
  id: "base-retainer",
  title: "Base Access Retainer",
  price: 99,
  category: "base",
  categoryLabel: "Foundation (Mandatory)",
  shortDescription: "Guaranteed roster spot, 2 hours of remote break-fix triage, and direct ticketing access.",
  fullDescription: "Guaranteed roster spot, 2 hours of remote break-fix triage, and direct access to our ticketing system.",
  isMandatory: true,
  badge: "Required Foundation",
};

export const TECHOPS_MODULES: PricingModule[] = [
  {
    id: "inbox-defender",
    title: "The In-Box Defender",
    price: 49,
    category: "tech",
    categoryLabel: "TechOps",
    shortDescription: "Guaranteed email delivery (no spam folders) and instant password resets.",
    fullDescription: "Guaranteed email delivery so your bids never hit customer spam folders, plus instant password resets.",
  },
  {
    id: "fleet-tablet-lockdown",
    title: "Fleet Tablet Lockdown",
    price: 79,
    category: "tech",
    categoryLabel: "TechOps",
    shortDescription: "Field devices locked to work apps. Remote wipe & automated app updates.",
    fullDescription: "Field devices are locked to work apps only. We remotely wipe lost devices and push app updates automatically.",
    badge: "Popular for Fleets",
  },
  {
    id: "one-click-onboarding",
    title: "1-Click Onboarding",
    price: 89,
    category: "tech",
    categoryLabel: "TechOps",
    shortDescription: "Instantly create software accounts & send welcome guides for new hires.",
    fullDescription: "When you hire someone, we instantly create all their software accounts and send them a welcome guide.",
  },
  {
    id: "shop-network-shield",
    title: "Shop Network Shield",
    price: 99,
    category: "tech",
    categoryLabel: "TechOps",
    shortDescription: "Fast, secure Wi-Fi reaching the whole yard with guest network isolation.",
    fullDescription: "Fast, secure Wi-Fi that reaches the whole yard, with secure guest networks for visitors.",
  },
  {
    id: "onsite-dispatch-pass",
    title: "On-Site Dispatch Pass",
    price: 125,
    category: "tech",
    categoryLabel: "TechOps",
    shortDescription: "4 hours of dedicated, in-person physical troubleshooting in Springfield.",
    fullDescription: "Adds 4 hours of dedicated, in-person physical troubleshooting at your Springfield location.",
  },
  {
    id: "server-backup-guardian",
    title: "Server & Backup Guardian",
    price: 149,
    category: "tech",
    categoryLabel: "TechOps",
    shortDescription: "Office server maintenance & nightly off-site vault backups.",
    fullDescription: "We keep your old office server running and back up all your data to a secure off-site vault every night.",
  },
];

export const SALESOPS_MODULES: PricingModule[] = [
  {
    id: "lead-router",
    title: "Instant Lead Router",
    price: 69,
    category: "sales",
    categoryLabel: "SalesOps",
    shortDescription: "Website forms, Google clicks, and Facebook messages are instantly texted to your phone.",
    fullDescription: "Website forms, Google clicks, and Facebook messages are instantly texted to your phone.",
    badge: "Fastest Lead Response",
  },
  {
    id: "estimate-chaser",
    title: "The Estimate Chaser",
    price: 149,
    category: "sales",
    categoryLabel: "SalesOps",
    shortDescription: "Unsigned quotes get automatic, polite text and email follow-ups at 2 days and 7 days.",
    fullDescription: "Unsigned quotes get automatic, polite text and email follow-ups at 2 days and 7 days.",
    badge: "High Conversion",
  },
  {
    id: "door-tracker",
    title: "Door-to-Door Tracker",
    price: 199,
    category: "sales",
    categoryLabel: "SalesOps",
    shortDescription: "A simple mobile app for storm-chasers & canvassers to drop pins and log leads offline.",
    fullDescription: "A simple mobile app for your storm-chasers and canvassers to drop pins, track door knocks, and log leads, even without cell service.",
  },
  {
    id: "commercial-hitlists",
    title: "Commercial Hitlists",
    price: 249,
    category: "sales",
    categoryLabel: "SalesOps",
    shortDescription: "Monthly fresh list of local property managers & facility directors for commercial sales.",
    fullDescription: "Every month, we hand you a fresh, accurate list of local property managers and facility directors to feed your commercial sales.",
    badge: "B2B Growth",
  },
  {
    id: "sales-scoreboard",
    title: "The Sales Scoreboard",
    price: 99,
    category: "sales",
    categoryLabel: "SalesOps",
    shortDescription: "Live TV dashboard in your office showing estimator closing rates & lead ROI.",
    fullDescription: "A live TV dashboard in your office showing exactly which estimators are closing deals and which lead sources actually make you money.",
  },
];

export const REVOPS_MODULES: PricingModule[] = [
  {
    id: "app-to-accounting",
    title: "App-to-Accounting Bridge",
    price: 149,
    category: "rev",
    categoryLabel: "RevOps",
    shortDescription: "When a job is marked Done in the field, an invoice automatically generates in QuickBooks.",
    fullDescription: "The moment a job is marked \"Done\" in the field, an invoice automatically generates in QuickBooks. No more double-entry.",
    badge: "No Double Entry",
  },
  {
    id: "debt-collector",
    title: "The Polite Debt Collector",
    price: 99,
    category: "rev",
    categoryLabel: "RevOps",
    shortDescription: "Automated, friendly text & email reminders sent at 3, 15, and 30 days past due.",
    fullDescription: "Automated, friendly text and email reminders sent to customers with unpaid invoices at 3, 15, and 30 days past due.",
    badge: "Collections",
  },
  {
    id: "5-star-machine",
    title: "The 5-Star Machine",
    price: 79,
    category: "rev",
    categoryLabel: "RevOps",
    shortDescription: "Automatically texts a Google Review link the second a final invoice is paid.",
    fullDescription: "Automatically texts a happy customer a direct link to leave a Google Review the second their final invoice is paid.",
    badge: "Reputation Boost",
  },
  {
    id: "job-profit-xray",
    title: "Job Profit X-Ray",
    price: 199,
    category: "rev",
    categoryLabel: "RevOps",
    shortDescription: "Track estimated vs. actual labor & materials to see where you bled cash.",
    fullDescription: "We track your estimated labor and materials against what was actually spent, showing you exactly where you bled cash on a job.",
    badge: "Margin Defense",
  },
  {
    id: "escalation-firewall",
    title: "The \"Angry Customer\" Firewall",
    price: 129,
    category: "rev",
    categoryLabel: "RevOps",
    shortDescription: "Structured system for warranty claims and angry calls without blowing up your cell phone.",
    fullDescription: "A structured system for handling warranty claims and angry calls so they get resolved quickly without blowing up your personal cell phone.",
    badge: "Owner Protection",
  },
];

export const ADDON_MODULES: PricingModule[] = [
  ...TECHOPS_MODULES,
  ...SALESOPS_MODULES,
  ...REVOPS_MODULES,
];

export const ALL_MODULES: PricingModule[] = [
  BASE_RETAINER_MODULE,
  ...ADDON_MODULES,
];

export const MODULE_IDS = ALL_MODULES.map((m) => m.id) as [string, ...string[]];
export type ModuleId = (typeof ALL_MODULES)[number]["id"];

export const MODULE_MAP: Record<string, PricingModule> = Object.fromEntries(
  ALL_MODULES.map((m) => [m.id, m])
);

export interface QuickBundlePreset {
  id: string;
  name: string;
  description: string;
  moduleIds: string[];
  badge?: string;
}

export const QUICK_BUNDLES: QuickBundlePreset[] = [
  {
    id: "essential-starter",
    name: "Starter Crew Pack",
    description: "Base Access + Email Defender + Instant Lead Router + App-to-Accounting Bridge",
    moduleIds: ["base-retainer", "inbox-defender", "lead-router", "app-to-accounting"],
    badge: "Most Popular Starter",
  },
  {
    id: "fleet-tech-pack",
    name: "Fleet & Yard Operations",
    description: "Base Access + In-Box Defender + Tablet Lockdown + Shop Wi-Fi Shield",
    moduleIds: ["base-retainer", "inbox-defender", "fleet-tablet-lockdown", "shop-network-shield"],
  },
  {
    id: "sales-rev-engine",
    name: "Sales & Cash Flow Engine",
    description: "Base Access + Lead Router + Estimate Chaser + Commercial Hitlists + Accounting Sync + Debt Collector",
    moduleIds: [
      "base-retainer",
      "lead-router",
      "estimate-chaser",
      "commercial-hitlists",
      "app-to-accounting",
      "debt-collector",
    ],
  },
  {
    id: "full-fractional",
    name: "Full Back Office",
    description: "Every TechOps, SalesOps, and RevOps module active for maximum speed.",
    moduleIds: ALL_MODULES.map((m) => m.id),
    badge: "Total Coverage",
  },
];

export function calculateTotalMonthlyCost(selectedIds: string[]): number {
  const set = new Set(selectedIds);
  set.add(BASE_RETAINER_MODULE.id);
  return ALL_MODULES.reduce((sum, mod) => (set.has(mod.id) ? sum + mod.price : sum), 0);
}

export function sanitizeSelectedModules(selectedIds: unknown): string[] {
  if (!Array.isArray(selectedIds)) return [BASE_RETAINER_MODULE.id];
  const valid = selectedIds.filter(
    (id): id is string => typeof id === "string" && id in MODULE_MAP
  );
  if (!valid.includes(BASE_RETAINER_MODULE.id)) {
    valid.unshift(BASE_RETAINER_MODULE.id);
  }
  return Array.from(new Set(valid));
}

/** Recommend suggested add-on modules based on crew size. */
export function recommendModulesForCrew(crewSize: number): string[] {
  const recs = ["base-retainer", "inbox-defender"];
  if (crewSize >= 5) {
    recs.push("fleet-tablet-lockdown", "app-to-accounting");
  }
  if (crewSize >= 10) {
    recs.push("lead-router", "estimate-chaser", "debt-collector");
  }
  if (crewSize >= 15) {
    recs.push("shop-network-shield", "commercial-hitlists", "job-profit-xray", "onsite-dispatch-pass");
  }
  return sanitizeSelectedModules(recs);
}

export const formatUSD = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/* Legacy exports kept for backward compatibility with existing components / structured data */
export const ALL_PLANS = ALL_MODULES.map((m) => ({
  id: m.id,
  name: m.title,
  shortName: m.title,
  price: m.price,
  hours: m.isMandatory ? 2 : 4,
  bestFor: m.categoryLabel,
  crewRange: "All Trade Crews",
  tierNumber: "Module",
  tierLabel: m.categoryLabel,
}));
