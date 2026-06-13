import { SparkIcon } from "@/components/ui/SparkIcon";

export function AIGeneratedBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-primary ${className}`}
    >
      <SparkIcon />
      AI-generated
    </span>
  );
}
