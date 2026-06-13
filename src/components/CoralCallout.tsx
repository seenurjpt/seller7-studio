import { Section } from "@/components/ui/Section";
import Link from "next/link";

export function CoralCallout() {
  return (
    <Section surface="primary" className="text-center">
      <h2 className="font-display text-[32px] font-semibold text-on-primary md:text-[44px]">
        Stop overpaying for marketing images.
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-on-primary/80">
        Start with 10 free credits and see the difference yourself. No credit
        card required — just upload and go.
      </p>
      <Link
        href="#pricing"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-canvas px-6 text-sm font-medium text-ink transition-colors hover:bg-surface-soft"
      >
        Start free — 10 images
      </Link>
    </Section>
  );
}
