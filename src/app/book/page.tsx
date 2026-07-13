"use client";

import { useActionState, useRef, useEffect } from "react";
import { submitIntake } from "@/app/actions";

const TIERS = [
  { id: "flash",   label: "Flash Session — $347" },
  { id: "stack",   label: "Stack Consultation — $247" },
  { id: "unsure",  label: "Not Sure — Let's Talk" },
] as const;

export default function Book() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(submitIntake, null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-surface text-center border-b border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="font-mono text-terminal text-xs mb-4 uppercase tracking-widest">
            // THE FIRST CONVERSATION
          </div>
          <h1 className="font-display text-cream text-4xl md:text-5xl mb-4 tracking-wide uppercase">
            START WITH THE RIGHT CONVERSATION
          </h1>
          <p className="font-sans text-gold max-w-xl mx-auto text-sm md:text-base">
            Every engagement starts with fit. The right entry point depends on 
            where you actually are.
          </p>
        </div>
      </section>

      {/* Two Column Layout */}
      <div className="max-w-5xl mx-auto px-6 py-20 w-full grid grid-cols-1 md:grid-cols-2 gap-12 flex-grow">
        
        {/* Left Column: Booking */}
        <div>
          <div className="font-mono text-terminal text-xs mb-4 uppercase tracking-widest">
            // SCHEDULE A SESSION
          </div>
          
          {/* Tier pills */}
          <div className="flex flex-wrap gap-3 mb-8">
            {TIERS.map((tier) => (
              <label
                key={tier.id}
                className="cursor-pointer"
              >
                <input
                  type="radio"
                  name="selectedTier"
                  value={tier.id}
                  form="intake-form"
                  defaultChecked={tier.id === "unsure"}
                  className="sr-only peer"
                />
                <span className="border text-xs font-mono px-4 py-2 transition-all duration-200 rounded-sm inline-block peer-checked:border-gold peer-checked:text-gold peer-checked:bg-gold/10 border-border text-cream/60 hover:border-gold hover:text-gold">
                  {tier.label}
                </span>
              </label>
            ))}
          </div>

          {/* Cal.com Placeholder */}
          <div className="bg-surface border border-border p-10 text-center rounded-sm">
            <div className="font-mono text-terminal text-xs mb-4 uppercase tracking-widest">
              // CAL.COM BOOKING WIDGET
            </div>
            <p className="font-mono text-muted text-sm leading-relaxed mb-1">
              Configure at cal.com after account setup
            </p>
            <p className="font-mono text-muted text-xs leading-relaxed">
              // EMBED SCRIPT ADDED IN DEPLOYMENT PHASE
            </p>
          </div>
        </div>

        {/* Right Column: Intake Form */}
        <div>
          <div className="font-mono text-terminal text-xs mb-4 uppercase tracking-widest">
            // QUICK INTAKE
          </div>
          <p className="font-sans text-cream/50 text-sm mb-8 leading-relaxed">
            Fill this out before your session and I'll arrive prepared. 
            No spam. No nurture sequences.
          </p>

          <form id="intake-form" ref={formRef} action={formAction} className="flex flex-col">
            <label htmlFor="businessName" className="sr-only">Business name</label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              placeholder="Business name"
              required
              className="w-full bg-background border border-border text-cream placeholder-muted p-3 font-sans focus:border-gold focus:outline-none transition-colors duration-200 mb-4"
            />
            
            <label htmlFor="yourName" className="sr-only">Your name</label>
            <input
              type="text"
              id="yourName"
              name="yourName"
              placeholder="Your name"
              required
              className="w-full bg-background border border-border text-cream placeholder-muted p-3 font-sans focus:border-gold focus:outline-none transition-colors duration-200 mb-4"
            />
            
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              required
              className="w-full bg-background border border-border text-cream placeholder-muted p-3 font-sans focus:border-gold focus:outline-none transition-colors duration-200 mb-4"
            />
            
            <label htmlFor="industry" className="sr-only">Business type / industry</label>
            <input
              type="text"
              id="industry"
              name="industry"
              placeholder="Business type / industry"
              required
              className="w-full bg-background border border-border text-cream placeholder-muted p-3 font-sans focus:border-gold focus:outline-none transition-colors duration-200 mb-4"
            />

            <label htmlFor="revenue" className="sr-only">Estimated annual revenue</label>
            <select
              id="revenue"
              name="revenue"
              defaultValue=""
              required
              className="w-full bg-background border border-border text-cream p-3 font-sans focus:border-gold focus:outline-none transition-colors duration-200 mb-4 appearance-none"
            >
              <option value="" disabled className="text-muted">Estimated annual revenue</option>
              <option value="Under $250K">Under $250K</option>
              <option value="$250K–$500K">$250K–$500K</option>
              <option value="$500K–$1M">$500K–$1M</option>
              <option value="$1M–$5M">$1M–$5M</option>
              <option value="$5M+">$5M+</option>
            </select>

            <label htmlFor="painPoint" className="sr-only">Biggest operational pain point</label>
            <textarea
              id="painPoint"
              name="painPoint"
              placeholder="Biggest operational pain point"
              required
              rows={4}
              className="w-full bg-background border border-border text-cream placeholder-muted p-3 font-sans focus:border-gold focus:outline-none transition-colors duration-200 mb-4 resize-none"
            />

            <label htmlFor="usingAI" className="sr-only">Currently using AI tools?</label>
            <select
              id="usingAI"
              name="usingAI"
              defaultValue=""
              required
              className="w-full bg-background border border-border text-cream p-3 font-sans focus:border-gold focus:outline-none transition-colors duration-200 mb-4 appearance-none"
            >
              <option value="" disabled className="text-muted">Currently using AI tools?</option>
              <option value="No">No</option>
              <option value="Yes, a few">Yes, a few</option>
              <option value="Yes, paying for several">Yes, paying for several</option>
              <option value="Not sure">Not sure</option>
            </select>

            <label htmlFor="referral" className="sr-only">How did you find us?</label>
            <select
              id="referral"
              name="referral"
              defaultValue=""
              required
              className="w-full bg-background border border-border text-cream p-3 font-sans focus:border-gold focus:outline-none transition-colors duration-200 mb-6 appearance-none"
            >
              <option value="" disabled className="text-muted">How did you find us?</option>
              <option value="Search">Search</option>
              <option value="Referral">Referral</option>
              <option value="Social Media">Social Media</option>
              <option value="Chamber of Commerce">Chamber of Commerce</option>
              <option value="Other">Other</option>
            </select>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gold text-background font-sans font-semibold py-3 hover:bg-goldLight disabled:opacity-50 transition-colors duration-200"
            >
              {isPending ? "Submitting..." : "Submit Intake"}
            </button>

            {state?.message && (
              <p className={`mt-4 font-mono text-xs tracking-wide ${
                state.success ? "text-terminal" : "text-gold"
              }`}>
                // {state.message}
              </p>
            )}

            <div className="font-mono text-muted text-xs mt-3">
              // Submits directly to the DSIE diagnostic pipeline
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
