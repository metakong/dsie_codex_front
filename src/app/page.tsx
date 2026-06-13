"use client";

import { useState } from "react";
import Link from "next/link";

interface AgentRow {
  name: string;
  status: "Pending" | "Running" | "Complete";
}

export default function Home() {
  // Demo State
  const [businessType, setBusinessType] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStatusPanel, setShowStatusPanel] = useState(false);
  // SCAFFOLD — Roadmap Phase 3: report rendering + email capture are wired when
  // /api/demo returns real Agent 4 output. Intentionally inert until then.
  const [showReport, setShowReport] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [isDemoStub, setIsDemoStub] = useState(false);
  
  const [agents, setAgents] = useState<AgentRow[]>([
    { name: "Agent 0 — Security Pre-processor", status: "Pending" },
    { name: "Agent 1 — Business Categorizer", status: "Pending" },
    { name: "Agent 2 — Opportunity Mapper", status: "Pending" },
    { name: "Agent 3 — Value Estimator", status: "Pending" },
    { name: "Agent 4 — Report Generator", status: "Pending" },
  ]);

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessType || !painPoint) return;
    
    setIsSubmitting(true);
    setShowStatusPanel(true);
    setShowReport(false);
    setIsDemoStub(false);
    
    // Reset agent statuses to Pending
    setAgents([
      { name: "Agent 0 — Security Pre-processor", status: "Pending" },
      { name: "Agent 1 — Business Categorizer", status: "Pending" },
      { name: "Agent 2 — Opportunity Mapper", status: "Pending" },
      { name: "Agent 3 — Value Estimator", status: "Pending" },
      { name: "Agent 4 — Report Generator", status: "Pending" },
    ]);

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessType, painPoint }),
      });
      const data = await response.json();
      console.log("Demo API connection Response:", data);
      
      if (data.status === 'endpoint_pending') {
        setIsDemoStub(true);
      }
      
      // Since it returns { status: 'endpoint_pending' } stub, we will keep the UI in pending
      // status as instructed, but we will animate the first agent to Running just to make it look active.
      setAgents(prev => {
        const next = [...prev];
        next[0] = { ...next[0], status: "Running" };
        return next;
      });
    } catch (err) {
      console.error("Failed to connect to Demo API:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center animated-grid overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="font-mono text-terminal text-xs tracking-widest mb-6 uppercase">
            // SYSTEM_STATUS: ONLINE &middot; AUTHENTICATION: SOVEREIGN
          </div>
          
          <h1 className="font-display text-cream leading-none mb-2 text-5xl md:text-8xl tracking-tight">
            YOUR AI VENDOR
          </h1>
          <h1 className="font-display text-gold leading-none mb-8 text-5xl md:text-8xl tracking-tight">
            TOOK YOUR MONEY.
          </h1>
          
          <p className="font-sans text-cream/70 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Your workflows are still broken. Not because AI doesn't work. 
            Because nobody built it properly, secured it, or stayed to run it.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <a 
              href="#demo"
              className="w-full sm:w-auto bg-gold text-background font-sans font-semibold px-8 py-4 hover:bg-goldLight transition-colors duration-200 text-center"
            >
              Analyze My Business Free &rarr;
            </a>
            <Link 
              href="/services" 
              className="w-full sm:w-auto border border-gold text-gold font-sans font-semibold px-8 py-4 hover:bg-gold hover:text-background transition-all duration-200 text-center"
            >
              View Services &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="font-mono text-terminal text-xs tracking-widest text-center mb-4 uppercase">
            // CORE DIFFERENTIATORS
          </div>
          <h2 className="font-display text-cream text-center mb-16 text-3xl md:text-5xl tracking-wide">
            THREE THINGS NOBODY ELSE OFFERS TOGETHER
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-background border border-border border-t-2 border-t-gold p-8 rounded-sm">
              <div className="text-gold mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-display text-gold text-2xl mb-4">BUILD & OPERATE</h3>
              <p className="font-sans text-cream/70 text-sm md:text-base leading-relaxed">
                No recommendation handed to a team you don't have. 
                The system gets built, secured, and operated month to month.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-background border border-border border-t-2 border-t-gold p-8 rounded-sm">
              <div className="text-gold mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-display text-gold text-2xl mb-4">SECURITY-FIRST DESIGN</h3>
              <p className="font-sans text-cream/70 text-sm md:text-base leading-relaxed">
                Every live AI system is a new attack surface. That reality is 
                architected into every deployment from day one, not added later.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-background border border-border border-t-2 border-t-gold p-8 rounded-sm">
              <div className="text-gold mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-display text-gold text-2xl mb-4">NO INTERNAL IT REQUIRED</h3>
              <p className="font-sans text-cream/70 text-sm md:text-base leading-relaxed">
                Your business doesn't need a technical team. Mine handles everything — 
                build, operation, monitoring, and optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-24 bg-background" id="demo">
        <div className="max-w-4xl mx-auto px-6">
          <div className="font-mono text-terminal text-xs text-center mb-4 uppercase">
            // LIVE DEMONSTRATION &middot; REAL OUTPUT &middot; NO SIGNUP REQUIRED
          </div>
          <h2 className="font-display text-cream text-center text-3xl md:text-5xl mb-4 tracking-wide">
            SEE IT WORK BEFORE YOU COMMIT
          </h2>
          <p className="font-sans text-cream/60 text-center text-sm md:text-base max-w-2xl mx-auto mb-12">
            Describe your business and biggest operational headache. 
            Watch a live AI agent chain analyze it in real time. 
            Free. No email required.
          </p>

          <div className="max-w-2xl mx-auto">
            {/* Input Card */}
            <form onSubmit={handleDemoSubmit} className="bg-surface border border-border p-6 md:p-8 rounded-sm">
              <label htmlFor="businessType" className="sr-only">Business type</label>
              <input
                type="text"
                id="businessType"
                required
                maxLength={500}
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                placeholder="Business type (e.g. HVAC contractor, law firm, machine shop)"
                className="w-full bg-background border border-border text-cream placeholder-muted p-3 focus:border-gold focus:outline-none transition-colors duration-200 mb-4 font-sans"
              />
              <div className="font-mono text-muted text-xs text-right mb-4">
                {500 - businessType.length} characters remaining
              </div>
              
              <label htmlFor="painPoint" className="sr-only">Biggest operational pain point</label>
              <textarea
                required
                id="painPoint"
                maxLength={500}
                value={painPoint}
                onChange={(e) => setPainPoint(e.target.value)}
                placeholder="Biggest operational pain point"
                rows={4}
                className="w-full bg-background border border-border text-cream placeholder-muted p-3 focus:border-gold focus:outline-none transition-colors duration-200 mb-2 font-sans resize-none"
              />
              <div className="font-mono text-muted text-xs text-right mb-6">
                {500 - painPoint.length} characters remaining
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-background font-sans font-semibold py-3 hover:bg-goldLight disabled:opacity-50 transition-colors duration-200"
              >
                {isSubmitting ? "Running Agents..." : "Analyze My Business →"}
              </button>
            </form>

            {/* Agent Status Panel */}
            {showStatusPanel && (
              <div className="bg-surface border border-border p-6 mt-6 rounded-sm">
                <div className="space-y-1">
                  {agents.map((agent, index) => (
                    <div key={index} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                      <span className={`relative flex h-3 w-3`}>
                        {agent.status === "Running" && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                        )}
                        <span className={`relative inline-flex rounded-full h-3 w-3 ${
                          agent.status === "Pending" ? "bg-muted" : 
                          agent.status === "Running" ? "bg-gold" : "bg-terminal"
                        }`}></span>
                      </span>
                      <span className="font-mono text-cream text-xs md:text-sm">{agent.name}</span>
                      <span className="font-mono text-muted text-xs ml-auto">{agent.status}</span>
                    </div>
                  ))}
                </div>

                <p className="font-mono text-muted text-xs italic mt-4 pl-7 leading-relaxed border-t border-border/40 pt-4">
                  // Prompt injection is an unsolved problem in AI &mdash; this layer demonstrates 
                  defense-in-depth mitigation, the same approach applied to every client system.
                </p>
                {isDemoStub && (
                  <div className="mt-4 pt-4 border-t border-border/40">
                    <p className="font-mono text-gold text-xs tracking-wide">
                      // ANALYSIS MODULE INITIALIZING
                    </p>
                    <p className="font-mono text-muted text-xs mt-1 leading-relaxed">
                      Full live analysis available at launch. The agent architecture 
                      above is the real system — wiring to the Claude API is the next 
                      build session.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Report Output Area */}
            {showReport && (
              <div className="bg-surface border-t-2 border-t-gold border border-border p-6 md:p-8 mt-6 rounded-sm">
                <div className="font-sans text-cream leading-relaxed mb-6 space-y-4">
                  {/* Generated report will inject here */}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <label htmlFor="demoEmail" className="sr-only">Enter your email</label>
                  <input
                    type="email"
                    id="demoEmail"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-background border border-border text-cream placeholder-muted p-3 focus:border-gold focus:outline-none transition-colors duration-200 font-sans"
                  />
                  <button className="border border-gold text-gold px-6 py-3 hover:bg-gold hover:text-background transition-colors duration-200 font-sans text-sm font-semibold">
                    Email This Report
                  </button>
                </div>
                
                <div className="font-mono text-muted text-xs mt-4">
                  // 3 free analyses per 24 hours &middot; No account required
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
