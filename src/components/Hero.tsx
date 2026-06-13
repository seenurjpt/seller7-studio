"use client";

import { AIGeneratedBadge } from "@/components/ui/AIGeneratedBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Section } from "@/components/ui/Section";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function BeforePanel() {
  return (
    <div className="relative flex-1 overflow-hidden rounded-lg bg-[#d4cfc4] p-4">
      {/* Messy background simulation */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-2 left-3 h-8 w-12 rounded bg-[#b8b0a0]" />
        <div className="absolute bottom-4 right-2 h-6 w-16 rounded bg-[#c5bdb0]" />
        <div className="absolute top-1/2 left-1/4 h-4 w-4 rounded-full bg-[#a09888]" />
      </div>
      {/* Plain product box */}
      <div className="relative flex h-full min-h-[140px] items-center justify-center">
        <div className="h-20 w-16 rounded-md bg-[#a8a29e] shadow-sm">
          <div className="mt-2 h-1.5 w-10 mx-auto rounded bg-[#8a8580]" />
          <div className="mt-1.5 h-1 w-8 mx-auto rounded bg-[#8a8580]" />
        </div>
      </div>
      <span className="absolute bottom-2 left-2 rounded bg-black/30 px-2 py-0.5 text-[10px] font-medium text-white">
        Your photo
      </span>
    </div>
  );
}

function AfterPanel() {
  return (
    <div className="relative flex-1 overflow-hidden rounded-lg p-4">
      {/* Branded gradient backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #2d2926 0%, #4a3f38 40%, #cc785c33 100%)",
        }}
      />
      {/* Product clean */}
      <div className="relative flex h-full min-h-[140px] items-center justify-center">
        <div className="h-20 w-16 rounded-md bg-gradient-to-b from-[#e8e4df] to-[#d4cfc8] shadow-lg">
          <div className="mt-2 h-1.5 w-10 mx-auto rounded bg-[#cc785c]/60" />
          <div className="mt-1.5 h-1 w-8 mx-auto rounded bg-[#cc785c]/40" />
        </div>
      </div>
      {/* Logo chip */}
      <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5">
        <div className="h-2 w-2 rounded-full bg-primary" />
        <span className="text-[8px] font-medium text-[#141413]">YourBrand</span>
      </div>
      {/* Price tag */}
      <div className="absolute bottom-2 right-2 rounded bg-primary px-2 py-0.5 text-[10px] font-medium text-white">
        ₹499
      </div>
      <span className="absolute bottom-2 left-2 rounded bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white">
        Seller7 Studio
      </span>
      <AIGeneratedBadge className="absolute top-2 right-2" />
    </div>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section surface="canvas" className="pt-28 md:pt-32">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <AnimateIn>
          <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-primary">
            AI Product Photos · Made in India
          </div>
          <h1 className="font-display mt-5 text-[36px] font-semibold leading-[1.1] text-ink md:text-[56px] lg:text-[64px]">
            Turn one product photo into scroll-stopping marketing.
          </h1>
          <p className="mt-5 max-w-lg text-body">
            Upload a single plain product photo and get multiple designer-quality
            creatives — clean background, your logo, branded layout — in under a
            minute. AI that designs like a pro, priced like a tool — without
            overpaying for freelancers or agencies.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#pricing"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-on-primary transition-colors hover:bg-primary-active"
            >
              Start free — 10 images
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-hairline bg-transparent px-6 text-sm font-medium text-ink transition-colors hover:bg-surface-card"
            >
              See how it works
            </Link>
          </div>
          <p className="mt-5 text-sm text-muted">
            No designer. No Photoshop. Pay only for what you use.
          </p>
        </AnimateIn>

        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
          transition={
            prefersReducedMotion
              ? {}
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
          className="rounded-2xl border border-hairline bg-surface-card p-3 shadow-[0_1px_3px_rgba(20,20,19,0.08)]"
        >
          <div className="flex items-stretch gap-2">
            <BeforePanel />
            <div className="flex items-center">
              <ArrowRight className="h-5 w-5 shrink-0 text-primary" />
            </div>
            <AfterPanel />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
