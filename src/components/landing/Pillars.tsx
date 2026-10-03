import type { ReactNode } from "react";
import { PLANS, formatUSD, type PillarKey } from "@/lib/plans";

const ICON_PROPS = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const ICONS: Record<PillarKey, ReactNode> = {
  // Wrench
  tech: (
    <svg {...ICON_PROPS}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  // Inbox
  sales: (
    <svg {...ICON_PROPS}>
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  // Vault
  rev: (
    <svg {...ICON_PROPS}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 9V7M12 17v-2M9 12H7M17 12h-2" />
    </svg>
  ),
};

const PILLARS: {
  key: PillarKey;
  number: string;
  name: string;
  nickname: string;
  headline: string;
  body: string;
  items: string[];
  fixes: string;
}[] = [
  {
    key: "tech",
    number: "01",
    name: "TechOps",
    nickname: "The Toolkit",
    headline: "Keep the crew working, not troubleshooting.",
    body: "Tablets that sync, printers that print, Wi-Fi that reaches the back of the shop, and email that stays out of spam. All without paying $60k a year for an IT guy.",
    items: [
      "Tablets & phones in the trucks",
      "Shop Wi-Fi, printers & email",
      "New hires set up, ex-employees locked out",
    ],
    fixes: "Techs burning paid hours on frozen screens",
  },
  {
    key: "sales",
    number: "02",
    name: "SalesOps",
    nickname: "The Front Door",
    headline: "Catch every lead. Close it faster.",
    body: "Every call, web form, and quote request lands on your phone. Quotes go out from the driveway, and unsigned estimates get chased automatically, so jobs stop slipping to the next guy.",
    items: [
      "Every lead texted to your phone",
      "Quotes sent from the driveway",
      "Automatic estimate follow-ups",
    ],
    fixes: "Leads going cold in a voicemail box",
  },
  {
    key: "rev",
    number: "03",
    name: "RevOps",
    nickname: "The Vault",
    headline: "Get paid for every job you finish.",
    body: "Timecards flow to payroll, finished jobs turn into invoices, and late payers get reminders. You finally see which jobs made money and which ones quietly didn\u2019t.",
    items: [
      "Automatic invoices & payment reminders",
      "Timecards straight to payroll",
      "Job-by-job profit checkups",
    ],
    fixes: "Unbilled hours & surprise money-losers",
  },
];

const topPlan = PLANS[PLANS.length - 1];

export default function Pillars() {
  return (
    <section id="services" className="relative scroll-mt-20 border-t border-zinc-900 bg-zinc-950 py-20 px-6">
      <div id="triad" className="absolute -top-20" aria-hidden="true" />
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 max-w-3xl">
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
            What We Handle
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mt-1">
            One Back Office. Three Jobs Done Right.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Your plan hours work across all three. Whatever is slowing the crew down this month,
            whether that&apos;s tablets, leads, or billing, gets fixed first.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.key}
              className="group border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col hover:border-emerald-500/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                  {pillar.number} {"//"} {pillar.nickname}
                </span>
                <span className="flex h-10 w-10 items-center justify-center border border-zinc-800 bg-zinc-950 text-emerald-400 group-hover:border-emerald-500/50 transition-colors">
                  {ICONS[pillar.key]}
                </span>
              </div>

              <h3 className="mt-4 font-mono text-sm font-bold uppercase tracking-wider text-emerald-400">
                {pillar.name}
              </h3>
              <p className="mt-1 text-lg font-semibold text-zinc-100 leading-snug">
                {pillar.headline}
              </p>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{pillar.body}</p>

              <ul className="mt-5 space-y-2 text-sm text-zinc-300 flex-grow">
                {pillar.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden="true" className="text-emerald-400 font-mono text-xs mt-0.5">
                      &rsaquo;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-zinc-800 font-mono text-xs text-emerald-400">
                <span className="text-zinc-500">Fixes:</span> {pillar.fixes}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 border border-zinc-800/80 bg-zinc-900/30 p-5">
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 shrink-0">
            Do the math
          </span>
          <p className="text-sm text-zinc-300 leading-relaxed">
            An entry-level IT hire runs about <strong className="text-zinc-100">$60,000 a year</strong>{" "}
            before benefits. Our biggest plan is{" "}
            <strong className="text-emerald-400">{formatUSD(topPlan.price * 12)} a year</strong>, and it
            covers your leads and billing too.
          </p>
        </div>
      </div>
    </section>
  );
}
