import { Zap } from "lucide-react";

export function CreditsChip({ credits = 7 }: { credits?: number }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-hairline bg-surface-soft px-3 py-1.5 text-xs font-medium text-muted">
      <Zap className="h-3.5 w-3.5 text-primary" />
      <span>{credits} credits</span>
    </div>
  );
}
