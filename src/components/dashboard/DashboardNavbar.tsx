"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, Bell, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { UserAvatarButton } from "./UserMenu";
import { getNavLabel } from "./nav-config";

interface DashboardNavbarProps {
  onMenuClick: () => void;
}

export function DashboardNavbar({ onMenuClick }: DashboardNavbarProps) {
  const pathname = usePathname();
  const pageTitle = getNavLabel(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-hairline bg-canvas/95 backdrop-blur-sm px-4 md:px-6">
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-card hover:text-ink focus-visible:outline-none md:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="h-4 w-4" aria-hidden="true" />
      </button>

      {/* Page title */}
      <h1 className="flex-1 text-base font-semibold text-ink tracking-tight">
        {pageTitle}
      </h1>

      {/* Right cluster */}
      <div className="flex items-center gap-1">
        {/* New creative CTA */}
        <Link
          href="/dashboard/generate"
          className="hidden items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-on-primary transition-colors hover:bg-primary-active sm:flex"
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>New creative</span>
        </Link>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-card hover:text-ink focus-visible:outline-none"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* User avatar — mobile only (desktop shows in sidebar) */}
        <div className="md:hidden">
          <UserAvatarButton />
        </div>
      </div>
    </header>
  );
}
