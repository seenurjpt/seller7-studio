import {
  Home,
  Sparkles,
  Images,
  Palette,
  CreditCard,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Generate", href: "/dashboard/generate", icon: Sparkles },
  { label: "My Creatives", href: "/dashboard/library", icon: Images },
  { label: "Brand Kit", href: "/dashboard/brand-kit", icon: Palette },
  { label: "Credits & Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const navGroups: NavGroup[] = [
  {
    label: "Workspace",
    items: [
      { label: "Home", href: "/dashboard", icon: Home },
      { label: "Generate", href: "/dashboard/generate", icon: Sparkles },
      { label: "My Creatives", href: "/dashboard/library", icon: Images },
      { label: "Brand Kit", href: "/dashboard/brand-kit", icon: Palette },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Credits & Billing", href: "/dashboard/billing", icon: CreditCard },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

export function getNavLabel(pathname: string): string {
  if (pathname === "/dashboard") return "Home";
  for (const item of navItems) {
    if (item.href !== "/dashboard" && pathname.startsWith(item.href)) {
      return item.label;
    }
  }
  return "Dashboard";
}
