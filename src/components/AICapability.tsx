"use client";

import { AnimateIn } from "@/components/ui/AnimateIn";
import { Section } from "@/components/ui/Section";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const REASONING_LINES = [
  { text: "Detected: glass cosmetic jar", delay: 0 },
  { text: "Suggested scene: soft marble, warm light", delay: 800 },
  { text: "Brand palette matched: #cc785c", delay: 1600 },
  { text: "Layout: rule-of-thirds, logo top-left", delay: 2400 },
  { text: "Generating 4 format variants…", delay: 3200 },
  { text: "✓ Ready for export", delay: 4000 },
];

const STATS = [
  { value: "4 designs in ~30s", color: "text-primary" },
  { value: "Background removal 99% clean", color: "text-accent-teal" },
  { value: "20+ AI styles", color: "text-primary" },
  { value: "Trained for Indian products", color: "text-accent-teal" },
];

function AIThinkingLog() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState<number>(
    prefersReducedMotion ? REASONING_LINES.length : 0
  );

  useEffect(() => {
    if (prefersReducedMotion || !isInView) {
      if (prefersReducedMotion) setVisibleLines(REASONING_LINES.length);
      return;
    }

    const timers = REASONING_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [isInView, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className="rounded-xl border border-white/5 bg-surface-dark-elevated p-5 font-mono text-xs leading-relaxed"
    >
      <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-3">
        <div className="h-2 w-2 rounded-full bg-accent-teal animate-pulse" />
        <span className="text-on-dark-soft">AI reasoning</span>
        <span className="ml-auto text-[10px] text-on-dark-soft/60">live</span>
      </div>
      <div className="space-y-2 min-h-[140px]">
        {REASONING_LINES.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={line.text}
            initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start gap-2 ${
              i === visibleLines - 1 && !prefersReducedMotion
                ? "text-accent-teal"
                : "text-on-dark-soft"
            }`}
          >
            <span className="text-on-dark-soft/40 select-none">&gt;</span>
            <span>{line.text}</span>
          </motion.div>
        ))}
        {visibleLines < REASONING_LINES.length && !prefersReducedMotion && (
          <span className="inline-block h-3.5 w-1.5 animate-pulse bg-accent-teal/60" />
        )}
      </div>
    </div>
  );
}

export function AICapability() {
  return (
    <Section surface="surface-dark" id="ai-capability">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <AnimateIn>
          <h2 className="font-display text-[32px] font-semibold text-on-dark md:text-[44px]">
            Real AI, doing real design work.
          </h2>
          <p className="mt-4 text-on-dark-soft">
            Seller7 Studio isn&apos;t a filter — it&apos;s a smart hybrid that
            understands your product, generates context-aware scenes, and applies
            your brand with precision.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-on-dark-soft">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Understands product type, material, and category context
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-teal" />
              Generates scenes that match your product — not generic stock backdrops
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Applies your logo and brand colors with pixel-perfect layout
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-teal" />
              Never garbles text — typography and placement done precisely
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-2">
            {STATS.map((stat) => (
              <span
                key={stat.value}
                className={`rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium ${stat.color}`}
              >
                {stat.value}
              </span>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <AIThinkingLog />
        </AnimateIn>
      </div>
    </Section>
  );
}
