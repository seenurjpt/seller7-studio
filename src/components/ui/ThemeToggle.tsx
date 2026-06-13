"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted ${className}`}
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-card hover:text-ink ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun
        className={`h-4 w-4 transition-all duration-300 ${isDark ? "scale-0 opacity-0" : "scale-100 opacity-100"} absolute`}
      />
      <Moon
        className={`h-4 w-4 transition-all duration-300 ${isDark ? "scale-100 opacity-100" : "scale-0 opacity-0"} absolute`}
      />
    </button>
  );
}
