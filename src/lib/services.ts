// Single frontend source of truth for the service catalog.
// Every price here must match SERVICES_MENU.md exactly — never infer or round.

export type TierId = 0 | 1 | 2 | 3;

export interface Tier {
  id: TierId;
  heading: string;
  badge: string;
}

export interface ProductVariant {
  name: string;
  price: string;
  description?: string;
}

export interface Product {
  slug: string;
  tier: TierId;
  name: string;
  /** Price string shown on the product card (grid view). */
  cardPrice: string;
  /** Price string shown large on the product sub-page. */
  pagePrice: string;
  /** Appended small text after the price, e.g. "/month" or "45 min Zoom". */
  priceNote?: string;
  summary: string;
  details: string[];
  variants?: ProductVariant[];
  creditNote?: string;
  /** "checkout-pending" = digital product awaiting new payment provider; "book" = links to /book. */
  cta: "checkout-pending" | "book";
  ctaLabel: string;
}

export const TIERS: Tier[] = [
  {
    id: 0,
    heading: "TIER 0 — DIGITAL PRODUCTS",
    badge: "SELF-SERVE · NATIONWIDE · ASYNC",
  },
  {
    id: 1,
    heading: "TIER 1 — ENTRY CONSULTING",
    badge: "ZOOM-BASED · FEE CREDITED TO TIER 2 WITHIN 45 DAYS",
  },
  {
    id: 2,
    heading: "TIER 2 — INTEGRATION",
    badge: "CUSTOM BUILD · OWNER-NAMED ACCOUNTS · HUMAN-IN-THE-LOOP",
  },
  {
    id: 3,
    heading: "TIER 3 — MANAGED SERVICES",
    badge: "RECURRING · NO EQUIVALENT IN THE ADVISORY MODEL",
  },
];

