"use client";

import { useState } from "react";
import {
  BASE_RETAINER_MODULE,
  ADDON_MODULES,
  MODULE_MAP,
  calculateTotalMonthlyCost,
  formatUSD,
  recommendModulesForCrew,
} from "@/lib/plans";
import { useSelectedPlan } from "./SelectedPlanContext";

const HOURLY_COST = 35; // Blended Springfield-area labor cost per hour
const WEEKS_PER_MONTH = 4.33;
const HOURS_PER_APP_PER_WEEK = 3;
const TECH_HOURS_PER_WORKER_PER_WEEK = 0.5;

const CREW_MIN = 2;
const CREW_MAX = 35;

type SliderProps = {
  id: string;
  label: string;
  help: string;
  value: number;
  min: number;
  max: number;
  display: string;
  minLabel: string;
  maxLabel: string;
  onChange: (value: number) => void;
};

function Slider({ id, label, help, value, min, max, display, minLabel, maxLabel, onChange }: SliderProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-zinc-200">
          {label}
        </label>
        <span className="font-mono text-sm font-bold text-emerald-400 whitespace-nowrap">{display}</span>
      </div>
      <p id={`${id}-help`} className="mt-0.5 text-xs text-zinc-500">
        {help}
      </p>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        aria-describedby={`${id}-help`}
        aria-valuetext={display}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full h-6 accent-emerald-500 cursor-pointer"
      />
      <div className="flex justify-between font-mono text-[10px] text-zinc-600">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

const inputClass =
  "w-full border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-base sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors";
const labelClass = "block font-mono text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5";

export default function Checkup() {
  const { selectedModules, toggleModule, setSelectedModules } = useSelectedPlan();

  // Calculator state
  const [crewSize, setCrewSize] = useState(8);
  const [paperworkHours, setPaperworkHours] = useState(6);
  const [disconnectedApps, setDisconnectedApps] = useState(3);

  // Form state
  const [form, setForm] = useState({ contactName: "", companyName: "", email: "", phone: "", website: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  // Math
  const paperworkMonthlyHours = paperworkHours * WEEKS_PER_MONTH;
  const appsMonthlyHours = disconnectedApps * HOURS_PER_APP_PER_WEEK * WEEKS_PER_MONTH;
  const techMonthlyHours = crewSize * TECH_HOURS_PER_WORKER_PER_WEEK * WEEKS_PER_MONTH;
  const totalMonthlyHours = paperworkMonthlyHours + appsMonthlyHours + techMonthlyHours;
  const wastedMonthlyCost = Math.round(totalMonthlyHours * HOURLY_COST);
  const wastedYearlyCost = wastedMonthlyCost * 12;
  const workWeeks = totalMonthlyHours / 40;

  const currentPlanCost = calculateTotalMonthlyCost(selectedModules);

  const handleApplyRecommended = () => {
    const recs = recommendModulesForCrew(crewSize);
    setSelectedModules(recs);
  };

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          selectedModules,
          crewSize,
          paperworkHours,
          disconnectedApps,
          estimatedMonthlyCost: currentPlanCost,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Application submission failed. Please check the fields.");
      }
      setReferenceId(data.referenceId);
      setStatus("idle");
    } catch (err: unknown) {
      console.error("Operational audit application failed", err);
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong submitting your application.");
    }
  };

  const firstName = form.contactName.trim().split(/\s+/)[0];

  return (
    <section id="checkup" className="relative scroll-mt-20 border-t border-zinc-900 bg-zinc-900/20 py-20 px-4 sm:px-6">
      <div id="diagnostic" className="absolute -top-20" aria-hidden="true" />
      <div className="max-w-4xl mx-auto border border-zinc-800 bg-zinc-950 p-5 sm:p-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-5 mb-8">
          <div>
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
              Free Operational Checkup &amp; Audit Application
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-1">
              What Is Office Busywork Costing Your Business?
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Slide the bars to match your team. Compare your wasted labor to your estimated modular total below.
            </p>
          </div>
          <div className="font-mono text-[11px] text-zinc-600 hidden sm:block whitespace-nowrap pt-1">
            SPRINGFIELD, MO
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sliders */}
          <div className="space-y-7">
            <Slider
              id="crew-size"
              label="How many people work in your operation?"
              help="Count everyone: field technicians, office staff, and leadership."
              value={crewSize}
              min={CREW_MIN}
              max={CREW_MAX}
              display={`${crewSize}${crewSize === CREW_MAX ? "+" : ""} team members`}
              minLabel={`${CREW_MIN}`}
              maxLabel={`${CREW_MAX}+`}
              onChange={setCrewSize}
            />
            <Slider
              id="paperwork-hours"
              label="Hours a week spent on paperwork"
              help="Retyping timecards, building estimates, chasing down job details."
              value={paperworkHours}
              min={0}
              max={20}
              display={`${paperworkHours} hrs/wk`}
              minLabel="0"
              maxLabel="20 hrs"
              onChange={setPaperworkHours}
            />
            <Slider
              id="disconnected-apps"
              label="Apps that don't talk to each other"
              help="QuickBooks, scheduling tools, spreadsheets, paper notebooks…"
              value={disconnectedApps}
              min={0}
              max={6}
              display={`${disconnectedApps} ${disconnectedApps === 1 ? "app" : "apps"}`}
              minLabel="0"
              maxLabel="6"
              onChange={setDisconnectedApps}
            />
          </div>

          {/* Calculator Output */}
          <div className="border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6 flex flex-col justify-between" aria-live="polite">
            <div>
              <div className="font-mono text-xs text-zinc-400 uppercase">Paid hours lost every month</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-zinc-100">
                  {Math.round(totalMonthlyHours)}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  hrs &asymp; {workWeeks.toFixed(1)} full work weeks
                </span>
              </div>

              <div className="mt-5 pt-5 border-t border-zinc-800">
                <div className="font-mono text-xs text-zinc-400 uppercase">Estimated Waste Cost</div>
                <div className="text-3xl font-bold font-mono text-red-400 mt-1">
                  {formatUSD(wastedMonthlyCost)}
                  <span className="text-xs text-zinc-500 font-normal"> /mo</span>
                </div>
                <div className="text-xs font-mono text-zinc-500 mt-1">
                  {formatUSD(wastedYearlyCost)} a year out the window
                </div>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-zinc-800">
              <div className="font-mono text-xs text-zinc-400 uppercase">Recommended for {crewSize} Team Members</div>
              <p className="mt-1 text-xs text-zinc-300 leading-relaxed">
                Auto-select suggested modules for a team of {crewSize}:
              </p>
              <button
                type="button"
                onClick={handleApplyRecommended}
                className="mt-3 block w-full text-center border border-emerald-500/40 text-emerald-400 font-mono text-xs uppercase tracking-wider py-2.5 hover:bg-emerald-500 hover:text-zinc-950 transition-colors"
              >
                Apply Recommended Module Setup
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 text-[11px] font-mono text-zinc-600 leading-relaxed">
          Assumes ${HOURLY_COST}/hr blended labor cost, {HOURS_PER_APP_PER_WEEK} hrs/wk per non-syncing app, and 30 mins/wk tech trouble per worker.
        </p>

        {/* OPERATIONAL AUDIT APPLICATION FORM */}
        <div id="get-started" className="scroll-mt-24 mt-10 pt-8 border-t border-zinc-800">
          {referenceId ? (
            <div className="p-6 border border-emerald-500/40 bg-emerald-500/10 text-center" role="status">
              <span className="font-mono text-emerald-400 font-bold text-sm">
                APPLICATION RECEIVED &middot; REF {referenceId}
              </span>
              <p className="text-sm text-zinc-300 mt-2">
                Thanks{firstName ? `, ${firstName}` : ""}. I&apos;ve received your application ({selectedModules.length} modules, est. {formatUSD(currentPlanCost)}/mo). I&apos;ll review it personally and reach out within 24 hours to schedule your audit.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
                  Step 2 &middot; Application
                </span>
                <h3 className="text-xl font-bold text-zinc-100 mt-1">Apply for an Operational Audit</h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Tell me which modules you think you need. This is an application, not a purchase.
                </p>
              </div>

              {/* INLINE SELECTED MODULES & TOTAL SUMMARY PANEL */}
              <div className="border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3 mb-4">
                  <div>
                    <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                      Selected Modules ({selectedModules.length})
                    </span>
                    <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
                      Pre-selected based on what you think your business needs:
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <span className="font-mono text-[10px] uppercase text-zinc-500 block">Estimated Monthly Total</span>
                    <span className="font-mono text-xl sm:text-2xl font-bold text-emerald-400">
                      {formatUSD(currentPlanCost)}/mo
                    </span>
                  </div>
                </div>

                {/* Itemized List of Active Modules */}
                <div className="space-y-2">
                  {/* Mandatory Base */}
                  <div className="flex items-center justify-between text-xs font-mono bg-zinc-950 p-2.5 border border-emerald-500/30 text-zinc-200">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">🔒</span>
                      <span className="font-bold">{BASE_RETAINER_MODULE.title}</span>
                      <span className="text-[10px] text-zinc-500 uppercase">(Mandatory Base Retainer)</span>
                    </div>
                    <span className="text-emerald-400 font-bold">{formatUSD(BASE_RETAINER_MODULE.price)}/mo</span>
                  </div>

                  {/* Selected Addon Modules Chips/List */}
                  {selectedModules
                    .filter((id) => id !== BASE_RETAINER_MODULE.id)
                    .map((id) => {
                      const mod = MODULE_MAP[id];
                      if (!mod) return null;
                      return (
                        <div
                          key={id}
                          className="flex items-center justify-between text-xs font-mono bg-zinc-950/70 p-2 border border-zinc-800 text-zinc-300"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-400">✓</span>
                            <span>{mod.title}</span>
                            <span className="text-[10px] text-zinc-500">({mod.categoryLabel})</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-emerald-400 font-bold">+{formatUSD(mod.price)}/mo</span>
                            <button
                              type="button"
                              onClick={() => toggleModule(id)}
                              className="text-zinc-600 hover:text-red-400 transition-colors text-xs font-bold"
                              title="Remove module"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      );
                    })}

                  {selectedModules.length === 1 && (
                    <p className="text-[11px] font-mono text-zinc-500 italic py-1">
                      No optional add-ons selected yet. You can select modules in the pricing calculator above or review your setup below.
                    </p>
                  )}
                </div>

                {/* Optional Module Checklist Toggle */}
                <details className="mt-4 pt-3 border-t border-zinc-800 text-xs font-mono group">
                  <summary className="cursor-pointer text-zinc-400 hover:text-emerald-400 transition-colors select-none">
                    <span className="group-open:hidden">▶ Quick Add/Remove Add-On Modules</span>
                    <span className="hidden group-open:inline">▼ Hide Module List</span>
                  </summary>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3">
                    {ADDON_MODULES.map((mod) => {
                      const isChecked = selectedModules.includes(mod.id);
                      return (
                        <label
                          key={mod.id}
                          className={`flex items-start gap-2 p-2 border text-xs font-mono cursor-pointer transition-colors ${
                            isChecked
                              ? "border-emerald-500/50 bg-emerald-500/10 text-zinc-200"
                              : "border-zinc-800/80 bg-zinc-950 text-zinc-400 hover:border-zinc-700"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleModule(mod.id)}
                            className="mt-0.5 accent-emerald-500 cursor-pointer"
                          />
                          <div className="flex-grow flex items-center justify-between gap-1">
                            <span className="line-clamp-1">{mod.title}</span>
                            <span className="text-emerald-400 whitespace-nowrap font-bold">
                              +${mod.price}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </details>
              </div>

              {/* CONTACT DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactName" className={labelClass}>Your name</label>
                  <input id="contactName" type="text" required minLength={2} maxLength={100} autoComplete="name"
                    value={form.contactName} onChange={update("contactName")} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="companyName" className={labelClass}>Company name</label>
                  <input id="companyName" type="text" required minLength={2} maxLength={120} autoComplete="organization"
                    value={form.companyName} onChange={update("companyName")} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <input id="email" type="email" required maxLength={200} autoComplete="email" inputMode="email"
                    value={form.email} onChange={update("email")} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone <span className="normal-case tracking-normal text-zinc-600">(optional)</span>
                  </label>
                  <input id="phone" type="tel" maxLength={30} autoComplete="tel" inputMode="tel"
                    value={form.phone} onChange={update("phone")} className={inputClass} />
                </div>
              </div>

              {/* Honeypot */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="website">Website</label>
                <input id="website" type="text" tabIndex={-1} autoComplete="off"
                  value={form.website} onChange={update("website")} />
              </div>

              {status === "error" && (
                <p role="alert" className="border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {errorMessage || "Something went wrong sending your application. Please check the fields and try again."}
                </p>
              )}

              {/* MANDATORY DISCLAIMER AS REQUESTED */}
              <div className="border border-zinc-800 bg-zinc-900/30 p-4 text-xs font-mono text-zinc-400 leading-relaxed">
                <span className="text-zinc-200 font-bold block mb-1">Plain-English Notice:</span>
                Submitting your module selections does not lock you into a package. It is simply a request for a face-to-face operational audit to see if we are a good fit. If we aren&apos;t, I will still provide you with a custom PDF report detailing potential solutions based on the data you provide.
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-2">
                <span className="font-mono text-[11px] text-zinc-500 text-center sm:text-left">
                  Zero sales pressure. Straight talk about systems that work.
                </span>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-semibold uppercase tracking-wider px-6 py-3.5 sm:py-3 transition-colors disabled:opacity-50"
                >
                  {status === "submitting" ? "Submitting…" : "Apply for an Operational Audit"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
