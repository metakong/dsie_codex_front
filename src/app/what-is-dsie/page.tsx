import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What is DSIE?",
  description:
    "DSIE — Diagnose, Strategize, Integrate, Execute — is not consulting jargon. It is the same Sense-Model-Adapt-Act loop humans and systems already run, made deliberate.",
};

const PHASES = [
  {
    letter: "D",
    name: "DIAGNOSE",
    mirror: "SENSE",
    copy: "Before anything changes, you have to see what is actually happening — not what the org chart says should be happening. Honest signal in.",
  },
  {
    letter: "S",
    name: "STRATEGIZE",
    mirror: "MODEL",
    copy: "Turn raw signal into a model of the business: what drives cost, what drives value, and which change pays for itself first.",
  },
  {
    letter: "I",
    name: "INTEGRATE",
    mirror: "ADAPT",
    copy: "Change the system, not the slide deck. New capability is wired into the way work already flows — one verified piece at a time.",
  },
  {
    letter: "E",
    name: "EXECUTE",
    mirror: "ACT",
    copy: "Run it, measure it, and feed what you learn straight back into the next diagnosis. Action is the output — and the next input.",
  },
] as const;

export default function WhatIsDsie() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-surface text-center border-b border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="font-mono text-terminal text-xs mb-4 uppercase tracking-widest">
            // THE FRAMEWORK
          </div>
          <h1 className="font-display text-cream text-5xl md:text-6xl mb-4 tracking-wide uppercase">
            WHAT IS DSIE?
          </h1>
          <p className="font-sans text-gold text-base md:text-lg max-w-2xl mx-auto font-medium">
            Diagnose. Strategize. Integrate. Execute. It is not high-priced
            consulting jargon — it is how every functioning human and every
            functioning system already works.
          </p>
        </div>
      </section>

      {/* The loop you already run */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="font-mono text-terminal text-xs mb-4 uppercase tracking-widest">
            // SENSE &rarr; MODEL &rarr; ADAPT &rarr; ACT
          </div>
          <h2 className="font-display text-cream text-3xl md:text-4xl mb-6 tracking-wide uppercase">
            THE LOOP YOU ALREADY RUN
          </h2>
          <p className="font-sans text-cream/70 leading-relaxed text-base md:text-lg mb-12 max-w-3xl">
            Touch a hot stove and your nervous system senses the burn, models
            the cause, adapts your reach, and acts differently next time. That
            baseline neurological loop — sense, model, adapt, act — is the
            oldest operating system there is. DSIE is the same loop applied to
            a business, deliberately and on a schedule, instead of by accident.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PHASES.map((phase) => (
              <div
                key={phase.letter}
                className="bg-surface border border-border border-t-2 border-t-gold p-8 rounded-sm"
              >
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="font-display text-gold text-2xl tracking-wide">
                    {phase.letter} &mdash; {phase.name}
                  </h3>
                  <span className="font-mono text-terminal text-xs tracking-widest">
                    = {phase.mirror}
                  </span>
                </div>
                <p className="font-sans text-cream/70 text-sm md:text-base leading-relaxed">
                  {phase.copy}
                </p>
              </div>
            ))}
          </div>

          {/* Loop strip */}
          <div className="mt-10 border border-border bg-surface rounded-sm px-6 py-5 text-center">
            <span className="font-mono text-cream/80 text-sm md:text-base tracking-widest">
              D <span className="text-gold">&rarr;</span> S{" "}
              <span className="text-gold">&rarr;</span> I{" "}
              <span className="text-gold">&rarr;</span> E{" "}
              <span className="text-gold">&#8635;</span>
            </span>
            <p className="font-mono text-muted text-xs mt-2 tracking-wide">
              // The loop never finishes. That is the point.
            </p>
          </div>
        </div>
      </section>

      {/* Psychological safety */}
      <section className="py-20 bg-surface border-y border-border">
        <div className="max-w-3xl mx-auto px-6">
          <div className="font-mono text-terminal text-xs mb-4 uppercase tracking-widest">
            // THE ROOT OF THE ENTIRE CYCLE
          </div>
          <h2 className="font-display text-cream text-3xl md:text-4xl mb-6 tracking-wide uppercase">
            WHY PSYCHOLOGICAL SAFETY COMES FIRST
          </h2>
          <p className="font-sans text-cream/70 leading-relaxed text-base md:text-lg mb-6">
            Every phase of DSIE runs on one input: honest information about how
            work actually gets done. And people only tell the truth about
            broken processes when telling the truth is safe.
          </p>
          <blockquote className="border-l-4 border-gold pl-6 md:pl-8 my-8">
            <p className="font-sans text-cream text-xl md:text-2xl leading-relaxed font-medium">
              If people fear retribution, they corrupt the diagnostic data.
              Corrupt the diagnosis, and every phase downstream inherits the
              lie. The whole cycle collapses.
            </p>
          </blockquote>
          <p className="font-sans text-cream/70 leading-relaxed text-base md:text-lg">
            That is why human psychology sits at the absolute root of the
            framework. This is not a soft add-on — it is decades of behavioral
            science on how teams surface problems, and it is the difference
            between a self-correcting loop and an expensive report nobody acts
            on.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-cream text-3xl md:text-4xl mb-4 tracking-wide uppercase">
            SEE THE LOOP IN PRACTICE
          </h2>
          <p className="font-sans text-cream/60 text-sm md:text-base mb-10 max-w-xl mx-auto leading-relaxed">
            The framework is only worth something when it ships working
            systems. Here is how each phase becomes deliverable work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/how-it-works"
              className="bg-gold text-background px-8 py-3 font-sans text-sm font-semibold hover:bg-goldLight transition-colors duration-200"
            >
              How It Works &rarr;
            </Link>
            <Link
              href="/services"
              className="border border-gold text-gold px-8 py-3 font-sans text-sm font-semibold hover:bg-gold hover:text-background transition-colors duration-200"
            >
              Services &amp; Pricing &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
