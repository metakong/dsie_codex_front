"use client";

import { useState } from "react";
import {
  PILLAR_INFO,
  PLANS_BY_PILLAR,
  WHOLE_HOUSE_BUNDLE,
  formatUSD,
  type PillarKey,
  type Plan,
} from "@/lib/plans";
import PlanSelectLink from "./PlanSelectLink";

const PILLAR_KEYS: PillarKey[] = ["tech", "sales", "rev"];

const STEPS = [
  {
    number: "01",
    title: "Pick your pillar & tier",
    body: "Choose TechOps, SalesOps, RevOps, or bundle all three for total coverage.",
  },
  {
    number: "02",
    title: "Call, text, or email us",
    body: "When something breaks, quotes need sending, or invoices lag, reach out directly.",
  },
  {
    number: "03",
    title: "We solve it & track the time",
    body: "Every minute is logged transparently so you always know where your plan went.",
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const featured = Boolean(plan.featured);

  return (
    <article
      className={`relative flex flex-col border p-6 sm:p-7 transition-colors ${
        featured
          ? "border-emerald-500/50 bg-zinc-900/80 shadow-lg shadow-emerald-950/30"
          : "border-zinc-800 bg-zinc-900/40 hover:border-emerald-500/50"
      }`}
    >
      {featured && (
        <div className="absolute -top-3 right-4 bg-emerald-500 text-zinc-950 font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5">
          Most Popular
        </div>
      )}

      <div className="flex items-center justify-between gap-2">
        <span
          className={`font-mono text-xs uppercase tracking-wider ${
            featured ? "text-emerald-400" : "text-zinc-500"
          }`}
        >
          {plan.tierNumber} {"//"} {plan.tierLabel}
        </span>
        <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 whitespace-nowrap">
          {plan.crewRange}
        </span>
      </div>

      <h3 className="text-xl font-bold text-zinc-100 mt-3">{plan.name}</h3>
      <p className="text-sm text-zinc-400 mt-1">Best for {plan.bestFor.toLowerCase()}</p>

      <div className="mt-5 flex items-baseline gap-1">
        <span className="text-4xl font-bold font-mono text-zinc-100">{formatUSD(plan.price)}</span>
        <span className="text-xs font-mono text-zinc-500">/ month</span>
      </div>

      <div className="mt-3 flex items-center gap-2 border border-zinc-800 bg-zinc-950/60 px-3 py-2 font-mono text-xs">
        <span className="text-emerald-400 font-bold">{plan.hours} hours</span>
        <span className="text-zinc-400">dedicated help every month</span>
      </div>

      {plan.includesPrevious && (
        <p className="text-xs font-mono text-emerald-400/90 mt-6">{plan.includesPrevious}</p>
      )}

      <ul className={`${plan.includesPrevious ? "mt-3" : "mt-6"} space-y-3.5 text-sm flex-grow`}>
        {plan.features.map((feature) => (
          <li key={feature.title} className="flex items-start gap-2.5">
            <span aria-hidden="true" className="text-emerald-400 font-mono text-xs mt-0.5">
              ✓
            </span>
            <span>
              <strong className="text-zinc-100 font-semibold block">{feature.title}</strong>
              <span className="text-zinc-400 text-xs sm:text-sm mt-0.5 leading-relaxed block">
                {feature.detail}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-5 border-t border-zinc-800/80">
        <PlanSelectLink
          interest={plan.id}
          className={`block w-full text-center font-mono text-xs uppercase tracking-wider py-3.5 sm:py-3 transition-colors ${
            featured
              ? "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold"
              : "border border-zinc-700 bg-zinc-800/60 hover:bg-zinc-800 hover:border-emerald-500/50 text-zinc-200"
          }`}
        >
          {plan.cta}
        </PlanSelectLink>
      </div>
    </article>
  );
}

export default function Plans() {
  const [activePillar, setActivePillar] = useState<PillarKey>("tech");
  const currentPillarInfo = PILLAR_INFO[activePillar];
  const activePlans = PLANS_BY_PILLAR[activePillar];

  return (
    <section id="plans" className="scroll-mt-20 border-t border-zinc-900 bg-zinc-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
            Subscription Plans &amp; Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mt-1">
            Choose Your Operational Pillar. Scale by Hours.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Every subscription grants you dedicated monthly back-office hours across three
            straightforward tiers ($195, $299, $375). Pick the standalone service you need most,
            or lock in the complete Whole House Bundle.
          </p>
        </div>

        {/* PROMINENT WHOLE HOUSE BUNDLE UPSELL BANNER */}
        <aside
          aria-label="Featured bundle"
          className="relative mb-12 border-2 border-emerald-500/60 bg-gradient-to-r from-emerald-950/40 via-zinc-900/90 to-zinc-900/60 p-6 sm:p-8 shadow-xl shadow-emerald-950/30"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-4 mb-5">
            <div className="inline-flex items-center gap-2">
              <span className="bg-emerald-500 text-zinc-950 font-mono text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5">
                ★ Whole House Bundle
              </span>
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider">
                Full Fractional Coverage
              </span>
            </div>
            <div className="font-mono text-xs text-zinc-400">
              75 Hours/mo Across Tech, Sales &amp; RevOps
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-100">
                Get Fractional Tech, Sales, and RevOps (Tier 3 across the board) for $1,125/month.
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Why juggle three separate back-office issues? The Whole House Bundle gives your
                contracting business 25 hours of TechOps, 25 hours of SalesOps, and 25 hours of
                RevOps every month. Your trucks stay running, quotes fly out from driveways, and
                cash flows directly to the bank.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 font-mono text-xs text-zinc-400">
                <div className="border border-zinc-800 bg-zinc-950/70 p-2.5">
                  <span className="text-emerald-400 font-bold block">✓ 25h TechOps</span>
                  <span className="text-[11px] text-zinc-500">Wi-Fi, tablets &amp; on-site dispatch</span>
                </div>
                <div className="border border-zinc-800 bg-zinc-950/70 p-2.5">
                  <span className="text-emerald-400 font-bold block">✓ 25h SalesOps</span>
                  <span className="text-[11px] text-zinc-500">SMS routing &amp; live scoreboards</span>
                </div>
                <div className="border border-zinc-800 bg-zinc-950/70 p-2.5">
                  <span className="text-emerald-400 font-bold block">✓ 25h RevOps</span>
                  <span className="text-[11px] text-zinc-500">Auto-invoices &amp; job costing</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end justify-between border-t lg:border-t-0 lg:border-l border-zinc-800/80 pt-6 lg:pt-0 lg:pl-8">
              <div className="text-center lg:text-right">
                <div className="font-mono text-3xl sm:text-4xl font-bold text-zinc-100">
                  {formatUSD(WHOLE_HOUSE_BUNDLE.price)}
                </div>
                <div className="font-mono text-xs text-zinc-500">/ month &middot; flat retainer</div>
                <div className="text-[11px] font-mono text-emerald-400 mt-1">
                  Save vs. hiring even 1 in-house staffer
                </div>
              </div>

              <div className="w-full mt-6">
                <PlanSelectLink
                  interest="whole-house-bundle"
                  className="block w-full text-center bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider py-3.5 transition-colors shadow-md shadow-emerald-950/40"
                >
                  Claim Whole House Bundle
                </PlanSelectLink>
              </div>
            </div>
          </div>
        </aside>

        {/* PILLAR SELECTION TABS */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              Select A Standalone Pillar:
            </h3>
            <span className="font-mono text-xs text-zinc-500 hidden sm:inline">
              3-Tier Standalone Subscriptions ($195 &middot; $299 &middot; $375)
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Service Pillar Subscriptions"
            className="grid grid-cols-1 sm:grid-cols-3 gap-2 border border-zinc-800 bg-zinc-950 p-1.5"
          >
            {PILLAR_KEYS.map((key) => {
              const info = PILLAR_INFO[key];
              const isActive = activePillar === key;
              return (
                <button
                  key={key}
                  role="tab"
                  id={`tab-${key}`}
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${key}`}
                  onClick={() => setActivePillar(key)}
                  className={`cursor-pointer px-4 py-3.5 text-center font-mono text-xs uppercase tracking-wider transition-all ${
                    isActive
                      ? "border border-emerald-500 bg-emerald-500/15 text-emerald-400 font-bold shadow-sm shadow-emerald-950"
                      : "border border-transparent bg-zinc-900/40 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                  }`}
                >
                  {info.tabLabel}
                </button>
              );
            })}
          </div>

          {/* Active Pillar Value Proposition Banner */}
          <div
            id={`tabpanel-${activePillar}`}
            role="tabpanel"
            aria-labelledby={`tab-${activePillar}`}
            className="mt-4 border border-zinc-800 bg-zinc-900/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-zinc-300"
          >
            <div>
              <strong className="text-emerald-400 font-mono text-xs uppercase tracking-wider mr-2">
                {currentPillarInfo.name}:
              </strong>
              <span>{currentPillarInfo.valueProp}</span>
            </div>
            <span className="font-mono text-[11px] text-zinc-500 shrink-0">
              5 &middot; 12 &middot; 25 Hours/mo
            </span>
          </div>
        </div>

        {/* 3-TIER GRID FOR THE ACTIVE PILLAR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-xl mx-auto lg:max-w-none">
          {activePlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Transparent Policy Footer Banner */}
        <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-zinc-800/80 bg-zinc-900/30 p-5">
          <p className="font-mono text-xs text-zinc-400 leading-relaxed max-w-3xl">
            <span className="text-zinc-200">The fine print, in plain English:</span> unused hours
            do not roll over to the next month. Need extra support? Additional hours are billed at a
            simple flat rate tied to your plan tier. Zero long-term contracts. Transparent monthly billing.
          </p>
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider whitespace-nowrap">
            Springfield, MO Direct Support
          </span>
        </div>

        {/* How the hours work */}
        <div className="mt-14">
          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            How your hours work
          </h3>
          <ol className="mt-4 grid grid-cols-1 sm:grid-cols-3 border border-zinc-800 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
            {STEPS.map((step) => (
              <li key={step.number} className="p-5 bg-zinc-900/20">
                <span className="font-mono text-xs text-emerald-400">{step.number}</span>
                <p className="mt-1 font-semibold text-zinc-100">{step.title}</p>
                <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
