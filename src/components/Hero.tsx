"use client";

import {
  AiBurstIcon,
  FormatsMiniGrid,
  PolishedOutputChip,
  RawUploadChip,
  StylePresetCard,
} from "@/components/hero/HeroVectors";
import { SpikeMark } from "@/components/ui/SpikeMark";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, ChevronDown, Palette, Upload } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

function useCompactHero() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return compact;
}

type ScrollFloatProps = {
  className: string;
  delay?: number;
  from?: "left" | "right";
  depth: number;
  scrollYProgress: MotionValue<number>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  parallaxOff: boolean;
  compact: boolean;
  size?: "card" | "chip";
  children: ReactNode;
};

const floatScaleCard =
  "origin-center scale-[0.38] max-[380px]:scale-[0.32] min-[420px]:scale-[0.44] sm:scale-[0.72] md:scale-[0.85] lg:scale-100";

const floatScaleChip =
  "origin-center scale-[0.28] max-[380px]:scale-[0.24] min-[420px]:scale-[0.32] sm:scale-[0.62] md:scale-[0.78] lg:scale-100";

/** Desktop parallax */
const PARALLAX_Y = 320;
const PARALLAX_X = 72;
const MOUSE_X = 28;
const MOUSE_Y = 22;

/** Tighter parallax on mobile — less drift, less overlap risk */
const PARALLAX_Y_COMPACT = 80;
const PARALLAX_X_COMPACT = 20;

