import { PLANS, PILLAR_LABELS, formatUSD, type Plan } from "@/lib/plans";
import PlanSelectLink from "./PlanSelectLink";

const STEPS = [
  {
    number: "01",
    title: "Pick a plan",
    body: "Choose the monthly hours that fit your crew size.",
  },
  {
    number: "02",
    title: "Call, text, or email us",
    body: "When something breaks or a job gets stuck in the office, just reach out.",
  },
  {
    number: "03",
    title: "We fix it & log the time",
    body: "Every hour is tracked, so you see exactly where your plan went.",
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const featured = Boolean(plan.featured);

  return (
    <article
      className={`relative flex flex-col border p-6 sm:p-7 transition-colors ${
        featured
          ? "border-emerald-500/50 bg-zinc-900/80 shadow-lg shadow-emerald-950/30"
          : "border-zinc-800 bg-zinc-900/40 hover:border-emerald-500/50"
      }`}
    >
      {featured && (
        <div className="absolute -top-3 right-4 bg-emerald-500 text-zinc-950 font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5">
          Most Popular
        </div>
      )}

      <div className="flex items-center justify-between gap-2">
        <span
          className={`font-mono text-xs uppercase tracking-wider ${
            featured ? "text-emerald-400" : "text-zinc-500"
          }`}
        >
          {plan.tier} {"//"} {plan.tierLabel}
        </span>
        <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 whitespace-nowrap">
          {plan.crewRange}
        </span>
      </div>

      <h3 className="text-xl font-bold text-zinc-100 mt-3">{plan.name}</h3>
      <p className="text-sm text-zinc-400 mt-1">Best for {plan.bestFor.toLowerCase()}</p>

      <div className="mt-5 flex items-baseline gap-1">
        <span className="text-4xl font-bold font-mono text-zinc-100">{formatUSD(plan.price)}</span>
        <span className="text-xs font-mono text-zinc-500">/ month</span>
      </div>

      <div className="mt-3 flex items-center gap-2 border border-zinc-800 bg-zinc-950/60 px-3 py-2 font-mono text-xs">
        <span className="text-emerald-400 font-bold">{plan.hours} hours</span>
        <span className="text-zinc-400">of help every month</span>
      </div>

      {plan.includesPrevious && (
        <p className="text-xs font-mono text-emerald-400/90 mt-6">{plan.includesPrevious}</p>
      )}

      <ul className={`${plan.includesPrevious ? "mt-3" : "mt-6"} space-y-3.5 text-sm flex-grow`}>
        {plan.features.map((feature) => (
          <li key={feature.title} className="flex items-start gap-2.5">
            <span aria-hidden="true" className="text-emerald-400 font-mono text-xs mt-0.5">
              ✓
            </span>
            <span>
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <strong className="text-zinc-100 font-semibold">{feature.title}</strong>
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 border border-zinc-800 px-1.5 leading-4">
                  {PILLAR_LABELS[feature.pillar]}
                </span>
              </span>
              <span className="block text-zinc-400 mt-0.5 leading-relaxed">{feature.detail}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-5 border-t border-zinc-800/80">
        <PlanSelectLink
          interest={plan.id}
          className={`block w-full text-center font-mono text-xs uppercase tracking-wider py-3.5 sm:py-3 transition-colors ${
            featured
              ? "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold"
              : "border border-zinc-700 bg-zinc-800/60 hover:bg-zinc-800 hover:border-emerald-500/50 text-zinc-200"
          }`}
        >
          {plan.cta}
        </PlanSelectLink>
      </div>
    </article>
  );
}

export default function Plans() {
  return (
    <section id="plans" className="scroll-mt-20 border-t border-zinc-900 bg-zinc-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 max-w-3xl">
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
            Plans &amp; Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mt-1">
            One Flat Monthly Price. Hours You Can Use Anywhere.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Every plan comes with a set number of hours each month. Spend them on tech, leads, or
            billing, whatever needs fixing that week. No long-term contracts.
          </p>
        </div>

        {/* Single column on phones & tablets, equal-height 3-up on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6 xl:gap-8 max-w-xl mx-auto lg:max-w-none">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Plain-English fine print */}
        <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-zinc-800/80 bg-zinc-900/30 p-5">
          <p className="font-mono text-xs text-zinc-400 leading-relaxed max-w-3xl">
            <span className="text-zinc-200">The fine print, in plain English:</span> unused hours
            don&apos;t roll over to the next month. Need more time? Extra hours are billed at a
            flat, predictable rate tied to your plan. No surprise invoices, no long-term contracts.
          </p>
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider whitespace-nowrap">
            Springfield, MO Direct Support
          </span>
        </div>

        {/* How the hours work */}
        <div className="mt-14">
          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            How your hours work
          </h3>
          <ol className="mt-4 grid grid-cols-1 sm:grid-cols-3 border border-zinc-800 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
            {STEPS.map((step) => (
              <li key={step.number} className="p-5 bg-zinc-900/20">
                <span className="font-mono text-xs text-emerald-400">{step.number}</span>
                <p className="mt-1 font-semibold text-zinc-100">{step.title}</p>
                <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
