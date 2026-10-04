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
    e.preventDefault();
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
    <Link href="/#get-started" scroll={false} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
