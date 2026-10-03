"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import {
  BASE_RETAINER_MODULE,
  QUICK_BUNDLES,
  sanitizeSelectedModules,
} from "@/lib/plans";

type SelectedPlanState = {
  selectedModules: string[];
  setSelectedModules: (modules: string[]) => void;
  toggleModule: (moduleId: string) => void;
  applyPreset: (presetId: string) => void;
};

const SelectedPlanContext = createContext<SelectedPlanState | null>(null);

const DEFAULT_PRESET = QUICK_BUNDLES[0].moduleIds; // Essential Starter Pack

export function SelectedPlanProvider({ children }: { children: ReactNode }) {
  const [selectedModules, setSelectedModulesState] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const modulesParam = urlParams.get("modules");
      if (modulesParam) {
        const parsed = modulesParam.split(",").map((s) => s.trim());
        return sanitizeSelectedModules(parsed);
      }
    }
    return DEFAULT_PRESET;
  });

  const setSelectedModules = (modules: string[]) => {
    const sanitized = sanitizeSelectedModules(modules);
    setSelectedModulesState(sanitized);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("modules", sanitized.join(","));
      window.history.replaceState(null, "", url.toString());
    }
  };

  const toggleModule = (moduleId: string) => {
    if (moduleId === BASE_RETAINER_MODULE.id) return; // Base Retainer is locked & mandatory
    setSelectedModulesState((prev) => {
      const isSelected = prev.includes(moduleId);
      const next = isSelected ? prev.filter((id) => id !== moduleId) : [...prev, moduleId];
      const sanitized = sanitizeSelectedModules(next);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("modules", sanitized.join(","));
        window.history.replaceState(null, "", url.toString());
      }
      return sanitized;
    });
  };

  const applyPreset = (presetId: string) => {
    const preset = QUICK_BUNDLES.find((b) => b.id === presetId);
    if (preset) {
      setSelectedModules(preset.moduleIds);
    }
  };

  return (
    <SelectedPlanContext.Provider
      value={{
        selectedModules,
        setSelectedModules,
        toggleModule,
        applyPreset,
      }}
    >
      {children}
    </SelectedPlanContext.Provider>
  );
}

export function useSelectedPlan() {
  const ctx = useContext(SelectedPlanContext);
  if (!ctx) throw new Error("useSelectedPlan must be used inside <SelectedPlanProvider>");
  return ctx;
}
