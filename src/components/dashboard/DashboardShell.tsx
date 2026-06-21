"use client";

import { useOverlayState } from "@heroui/react";
import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { DashboardNavbar } from "./DashboardNavbar";

export function DashboardShell({ children }: { children: ReactNode }) {
  const sidebarState = useOverlayState();

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar drawerState={sidebarState} />

      {/* Main area: offset by sidebar width on desktop */}
      <div className="flex min-w-0 flex-1 flex-col md:pl-[260px]">
        <DashboardNavbar onMenuClick={sidebarState.toggle} />

        <main className="flex-1 overflow-y-auto p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
