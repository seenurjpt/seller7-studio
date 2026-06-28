"use client";

import { Zap } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export function CreditsChip({
  collapsed = false,
}: {
  collapsed?: boolean;
}) {
  const { user } = useAuth();
  const credits = user?.credits ?? 0;

  if (collapsed) {
    return (
      <div
        className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-surface-soft text-muted"
        title={`${credits} credits`}
        aria-label={`${credits} credits`}
      >
        <Zap className="h-4 w-4 text-primary" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-hairline bg-surface-soft px-3 py-1.5 text-xs font-medium text-muted">
      <Zap className="h-3.5 w-3.5 text-primary" />
      <span>{credits} credits</span>
    </div>
  );
}
