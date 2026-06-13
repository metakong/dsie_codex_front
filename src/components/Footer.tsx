export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-12 text-center mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <h2 className="font-display text-gold text-2xl tracking-widest uppercase">
          THE DSIE CODEX LLC
        </h2>
        
        <p className="font-mono text-cream/60 text-xs mt-2 uppercase tracking-wide">
          Diagnose. Strategize. Integrate. Execute.
        </p>
        
        <p className="font-sans text-muted text-sm mt-4">
          Springfield, Missouri &middot; thedsiecodex.online
        </p>
        
        <p className="font-mono text-terminal text-xs mt-6 tracking-widest">
          // SYSTEM_STATUS: ONLINE &middot; AUTHENTICATION: SOVEREIGN
        </p>
        
        <p className="font-sans text-muted text-xs mt-4">
          &copy; {new Date().getFullYear()} The DSIE Codex LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
