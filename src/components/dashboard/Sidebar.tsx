"use client";

import { SpikeMark } from "@/components/ui/SpikeMark";
import { Drawer, Separator, useOverlayState } from "@heroui/react";
import Link from "next/link";
import { navGroups } from "./nav-config";
import { NavItem } from "./NavItem";
import { CreditsChip } from "./CreditsChip";
import { UserMenu } from "./UserMenu";

interface SidebarProps {
  drawerState: ReturnType<typeof useOverlayState>;
}

export function Sidebar({ drawerState }: SidebarProps) {
  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[260px] flex-col border-r border-hairline bg-canvas md:flex">
        <SidebarInner onNavClick={() => {}} />
      </aside>

      {/* Mobile drawer (off-canvas) */}
      <Drawer.Root state={drawerState}>
        <Drawer.Backdrop isDismissable />
        <Drawer.Content placement="left" className="w-[260px] max-w-[85vw]">
          <Drawer.Dialog>
            <Drawer.Header className="flex items-center justify-between border-b border-hairline px-4 py-4">
              <Drawer.Heading className="sr-only">Navigation menu</Drawer.Heading>
              <Link href="/dashboard" className="flex items-center gap-2.5">
                <SpikeMark size={18} className="text-primary" />
                <div>
                  <div className="text-sm font-semibold text-ink leading-none">Seller7</div>
                  <div className="text-[10px] text-muted leading-none mt-0.5">Studio</div>
                </div>
              </Link>
              <Drawer.CloseTrigger
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-soft hover:text-ink"
                aria-label="Close navigation"
              />
            </Drawer.Header>
            <Drawer.Body className="flex flex-col gap-0 overflow-y-auto p-0">
              <SidebarInner onNavClick={drawerState.close} isDrawer />
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
}

function SidebarInner({
  onNavClick,
  isDrawer = false,
}: {
  onNavClick: () => void;
  isDrawer?: boolean;
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo — desktop only (drawer has it in header) */}
      {!isDrawer && (
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-5 py-5 transition-opacity hover:opacity-75"
          onClick={onNavClick}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <SpikeMark size={16} className="text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold text-ink leading-none tracking-tight">
              Seller7
            </div>
            <div className="text-[10px] text-muted leading-none mt-0.5 tracking-wide uppercase">
              Studio
            </div>
          </div>
        </Link>
      )}

      <Separator className="mx-4 bg-hairline" />

      {/* Navigation groups */}
      <nav
        className="flex-1 overflow-y-auto px-3 py-4 space-y-5"
        aria-label="Dashboard navigation"
      >
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-soft">
              {group.label}
            </p>
            <ul className="flex flex-col gap-0.5" role="list">
              {group.items.map((item) => (
                <li key={item.href}>
                  <NavItem item={item} onClick={onNavClick} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom pinned section */}
      <Separator className="mx-4 bg-hairline" />
      <div className="flex flex-col gap-2 p-4">
        <CreditsChip />
        <UserMenu />
      </div>
    </div>
  );
}
