"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { normalizeInterest, type Interest } from "@/lib/plans";

type SelectedPlanState = {
  interest: Interest;
  setInterest: (interest: Interest) => void;
};

const SelectedPlanContext = createContext<SelectedPlanState | null>(null);

export function SelectedPlanProvider({ children }: { children: ReactNode }) {
  const [interest, setInterest] = useState<Interest>(() => {
    if (typeof window !== "undefined") {
      const planParam = new URLSearchParams(window.location.search).get("plan");
      if (planParam) {
        return normalizeInterest(planParam);
      }
    }
    return "checkup";
  });

  return (
    <SelectedPlanContext.Provider value={{ interest, setInterest }}>
      {children}
    </SelectedPlanContext.Provider>
  );
}

export function useSelectedPlan() {
  const ctx = useContext(SelectedPlanContext);
  if (!ctx) throw new Error("useSelectedPlan must be used inside <SelectedPlanProvider>");
  return ctx;
}
