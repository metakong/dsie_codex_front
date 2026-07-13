export default function HowItWorks() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-surface text-center border-b border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="font-mono text-terminal text-xs mb-4 uppercase tracking-widest">
            // THE METHODOLOGY
          </div>
          <h1 className="font-display text-cream text-5xl md:text-6xl mb-4 tracking-wide uppercase">
            HOW THE WORK ACTUALLY GETS DONE
          </h1>
          <p className="font-sans text-gold text-lg md:text-xl font-medium">
            The DSIE Framework &mdash; four phases, one accountable operator.
          </p>
        </div>
      </section>

      {/* Four Phases Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          {/* Vertical Timeline container */}
          <div className="relative border-l border-border md:border-l-0 md:before:absolute md:before:top-0 md:before:bottom-0 md:before:left-[60px] md:before:w-[1px] md:before:bg-border">
            {/* DIAGNOSE */}
            <div className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start mb-16 pl-6 md:pl-0">
              <div className="font-display text-gold text-7xl md:text-8xl leading-none w-24 flex-shrink-0 md:text-center relative">
                {/* Node Dot on Desktop */}
                <span className="hidden md:block absolute right-[-21px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gold border border-background z-10"></span>
                D
              </div>
              <div className="flex-1">
                <h2 className="font-display text-cream text-2xl md:text-3xl mb-4 tracking-wide uppercase">
                  DIAGNOSE
                </h2>
                <p className="font-sans text-cream/70 leading-relaxed text-sm md:text-base">
                  Map every workflow in your operation. Identify exactly which processes 
                  are costing you money and estimate the value of targeted AI deployment. 
                  You receive a written report detailed enough to implement without us &mdash; 
                  because the deliverable earns its price whether or not you hire us next.
                </p>
              </div>
            </div>

            {/* STRATEGIZE */}
            <div className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start mb-16 pl-6 md:pl-0">
              <div className="font-display text-gold text-7xl md:text-8xl leading-none w-24 flex-shrink-0 md:text-center relative">
                {/* Node Dot on Desktop */}
                <span className="hidden md:block absolute right-[-21px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gold border border-background z-10"></span>
                S
              </div>
              <div className="flex-1">
                <h2 className="font-display text-cream text-2xl md:text-3xl mb-4 tracking-wide uppercase">
                  STRATEGIZE
                </h2>
                <p className="font-sans text-cream/70 leading-relaxed text-sm md:text-base">
                  Rank opportunities by ROI. Design the architecture. Define what the AI 
                  is allowed to touch, what requires human approval, and what the security 
                  layer looks like. Scope is locked before a line of code is written.
                </p>
              </div>
            </div>

            {/* INTEGRATE */}
            <div className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start mb-16 pl-6 md:pl-0">
              <div className="font-display text-gold text-7xl md:text-8xl leading-none w-24 flex-shrink-0 md:text-center relative">
                {/* Node Dot on Desktop */}
                <span className="hidden md:block absolute right-[-21px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gold border border-background z-10"></span>
                I
              </div>
              <div className="flex-1">
                <h2 className="font-display text-cream text-2xl md:text-3xl mb-4 tracking-wide uppercase">
                  INTEGRATE
                </h2>
                <p className="font-sans text-cream/70 leading-relaxed text-sm md:text-base">
                  Build the spine first. Add one verified feature at a time. Every 
                  customer-facing and price-bearing action requires human confirmation. 
                  Every system is instrumented from day one &mdash; cost and performance 
                  are always visible, never a surprise.
                </p>
              </div>
            </div>

            {/* EXECUTE */}
            <div className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start pl-6 md:pl-0">
              <div className="font-display text-gold text-7xl md:text-8xl leading-none w-24 flex-shrink-0 md:text-center relative">
                {/* Node Dot on Desktop */}
                <span className="hidden md:block absolute right-[-21px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gold border border-background z-10"></span>
                E
              </div>
              <div className="flex-1">
                <h2 className="font-display text-cream text-2xl md:text-3xl mb-4 tracking-wide uppercase">
                  EXECUTE
                </h2>
                <p className="font-sans text-cream/70 leading-relaxed text-sm md:text-base">
                  Operate, monitor, optimize. Your system runs in your accounts under 
                  your name. I maintain it, update it, and improve it monthly. You are 
                  never locked in &mdash; but I&apos;m there to make sure nothing breaks quietly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiator Callout */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="max-w-3xl mx-auto px-6 border-l-4 border-gold pl-6 md:pl-8">
          <div className="font-mono text-terminal text-xs mb-4 uppercase tracking-widest">
            // WHAT EVERYONE ELSE DOES INSTEAD
          </div>
          <p className="font-sans text-cream/70 leading-relaxed text-base md:text-lg">
            Most AI consultants deliver a recommendation to a team you don&apos;t have.
            Most managed AI services require your staff to build and configure 
            the tools themselves. The DSIE Codex builds the system, secures it 
            against real attack vectors, and operates it month to month. 
            No internal technical team required.
          </p>
        </div>
      </section>

      {/* Galaxy Book Go Proof Section */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-surface border border-border p-8 md:p-10 rounded-sm">
            <div className="font-mono text-terminal text-xs mb-4 uppercase tracking-widest">
              // PROOF OF METHODOLOGY
            </div>
            <h2 className="font-display text-gold text-3xl md:text-4xl mb-6 tracking-wide uppercase">
              FORCED TO WORK WHERE IT SHOULDN&apos;T
            </h2>
            <p className="font-sans text-cream/70 leading-relaxed text-sm md:text-base">
              The methodology behind every client deployment was first proven by forcing 
              quantized language models onto a Snapdragon ARM laptop that Microsoft&apos;s own
              tooling refused to support &mdash; bypassing a RAM ceiling, injecting a runtime 
              the OS actively blocked, and building a working eight-agent orchestration 
              system on hardware it was never supposed to run on. The same builds that 
              would be straightforward on supported client hardware took weeks of 
              adversarial engineering on a machine the platform fought the entire time. 
              If the methodology survives that constraint, your modern business hardware 
              is a routine deployment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
