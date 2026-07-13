"use client";

import { useState, useRef, useEffect } from "react";

interface AgentRow {
  name: string;
  status: "Pending" | "Running" | "Complete";
}

const INITIAL_AGENTS: AgentRow[] = [
  { name: "Agent 0 — Security Pre-processor", status: "Pending" },
  { name: "Agent 1 — Business Categorizer", status: "Pending" },
  { name: "Agent 2 — Opportunity Mapper", status: "Pending" },
  { name: "Agent 3 — Value Estimator", status: "Pending" },
  { name: "Agent 4 — Report Generator", status: "Pending" },
];

export default function DemoTool() {
  const [businessType, setBusinessType] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [agents, setAgents] = useState<AgentRow[]>(INITIAL_AGENTS);
  const abortRef = useRef<AbortController | null>(null);

  // Lock body scroll when overlay is open; release on close or unmount
  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showOverlay]);

  const handleClose = () => {
    // Abort any in-flight stream before closing
    abortRef.current?.abort();
    setShowOverlay(false);
    setShowReport(false);
    setIsSubmitting(false);
    setIsOffline(false);
    setAgents(INITIAL_AGENTS);
  };

  // Close overlay on Escape key
  useEffect(() => {
    if (!showOverlay) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showOverlay]);

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessType.trim() || !painPoint.trim()) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setIsSubmitting(true);
    setShowOverlay(true);
    setShowReport(false);
    setReportContent("");
    setIsOffline(false);
    setAgents(INITIAL_AGENTS);
    setEmailSent(false);
    setEmailError(null);

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessType: businessType.trim(),
          painPoint: painPoint.trim(),
        }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`API responded with ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            const jsonStr = trimmed.startsWith("data:")
              ? trimmed.replace(/^data:\s*/, "")
              : trimmed;

            try {
              const parsed = JSON.parse(jsonStr);
              const { agent: agentIndex, status, report } = parsed;

              if (agentIndex !== undefined && status) {
                setAgents((prev) => {
                  const next = [...prev];
                  if (agentIndex >= 0 && agentIndex < next.length) {
                    next[agentIndex] = { ...next[agentIndex], status };
                  }
                  return next;
                });
              }

              if (report) {
                setReportContent(report);
                setShowReport(true);
                // Stop spinner immediately — the chain is done.
                // Don't wait for TCP stream to fully close on slow connections.
                setIsSubmitting(false);
              }
            } catch {
              // Incomplete JSON chunk — continue accumulating
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      console.error("Demo API error:", err);
      setIsOffline(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailReport = async () => {
    if (!emailInput.trim() || emailSent || emailSending) return;
    setEmailSending(true);
    setEmailError(null);
    try {
      const res = await fetch("/api/email-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput.trim(), report: reportContent }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Request failed." }));
        throw new Error(data.error || `Server responded with ${res.status}`);
      }
      setEmailSent(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send email.";
      setEmailError(message);
    } finally {
      setEmailSending(false);
    }
  };

  // Close button: visible once analysis is done, errored, or report received
  const canClose = !isSubmitting || isOffline || showReport;
  // Backdrop click: only closes when there is no report to lose
  const backdropCloses = canClose && !showReport;

  return (
    <div className="max-w-2xl mx-auto text-left">
      {/* ── Input Form ─────────────────────────────────────────────────────── */}
      <form
        onSubmit={handleDemoSubmit}
        className="bg-surface border border-border p-6 md:p-8 rounded-sm"
      >
        <label htmlFor="businessType" className="sr-only">
          Business type
        </label>
        <input
          type="text"
          id="businessType"
          required
          maxLength={500}
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          placeholder="Business type (e.g. HVAC contractor, law firm, machine shop)"
          className="w-full bg-background border border-border text-cream placeholder-muted p-3 focus:border-gold focus:outline-none transition-colors duration-200 mb-4 font-sans text-sm"
        />
        <div className="font-mono text-muted text-xs text-right mb-4">
          {500 - businessType.length} characters remaining
        </div>

        <label htmlFor="painPoint" className="sr-only">
          Biggest operational pain point
        </label>
        <textarea
          required
          id="painPoint"
          maxLength={500}
          value={painPoint}
          onChange={(e) => setPainPoint(e.target.value)}
          placeholder="Biggest operational pain point"
          rows={4}
          className="w-full bg-background border border-border text-cream placeholder-muted p-3 focus:border-gold focus:outline-none transition-colors duration-200 mb-2 font-sans resize-none text-sm"
        />
        <div className="font-mono text-muted text-xs text-right mb-6">
          {500 - painPoint.length} characters remaining
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gold text-background font-sans font-semibold py-3 hover:bg-goldLight disabled:opacity-50 transition-colors duration-200 cursor-pointer"
        >
          {isSubmitting ? "Running Agents..." : "Analyze My Business →"}
        </button>
      </form>

      {/* ── Analysis Overlay ────────────────────────────────────────────────
           Renders as a fixed full-screen layer above all page content.
           The backdrop is semi-transparent so the hero copy shows behind it.
           z-[100] sits above the nav (z-50) and everything else on the page.
      ──────────────────────────────────────────────────────────────────────── */}
      {showOverlay && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="AI Analysis in progress"
        >
          {/* Backdrop — click to close when analysis is done */}
          <div
            className="absolute inset-0 bg-background/85 backdrop-blur-sm"
            onClick={backdropCloses ? handleClose : undefined}
          />

          {/* Modal Panel */}
          <div className="relative z-10 w-full max-w-2xl bg-surface border border-border rounded-sm flex flex-col max-h-[88vh]">

            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
              <span className="font-mono text-terminal text-xs tracking-widest uppercase">
                {isSubmitting
                  ? "// ANALYSIS RUNNING"
                  : showReport
                  ? "// ANALYSIS COMPLETE"
                  : "// ANALYSIS FAILED"}
              </span>
              {canClose && (
                <button
                  onClick={handleClose}
                  className="font-mono text-muted hover:text-cream text-xs tracking-widest transition-colors"
                  aria-label="Close analysis overlay"
                >
                  [ESC] CLOSE
                </button>
              )}
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-grow">

              {/* Agent rows */}
              <div className="px-6 pt-4 pb-2">
                <div className="space-y-0">
                  {agents.map((agent, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 py-3 border-b border-border last:border-0"
                    >
                      <span className="relative flex h-3 w-3 flex-shrink-0">
                        {agent.status === "Running" && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                        )}
                        <span
                          className={`relative inline-flex rounded-full h-3 w-3 ${
                            agent.status === "Pending"
                              ? "bg-muted"
                              : agent.status === "Running"
                              ? "bg-gold"
                              : "bg-terminal"
                          }`}
                        />
                      </span>
                      <span className="font-mono text-cream text-xs md:text-sm flex-1">
                        {agent.name}
                      </span>
                      <span className="font-mono text-muted text-xs flex-shrink-0">
                        {agent.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Security tooltip */}
                <p className="font-mono text-muted text-xs italic mt-4 leading-relaxed border-t border-border/40 pt-4">
                  Prompt injection is an unsolved problem in AI — this layer
                  demonstrates defense-in-depth mitigation, the same approach
                  applied to every client system.
                </p>

                {/* Offline / error state */}
                {isOffline && (
                  <div className="mt-4 pt-4 border-t border-border/40">
                    <p className="font-mono text-gold text-xs tracking-wide">
                      // ANALYSIS ENGINE OFFLINE
                    </p>
                    <p className="font-mono text-muted text-xs mt-1 leading-relaxed">
                      The Jungle API backend is unreachable. Full live analysis
                      will be available at launch.
                    </p>
                  </div>
                )}
              </div>

              {/* Report — appears below agents when complete */}
              {showReport && (
                <div className="px-6 pb-6 border-t-2 border-t-gold mt-2">
                  <div className="font-mono text-terminal text-xs tracking-widest uppercase mt-6 mb-4">
                    // YOUR OPPORTUNITY REPORT
                  </div>

                  <div className="font-sans text-cream leading-relaxed space-y-4 whitespace-pre-wrap text-sm">
                    {reportContent}
                  </div>

                  {/* Email capture */}
                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <label htmlFor="demoEmail" className="sr-only">
                        Enter your email to receive this report
                      </label>
                      <input
                        type="email"
                        id="demoEmail"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter your email"
                        disabled={emailSent}
                        className="flex-1 bg-background border border-border text-cream placeholder-muted p-3 focus:border-gold focus:outline-none transition-colors duration-200 font-sans text-sm disabled:opacity-50"
                      />
                      <button
                        onClick={handleEmailReport}
                        disabled={!emailInput.trim() || emailSent || emailSending}
                        className="border border-gold text-gold px-6 py-3 hover:bg-gold hover:text-background transition-colors duration-200 font-sans text-sm font-semibold disabled:opacity-50 flex-shrink-0"
                      >
                        {emailSending ? "Sending…" : emailSent ? "Report Queued ✓" : "Email This Report"}
                      </button>
                    </div>

                    {emailSent && (
                      <p className="font-mono text-terminal text-xs mt-3 tracking-wide">
                        // Report sent — check your inbox
                      </p>
                    )}
                    {emailError && (
                      <p className="font-mono text-gold text-xs mt-3 tracking-wide">
                        // {emailError}
                      </p>
                    )}

                    <div className="font-mono text-muted text-xs mt-4">
                      // 3 free analyses per 24 hours &middot; No account required
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
