"use client";

import { useState } from "react";
import {
  INTEREST_OPTIONS,
  INTEREST_VALUES,
  formatUSD,
  recommendPlan,
  type Interest,
} from "@/lib/plans";
import { useSelectedPlan } from "./SelectedPlanContext";

/*
 * Calculator assumptions — every number shown to the visitor is derived from these.
 * Keep them conservative and disclosed on-screen.
 */
const HOURLY_COST = 35; // Blended Springfield-area labor cost per hour (owner, office, or tech)
const WEEKS_PER_MONTH = 4.33;
const HOURS_PER_APP_PER_WEEK = 3; // Copying info between each app that doesn't sync, plus fixing the mistakes
const TECH_HOURS_PER_WORKER_PER_WEEK = 0.5; // Frozen tablets, logins, Wi-Fi, printers

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
  const { interest, setInterest } = useSelectedPlan();

  // Calculator state
  const [crewSize, setCrewSize] = useState(8);
  const [paperworkHours, setPaperworkHours] = useState(6);
  const [disconnectedApps, setDisconnectedApps] = useState(3);

  // Form state
  const [form, setForm] = useState({ contactName: "", companyName: "", email: "", phone: "", website: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [referenceId, setReferenceId] = useState<string | null>(null);

  // Deterministic math
  const paperworkMonthlyHours = paperworkHours * WEEKS_PER_MONTH;
  const appsMonthlyHours = disconnectedApps * HOURS_PER_APP_PER_WEEK * WEEKS_PER_MONTH;
  const techMonthlyHours = crewSize * TECH_HOURS_PER_WORKER_PER_WEEK * WEEKS_PER_MONTH;
  const totalMonthlyHours = paperworkMonthlyHours + appsMonthlyHours + techMonthlyHours;
  const monthlyCost = Math.round(totalMonthlyHours * HOURLY_COST);
  const yearlyCost = monthlyCost * 12;
  const workWeeks = totalMonthlyHours / 40;

  const breakdown = [
    { label: "Paperwork & re-typing", cost: paperworkMonthlyHours * HOURLY_COST },
    { label: "Copying info between apps", cost: appsMonthlyHours * HOURLY_COST },
    { label: "Tech hiccups on the crew", cost: techMonthlyHours * HOURLY_COST },
  ];

  const suggested = recommendPlan(crewSize);
  const breakEvenHours = Math.ceil(suggested.price / HOURLY_COST);

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          interest,
          crewSize,
          paperworkHours,
          disconnectedApps,
          estimatedMonthlyCost: monthlyCost,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("Submission rejected");
      setReferenceId(data.referenceId);
      setStatus("idle");
    } catch (err) {
      console.error("Checkup request failed", err);
      setStatus("error");
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
              Free Back-Office Checkup
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-1">
              What Is Office Busywork Costing You?
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Slide the bars to match your shop. The numbers update as you go.
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
              label="How many people work for you?"
              help="Count everyone: field crew, office, and you."
              value={crewSize}
              min={CREW_MIN}
              max={CREW_MAX}
              display={`${crewSize}${crewSize === CREW_MAX ? "+" : ""} people`}
              minLabel={`${CREW_MIN}`}
              maxLabel={`${CREW_MAX}+`}
              onChange={setCrewSize}
            />
            <Slider
              id="paperwork-hours"
              label="Hours a week on paperwork"
              help="Retyping timecards, building invoices, chasing down job details."
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
              help="QuickBooks, your scheduling app, spreadsheets, the paper timecard book…"
              value={disconnectedApps}
              min={0}
              max={6}
              display={`${disconnectedApps} ${disconnectedApps === 1 ? "app" : "apps"}`}
              minLabel="0"
              maxLabel="6"
              onChange={setDisconnectedApps}
            />
          </div>

          {/* Results */}
          <div className="border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6 flex flex-col" aria-live="polite">
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
              <div className="font-mono text-xs text-zinc-400 uppercase">What that costs you</div>
              <div className="text-3xl font-bold font-mono text-red-400 mt-1">
                {formatUSD(monthlyCost)}
                <span className="text-xs text-zinc-500 font-normal"> /mo</span>
              </div>
              <div className="text-xs font-mono text-zinc-500 mt-1">
                {formatUSD(yearlyCost)} a year out the door
              </div>
              <ul className="mt-4 space-y-1.5 font-mono text-xs">
                {breakdown.map((row) => (
                  <li key={row.label} className="flex justify-between gap-3 text-zinc-400">
                    <span>{row.label}</span>
                    <span className="text-zinc-300">{formatUSD(row.cost)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 pt-5 border-t border-zinc-800">
              <div className="font-mono text-xs text-zinc-400 uppercase">Suggested for your crew</div>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <span className="font-semibold text-emerald-400">{suggested.shortName}</span>
                <span className="font-mono text-sm text-zinc-200">
                  {formatUSD(suggested.price)}
                  <span className="text-xs text-zinc-500">/mo</span>
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-400">
                Pays for itself if it saves you just{" "}
                <strong className="text-zinc-200">{breakEvenHours} hours</strong> a month.
              </p>
              <a
                href="#get-started"
                onClick={() => setInterest(suggested.id)}
                className="mt-4 block text-center border border-emerald-500/40 text-emerald-400 font-mono text-xs uppercase tracking-wider py-2.5 hover:bg-emerald-500 hover:text-zinc-950 transition-colors"
              >
                Choose {suggested.shortName}
              </a>
            </div>
          </div>
        </div>

        <p className="mt-4 text-[11px] font-mono text-zinc-600 leading-relaxed">
          Estimate assumes ${HOURLY_COST}/hr blended Springfield labor cost, about {HOURS_PER_APP_PER_WEEK} hrs/week
          of copy-and-paste per app that doesn&apos;t sync, and about 30 minutes a week of tech trouble per worker.
        </p>

        {/* Intake form */}
        <div id="get-started" className="scroll-mt-24 mt-10 pt-8 border-t border-zinc-800">
          {referenceId ? (
            <div className="p-6 border border-emerald-500/40 bg-emerald-500/10 text-center" role="status">
              <span className="font-mono text-emerald-400 font-bold text-sm">
                REQUEST RECEIVED &middot; REF {referenceId}
              </span>
              <p className="text-sm text-zinc-300 mt-2">
                Thanks{firstName ? `, ${firstName}` : ""}. We&apos;ll look over your numbers and get back to
                you within 24 hours with a plain-English game plan.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-zinc-100">Get your free checkup</h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Tell us who you are. We&apos;ll send the numbers above along with your request.
                </p>
              </div>

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
                <div className="sm:col-span-2">
                  <label htmlFor="interest" className={labelClass}>Which plan are you interested in?</label>
                  <select
                    id="interest"
                    value={interest}
                    onChange={(e) => {
                      const value = e.target.value as Interest;
                      if ((INTEREST_VALUES as readonly string[]).includes(value)) setInterest(value);
                    }}
                    className={`${inputClass} cursor-pointer [color-scheme:dark]`}
                  >
                    {INTEREST_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Honeypot: hidden from people, catches form-filling bots */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="website">Website</label>
                <input id="website" type="text" tabIndex={-1} autoComplete="off"
                  value={form.website} onChange={update("website")} />
              </div>

              {status === "error" && (
                <p role="alert" className="border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  Something went wrong sending your info. Please check the fields and try again.
                </p>
              )}

              <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-1">
                <span className="font-mono text-[11px] text-zinc-500 text-center sm:text-left">
                  No sales pitch. Just a 20-minute call about your numbers.
                </span>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-semibold uppercase tracking-wider px-6 py-3.5 sm:py-3 transition-colors disabled:opacity-50"
                >
                  {status === "submitting" ? "Sending\u2026" : "Get My Free Checkup"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
