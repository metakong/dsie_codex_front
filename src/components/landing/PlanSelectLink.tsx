"use client";

import type { ReactNode } from "react";
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

  const handleClick = () => {
    if (presetId) {
      applyPreset(presetId);
    } else if (modules && modules.length > 0) {
      setSelectedModules(modules);
    }
    if (typeof window !== "undefined") {
      const el = document.getElementById("get-started");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <a href="#get-started" onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
