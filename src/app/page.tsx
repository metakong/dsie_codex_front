import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Pillars from "@/components/landing/Pillars";
import Plans from "@/components/landing/Plans";
import Checkup from "@/components/landing/Checkup";
import { SelectedPlanProvider } from "@/components/landing/SelectedPlanContext";
import { ALL_PLANS } from "@/lib/plans";

// Local-business structured data so search engines can show services and service area.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "The DSIE Codex LLC",
  url: "https://thedsiecodex.com",
  founder: { "@type": "Person", name: "Sean Deardorff" },
  description:
    "Modular fractional back office for trade and service businesses: tech, sales, and revenue operations delivered personally by a solo operator.",
  areaServed: { "@type": "City", name: "Springfield, Missouri" },
  makesOffer: ALL_PLANS.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    description: `${plan.bestFor} module.`,
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
      <About />
      <Pillars />
      <Plans />
      <Checkup />
    </SelectedPlanProvider>
  );
}
