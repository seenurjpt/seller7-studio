import Link from "next/link";
import { SpikeMark } from "@/components/ui/SpikeMark";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

type AuthHeaderProps = {
  alternateHref: string;
  alternateLabel: string;
};

export function AuthHeader({ alternateHref, alternateLabel }: AuthHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4">
      <Link href="/" className="flex items-center gap-2.5 shrink-0">
        <SpikeMark size={22} className="text-ink" />
        <span className="text-sm font-medium tracking-tight text-ink">
          Seller7 Studio
        </span>
      </Link>

      <div className="flex items-center gap-3 sm:gap-5">
        <Link
          href="/"
          className="hidden text-sm text-muted transition-colors hover:text-ink sm:inline"
        >
          Home
        </Link>
        <Link
          href={alternateHref}
          className="text-sm text-muted transition-colors hover:text-ink"
        >
          {alternateLabel}
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
