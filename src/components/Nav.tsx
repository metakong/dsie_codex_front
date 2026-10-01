"use client";

import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link className="flex items-center gap-3" href="/">
          <div className="h-3 w-3 bg-emerald-500 rounded-none animate-pulse" />
          <span className="font-mono text-sm tracking-wider font-semibold text-zinc-100 uppercase">
            THE DSIE CODEX <span className="text-zinc-500">// REVOPS</span>
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <a
            href="#triad"
            className="hidden sm:inline font-mono text-xs uppercase tracking-wider text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            Capabilities
          </a>
          <a
            href="#diagnostic"
            className="font-mono text-xs uppercase tracking-wider bg-zinc-900 border border-emerald-500/40 text-emerald-400 px-3 py-1.5 hover:bg-emerald-500 hover:text-zinc-950 transition-all"
          >
            Run Audit
          </a>
        </div>
      </div>
    </header>
  );
}
