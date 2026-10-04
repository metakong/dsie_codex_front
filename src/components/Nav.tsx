"use client";

import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 py-4">
        <Link className="flex items-center gap-3 min-w-0" href="/">
          <div className="h-3 w-3 shrink-0 bg-emerald-500 rounded-none animate-pulse" />
          <span className="font-mono text-sm tracking-wider font-semibold text-zinc-100 uppercase truncate">
            THE DSIE CODEX{" "}
            <span className="hidden lg:inline text-zinc-500">{"//"} DIAGNOSE, STRATEGIZE, INTEGRATE, EXECUTE</span>
          </span>
        </Link>
        <nav aria-label="Main" className="flex shrink-0 items-center gap-4 sm:gap-6">
          <a
            href="#services"
            className="hidden sm:inline font-mono text-xs uppercase tracking-wider text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            Services
          </a>
          <a
            href="#plans"
            className="font-mono text-xs uppercase tracking-wider text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            Plans
          </a>
          <a
            href="#checkup"
            className="font-mono text-xs uppercase tracking-wider bg-zinc-900 border border-emerald-500/40 text-emerald-400 px-3 py-1.5 hover:bg-emerald-500 hover:text-zinc-950 transition-all whitespace-nowrap"
          >
            Free Checkup
          </a>
        </nav>
      </div>
    </header>
  );
}
