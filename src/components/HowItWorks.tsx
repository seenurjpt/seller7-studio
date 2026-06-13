"use client";

import { AnimateIn } from "@/components/ui/AnimateIn";
import { Section } from "@/components/ui/Section";
import { Download, Palette, Upload } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload your photo",
    body: "Snap a quick photo on your phone — any plain background works. No studio setup needed.",
  },
  {
    number: "02",
    icon: Palette,
    title: "Pick a style & brand kit",
    body: "Choose from curated templates and add your logo and brand colors once. We apply them automatically.",
  },
  {
    number: "03",
    icon: Download,
    title: "Download 4 ready creatives",
    body: "Get square, story, and banner formats — marketplace-ready in under a minute.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" surface="surface-soft">
      <AnimateIn>
        <h2 className="font-display text-[32px] font-semibold text-ink md:text-[44px]">
          How it works
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          Three steps from phone photo to marketplace-ready creatives.
        </p>
      </AnimateIn>

      <div className="relative mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {/* Connector line — desktop only */}
        <div
          className="pointer-events-none absolute top-[52px] hidden h-px md:block"
          style={{ left: "16.67%", right: "16.67%" }}
          aria-hidden
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-hairline to-transparent" />
        </div>

        {steps.map((step, i) => (
          <AnimateIn key={step.number} delay={i * 0.1}>
            <div className="group relative flex h-full flex-col rounded-xl border border-hairline bg-canvas p-8 transition-shadow hover:shadow-[0_1px_3px_rgba(20,20,19,0.08)]">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-display text-3xl font-semibold leading-none text-hairline">
                  {step.number}
                </span>
              </div>
              <h3 className="font-display mt-6 text-[22px] font-medium text-ink">
                {step.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </div>
          </AnimateIn>
        ))}
      </div>
    </Section>
  );
}
