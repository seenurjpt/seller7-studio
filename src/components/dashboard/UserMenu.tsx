"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, Dropdown } from "@heroui/react";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function UserMenu({ compact = false }: { compact?: boolean }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const isDark = mounted && resolvedTheme === "dark";
  const initials = user?.name ? getInitials(user.name) : "U";

  return (
    <Dropdown.Root>
      <Dropdown.Trigger
        className="flex w-full items-center gap-2.5 rounded-lg p-2 text-left transition-colors hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label="Open user menu"
      >
        <Avatar size="sm">
          <Avatar.Fallback className="bg-primary/15 text-xs font-semibold text-primary">
            {initials}
          </Avatar.Fallback>
        </Avatar>
        {!compact && user && (
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-ink">{user.name}</div>
            <div className="truncate text-xs text-muted">{user.email}</div>
          </div>
        )}
      </Dropdown.Trigger>
      <Dropdown.Popover placement="top">
        <Dropdown.Menu>
          <Dropdown.Item
            id="profile"
            onAction={() => router.push("/dashboard/settings")}
            textValue="Profile"
          >
            <span className="flex items-center gap-2">
              <User className="h-4 w-4 shrink-0" />
              Profile
            </span>
          </Dropdown.Item>
          <Dropdown.Item
            id="settings"
            onAction={() => router.push("/dashboard/settings")}
            textValue="Settings"
          >
            <span className="flex items-center gap-2">
              <Settings className="h-4 w-4 shrink-0" />
              Settings
            </span>
          </Dropdown.Item>
          <Dropdown.Item
            id="theme"
            onAction={() => setTheme(isDark ? "light" : "dark")}
            textValue="Toggle theme"
          >
            <span className="flex items-center gap-2">
              {isDark ? (
                <Sun className="h-4 w-4 shrink-0" />
              ) : (
                <Moon className="h-4 w-4 shrink-0" />
              )}
              {isDark ? "Light mode" : "Dark mode"}
            </span>
          </Dropdown.Item>
          <Dropdown.Item
            id="logout"
            onAction={handleLogout}
            textValue="Log out"
          >
            <span className="flex items-center gap-2">
              <LogOut className="h-4 w-4 shrink-0" />
              Log out
            </span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}

export function UserAvatarButton({ compact = false }: { compact?: boolean }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const isDark = mounted && resolvedTheme === "dark";
  const initials = user?.name ? getInitials(user.name) : "U";

  return (
    <Dropdown.Root>
      <Dropdown.Trigger
        className="flex items-center justify-center rounded-full transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label="Open user menu"
      >
        <Avatar size="sm">
          <Avatar.Fallback className="bg-primary/15 text-xs font-semibold text-primary">
            {initials}
          </Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>
      <Dropdown.Popover placement="bottom end">
        <Dropdown.Menu>
          <Dropdown.Item
            id="profile"
            onAction={() => router.push("/dashboard/settings")}
            textValue="Profile"
          >
            <span className="flex items-center gap-2">
              <User className="h-4 w-4 shrink-0" />
              Profile
            </span>
          </Dropdown.Item>
          <Dropdown.Item
            id="settings"
            onAction={() => router.push("/dashboard/settings")}
            textValue="Settings"
          >
            <span className="flex items-center gap-2">
              <Settings className="h-4 w-4 shrink-0" />
              Settings
            </span>
          </Dropdown.Item>
          <Dropdown.Item
            id="theme"
            onAction={() => setTheme(isDark ? "light" : "dark")}
            textValue="Toggle theme"
          >
            <span className="flex items-center gap-2">
              {isDark ? (
                <Sun className="h-4 w-4 shrink-0" />
              ) : (
                <Moon className="h-4 w-4 shrink-0" />
              )}
              {isDark ? "Light mode" : "Dark mode"}
            </span>
          </Dropdown.Item>
          <Dropdown.Item
            id="logout"
            onAction={handleLogout}
            textValue="Log out"
          >
            <span className="flex items-center gap-2">
              <LogOut className="h-4 w-4 shrink-0" />
              Log out
            </span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}
