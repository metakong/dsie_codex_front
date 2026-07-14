import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "28 years in sales, cybersecurity training, and hands-on AI engineering — the operator behind The DSIE Codex.",
};

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 flex flex-col min-h-screen">
      <div>
        {/* BEAT 1 */}
        <section className="mb-16">
          <div className="font-mono text-terminal text-xs mb-3 uppercase tracking-widest">
            // BEAT 01
          </div>
          <h1 className="font-display text-cream text-4xl md:text-5xl mb-8 tracking-wide uppercase">
            AN UNUSUAL COMBINATION
          </h1>
          <p className="font-sans text-cream/70 leading-relaxed text-base md:text-lg">
            28 years in professional sales &mdash; Director of Business Development work
            that contributed to doubling toysrus.com&apos;s online revenue and 10x-ing
            acquisition rates at AP Wireless &mdash; built on top of 32 years of 
            personally breaking and rebuilding systems since age 13, plus over a year 
            of paid frontier AI annotation work writing rubrics and chain-of-thought 
            logic for the same model families now being deployed for clients. 
            That combination does not exist anywhere else in this market.
          </p>
        </section>

        {/* Divider 1 */}
        <hr className="border-border my-16" />

        {/* BEAT 2 */}
        <section className="mb-16">
          <div className="font-mono text-terminal text-xs mb-3 uppercase tracking-widest">
            // BEAT 02
          </div>
          <h2 className="font-display text-gold text-4xl md:text-5xl mb-8 tracking-wide uppercase">
            ONE OPERATING PRINCIPLE
          </h2>
          <blockquote className="border-l-4 border-gold pl-6 md:pl-8 my-6">
            <p className="font-sans text-cream text-xl md:text-2xl leading-relaxed font-medium">
              &quot;If my solution isn&apos;t right for you, I&apos;ll tell you and
              point you somewhere better.&quot;
            </p>
          </blockquote>
          <p className="font-sans text-cream/50 text-sm mt-6 leading-relaxed">
            This is why the Tier 1 diagnostic is priced to be valuable as a standalone 
            deliverable. A client who self-implements with the roadmap is a win, 
            not a near-miss.
          </p>
        </section>

        {/* Divider 2 */}
        <hr className="border-border my-16" />

        {/* BEAT 3 */}
        <section className="mb-16">
          <div className="font-mono text-terminal text-xs mb-3 uppercase tracking-widest">
            // BEAT 03
          </div>
          <h2 className="font-display text-cream text-4xl md:text-5xl mb-8 tracking-wide uppercase">
            SPRINGFIELD, MISSOURI
          </h2>
          <div className="bg-surface border border-border aspect-[4/3] flex items-center justify-center mb-6 rounded-sm">
            <span className="font-mono text-terminal text-xs tracking-wider">
              // PHOTO ASSET PENDING
            </span>
          </div>
          <p className="font-sans text-muted text-sm tracking-wide">
            Launching September 2026 &middot; thedsiecodex.com
          </p>
        </section>
      </div>
    </div>
  );
}
