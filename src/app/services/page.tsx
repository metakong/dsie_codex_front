import Link from "next/link";

export default function Services() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-surface text-center border-b border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="font-mono text-terminal text-xs mb-4 uppercase tracking-widest">
            // NO HIDDEN PRICING &middot; NO CONTACT FORMS TO LEARN A NUMBER
          </div>
          <h1 className="font-display text-cream text-5xl md:text-6xl mb-4 tracking-wide uppercase">
            WHAT YOU&apos;RE ACTUALLY BUYING
          </h1>
          <p className="font-sans text-gold text-base md:text-lg max-w-2xl mx-auto font-medium">
            Every price listed. Every Tier 0 and Tier 1 fee credited toward the 
            next engagement within 45 days. The diagnostic fee credited toward 
            any implementation.
          </p>
        </div>
      </section>

      {/* Tiers Container */}
      <div className="py-20 space-y-24 max-w-7xl mx-auto px-6 w-full">

        {/* TIER 0 */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6 mb-10">
            <h2 className="font-display text-gold text-3xl md:text-4xl tracking-wide uppercase">
              TIER 0 &mdash; DIGITAL PRODUCTS
            </h2>
            <span className="inline-block self-start border border-gold text-gold font-mono text-xs px-3 py-1 tracking-wider uppercase">
              SELF-SERVE &middot; NATIONWIDE &middot; ASYNC
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Product 1 */}
            <div className="bg-surface border border-border p-8 flex flex-col justify-between rounded-sm">
              <div>
                <h3 className="font-display text-cream text-2xl mb-3 tracking-wide uppercase">
                  Prompt Engineering Starter Kit
                </h3>
                <p className="font-sans text-cream/60 text-sm leading-relaxed mb-6">
                  20 business-specific prompt templates covering lead follow-up, 
                  proposal drafting, objection handling, content, and internal SOPs.
                </p>
              </div>
              <div>
                <div className="font-display text-gold text-4xl mb-6">$67</div>
                <a
                  href="https://thedsiecodex.lemonsqueezy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border border-gold text-gold text-center py-3 font-sans text-sm font-semibold hover:bg-gold hover:text-background transition-colors duration-200"
                >
                  Get Instant Access &rarr;
                </a>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-surface border border-border p-8 flex flex-col justify-between rounded-sm">
              <div>
                <h3 className="font-display text-cream text-2xl mb-3 tracking-wide uppercase">
                  AI Spend Audit Report
                </h3>
                <p className="font-sans text-cream/60 text-sm leading-relaxed mb-6">
                  Complete a 15-question intake. Receive a verified PDF within 48 hours 
                  showing exactly where you are overpaying and what consolidation should cost.
                </p>
              </div>
              <div>
                <div className="font-display text-gold text-4xl mb-6">$127</div>
                <a
                  href="https://thedsiecodex.lemonsqueezy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border border-gold text-gold text-center py-3 font-sans text-sm font-semibold hover:bg-gold hover:text-background transition-colors duration-200"
                >
                  Get Instant Access &rarr;
                </a>
              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-surface border border-border p-8 flex flex-col justify-between rounded-sm">
              <div>
                <h3 className="font-display text-cream text-2xl mb-3 tracking-wide uppercase">
                  Industry AI Playbook
                </h3>
                <p className="font-sans text-cream/60 text-sm leading-relaxed mb-6">
                  Vertical-specific guide: top workflows, curated tool shortlist with real 
                  pricing, ready-to-use prompt library, and a prioritized start-here 
                  recommendation. Verticals: trades, professional services, machine shops, 
                  auto dealers, retail.
                </p>
              </div>
              <div>
                <div className="font-display text-gold text-4xl mb-6">$297</div>
                <a
                  href="https://thedsiecodex.lemonsqueezy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border border-gold text-gold text-center py-3 font-sans text-sm font-semibold hover:bg-gold hover:text-background transition-colors duration-200"
                >
                  Get Instant Access &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TIER 1 */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6 mb-10">
            <h2 className="font-display text-gold text-3xl md:text-4xl tracking-wide uppercase">
              TIER 1 &mdash; ENTRY CONSULTING
            </h2>
            <span className="inline-block self-start border border-gold text-gold font-mono text-xs px-3 py-1 tracking-wider uppercase">
              ZOOM-BASED &middot; FEE CREDITED TO TIER 2 WITHIN 45 DAYS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Consultation 1 */}
            <div className="bg-surface border border-border p-8 flex flex-col justify-between rounded-sm">
              <div>
                <h3 className="font-display text-cream text-2xl mb-3 tracking-wide uppercase">
                  AI Stack and Spend Consultation
                </h3>
                <p className="font-sans text-cream/60 text-sm leading-relaxed mb-6">
                  Built on a completed AI Spend Audit. Reviews current tools, identifies 
                  consolidation opportunities, produces a written 90-day recommendation.
                  <span className="block mt-2 font-semibold text-gold font-mono text-xs">// 45 min Session</span>
                </p>
              </div>
              <div>
                <div className="font-display text-gold text-4xl mb-6">$247</div>
                <Link
                  href="/book"
                  className="block w-full border border-gold text-gold text-center py-3 font-sans text-sm font-semibold hover:bg-gold hover:text-background transition-colors duration-200"
                >
                  Book This Session &rarr;
                </Link>
              </div>
            </div>

            {/* Consultation 2 */}
            <div className="bg-surface border border-border p-8 flex flex-col justify-between rounded-sm">
              <div>
                <h3 className="font-display text-cream text-2xl mb-3 tracking-wide uppercase">
                  AI Opportunity Flash Session
                </h3>
                <p className="font-sans text-cream/60 text-sm leading-relaxed mb-6">
                  Intake-driven analysis of your top 5 AI integration opportunities with 
                  conservative ROI estimates and a straight answer on whether a larger 
                  engagement makes sense right now.
                  <span className="block mt-2 font-semibold text-gold font-mono text-xs">// 60 min Session</span>
                </p>
              </div>
              <div>
                <div className="font-display text-gold text-4xl mb-6">$347</div>
                <Link
                  href="/book"
                  className="block w-full border border-gold text-gold text-center py-3 font-sans text-sm font-semibold hover:bg-gold hover:text-background transition-colors duration-200"
                >
                  Book This Session &rarr;
                </Link>
              </div>
            </div>
          </div>
          
          <div className="font-mono text-terminal text-xs mt-6 tracking-wide">
            // Full fee credited in full toward any implementation booked within 45 days
          </div>
        </section>

        {/* TIER 2 */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6 mb-10">
            <h2 className="font-display text-gold text-3xl md:text-4xl tracking-wide uppercase">
              TIER 2 &mdash; IMPLEMENTATION
            </h2>
            <span className="inline-block self-start border border-gold text-gold font-mono text-xs px-3 py-1 tracking-wider uppercase">
              CUSTOM BUILD &middot; OWNER-NAMED ACCOUNTS &middot; HUMAN-IN-THE-LOOP
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service 1 */}
            <div className="bg-surface border border-border p-8 flex flex-col justify-between rounded-sm">
              <div>
                <h3 className="font-display text-cream text-2xl mb-3 tracking-wide uppercase">
                  Business AI Diagnostic
                </h3>
                <p className="font-sans text-cream/60 text-sm leading-relaxed mb-6">
                  Full operational review producing a prioritized implementation roadmap 
                  detailed enough to execute with or without hiring us.
                  <span className="block mt-2 font-mono text-xs font-semibold text-gold uppercase tracking-wider">
                    Micro (1–5 employees) &middot; Small (6–15) &middot; Multi-system
                  </span>
                </p>
              </div>
              <div>
                <div className="font-display text-gold text-2xl mb-6">$1,750 / $2,750 / $4,500</div>
                <Link
                  href="/book"
                  className="block w-full border border-gold text-gold text-center py-3 font-sans text-sm font-semibold hover:bg-gold hover:text-background transition-colors duration-200"
                >
                  Start With a Diagnostic &rarr;
                </Link>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-surface border border-border p-8 flex flex-col justify-between rounded-sm">
              <div>
                <h3 className="font-display text-cream text-2xl mb-3 tracking-wide uppercase">
                  Automation Sprint
                </h3>
                <p className="font-sans text-cream/60 text-sm leading-relaxed mb-6">
                  One high-value workflow built, tested, and launched &mdash; with 30 days 
                  post-launch monitoring included.
                </p>
              </div>
              <div>
                <div className="font-display text-gold text-4xl mb-6">$3,750</div>
                <Link
                  href="/book"
                  className="block w-full border border-gold text-gold text-center py-3 font-sans text-sm font-semibold hover:bg-gold hover:text-background transition-colors duration-200"
                >
                  Start With a Diagnostic &rarr;
                </Link>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-surface border border-border p-8 flex flex-col justify-between rounded-sm">
              <div>
                <h3 className="font-display text-cream text-2xl mb-3 tracking-wide uppercase">
                  Custom AI Integration
                </h3>
                <p className="font-sans text-cream/60 text-sm leading-relaxed mb-6">
                  A complete custom AI system built and installed in your business. 
                  <span className="block mt-2 font-mono text-xs text-cream/80">
                    <strong className="text-gold">Foundation ($7,500):</strong> capture layer, RAG assistant, owner portal and mobile PWA.<br />
                    <strong className="text-gold">Standard ($10,500):</strong> adds voice/SMS and pricing memory.<br />
                    <strong className="text-gold">Premium ($14,500):</strong> full stack including photo capture, material cost monitoring, document generation, and security architecture layer.
                  </span>
                  <span className="block mt-3 text-xs italic text-muted">
                    All tiers: owner-named cloud accounts, human approval on all price-bearing actions, written security policy, full documentation, 60-day post-launch support.
                  </span>
                </p>
              </div>
              <div>
                <div className="font-display text-gold text-xl mb-6">Foundation $7,500 &middot; Standard $10,500 &middot; Premium $14,500</div>
                <Link
                  href="/book"
                  className="block w-full border border-gold text-gold text-center py-3 font-sans text-sm font-semibold hover:bg-gold hover:text-background transition-colors duration-200"
                >
                  Start With a Diagnostic &rarr;
                </Link>
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-surface border border-border p-8 flex flex-col justify-between rounded-sm">
              <div>
                <h3 className="font-display text-cream text-2xl mb-3 tracking-wide uppercase">
                  Enterprise Multi-Phase
                </h3>
                <p className="font-sans text-cream/60 text-sm leading-relaxed mb-6">
                  Complex operations, multiple locations, or regulatory requirements. 
                  Phased delivery over 3–6 months, milestone-based payment, 
                  team training and change management included.
                </p>
              </div>
              <div>
                <div className="font-display text-gold text-3xl mb-6">$18,000&ndash;$45,000+</div>
                <Link
                  href="/book"
                  className="block w-full border border-gold text-gold text-center py-3 font-sans text-sm font-semibold hover:bg-gold hover:text-background transition-colors duration-200"
                >
                  Start With a Diagnostic &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* TIER 3 */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6 mb-10">
            <h2 className="font-display text-gold text-3xl md:text-4xl tracking-wide uppercase">
              TIER 3 &mdash; MANAGED SERVICES
            </h2>
            <span className="inline-block self-start border border-gold text-gold font-mono text-xs px-3 py-1 tracking-wider uppercase">
              RECURRING &middot; NO EQUIVALENT IN THE ADVISORY MODEL
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Managed 1 */}
            <div className="bg-surface border border-border p-8 flex flex-col justify-between rounded-sm">
              <div>
                <h3 className="font-display text-cream text-2xl mb-3 tracking-wide uppercase">
                  System Monitor
                </h3>
                <p className="font-sans text-cream/60 text-sm leading-relaxed mb-6">
                  Proactive monitoring, error alerts, monthly cost-and-performance report, 
                  minor tuning, vendor update review, one advisory hour per month.
                </p>
              </div>
              <div>
                <div className="font-display text-gold text-3xl mb-6">$850<span className="text-sm font-sans text-cream/50">/month</span></div>
                <Link
                  href="/book"
                  className="block w-full border border-gold text-gold text-center py-3 font-sans text-sm font-semibold hover:bg-gold hover:text-background transition-colors duration-200"
                >
                  Add to Implementation &rarr;
                </Link>
              </div>
            </div>

            {/* Managed 2 */}
            <div className="bg-surface border border-border p-8 flex flex-col justify-between rounded-sm">
              <div>
                <h3 className="font-display text-cream text-2xl mb-3 tracking-wide uppercase">
                  Active Management
                </h3>
                <p className="font-sans text-cream/60 text-sm leading-relaxed mb-6">
                  Everything in Monitor plus up to 4 hours monthly development work, 
                  priority one-business-day response, quarterly business review with 
                  documented impact metrics.
                </p>
              </div>
              <div>
                <div className="font-display text-gold text-3xl mb-6">$1,350<span className="text-sm font-sans text-cream/50">/month</span></div>
                <Link
                  href="/book"
                  className="block w-full border border-gold text-gold text-center py-3 font-sans text-sm font-semibold hover:bg-gold hover:text-background transition-colors duration-200"
                >
                  Add to Implementation &rarr;
                </Link>
              </div>
            </div>

            {/* Managed 3 */}
            <div className="bg-surface border border-border p-8 flex flex-col justify-between rounded-sm">
              <div>
                <h3 className="font-display text-cream text-2xl mb-3 tracking-wide uppercase">
                  Premium Managed + Advisory
                </h3>
                <p className="font-sans text-cream/60 text-sm leading-relaxed mb-6">
                  Everything in Active plus up to 8 hours monthly development, same-day 
                  response, quarterly staff training sessions, strategic technology advisory 
                  on any decision facing the business.
                </p>
              </div>
              <div>
                <div className="font-display text-gold text-3xl mb-6">$1,750<span className="text-sm font-sans text-cream/50">/month</span></div>
                <Link
                  href="/book"
                  className="block w-full border border-gold text-gold text-center py-3 font-sans text-sm font-semibold hover:bg-gold hover:text-background transition-colors duration-200"
                >
                  Add to Implementation &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Callout */}
        <section className="mt-16 max-w-2xl mx-auto text-center">
          <p className="font-sans text-cream/50 text-sm leading-relaxed">
            All systems are built in your accounts under your ownership. 
            You are never locked in to The DSIE Codex to keep your system running. 
            The managed service keeps it running better.
          </p>
        </section>

      </div>
    </div>
  );
}
