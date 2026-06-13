"use client";

import { AnimateIn } from "@/components/ui/AnimateIn";
import { Section } from "@/components/ui/Section";
import {
  Globe,
  Image,
  Layers,
  Lightbulb,
  Package,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Background removal that actually works",
    body: "AI that handles Indian product photos — cluttered backgrounds, uneven lighting, and all.",
  },
  {
    icon: Layers,
    title: "Your brand, applied automatically",
    body: "Upload your logo and pick brand colors once. Every creative gets your identity baked in.",
  },
  {
    icon: Lightbulb,
    title: "Studio-quality lighting",
    body: "Professional shadows, highlights, and color grading — without a studio or a photographer.",
  },
  {
    icon: Image,
    title: "Marketplace-ready sizes",
    body: "Square, story, banner, and catalog formats sized for Amazon, Flipkart, Meesho, and Instagram.",
  },
  {
    icon: Package,
    title: "Bulk mode",
    body: "Process entire catalogs at once. Upload a folder, get hundreds of creatives back.",
    badge: "SOON",
  },
  {
    icon: Globe,
    title: "Made for Indian products & pricing",
    body: "Templates tuned for Indian categories — spices, textiles, handicrafts, cosmetics, and more.",
  },
];

export function Features() {
  return (
    <Section id="features" surface="surface-card">
      <AnimateIn>
        <h2 className="font-display text-[32px] font-semibold text-ink md:text-[44px]">
          Everything you need to sell online
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          Professional product photography, without the professional price tag.
        </p>
      </AnimateIn>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <AnimateIn key={feature.title} delay={i * 0.08}>
            <div className="group rounded-xl bg-canvas p-8 transition-shadow hover:shadow-[0_1px_3px_rgba(20,20,19,0.08)]">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-card">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                {feature.badge && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-on-primary">
                    {feature.badge}
                  </span>
                )}
              </div>
              <h3 className="font-display mt-5 text-[22px] font-medium text-ink">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{feature.body}</p>
            </div>
          </AnimateIn>
        ))}
      </div>
    </Section>
  );
}
