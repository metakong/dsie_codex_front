"use client";

import type { ReactNode } from "react";
import type { Interest } from "@/lib/plans";
import { useSelectedPlan } from "./SelectedPlanContext";

/** Anchor that pre-selects a plan in the intake form, syncs URL query, then scrolls to #get-started. */
export default function PlanSelectLink({
  interest,
  className,
  children,
}: {
  interest: Interest;
  className?: string;
  children: ReactNode;
}) {
  const { setInterest } = useSelectedPlan();

  const handleClick = () => {
    setInterest(interest);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("plan", interest);
      url.hash = "get-started";
      window.history.replaceState(null, "", url.toString());
    }
  };

  return (
    <a href="#get-started" onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
