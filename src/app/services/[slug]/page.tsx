import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, PRODUCTS, TIERS } from "@/lib/services";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const tier = TIERS.find((t) => t.id === product.tier)!;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <span className="font-mono text-terminal text-xs uppercase tracking-widest">
              // {tier.heading}
            </span>
            <Link
              href="/services"
              className="font-mono text-muted hover:text-gold text-xs tracking-widest transition-colors flex-shrink-0"
            >
              &larr; ALL SERVICES
            </Link>
          </div>
          <h1 className="font-display text-cream text-4xl md:text-6xl mb-6 tracking-wide uppercase">
            {product.name}
          </h1>
          <div className="font-display text-gold text-4xl md:text-5xl">
            {product.pagePrice}
            {product.priceNote && (
              <span className="font-sans text-cream/50 text-base md:text-lg ml-2">
                {product.priceNote}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 bg-background flex-grow">
        <div className="max-w-3xl mx-auto px-6">
          <p className="font-sans text-cream/70 text-base md:text-lg leading-relaxed mb-12">
            {product.summary}
          </p>

          {/* Variants */}
          {product.variants && (
            <div className="mb-12">
              <div className="font-mono text-terminal text-xs uppercase tracking-widest mb-6">
                // BUILD LEVELS
              </div>
              <div className="space-y-4">
                {product.variants.map((variant) => (
                  <div
                    key={variant.name}
                    className="bg-surface border border-border p-6 rounded-sm flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
                  >
                    <div className="font-display text-gold text-2xl flex-shrink-0 sm:w-32">
                      {variant.price}
                    </div>
                    <div>
                      <div className="font-sans text-cream font-semibold text-sm uppercase tracking-wide">
                        {variant.name}
                      </div>
                      {variant.description && (
                        <p className="font-sans text-cream/60 text-sm leading-relaxed mt-1">
                          {variant.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What's included */}
          <div className="mb-12">
            <div className="font-mono text-terminal text-xs uppercase tracking-widest mb-6">
              // WHAT YOU GET
            </div>
            <ul className="space-y-3">
              {product.details.map((detail) => (
                <li key={detail} className="flex gap-3 items-start">
                  <span className="text-gold font-mono text-sm flex-shrink-0 mt-0.5">
                    &#9656;
                  </span>
                  <span className="font-sans text-cream/70 text-sm md:text-base leading-relaxed">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          {product.cta === "book" ? (
            <Link
              href="/book"
              className="block w-full sm:w-auto sm:inline-block bg-gold text-background text-center px-10 py-4 font-sans text-sm font-semibold hover:bg-goldLight transition-colors duration-200"
            >
              {product.ctaLabel} &rarr;
            </Link>
          ) : (
            <div className="bg-surface border border-gold/40 p-6 rounded-sm">
              <div className="font-mono text-gold text-xs uppercase tracking-widest mb-2">
                // CHECKOUT OPENS SEPTEMBER 1, 2026
              </div>
              <p className="font-sans text-cream/60 text-sm leading-relaxed">
                Online checkout is being re-wired as part of our architecture
                migration. Every digital product ships at launch — September 1, 2026.
              </p>
              <div className="mt-4 inline-block border border-border text-muted px-8 py-3 font-sans text-sm font-semibold cursor-not-allowed select-none">
                {product.ctaLabel} — Coming Soon
              </div>
            </div>
          )}

          {/* Credit policy note */}
          {product.creditNote && (
            <p className="font-mono text-terminal text-xs mt-8 tracking-wide leading-relaxed">
              // {product.creditNote}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
