"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
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

const DEFAULT_PRESET = QUICK_BUNDLES[0].moduleIds; // Starter Team Pack

/*
 * Hydration-safe URL reading: the server snapshot is always "" (default preset), so the
 * server HTML and the first client render match. React then re-renders with the real
 * `window.location.search`, applying any shared `?modules=` link without a mismatch.
 */
const subscribeNoop = () => () => {};
const getClientSearch = () => window.location.search;
const getServerSearch = () => "";

function syncUrl(modules: string[]) {
  const url = new URL(window.location.href);
  url.searchParams.set("modules", modules.join(","));
  window.history.replaceState(null, "", url.toString());
}

export function SelectedPlanProvider({ children }: { children: ReactNode }) {
  const search = useSyncExternalStore(subscribeNoop, getClientSearch, getServerSearch);

  const urlModules = useMemo(() => {
    const param = new URLSearchParams(search).get("modules");
    return param ? sanitizeSelectedModules(param.split(",").map((s) => s.trim())) : null;
  }, [search]);

  // null until the visitor makes a choice; until then fall back to the URL or default preset.
  const [userModules, setUserModules] = useState<string[] | null>(null);
  const selectedModules = userModules ?? urlModules ?? DEFAULT_PRESET;

  const setSelectedModules = (modules: string[]) => {
    const sanitized = sanitizeSelectedModules(modules);
    setUserModules(sanitized);
    syncUrl(sanitized);
  };

  const toggleModule = (moduleId: string) => {
    if (moduleId === BASE_RETAINER_MODULE.id) return; // Base Retainer is locked & mandatory
    const next = selectedModules.includes(moduleId)
      ? selectedModules.filter((id) => id !== moduleId)
      : [...selectedModules, moduleId];
    setSelectedModules(next);
  };

  const applyPreset = (presetId: string) => {
    const preset = QUICK_BUNDLES.find((b) => b.id === presetId);
    if (preset) setSelectedModules(preset.moduleIds);
  };

  return (
    <SelectedPlanContext.Provider value={{ selectedModules, setSelectedModules, toggleModule, applyPreset }}>
      {children}
    </SelectedPlanContext.Provider>
  );
}

export function useSelectedPlan() {
  const ctx = useContext(SelectedPlanContext);
  if (!ctx) throw new Error("useSelectedPlan must be used inside <SelectedPlanProvider>");
  return ctx;
}