function ScrollFloat({
  className,
  delay = 0,
  from = "left",
  depth,
  scrollYProgress,
  mouseX,
  mouseY,
  parallaxOff,
  compact,
  size = "card",
  children,
}: ScrollFloatProps) {
  const parallaxY = compact ? PARALLAX_Y_COMPACT : PARALLAX_Y;
  const parallaxX = compact ? PARALLAX_X_COMPACT : PARALLAX_X;
  const mouseXAmount = compact ? 0 : MOUSE_X;
  const mouseYAmount = compact ? 0 : MOUSE_Y;

  const scrollY = useTransform(scrollYProgress, [0, 1], [0, -parallaxY * depth]);
  const scrollX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, (from === "left" ? -1 : 1) * parallaxX * depth]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1 - (compact ? 0.04 : 0.1) * depth]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, (from === "left" ? -1 : 1) * (compact ? 4 : 8) * depth]
  );
  const pointerX = useTransform(
    mouseX,
    [-1, 1],
    [
      (from === "left" ? -1 : 1) * mouseXAmount * depth,
      (from === "left" ? 1 : -1) * mouseXAmount * depth,
    ]
  );
  const pointerY = useTransform(
    mouseY,
    [-1, 1],
    [-mouseYAmount * depth, mouseYAmount * depth]
  );
  const x = useTransform([scrollX, pointerX], ([sx, px]) => (sx as number) + (px as number));
  const y = useTransform([scrollY, pointerY], ([sy, py]) => (sy as number) + (py as number));

  return (
    <motion.div
      className={`absolute z-[1] will-change-transform ${className}`}
      style={
        parallaxOff ? undefined : { y, x, scale, rotate, transformOrigin: "center" }
      }
      initial={parallaxOff ? false : { opacity: 0 }}
      whileInView={parallaxOff ? undefined : { opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      <div className={size === "chip" ? floatScaleChip : floatScaleCard}>
        {children}
      </div>
    </motion.div>
  );
}

type FloatingElementsProps = {
  scrollYProgress: MotionValue<number>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  parallaxOff: boolean;
  compact: boolean;
};

function FloatingElements({
  scrollYProgress,
  mouseX,
  mouseY,
  parallaxOff,
  compact,
}: FloatingElementsProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-visible"
      aria-hidden
    >
      <ScrollFloat
        from="left"
        depth={0.55}
        scrollYProgress={scrollYProgress}
        mouseX={mouseX}
        mouseY={mouseY}
        parallaxOff={parallaxOff}
        compact={compact}
        className="-left-3 top-[2%] md:left-[8%] md:top-[8%]"
        delay={0}
      >
        <div className="-rotate-[14deg]">
          <StylePresetCard variant="minimal" label="Minimal" />
        </div>
      </ScrollFloat>

      <ScrollFloat
        from="left"
        depth={0.75}
        size="chip"
        scrollYProgress={scrollYProgress}
        mouseX={mouseX}
        mouseY={mouseY}
        parallaxOff={parallaxOff}
        compact={compact}
        className="-left-2 top-[15%] sm:left-[16%] sm:top-[32%] md:left-[18%] md:top-[30%]"
        delay={0.12}
      >
        <div className="-rotate-[6deg]">
          <RawUploadChip />
        </div>
      </ScrollFloat>

      <ScrollFloat
        from="left"
        depth={0.45}
        scrollYProgress={scrollYProgress}
        mouseX={mouseX}
        mouseY={mouseY}
        parallaxOff={parallaxOff}
        compact={compact}
        className="-left-6 bottom-[2%] top-auto sm:left-[4%] sm:top-[52%] sm:bottom-auto md:left-[6%] md:top-[50%]"
        delay={0.22}
      >
        <div className="rotate-[9deg]">
          <StylePresetCard variant="premium" label="Premium" />
        </div>
      </ScrollFloat>

      <ScrollFloat
        from="left"
        depth={0.9}
        size="chip"
        scrollYProgress={scrollYProgress}
        mouseX={mouseX}
        mouseY={mouseY}
        parallaxOff={parallaxOff}
        compact={compact}
        className="-left-7 top-[46%] md:left-[14%] md:top-[64%]"
        delay={0.32}
      >
        <div className="flex h-12 w-12 -rotate-[8deg] items-center justify-center rounded-xl border border-hairline bg-surface-card shadow-[0_6px_16px_rgba(20,20,19,0.08)]">
          <Palette className="h-5 w-5 text-primary" />
        </div>
      </ScrollFloat>

      <ScrollFloat
        from="left"
        depth={1}
        size="chip"
        scrollYProgress={scrollYProgress}
        mouseX={mouseX}
        mouseY={mouseY}
        parallaxOff={parallaxOff}
        compact={compact}
        className="left-0 bottom-[0.5%] sm:left-[8%] sm:bottom-[6%] md:left-[10%] md:bottom-[8%]"
        delay={0.38}
      >
        <div className="rotate-[4deg]">
          <PolishedOutputChip />
        </div>
      </ScrollFloat>

      <ScrollFloat
        from="right"
        depth={0.5}
        scrollYProgress={scrollYProgress}
        mouseX={mouseX}
        mouseY={mouseY}
        parallaxOff={parallaxOff}
        compact={compact}
        className="-right-3 top-[2%] md:right-[8%] md:top-[6%]"
        delay={0.08}
      >
        <div className="rotate-[12deg]">
          <StylePresetCard variant="festive" label="Festive" />
        </div>
      </ScrollFloat>

      <ScrollFloat
        from="right"
        depth={0.65}
        size="chip"
        scrollYProgress={scrollYProgress}
        mouseX={mouseX}
        mouseY={mouseY}
        parallaxOff={parallaxOff}
        compact={compact}
        className="-right-2 top-[14%] sm:right-[18%] sm:top-[24%] md:right-[20%] md:top-[22%]"
        delay={0.18}
      >
        <div className="rotate-[8deg] shadow-[0_8px_20px_rgba(204,120,92,0.35)]">
          <AiBurstIcon size={48} />
        </div>
      </ScrollFloat>

      <ScrollFloat
        from="right"
        depth={0.4}
        scrollYProgress={scrollYProgress}
        mouseX={mouseX}
        mouseY={mouseY}
        parallaxOff={parallaxOff}
        compact={compact}
        className="-right-6 bottom-[2%] top-auto sm:right-[4%] sm:top-[46%] sm:bottom-auto md:right-[6%] md:top-[44%]"
        delay={0.28}
      >
        <div className="-rotate-[7deg]">
          <StylePresetCard variant="lifestyle" label="Lifestyle" />
        </div>
      </ScrollFloat>

      <ScrollFloat
        from="right"
        depth={0.85}
        size="chip"
        scrollYProgress={scrollYProgress}
        mouseX={mouseX}
        mouseY={mouseY}
        parallaxOff={parallaxOff}
        compact={compact}
        className="-right-7 top-[44%] sm:right-[14%] sm:top-[60%] md:right-[16%] md:top-[58%]"
        delay={0.36}
      >
        <div className="-rotate-[4deg] shadow-[0_6px_16px_rgba(20,20,19,0.08)]">
          <FormatsMiniGrid />
        </div>
      </ScrollFloat>

      <ScrollFloat
        from="right"
        depth={1}
        size="chip"
        scrollYProgress={scrollYProgress}
        mouseX={mouseX}
        mouseY={mouseY}
        parallaxOff={parallaxOff}
        compact={compact}
        className="right-0 bottom-[0.5%] sm:right-[8%] sm:bottom-[4%] md:right-[10%] md:bottom-[6%]"
        delay={0.42}
      >
        <div className="flex h-11 w-11 rotate-[6deg] items-center justify-center rounded-xl bg-ink text-canvas shadow-[0_6px_16px_rgba(20,20,19,0.2)]">
          <Upload className="h-4 w-4" />
        </div>
      </ScrollFloat>
    </div>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const compact = useCompactHero();
  const scrollTrackRef = useRef<HTMLElement>(null);
  const parallaxOff = !!prefersReducedMotion;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 18 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 18 });

  useEffect(() => {
    if (parallaxOff || compact) return;

    const onMove = (event: MouseEvent) => {
      mouseX.set((event.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [compact, mouseX, mouseY, parallaxOff]);

  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end end"],
  });

  const contentScrollY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, compact ? 40 : 120]
  );
  const contentPointerY = useTransform(smoothMouseY, [-1, 1], [8, -8]);
  const contentY = useTransform(
    [contentScrollY, contentPointerY],
    ([sy, py]) => (sy as number) + (py as number)
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section
      ref={scrollTrackRef}
      className="relative h-[130vh] bg-canvas sm:h-[160vh] md:h-[200vh]"
      aria-label="Hero"
    >
      <div className="sticky top-0 z-0 flex h-svh min-h-[520px] items-center justify-center overflow-hidden pt-20 sm:min-h-[560px] sm:pt-24 md:pt-28">
        <div className="relative mx-auto flex h-full w-full max-w-[1040px] items-center justify-center px-5 sm:px-8 md:px-10 lg:px-12">
          <FloatingElements
            scrollYProgress={scrollYProgress}
            mouseX={smoothMouseX}
            mouseY={smoothMouseY}
            parallaxOff={parallaxOff}
            compact={compact}
          />

          <motion.div
            className="relative z-10 flex w-full max-w-[520px] flex-col items-center px-1 will-change-transform sm:max-w-[540px] sm:px-0"
            style={
              parallaxOff
                ? undefined
                : { y: contentY, opacity: contentOpacity, scale: contentScale }
            }
          >
            <motion.div
              initial={parallaxOff ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-5 sm:mb-8"
            >
              <span className="inline-flex max-w-[min(100%,280px)] items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-center text-[9px] font-medium uppercase leading-snug tracking-wider text-primary min-[380px]:max-w-none min-[380px]:text-[10px] sm:text-[11px]">
                AI Product Photos · Made in India
              </span>
            </motion.div>

            <h1 className="w-full px-1 text-center font-display font-semibold tracking-tight sm:px-0">
              <motion.span
                className="block text-[clamp(1.85rem,8vw,4.5rem)] leading-[1.08] text-ink"
                initial={parallaxOff ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                Product photos
              </motion.span>
              <motion.span
                className="block text-[clamp(1.85rem,8vw,4.5rem)] leading-[1.08] text-ink md:ml-[8%]"
                initial={parallaxOff ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12 }}
              >
                that feel
              </motion.span>
              <motion.span
                className="block text-[clamp(2.15rem,10vw,5.75rem)] leading-[0.98] text-primary md:-mt-1 md:ml-[4%]"
                initial={parallaxOff ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                effortless.
              </motion.span>
            </h1>

            <motion.p
              className="mt-5 max-w-[20rem] px-1 text-center text-[0.8125rem] leading-relaxed text-muted sm:mt-8 sm:max-w-md sm:px-2 sm:text-sm md:text-base"
              initial={parallaxOff ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              Designed for Indian sellers who need scroll-stopping creatives — from
              one phone photo to marketplace-ready images in under a minute.
            </motion.p>

            <motion.div
              className="mt-5 flex w-full max-w-[18rem] flex-col items-stretch gap-2.5 sm:mt-8 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
              initial={parallaxOff ? false : { opacity: 0, y: 12 }}
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
              className="mt-3 max-w-[16rem] px-1 text-center text-[11px] leading-snug text-muted-soft sm:mt-5 sm:max-w-none sm:px-2 sm:text-xs"
              initial={parallaxOff ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              No designer. No Photoshop. Pay only for what you use.
            </motion.p>
          </motion.div>
        </div>

        {!parallaxOff && (
          <motion.div
            className="pointer-events-none absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted-soft sm:bottom-6 sm:flex"
            style={{ opacity: scrollHintOpacity }}
            aria-hidden
          >
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
