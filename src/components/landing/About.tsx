import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20 border-t border-zinc-900 bg-zinc-950 py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
        <div className="mx-auto md:mx-0 shrink-0">
          <div className="relative border border-zinc-800 bg-zinc-900/40 p-2">
            <Image
              src="/sean-profile.avif"
              alt="Sean Deardorff, founder of The DSIE Codex"
              width={340}
              height={340}
              unoptimized
              className="block h-56 w-56 sm:h-64 sm:w-64 object-cover grayscale-[15%]"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-2 -right-2 h-4 w-4 bg-emerald-500"
            />
          </div>
        </div>

        <div className="max-w-3xl">
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">About Me</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mt-1">I&apos;m Sean Deardorff.</h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
            <strong className="text-zinc-100">
              For nearly 30 years, I&apos;ve operated in the engine rooms of corporate America.
            </strong>{" "}
            I don&apos;t just hand over a PDF of recommendations; I build the operational frameworks that fix the problem. My systems have anchored a $400M revenue growth phase for an e-commerce enterprise and driven a 900% increase in corporate acquisitions for a global private equity firm.
          </p>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
            I built The DSIE Codex because I enjoy helping honest, hardworking people see through marketing B.S. The practical difference between a consultant and a fractional executive is authority. A consultant advises the people making decisions; I integrate directly into your business to execute the solutions, giving you the systems to compete with massive corporations who have bigger budgets but less integrity.
          </p>

          <aside
            aria-label="Limited availability"
            className="mt-6 border border-emerald-500/40 bg-emerald-500/5 p-4 sm:p-5"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-emerald-400 font-bold">
              Limited Availability
            </p>
            <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
              Because I&apos;m a solo operator and execute every integration personally, my time is strictly
              limited. I choose my clients carefully and only take on a small number at a time to ensure
              absolute quality.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
