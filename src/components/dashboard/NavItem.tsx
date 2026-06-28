"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem as NavItemType } from "./nav-config";

interface NavItemProps {
  item: NavItemType;
  onClick?: () => void;
  collapsed?: boolean;
}

export function NavItem({ item, onClick, collapsed = false }: NavItemProps) {
  const pathname = usePathname();
  const isActive =
    item.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(item.href);

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      title={collapsed ? item.label : undefined}
      className={[
        "relative flex items-center rounded-lg py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        collapsed ? "justify-center px-0" : "gap-3 px-3",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted hover:bg-surface-card hover:text-ink",
      ].join(" ")}
    >
      {isActive && (
        <span
          aria-hidden="true"
          className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-primary"
        />
      )}
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}
