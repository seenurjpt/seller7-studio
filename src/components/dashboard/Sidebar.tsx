"use client";

import { SpikeMark } from "@/components/ui/SpikeMark";
import { useOverlayState } from "@heroui/react";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { navGroups } from "./nav-config";
import { NavItem } from "./NavItem";
import { CreditsChip } from "./CreditsChip";
import { UserMenu } from "./UserMenu";

interface SidebarProps {
  drawerState: ReturnType<typeof useOverlayState>;
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

export function Sidebar({ drawerState, collapsed, onToggleCollapsed }: SidebarProps) {
  const { isOpen, close } = drawerState;

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 hidden flex-col border-r border-hairline bg-canvas transition-[width] duration-200 md:flex ${
          collapsed ? "w-[72px]" : "w-[260px]"
        }`}
      >
        <SidebarInner
          onNavClick={() => {}}
          collapsed={collapsed}
          onToggleCollapsed={onToggleCollapsed}
        />
      </aside>

      {/* Mobile off-canvas — fully controlled (no portal/inert magic) */}
      {/* Backdrop */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* Panel */}
      <aside
        aria-label="Navigation menu"
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] max-w-[85vw] flex-col border-r border-hairline bg-canvas shadow-xl transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-hairline px-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5"
            onClick={close}
          >
            <SpikeMark size={18} className="text-primary" />
            <div>
              <div className="text-sm font-semibold text-ink leading-none">Seller7</div>
              <div className="text-[10px] text-muted leading-none mt-0.5">Studio</div>
            </div>
          </Link>
          <button
            type="button"
            onClick={close}
            aria-label="Close navigation"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-soft hover:text-ink"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="min-h-0 flex-1">
          <SidebarInner onNavClick={close} isDrawer />
        </div>
      </aside>
    </>
  );
}

function SidebarInner({
  onNavClick,
  isDrawer = false,
  collapsed = false,
  onToggleCollapsed,
}: {
  onNavClick: () => void;
  isDrawer?: boolean;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Header — desktop only (drawer renders its own header).
          Fixed h-14 so its bottom border lines up with the navbar's. */}
      {!isDrawer && (
        <div className="flex h-14 shrink-0 items-center border-b border-hairline px-3">
          {!collapsed && (
            <Link
              href="/dashboard"
              className="flex min-w-0 items-center gap-3 transition-opacity hover:opacity-75"
              onClick={onNavClick}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <SpikeMark size={16} className="text-primary" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-ink leading-none tracking-tight">
                  Seller7
                </div>
                <div className="text-[10px] text-muted leading-none mt-0.5 tracking-wide uppercase">
                  Studio
                </div>
              </div>
            </Link>
          )}
          <button
            type="button"
            onClick={onToggleCollapsed}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
              collapsed ? "mx-auto" : "ml-auto"
            }`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" aria-hidden="true" />
            ) : (
              <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      )}

      {/* Navigation groups */}
      <nav
        className={`flex-1 overflow-y-auto py-4 ${collapsed ? "px-2 space-y-2" : "px-3 space-y-5"}`}
        aria-label="Dashboard navigation"
      >
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-soft">
                {group.label}
              </p>
            )}
            <ul className="flex flex-col gap-0.5" role="list">
              {group.items.map((item) => (
                <li key={item.href}>
                  <NavItem item={item} onClick={onNavClick} collapsed={collapsed} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom pinned section */}
      <div
        className={`flex flex-col gap-2 border-t border-hairline p-4 ${
          collapsed ? "items-center px-2" : ""
        }`}
      >
        <CreditsChip collapsed={collapsed} />
        <UserMenu compact={collapsed} />
      </div>
    </div>
  );
}
