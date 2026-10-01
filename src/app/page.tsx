"use client";

import { useState } from "react";

export default function Home() {
  // Diagnostic State
  const [headcount, setHeadcount] = useState(25);
  const [weeklyHuddleHours, setWeeklyHuddleHours] = useState(4);
  const [softwareSilos, setSoftwareSilos] = useState(3);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    primarySoftware: "QuickBooks + Spreadsheets",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAudit, setSubmittedAudit] = useState<string | null>(null);

  // Deterministic Math: Missouri $15 min-wage floor + admin burden calculations
  const adminHourlyCost = 35; // Blended admin/manager hourly cost in Springfield MSA
  const monthlyAdminWaste = Math.round(weeklyHuddleHours * 4.33 * adminHourlyCost * (headcount > 30 ? 2 : 1));
  const syncErrorLoss = Math.round(softwareSilos * 450); // Monthly sync friction per silo
  const totalMonthlyBleed = monthlyAdminWaste + syncErrorLoss;
  const annualCapitalBleed = totalMonthlyBleed * 12;
  const frictionScore = Math.min(100, Math.round((softwareSilos * 15) + (weeklyHuddleHours * 8) + (headcount * 0.5)));

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          headcount,
          weeklyHuddleHours,
          calculatedLeakage: annualCapitalBleed,
          frictionScore,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedAudit(data.auditId);
      }
    } catch (err) {
      console.error("Audit submission failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-zinc-950">
      
      {/* 1. HERO SECTION */}
      <section className="relative px-6 pt-20 pb-16 max-w-6xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 mb-6">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
            Southwest Missouri B2B RevOps Engine
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-100 max-w-4xl leading-tight">
          Stop Bleeding Margin to Fragile Spreadsheets and Disconnected Software.
        </h1>
        
        <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed">
          We engineer automated open-book scoreboards, secure localized AI interfaces, and reconciled revenue pipelines for Springfield manufacturing and logistics operators who refuse to waste labor.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#diagnostic"
            className="bg-emerald-500 text-zinc-950 font-mono text-xs font-semibold uppercase tracking-wider px-6 py-3.5 hover:bg-emerald-400 transition-colors"
          >
            Calculate Operational Bleed
          </a>
          <a
            href="#triad"
            className="border border-zinc-800 bg-zinc-900 text-zinc-300 font-mono text-xs uppercase tracking-wider px-6 py-3.5 hover:bg-zinc-800 transition-colors"
          >
            View Core Architecture
          </a>
        </div>
      </section>

      {/* 2. THE THREE CAPABILITIES (THE TRIAD) */}
      <section id="triad" className="border-t border-zinc-900 bg-zinc-950 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">Capabilities</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mt-1">
              Deterministic Systems. Zero Operational Fluff.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Capability 1 */}
            <div className="border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-zinc-500">01 // AUTOMATION</span>
                <h3 className="text-lg font-semibold text-zinc-100 mt-2">
                  &quot;Great Game&quot; Scoreboard Automation
                </h3>
                <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
                  Cure open-book management fatigue. We build node-based automated pipelines that extract live shop floor, ERP, and QuickBooks data directly into real-time forecasting displays before your weekly huddle.
                </p>
              </div>
              <div className="mt-6 font-mono text-xs text-emerald-400">
                Eliminates: 8–12 hrs/mo manual whiteboard re-entry.
              </div>
            </div>

            {/* Capability 2 */}
            <div className="border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-zinc-500">02 // SECURE DATA</span>
                <h3 className="text-lg font-semibold text-zinc-100 mt-2">
                  Stateless MCP Enterprise Bridges
                </h3>
                <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
                  Query legacy databases (SQL, SQLite, proprietary parts matrices) using natural language via Model Context Protocol (MCP). Your data remains inside your walls; nothing is trained on or exposed to public clouds.
                </p>
              </div>
              <div className="mt-6 font-mono text-xs text-emerald-400">
                Eliminates: Cloud IP exposure &amp; manual search queries.
              </div>
            </div>

            {/* Capability 3 */}
            <div className="border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-zinc-500">03 // REVOPS</span>
                <h3 className="text-lg font-semibold text-zinc-100 mt-2">
                  Turnaround Variance &amp; RevOps Audits
                </h3>
                <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
                  Order-to-cash reconciliation. We locate orphaned foreign keys, broken CRM-to-accounting zaps, and unrecorded scope variance in physical facilities to eliminate margin leakage permanently.
                </p>
              </div>
              <div className="mt-6 font-mono text-xs text-emerald-400">
                Eliminates: Duplicate billing entries &amp; project slippage.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DETERMINISTIC DIAGNOSTIC TERMINAL */}
      <section id="diagnostic" className="border-t border-zinc-900 bg-zinc-900/20 py-20 px-6">
        <div className="max-w-4xl mx-auto border border-zinc-800 bg-zinc-950 p-8 sm:p-12">
          
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-8">
            <div>
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">Interactive Audit</span>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-1">
                Operational Friction &amp; Capital Bleed Calculator
              </h2>
            </div>
            <div className="font-mono text-xs text-zinc-500 hidden sm:block">
              LOC: SGF_MO_MSA // PROP_A_COMPLIANT
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Input Controls */}
            <div className="space-y-6">
              <div>
                <label className="block font-mono text-xs text-zinc-400 uppercase mb-2">
                  Headcount (Employees): <span className="text-emerald-400 font-bold">{headcount}</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={headcount}
                  onChange={(e) => setHeadcount(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-zinc-800 h-2 cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-zinc-400 uppercase mb-2">
                  Weekly Huddle / Scoreboard Prep (Hours): <span className="text-emerald-400 font-bold">{weeklyHuddleHours}h</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={weeklyHuddleHours}
                  onChange={(e) => setWeeklyHuddleHours(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-zinc-800 h-2 cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-zinc-400 uppercase mb-2">
                  Disconnected Software Silos: <span className="text-emerald-400 font-bold">{softwareSilos}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={softwareSilos}
                  onChange={(e) => setSoftwareSilos(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-zinc-800 h-2 cursor-pointer"
                />
                <span className="text-[11px] text-zinc-500 font-mono mt-1 block">
                  e.g., QuickBooks + Shop MES + Excel + CRM
                </span>
              </div>
            </div>

            {/* Real-time Math Output Card */}
            <div className="border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs text-zinc-400 uppercase">Estimated Monthly Labor Bleed</div>
                <div className="text-3xl font-bold font-mono text-red-400 mt-2">
                  ${totalMonthlyBleed.toLocaleString()}<span className="text-xs text-zinc-500 font-normal"> /mo</span>
                </div>
                <div className="text-xs font-mono text-zinc-500 mt-1">
                  ${annualCapitalBleed.toLocaleString()} annualized margin leak
                </div>

                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <div className="font-mono text-xs text-zinc-400 uppercase">Friction Index</div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-full bg-zinc-800 h-2">
                      <div
                        className="bg-emerald-400 h-2 transition-all duration-300"
                        style={{ width: `${frictionScore}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-emerald-400 font-bold">{frictionScore}/100</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-[11px] font-mono text-zinc-500">
                Grounded on Springfield blended administrative rates (\$35/hr) &amp; manual reconciliation variance.
              </div>
            </div>

          </div>

          {/* Lead Capture Form */}
          <div className="mt-10 pt-8 border-t border-zinc-800">
            {submittedAudit ? (
              <div className="p-6 border border-emerald-500/40 bg-emerald-500/10 text-center">
                <span className="font-mono text-emerald-400 font-bold text-sm">
                  AUDIT TELEMETRY LOGGED: {submittedAudit}
                </span>
                <p className="text-sm text-zinc-300 mt-2">
                  Your telemetry has been recorded. We will review your data flow and deliver a 1-page architecture breakdown within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAuditSubmit} className="space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-300">
                  Transmit Telemetry for Diagnostic Review
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <span className="font-mono text-[11px] text-zinc-500">
                    No sales decks. Direct 20-minute architectural data review.
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-semibold uppercase tracking-wider px-6 py-2.5 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Transmitting..." : "Generate Fiduciary Audit"}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
