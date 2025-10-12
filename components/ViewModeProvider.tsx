"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ViewMode = "grid" | "list";

const ViewModeContext = createContext<{
  view: ViewMode;
  setView: (v: ViewMode) => void;
} | null>(null);

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<ViewMode>(() => {
    try {
      const stored = localStorage.getItem("lsdir.view");
      if (stored === "grid" || stored === "list") return stored as ViewMode;
    } catch {
      // ignore
    }
    return "grid";
  });

  useEffect(() => {
    try {
      localStorage.setItem("lsdir.view", view);
    } catch {
      // ignore
    }
  }, [view]);

  return (
    <ViewModeContext.Provider value={{ view, setView }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const ctx = useContext(ViewModeContext);
  if (!ctx) throw new Error("useViewMode must be used within a ViewModeProvider");
  return ctx;
}
