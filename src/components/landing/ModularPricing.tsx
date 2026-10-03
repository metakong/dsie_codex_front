"use client";

import { useState } from "react";
import {
  BASE_RETAINER_MODULE,
  TECHOPS_MODULES,
  SALESOPS_MODULES,
  REVOPS_MODULES,
  ALL_MODULES,
  QUICK_BUNDLES,
  calculateTotalMonthlyCost,
  formatUSD,
  MODULE_MAP,
  type PricingModule,
  type ModuleCategory,
} from "@/lib/plans";
import { useSelectedPlan } from "./SelectedPlanContext";

export default function ModularPricing() {
  const { selectedModules, toggleModule, applyPreset, setSelectedModules } = useSelectedPlan();
  const [activeTab, setActiveTab] = useState<ModuleCategory | "all">("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const totalMonthlyCost = calculateTotalMonthlyCost(selectedModules);
  const selectedCount = selectedModules.length;

  const categories: { key: ModuleCategory | "all"; label: string; count: number }[] = [
    { key: "all", label: "All Modules", count: ALL_MODULES.length },
    { key: "tech", label: "TechOps (The Toolkit)", count: TECHOPS_MODULES.length },
    { key: "sales", label: "SalesOps (The Front Door)", count: SALESOPS_MODULES.length },
    { key: "rev", label: "RevOps (The Vault)", count: REVOPS_MODULES.length },
  ];

  const handleClearOptional = () => {
    setSelectedModules([BASE_RETAINER_MODULE.id]);
  };

  const scrollToCheckout = () => {
    setIsDrawerOpen(false);
    if (typeof window !== "undefined") {
      const el = document.getElementById("get-started");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="plans" className="relative scroll-mt-20 border-t border-zinc-900 bg-zinc-950 py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 mb-4">
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-emerald-400">
              Interactive Modular Pricing &middot; Build Your Back Office
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-100">
            Build-Your-Own Back Office. <br className="hidden sm:inline" />
            <span className="text-emerald-400">Pay Only For What You Use.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Trade owners hate paying for bloated software bundles they don&apos;t need. Start with our mandatory{" "}
            <strong className="text-zinc-200">$99/mo Base Access Retainer</strong>, then toggle the exact tech, sales, and billing modules your shop needs.
          </p>
        </div>

        {/* QUICK PRESETS / BUNDLES */}
        <div className="mt-8 border border-zinc-800 bg-zinc-900/40 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 border-b border-zinc-800 pb-3">
            <div>
              <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                ⚡ Quick Presets
              </span>
              <span className="ml-2 text-xs text-zinc-400 hidden sm:inline">
                Tap to auto-configure popular setups:
              </span>
            </div>
            <button
              onClick={handleClearOptional}
              className="text-left sm:text-right font-mono text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Reset to Base Retainer Only ($99/mo)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {QUICK_BUNDLES.map((bundle) => {
              const isCurrent =
                bundle.moduleIds.length === selectedModules.length &&
                bundle.moduleIds.every((id) => selectedModules.includes(id));
              const cost = calculateTotalMonthlyCost(bundle.moduleIds);

              return (
                <button
                  key={bundle.id}
                  onClick={() => applyPreset(bundle.id)}
                  className={`text-left p-3 border transition-all text-xs font-mono flex flex-col justify-between ${
                    isCurrent
                      ? "border-emerald-500 bg-emerald-500/15 text-emerald-300 shadow-md shadow-emerald-950/40"
                      : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-zinc-100">{bundle.name}</span>
                      <span className="text-emerald-400 font-bold">{formatUSD(cost)}/mo</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-1 font-sans line-clamp-2">
                      {bundle.description}
                    </p>
                  </div>
                  {bundle.badge && (
                    <span className="mt-2 inline-block font-mono text-[9px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 border border-emerald-500/20 self-start">
                      {bundle.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-800">
          {categories.map((cat) => {
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`whitespace-nowrap font-mono text-xs uppercase tracking-wider px-4 py-2.5 border transition-all ${
                  isActive
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold border-b-2 border-b-emerald-400"
                    : "border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            );
          })}
        </div>

        {/* MODULE CARDS CONTAINER */}
        <div className="mt-8 space-y-10">
          {/* MANDATORY BASE RETAINER CARD */}
          {(activeTab === "all" || activeTab === "base") && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">
                  01. The Required Foundation
                </span>
                <span className="font-mono text-[11px] text-zinc-500">Pre-Selected &amp; Mandatory</span>
              </div>

              <div className="border-2 border-emerald-500/60 bg-emerald-950/20 p-5 sm:p-6 shadow-lg shadow-emerald-950/30 relative">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-emerald-400 bg-emerald-500 text-zinc-950 font-bold text-xs">
                      🔒
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-2 py-0.5 border border-emerald-500/30">
                          {BASE_RETAINER_MODULE.badge}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-zinc-100 mt-1">
                        {BASE_RETAINER_MODULE.title}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-300 max-w-2xl leading-relaxed">
                        {BASE_RETAINER_MODULE.fullDescription}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-zinc-400">
                        <li className="flex items-center gap-1.5">
                          <span className="text-emerald-400">✓</span> Guaranteed Roster Spot
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="text-emerald-400">✓</span> 2 Hrs Remote Triage / Mo
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="text-emerald-400">✓</span> Direct Ticketing Access
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0 border-t sm:border-t-0 border-zinc-800/80 pt-3 sm:pt-0">
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-zinc-100">
                      {formatUSD(BASE_RETAINER_MODULE.price)}
                    </div>
                    <div className="font-mono text-xs text-zinc-500">/ month retainer</div>
                    <div className="font-mono text-[10px] text-emerald-400 mt-1">Locked Foundation</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TECHOPS MODULES SECTION */}
          {(activeTab === "all" || activeTab === "tech") && (
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-2">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">
                    TechOps Add-Ons
                  </span>
                  <span className="ml-2 font-mono text-xs text-zinc-400">{"// Field Tech & Shop Wi-Fi"}</span>
                </div>
                <span className="font-mono text-xs text-zinc-500">A&apos;la carte options</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TECHOPS_MODULES.map((module) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    isSelected={selectedModules.includes(module.id)}
                    onToggle={() => toggleModule(module.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* SALESOPS MODULES SECTION */}
          {(activeTab === "all" || activeTab === "sales") && (
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-2">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">
                    SalesOps Add-Ons
                  </span>
                  <span className="ml-2 font-mono text-xs text-zinc-400">{"// Lead Capture & Driveway Bids"}</span>
                </div>
                <span className="font-mono text-xs text-zinc-500">A&apos;la carte options</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SALESOPS_MODULES.map((module) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    isSelected={selectedModules.includes(module.id)}
                    onToggle={() => toggleModule(module.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* REVOPS MODULES SECTION */}
          {(activeTab === "all" || activeTab === "rev") && (
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-2">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">
                    RevOps Add-Ons
                  </span>
                  <span className="ml-2 font-mono text-xs text-zinc-400">{"// QuickBooks Sync & Mobile Invoicing"}</span>
                </div>
                <span className="font-mono text-xs text-zinc-500">A&apos;la carte options</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {REVOPS_MODULES.map((module) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    isSelected={selectedModules.includes(module.id)}
                    onToggle={() => toggleModule(module.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Plain-English guarantee note */}
        <div className="mt-12 border border-zinc-800 bg-zinc-900/30 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            <strong className="text-zinc-200">Zero Lock-In Commitment:</strong> Add or remove modules at any time.
            Bills are flat monthly rates with transparent invoicing. Based locally in Springfield, MO.
          </div>
          <button
            onClick={scrollToCheckout}
            className="shrink-0 text-emerald-400 hover:text-emerald-300 underline uppercase tracking-wider"
          >
            Review Selected Plan ({selectedCount} active) &rrarr;
          </button>
        </div>
      </div>

      {/* STICKY BOTTOM CALCULATOR BAR FOR MOBILE & DESKTOP */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-emerald-500/40 bg-zinc-950/95 backdrop-blur-md px-4 py-3 sm:py-3.5 shadow-2xl shadow-emerald-950">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
              title="Click to expand itemized breakdown"
            >
              <div className="flex h-9 w-9 items-center justify-center border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold">
                {selectedCount}
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 flex items-center gap-1 group-hover:text-emerald-400">
                  <span>Selected Modules</span>
                  <span className="text-[9px] text-zinc-500">{isDrawerOpen ? "▲ Hide" : "▼ Breakdown"}</span>
                </div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-400">
                  {formatUSD(totalMonthlyCost)}
                  <span className="text-xs text-zinc-400 font-normal"> /mo</span>
                </div>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="hidden sm:inline-block font-mono text-xs text-zinc-400 hover:text-zinc-200 border border-zinc-800 bg-zinc-900 px-3 py-2.5 transition-colors"
            >
              {isDrawerOpen ? "Hide Breakdown" : "View Breakdown"}
            </button>
            <button
              onClick={scrollToCheckout}
              className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider px-4 sm:px-6 py-2.5 sm:py-3 transition-colors shadow-lg shadow-emerald-950/50 whitespace-nowrap"
            >
              Lock In This Plan ({formatUSD(totalMonthlyCost)}/mo)
            </button>
          </div>
        </div>

        {/* EXPANDABLE ITEMIZED BREAKDOWN DRAWER */}
        {isDrawerOpen && (
          <div className="max-w-6xl mx-auto mt-3 pt-3 border-t border-zinc-800 max-h-60 overflow-y-auto font-mono text-xs">
            <div className="flex justify-between items-center text-zinc-400 mb-2 pb-1 border-b border-zinc-900">
              <span className="uppercase text-[11px]">Itemized Back Office Breakdown</span>
              <button onClick={() => setIsDrawerOpen(false)} className="text-zinc-500 hover:text-zinc-300">
                ✕ Close
              </button>
            </div>
            <ul className="space-y-1.5">
              {selectedModules.map((id) => {
                const mod = MODULE_MAP[id];
                if (!mod) return null;
                return (
                  <li key={id} className="flex items-center justify-between text-zinc-300 bg-zinc-900/50 px-2.5 py-1">
                    <span className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{mod.title}</span>
                      {mod.isMandatory && (
                        <span className="text-[9px] text-zinc-500 uppercase">(Base)</span>
                      )}
                    </span>
                    <span className="text-emerald-400 font-bold">{formatUSD(mod.price)}/mo</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function ModuleCard({
  module,
  isSelected,
  onToggle,
}: {
  module: PricingModule;
  isSelected: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      className={`group cursor-pointer relative flex flex-col justify-between border p-4 sm:p-5 transition-all select-none ${
        isSelected
          ? "border-emerald-500 bg-emerald-500/10 shadow-md shadow-emerald-950/30"
          : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Tactile Checkbox Switch */}
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center border transition-all ${
                isSelected
                  ? "border-emerald-400 bg-emerald-500 text-zinc-950 font-bold text-xs"
                  : "border-zinc-700 bg-zinc-950 text-transparent group-hover:border-zinc-500"
              }`}
            >
              ✓
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              {module.categoryLabel}
            </span>
          </div>

          <span className="font-mono text-sm font-bold text-emerald-400 whitespace-nowrap">
            +{formatUSD(module.price)}
            <span className="text-[10px] text-zinc-500 font-normal">/mo</span>
          </span>
        </div>

        <h4 className="text-base font-bold text-zinc-100 mt-3 group-hover:text-emerald-300 transition-colors">
          {module.title}
        </h4>

        <p className="mt-1 text-xs text-zinc-400 leading-relaxed font-sans">
          {module.fullDescription}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
        {module.badge ? (
          <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 border border-emerald-500/20">
            {module.badge}
          </span>
        ) : (
          <span className="font-mono text-[10px] text-zinc-500">A&apos;la carte module</span>
        )}

        <span
          className={`font-mono text-[11px] uppercase tracking-wider transition-colors ${
            isSelected ? "text-emerald-400 font-bold" : "text-zinc-500 group-hover:text-zinc-300"
          }`}
        >
          {isSelected ? "Active ✓" : "+ Add Module"}
        </span>
      </div>
    </div>
  );
}
