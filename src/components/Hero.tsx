"use client";

import {
  AiBurstIcon,
  FormatsMiniGrid,
  PolishedOutputChip,
  RawUploadChip,
  StylePresetCard,
} from "@/components/hero/HeroVectors";
import { Section } from "@/components/ui/Section";
import { SpikeMark } from "@/components/ui/SpikeMark";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Palette, Upload } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type ScrollFloatProps = {
  className: string;
  delay?: number;
  from?: "left" | "right";
  children: ReactNode;
};

/** Scale wrapper — smaller on mobile, full size on desktop */
const floatScale =
  "origin-center scale-[0.5] min-[420px]:scale-[0.62] sm:scale-[0.72] md:scale-[0.85] lg:scale-100";

function ScrollFloat({
  className,
  delay = 0,
  from = "left",
  children,
}: ScrollFloatProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`absolute z-[1] ${className}`}
      initial={
        prefersReducedMotion
          ? false
          : {
              opacity: 0,
              x: from === "left" ? -20 : 20,
              y: 16,
            }
      }
      whileInView={
        prefersReducedMotion
          ? undefined
          : { opacity: 1, x: 0, y: 0 }
      }
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      <div className={floatScale}>{children}</div>
    </motion.div>
  );
}

function FloatingElements() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-visible"
      aria-hidden
    >
      {/* Organic scatter — left arc (not a straight column) */}
      <ScrollFloat from="left" className="left-[2%] top-[6%] sm:left-[6%] sm:top-[10%] md:left-[8%] md:top-[8%]" delay={0}>
        <div className="-rotate-[14deg]">
          <StylePresetCard variant="minimal" label="Minimal" />
        </div>
      </ScrollFloat>

      <ScrollFloat from="left" className="left-[14%] top-[28%] sm:left-[16%] sm:top-[32%] md:left-[18%] md:top-[30%]" delay={0.12}>
        <div className="-rotate-[6deg]">
          <RawUploadChip />
        </div>
      </ScrollFloat>

      <ScrollFloat from="left" className="left-[0%] top-[48%] sm:left-[4%] sm:top-[52%] md:left-[6%] md:top-[50%]" delay={0.22}>
        <div className="rotate-[9deg]">
          <StylePresetCard variant="premium" label="Premium" />
        </div>
      </ScrollFloat>

      <ScrollFloat from="left" className="left-[10%] top-[68%] sm:left-[12%] sm:top-[66%] md:left-[14%] md:top-[64%] max-sm:hidden" delay={0.32}>
        <div className="flex h-12 w-12 -rotate-[8deg] items-center justify-center rounded-xl border border-hairline bg-surface-card shadow-[0_6px_16px_rgba(20,20,19,0.08)]">
          <Palette className="h-5 w-5 text-primary" />
        </div>
      </ScrollFloat>

      <ScrollFloat from="left" className="left-[4%] bottom-[4%] sm:left-[8%] sm:bottom-[6%] md:left-[10%] md:bottom-[8%]" delay={0.38}>
        <div className="rotate-[4deg]">
          <PolishedOutputChip />
        </div>
      </ScrollFloat>

      {/* Organic scatter — right arc */}
      <ScrollFloat from="right" className="right-[2%] top-[4%] sm:right-[6%] sm:top-[8%] md:right-[8%] md:top-[6%]" delay={0.08}>
        <div className="rotate-[12deg]">
          <StylePresetCard variant="festive" label="Festive" />
        </div>
      </ScrollFloat>

      <ScrollFloat from="right" className="right-[16%] top-[22%] sm:right-[18%] sm:top-[24%] md:right-[20%] md:top-[22%]" delay={0.18}>
        <div className="rotate-[8deg] shadow-[0_8px_20px_rgba(204,120,92,0.35)]">
          <AiBurstIcon size={56} />
        </div>
      </ScrollFloat>

      <ScrollFloat from="right" className="right-[0%] top-[44%] sm:right-[4%] sm:top-[46%] md:right-[6%] md:top-[44%]" delay={0.28}>
        <div className="-rotate-[7deg]">
          <StylePresetCard variant="lifestyle" label="Lifestyle" />
        </div>
      </ScrollFloat>

      <ScrollFloat from="right" className="right-[12%] top-[62%] sm:right-[14%] sm:top-[60%] md:right-[16%] md:top-[58%] max-sm:hidden" delay={0.36}>
        <div className="-rotate-[4deg] shadow-[0_6px_16px_rgba(20,20,19,0.08)]">
          <FormatsMiniGrid />
        </div>
      </ScrollFloat>

      <ScrollFloat from="right" className="right-[4%] bottom-[2%] sm:right-[8%] sm:bottom-[4%] md:right-[10%] md:bottom-[6%]" delay={0.42}>
        <div className="flex h-11 w-11 rotate-[6deg] items-center justify-center rounded-xl bg-ink shadow-[0_6px_16px_rgba(20,20,19,0.2)]">
          <Upload className="h-4 w-4 text-on-dark" />
        </div>
      </ScrollFloat>
    </div>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section surface="canvas" className="overflow-x-hidden pt-28 md:pt-32">
      <div className="relative mx-auto flex min-h-[min(88vh,780px)] w-full max-w-[1040px] flex-col items-center justify-center px-4 pb-10 pt-6 sm:min-h-[min(82vh,760px)] sm:px-8 md:px-10 lg:px-12">
        <FloatingElements />

        <div className="relative z-10 flex w-full max-w-[520px] flex-col items-center sm:max-w-[540px]">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 sm:mb-8"
          >
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-primary sm:text-[11px]">
              AI Product Photos · Made in India
            </span>
          </motion.div>

          <h1 className="w-full text-center font-display font-semibold tracking-tight">
            <motion.span
              className="block text-[clamp(2rem,6.5vw,4.5rem)] leading-[1.05] text-ink"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              Product photos
            </motion.span>
            <motion.span
              className="block text-[clamp(2rem,6.5vw,4.5rem)] leading-[1.05] text-ink md:ml-[8%]"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              that feel
            </motion.span>
            <motion.span
              className="block text-[clamp(2.5rem,8.5vw,5.75rem)] leading-[0.95] text-primary md:-mt-1 md:ml-[4%]"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              effortless.
            </motion.span>
          </h1>

          <motion.p
            className="mt-6 max-w-md px-2 text-center text-sm leading-relaxed text-muted sm:mt-8 md:text-base"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Designed for Indian sellers who need scroll-stopping creatives — from
            one phone photo to marketplace-ready images in under a minute.
          </motion.p>

          <motion.div
            className="mt-6 flex w-full flex-col items-center gap-3 px-2 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <Link
              href="#pricing"
              className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-ink px-6 text-sm font-medium text-canvas transition-all hover:bg-surface-dark-elevated hover:shadow-[0_8px_24px_rgba(20,20,19,0.15)] dark:hover:bg-surface-soft sm:h-12 sm:w-auto sm:px-8"
            >
              Start free — 10 images
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary transition-transform group-hover:scale-110">
                <SpikeMark size={10} color="#ffffff" />
              </span>
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-lg border border-hairline bg-surface-card px-6 text-sm font-medium text-ink transition-colors hover:bg-surface-soft dark:border-white/10 sm:h-12 sm:w-auto"
            >
              See how it works
              <ArrowRight className="h-4 w-4 text-primary" />
            </Link>
          </motion.div>

          <motion.p
            className="mt-4 px-2 text-center text-xs text-muted-soft sm:mt-5"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            No designer. No Photoshop. Pay only for what you use.
          </motion.p>
        </div>
      </div>
    </Section>
  );
}
