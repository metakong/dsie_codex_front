import Hero from "@/components/landing/Hero";
import Pillars from "@/components/landing/Pillars";
import Plans from "@/components/landing/Plans";
import Checkup from "@/components/landing/Checkup";
import { SelectedPlanProvider } from "@/components/landing/SelectedPlanContext";
import { PLANS } from "@/lib/plans";

// Local-business structured data so search engines can show plans and service area.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "The DSIE Codex LLC",
  url: "https://thedsiecodex.com",
  description:
    "Fractional back office for trade and service businesses: tech support, lead tracking, and billing on one flat monthly plan.",
  areaServed: { "@type": "City", name: "Springfield, Missouri" },
  makesOffer: PLANS.map((plan) => ({
    "@type": "Offer",
    name: plan.shortName,
    description: `${plan.hours} hours of support per month. Best for ${plan.bestFor.toLowerCase()} (${plan.crewRange}).`,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: plan.price,
      priceCurrency: "USD",
      unitText: "MONTH",
    },
  })),
};

export default function Home() {
  return (
    <SelectedPlanProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Pillars />
      <Plans />
      <Checkup />
    </SelectedPlanProvider>
  );
}
