"use client";

import { useOverlayState } from "@heroui/react";
import { useEffect, useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { DashboardNavbar } from "./DashboardNavbar";

const COLLAPSE_STORAGE_KEY = "sidebar-collapsed";

export function DashboardShell({ children }: { children: ReactNode }) {
  const sidebarState = useOverlayState();
  const [collapsed, setCollapsed] = useState(false);

  // Restore persisted collapse preference (client-only to avoid hydration mismatch)
  useEffect(() => {
    setCollapsed(localStorage.getItem(COLLAPSE_STORAGE_KEY) === "true");
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(COLLAPSE_STORAGE_KEY, String(next));
      return next;
    });
  };

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar
        drawerState={sidebarState}
        collapsed={collapsed}
        onToggleCollapsed={toggleCollapsed}
      />

      {/* Main area: offset by sidebar width on desktop */}
      <div
        className={`flex min-w-0 flex-1 flex-col transition-[padding] duration-200 ${
          collapsed ? "md:pl-[72px]" : "md:pl-[260px]"
        }`}
      >
        <DashboardNavbar onMenuClick={sidebarState.toggle} />

        <main className="flex-1 overflow-y-auto p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
