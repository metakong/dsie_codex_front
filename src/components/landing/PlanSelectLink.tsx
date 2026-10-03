"use client";

import type { ReactNode } from "react";
import type { Interest } from "@/lib/plans";
import { useSelectedPlan } from "./SelectedPlanContext";

/** Anchor that pre-selects a plan in the intake form, then scrolls to it. */
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
  return (
    <a href="#get-started" onClick={() => setInterest(interest)} className={className}>
      {children}
    </a>
  );
}
