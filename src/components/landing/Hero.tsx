import { TECHOPS_PLANS, formatUSD } from "@/lib/plans";

const TRADES = ["HVAC", "Plumbing", "Electrical", "Roofing", "Commercial Contractors"];

const startingPrice = Math.min(...TECHOPS_PLANS.map((p) => p.price));
const minHours = Math.min(...TECHOPS_PLANS.map((p) => p.hours));
const maxHours = Math.max(...TECHOPS_PLANS.map((p) => p.hours));

const PROOF_POINTS = [
  { value: formatUSD(startingPrice), label: "Plans start at, per month" },
  { value: `${minHours}\u2013${maxHours} hrs`, label: "Of hands-on help, every month" },
  { value: "0", label: "Long-term contracts" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Blueprint grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_left,black_25%,transparent_70%)]"
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-16 sm:pt-24 sm:pb-20">
        <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-emerald-400">
            Springfield, MO &middot; Back Office for the Trades
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 max-w-4xl leading-[1.08]">
          Stop Paying Your Top Tradesmen to Fix the Wi-Fi.
        </h1>
        <p className="mt-4 text-xl sm:text-2xl font-semibold text-emerald-400 max-w-3xl leading-snug">
          Let The DSIE Codex handle your tech, your leads, and your billing.
        </p>

        <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
          We&apos;re the back office you never had time to hire. One flat monthly plan covers the
          tablets in your trucks, the leads hitting your phone, and the invoices going out the
          door, for less than an entry-level IT guy.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href="#plans"
            className="text-center bg-emerald-500 text-zinc-950 font-mono text-xs font-semibold uppercase tracking-wider px-6 py-4 sm:py-3.5 hover:bg-emerald-400 transition-colors"
          >
            See Plans &amp; Pricing
          </a>
          <a
            href="#checkup"
            className="text-center border border-zinc-800 bg-zinc-900 text-zinc-300 font-mono text-xs uppercase tracking-wider px-6 py-4 sm:py-3.5 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
          >
            What&apos;s Busywork Costing You?
          </a>
        </div>

        <dl className="mt-12 grid grid-cols-3 border border-zinc-800 bg-zinc-950/70 divide-x divide-zinc-800 max-w-2xl">
          {PROOF_POINTS.map((point) => (
            <div key={point.label} className="px-3 py-4 sm:px-5">
              <dt className="sr-only">{point.label}</dt>
              <dd className="font-mono text-lg sm:text-2xl font-bold text-zinc-100">{point.value}</dd>
              <dd className="mt-1 text-[11px] sm:text-xs text-zinc-500 leading-snug">{point.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 mr-1">
            Built for:
          </span>
          {TRADES.map((trade) => (
            <span
              key={trade}
              className="font-mono text-[11px] uppercase tracking-wider text-zinc-300 border border-zinc-800 bg-zinc-900/60 px-2 py-1"
            >
              {trade}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
