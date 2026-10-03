export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-900 bg-zinc-950 py-12 px-6">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <p className="font-mono text-xs tracking-wider text-zinc-400 uppercase">
            THE DSIE CODEX LLC — THE BACK OFFICE FOR THE TRADES
          </p>
          <p className="font-mono text-[11px] text-zinc-600 mt-1">
            Based in Springfield, Missouri. Plain talk. Flat pricing. No long-term contracts.
          </p>
        </div>
        <div className="font-mono text-[11px] text-zinc-500 text-left md:text-right">
          <p>TechOps &middot; SalesOps &middot; RevOps</p>
          <p className="mt-1 text-zinc-700">© {new Date().getFullYear()} The DSIE Codex LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
