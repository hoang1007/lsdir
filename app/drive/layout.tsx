import React from "react";
import { ViewModeProvider } from "@/components/ViewModeProvider";

export default function DriveLayout({ children }: { children: React.ReactNode }) {
  return <ViewModeProvider>{children}</ViewModeProvider>;
}
