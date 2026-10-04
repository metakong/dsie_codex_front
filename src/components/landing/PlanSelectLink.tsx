"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useSelectedPlan } from "./SelectedPlanContext";

/** Anchor that pre-selects modules/presets, then scrolls to #get-started. */
export default function PlanSelectLink({
  presetId,
  modules,
  className,
  children,
}: {
  presetId?: string;
  modules?: string[];
  className?: string;
  children: ReactNode;
}) {
  const { applyPreset, setSelectedModules } = useSelectedPlan();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (presetId) {
      applyPreset(presetId);
    } else if (modules && modules.length > 0) {
      setSelectedModules(modules);
    }
    if (typeof window !== "undefined") {
      const el = document.getElementById("get-started");
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", "/#get-started");
      }
    }
  };

  return (
    <Link href="/#get-started" onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
