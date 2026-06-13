"use client";

import { useState } from "react";

export default function Book() {
  const [selectedTier, setSelectedTier] = useState("Not Sure - Let's Talk");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleIntakeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, selectedTier }),
      });
      const resData = await response.json();
      if (response.ok) {
        setSubmitMessage("Intake received. Supabase integration added in next session.");
        e.currentTarget.reset();
      } else {
        setSubmitMessage(resData.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setSubmitMessage("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            {["Flash Session — $347", "Stack Consultation — $247", "Not Sure — Let's Talk"].map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => setSelectedTier(tier)}
                className={`border text-xs font-mono px-4 py-2 transition-all duration-200 rounded-sm cursor-pointer ${
                  selectedTier === tier
                    ? "border-gold text-gold bg-gold/10"
                    : "border-border text-cream/60 hover:border-gold hover:text-gold"
                }`}
              >
                {tier}
              </button>
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

          <form onSubmit={handleIntakeSubmit} className="flex flex-col">
            <input
              type="text"
              name="businessName"
              placeholder="Business name"
              required
              className="w-full bg-background border border-border text-cream placeholder-muted p-3 font-sans focus:border-gold focus:outline-none transition-colors duration-200 mb-4"
            />
            
            <input
              type="text"
              name="yourName"
              placeholder="Your name"
              required
              className="w-full bg-background border border-border text-cream placeholder-muted p-3 font-sans focus:border-gold focus:outline-none transition-colors duration-200 mb-4"
            />
            
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              className="w-full bg-background border border-border text-cream placeholder-muted p-3 font-sans focus:border-gold focus:outline-none transition-colors duration-200 mb-4"
            />
            
            <input
              type="text"
              name="industry"
              placeholder="Business type / industry"
              required
              className="w-full bg-background border border-border text-cream placeholder-muted p-3 font-sans focus:border-gold focus:outline-none transition-colors duration-200 mb-4"
            />

            <select
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

            <textarea
              name="painPoint"
              placeholder="Biggest operational pain point"
              required
              rows={4}
              className="w-full bg-background border border-border text-cream placeholder-muted p-3 font-sans focus:border-gold focus:outline-none transition-colors duration-200 mb-4 resize-none"
            />

            <select
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

            <select
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
              disabled={isSubmitting}
              className="w-full bg-gold text-background font-sans font-semibold py-3 hover:bg-goldLight disabled:opacity-50 transition-colors duration-200"
            >
              {isSubmitting ? "Submitting..." : "Submit Intake"}
            </button>

            {submitMessage && (
              <p className="mt-4 font-mono text-xs text-terminal tracking-wide">
                // {submitMessage}
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
