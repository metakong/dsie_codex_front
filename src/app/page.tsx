import DemoTool from "@/components/DemoTool";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center animated-grid overflow-hidden py-12 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center w-full">
          <div className="font-mono text-terminal text-xs tracking-widest mb-6 uppercase">
            // SYSTEM_STATUS: ONLINE &middot; AUTHENTICATION: SOVEREIGN
          </div>

          <h1 className="font-display text-cream leading-none mb-6 text-4xl md:text-7xl tracking-tight uppercase">
            Stop paying for AI advice.
          </h1>

          <p className="font-sans text-cream/70 text-base md:text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
            We custom-build, secure, and operate AI engines for small businesses.
            We don&apos;t sell slide decks; we build working systems.
          </p>

          <div className="font-sans text-xs md:text-sm font-bold text-gold mb-8 uppercase tracking-wider">
            Identify your top automation opportunity right now. No email required.
          </div>

          <DemoTool />
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
              <h3 className="font-display text-gold text-2xl mb-4">BUILD &amp; OPERATE</h3>
              <p className="font-sans text-cream/70 text-sm md:text-base leading-relaxed">
                No recommendation handed to a team you don&apos;t have.
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
                Your business doesn&apos;t need a technical team. Mine handles
                everything — build, operation, monitoring, and optimization.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