export const PRODUCTS: Product[] = [
  // ── TIER 0 — DIGITAL PRODUCTS ────────────────────────────────────────────
  {
    slug: "prompt-engineering-starter-kit",
    tier: 0,
    name: "Prompt Engineering Starter Kit",
    cardPrice: "$67",
    pagePrice: "$67",
    summary:
      "20 business-specific prompt templates covering lead follow-up, proposal drafting, objection handling, content, and internal SOPs.",
    details: [
      "20 prompt templates written for real business workflows — not generic examples",
      "Covers lead follow-up, proposal drafting, and objection handling",
      "Content generation and internal SOP templates included",
      "Digital delivery — start using the templates the same day",
    ],
    creditNote:
      "Fee credited in full toward the next tier if an engagement is booked within 45 days of purchase.",
    cta: "checkout-pending",
    ctaLabel: "Get Instant Access",
  },
  {
    slug: "ai-spend-audit-report",
    tier: 0,
    name: "AI Spend Audit Report",
    cardPrice: "$127",
    pagePrice: "$127",
    summary:
      "Complete a 15-question intake. Receive a verified PDF within 48 hours showing exactly where you are overpaying and what consolidation should cost.",
    details: [
      "15-question intake — takes about ten minutes to complete",
      "Verified PDF report delivered within 48 hours",
      "Shows exactly where you are overpaying on AI and software tooling",
      "Includes a consolidation target: what the same capability should cost",
    ],
    creditNote:
      "Fee credited in full toward the next tier if an engagement is booked within 45 days of purchase.",
    cta: "checkout-pending",
    ctaLabel: "Get Instant Access",
  },
  {
    slug: "industry-ai-playbook",
    tier: 0,
    name: "Industry AI Playbook",
    cardPrice: "$297",
    pagePrice: "$297",
    summary:
      "Vertical-specific guide: top workflows, curated tool shortlist with real pricing, ready-to-use prompt library, and a prioritized start-here recommendation.",
    details: [
      "Top AI workflows for your specific vertical",
      "Curated tool shortlist with real pricing — no affiliate padding",
      "Ready-to-use prompt library tuned to the industry",
      "A prioritized start-here recommendation so you know the first move",
      "Verticals at launch: Trades / Home Services, Professional Services, Machine Shops / Manufacturing, Auto Dealerships, Independent Retail",
    ],
    creditNote:
      "Fee credited in full toward the next tier if an engagement is booked within 45 days of purchase.",
    cta: "checkout-pending",
    ctaLabel: "Get Instant Access",
  },

  // ── TIER 1 — ENTRY CONSULTING ────────────────────────────────────────────
  {
    slug: "ai-stack-and-spend-consultation",
    tier: 1,
    name: "AI Stack and Spend Consultation",
    cardPrice: "$247",
    pagePrice: "$247",
    priceNote: "45 min Zoom",
    summary:
      "Built on a completed AI Spend Audit. Reviews current tools, identifies consolidation opportunities, produces a written 90-day recommendation.",
    details: [
      "45-minute Zoom session, built on a completed AI Spend Audit",
      "Full review of your current tool stack and spend",
      "Consolidation opportunities identified line by line",
      "Written 90-day recommendation delivered after the session",
    ],
    creditNote:
      "Full fee credited toward any integration engagement booked within 45 days.",
    cta: "book",
    ctaLabel: "Book This Session",
  },
  {
    slug: "ai-opportunity-flash-session",
    tier: 1,
    name: "AI Opportunity Flash Session",
    cardPrice: "$347",
    pagePrice: "$347",
    priceNote: "60 min Zoom",
    summary:
      "Intake-driven analysis of your top 5 AI integration opportunities with conservative ROI estimates and a straight answer on whether a larger engagement makes sense right now.",
    details: [
      "60-minute Zoom session driven by your completed intake",
      "Your top 5 AI integration opportunities, ranked",
      "Conservative ROI estimates — no inflated projections",
      "A straight answer on whether a larger engagement makes sense right now",
    ],
    creditNote:
      "Full fee credited toward any integration engagement booked within 45 days.",
    cta: "book",
    ctaLabel: "Book This Session",
  },

  // ── TIER 2 — INTEGRATION ─────────────────────────────────────────────────
  {
    slug: "business-ai-diagnostic",
    tier: 2,
    name: "Business AI Diagnostic",
    cardPrice: "$1,750 / $2,750 / $4,500",
    pagePrice: "$1,750 – $4,500",
    summary:
      "Full operational review producing a prioritized integration roadmap detailed enough to execute with or without hiring us.",
    details: [
      "Every workflow in your operation mapped and measured",
      "Prioritized integration roadmap, ranked by ROI",
      "Detailed enough to execute with or without hiring us",
      "The deliverable earns its price as a standalone document",
    ],
    variants: [
      { name: "Micro (1–5 employees)", price: "$1,750" },
      { name: "Small (6–15 employees)", price: "$2,750" },
      { name: "Multi-System", price: "$4,500" },
    ],
    creditNote:
      "Diagnostic fee credited in full toward any integration engagement.",
    cta: "book",
    ctaLabel: "Start With a Diagnostic",
  },
  {
    slug: "automation-sprint",
    tier: 2,
    name: "Automation Sprint",
    cardPrice: "$3,750",
    pagePrice: "$3,750",
    summary:
      "One high-value workflow built, tested, and launched — with 30 days post-launch monitoring included.",
    details: [
      "One high-value workflow selected for maximum impact",
      "Built, tested, and launched — not handed off as a recommendation",
      "30 days of post-launch monitoring included",
      "Human approval required on every price-bearing action",
    ],
    cta: "book",
    ctaLabel: "Start With a Diagnostic",
  },
  {
    slug: "custom-ai-integration",
    tier: 2,
    name: "Custom AI Integration",
    cardPrice: "Foundation $7,500 · Standard $10,500 · Premium $14,500",
    pagePrice: "$7,500 – $14,500",
    summary:
      "A complete custom AI system built and installed in your business, delivered in three build levels.",
    details: [
      "Owner-named cloud accounts — you own every credential",
      "Human approval on all price-bearing actions",
      "Written security policy and full documentation",
      "60-day post-launch support on every build level",
    ],
    variants: [
      {
        name: "Foundation",
        price: "$7,500",
        description: "Capture layer, RAG assistant, owner portal and mobile PWA.",
      },
      {
        name: "Standard",
        price: "$10,500",
        description: "Adds voice/SMS and pricing memory.",
      },
      {
        name: "Premium",
        price: "$14,500",
        description:
          "Full stack including photo capture, material cost monitoring, document generation, and security architecture layer.",
      },
    ],
    cta: "book",
    ctaLabel: "Start With a Diagnostic",
  },
  {
    slug: "enterprise-multi-phase-integration",
    tier: 2,
    name: "Enterprise Multi-Phase Integration",
    cardPrice: "$18,000–$45,000+",
    pagePrice: "$18,000–$45,000+",
    summary:
      "Complex operations, multiple locations, or regulatory requirements. Phased delivery over 3–6 months, milestone-based payment, team training and change management included.",
    details: [
      "Built for complex operations, multiple locations, or regulatory requirements",
      "Phased delivery over 3–6 months",
      "Milestone-based payment — you pay as verified phases land",
      "Team training and change management included",
    ],
    cta: "book",
    ctaLabel: "Start With a Diagnostic",
  },

  // ── TIER 3 — MANAGED SERVICES ────────────────────────────────────────────
  {
    slug: "system-monitor",
    tier: 3,
    name: "System Monitor",
    cardPrice: "$850",
    pagePrice: "$850",
    priceNote: "/month",
    summary:
      "Proactive monitoring, error alerts, monthly cost-and-performance report, minor tuning, vendor update review, one advisory hour per month.",
    details: [
      "Proactive monitoring with error alerts",
      "Monthly cost-and-performance report",
      "Minor tuning and vendor update review",
      "One advisory hour per month",
    ],
    cta: "book",
    ctaLabel: "Add to Integration",
  },
  {
    slug: "active-management",
    tier: 3,
    name: "Active Management",
    cardPrice: "$1,350",
    pagePrice: "$1,350",
    priceNote: "/month",
    summary:
      "Everything in Monitor plus up to 4 hours monthly development work, priority one-business-day response, quarterly business review with documented impact metrics.",
    details: [
      "Everything in System Monitor",
      "Up to 4 hours of development work every month",
      "Priority one-business-day response",
      "Quarterly business review with documented impact metrics",
    ],
    cta: "book",
    ctaLabel: "Add to Integration",
  },
  {
    slug: "premium-managed-advisory",
    tier: 3,
    name: "Premium Managed + Advisory",
    cardPrice: "$1,750",
    pagePrice: "$1,750",
    priceNote: "/month",
    summary:
      "Everything in Active plus up to 8 hours monthly development, same-day response, quarterly staff training sessions, strategic technology advisory on any decision facing the business.",
    details: [
      "Everything in Active Management",
      "Up to 8 hours of development work every month",
      "Same-day response",
      "Quarterly staff training sessions",
      "Strategic technology advisory on any decision facing the business",
    ],
    cta: "book",
    ctaLabel: "Add to Integration",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsByTier(tier: TierId): Product[] {
  return PRODUCTS.filter((p) => p.tier === tier);
}
