import type { Metadata } from "next";
import Link from "next/link";
import { TIERS, productsByTier } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Transparent pricing for custom AI systems — built, secured, and operated for small businesses. No hidden pricing, no contact forms to learn a number.",
};

const TIER_GRID: Record<number, string> = {
  0: "grid-cols-1 md:grid-cols-3",
  1: "grid-cols-1 md:grid-cols-2",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
};

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
            any integration.
          </p>
        </div>
      </section>

      {/* Tiers Container */}
      <div className="py-20 space-y-24 max-w-7xl mx-auto px-6 w-full">
        {TIERS.map((tier) => (
          <section key={tier.id}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6 mb-10">
              <h2 className="font-display text-gold text-3xl md:text-4xl tracking-wide uppercase">
                {tier.heading}
              </h2>
              <span className="inline-block self-start border border-gold text-gold font-mono text-xs px-3 py-1 tracking-wider uppercase">
                {tier.badge}
              </span>
            </div>

            <div className={`grid gap-6 ${TIER_GRID[tier.id]}`}>
              {productsByTier(tier.id).map((product) => (
                <div
                  key={product.slug}
                  className="bg-surface border border-border p-8 flex flex-col justify-between rounded-sm"
                >
                  <div>
                    <h3 className="font-display text-cream text-2xl mb-3 tracking-wide uppercase">
                      {product.name}
                    </h3>
                    <p className="font-sans text-cream/60 text-sm leading-relaxed mb-6">
                      {product.summary}
                      {product.priceNote && product.tier === 1 && (
                        <span className="block mt-2 font-semibold text-gold font-mono text-xs">
                          // {product.priceNote} Session
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <div
                      className={`font-display text-gold mb-6 ${
                        product.cardPrice.length > 24
                          ? "text-xl"
                          : product.cardPrice.length > 12
                          ? "text-2xl"
                          : "text-4xl"
                      }`}
                    >
                      {product.cardPrice}
                      {product.priceNote === "/month" && (
                        <span className="text-sm font-sans text-cream/50">
                          /month
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/services/${product.slug}`}
                      className="block w-full border border-gold text-gold text-center py-3 font-sans text-sm font-semibold hover:bg-gold hover:text-background transition-colors duration-200"
                    >
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {tier.id === 1 && (
              <div className="font-mono text-terminal text-xs mt-6 tracking-wide">
                // Full fee credited in full toward any integration booked within 45 days
              </div>
            )}
          </section>
        ))}

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
