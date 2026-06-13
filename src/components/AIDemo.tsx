"use client";

import { AIGeneratedBadge } from "@/components/ui/AIGeneratedBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Section } from "@/components/ui/Section";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const STAGES = [
  { id: "bg", label: "Removing background" },
  { id: "scene", label: "Generating studio scene" },
  { id: "brand", label: "Applying your brand" },
  { id: "layout", label: "Composing layout" },
  { id: "done", label: "Done" },
] as const;

const STAGE_MS = 850;
const REVEAL_MS = 500;

const INPUT_IMAGE = "/assets/landing/white_tshirt.jpeg";

const PANEL_CLASS =
  "relative w-full aspect-[768/1376] max-h-[420px] overflow-hidden rounded-xl border border-hairline bg-white shadow-sm";

type StylePreset = {
  id: string;
  label: string;
  image: string;
  swatch: string;
};

const STYLE_PRESETS: StylePreset[] = [
  {
    id: "minimal",
    label: "Minimal",
    image: "/assets/landing/minimal_studio.jpeg",
    swatch: "#f5f0e8",
  },
  {
    id: "premium",
    label: "Premium",
    image: "/assets/landing/premium_black.jpeg",
    swatch: "#181715",
  },
  {
    id: "festive",
    label: "Festive",
    image: "/assets/landing/festive_diwali.jpeg",
    swatch: "#cc785c",
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    image: "/assets/landing/lifestyle_kitchen.jpeg",
    swatch: "#5db8a6",
  },
];

function PipelineStepper({
  currentStage,
  isRunning,
  isComplete,
}: {
  currentStage: number;
  isRunning: boolean;
  isComplete: boolean;
}) {
  return (
    <div className="border-b border-hairline bg-surface-soft/50 px-4 py-4 md:px-6">
      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
        {STAGES.map((stage, i) => {
          const isActive = i === currentStage && isRunning;
          const isDone =
            i < currentStage ||
            (i === currentStage && !isRunning && currentStage >= 0);
          const isLast = i === STAGES.length - 1;

          return (
            <div key={stage.id} className="flex flex-1 items-center min-w-0">
              <div className="flex flex-col items-center gap-1.5 flex-1 min-w-[72px]">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isDone
                      ? "border-success bg-success/10"
                      : isActive
                        ? "border-primary bg-primary/10 scale-110"
                        : "border-hairline bg-canvas"
                  }`}
                >
                  {isDone ? (
                    <Check className="h-3.5 w-3.5 text-success" />
                  ) : isActive ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                  ) : (
                    <span className="text-[10px] font-medium text-muted-soft">
                      {i + 1}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] md:text-[11px] text-center leading-tight transition-colors ${
                    isActive
                      ? "font-medium text-ink"
                      : isDone
                        ? "text-body"
                        : "text-muted-soft"
                  }`}
                >
                  {stage.label}
                  {isLast && isDone ? " ✨" : ""}
                </span>
              </div>
              {i < STAGES.length - 1 && (
                <div
                  className={`mx-1 h-0.5 flex-1 min-w-[12px] max-w-[40px] rounded-full transition-colors duration-500 ${
                    i < currentStage || isComplete ? "bg-success/60" : "bg-hairline"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InputPanel() {
  return (
    <div className={`${PANEL_CLASS} !bg-[#ffffff]`}>
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <Image
          src={INPUT_IMAGE}
          alt="Your plain product photo"
          width={768}
          height={1376}
          className="max-h-full max-w-full object-contain"
          priority
        />
      </div>
      <span className="absolute bottom-3 left-3 z-10 rounded-md bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white">
        Your photo
      </span>
    </div>
  );
}

function ProcessingPanel({ stageIndex }: { stageIndex: number }) {
  const stageLabel = STAGES[stageIndex]?.label ?? "Processing";

  return (
    <div className={`${PANEL_CLASS} bg-surface-dark border-white/10`}>
      {/* Grid backdrop */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Scan line */}
      <motion.div
        className="absolute inset-x-0 h-16 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent z-[2]"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Center status */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-on-dark-soft">
            AI working
          </p>
          <motion.p
            key={stageIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 font-display text-base text-on-dark"
          >
            {stageLabel}…
          </motion.p>
        </div>

        {/* Stage dots */}
        <div className="flex gap-1.5">
          {STAGES.slice(0, -1).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i <= stageIndex ? "w-4 bg-primary" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function OutputPanel({
  style,
  showResult,
  prefersReducedMotion,
}: {
  style: StylePreset;
  showResult: boolean;
  prefersReducedMotion: boolean;
}) {
  return (
    <div className={`${PANEL_CLASS} bg-surface-card`}>
      <AnimatePresence mode="wait">
        {showResult ? (
          <motion.div
            key={`result-${style.id}`}
            className="absolute inset-0"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: prefersReducedMotion ? 0 : REVEAL_MS / 1000, ease: "easeOut" }}
          >
            <Image
              src={style.image}
              alt={`${style.label} style AI-generated creative`}
              fill
              sizes="280px"
              className="object-contain p-0.5"
            />
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.25 }}
            >
              <AIGeneratedBadge className="absolute top-3 right-3 z-10 !bg-white/90 !text-primary shadow-sm" />
            </motion.div>
            {!prefersReducedMotion && (
              <motion.div
                className="pointer-events-none absolute inset-0 bg-white/40"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-dashed border-hairline bg-surface-soft">
              <Sparkles className="h-6 w-6 text-muted-soft" />
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Your marketing creative
              <br />
              appears here
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FlowArrow({ active }: { active: boolean }) {
  return (
    <div className="flex items-center justify-center shrink-0 py-2 md:py-0">
      <motion.div
        className={`flex h-10 w-10 items-center justify-center rounded-full border ${
          active
            ? "border-primary bg-primary/10 text-primary"
            : "border-hairline bg-surface-soft text-muted"
        }`}
        animate={active ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={active ? { duration: 1, repeat: Infinity } : {}}
      >
        <ArrowRight className="h-4 w-4" />
      </motion.div>
    </div>
  );
}

export function AIDemo() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeStyle, setActiveStyle] = useState(STYLE_PRESETS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const runPipeline = useCallback(() => {
    if (prefersReducedMotion) {
      setShowResult(true);
      setCurrentStage(STAGES.length - 1);
      return;
    }

    clearTimers();
    setIsRunning(true);
    setShowResult(false);
    setCurrentStage(0);
    setProgress(0);

    let stage = 0;

    const tick = () => {
      const progressPct = ((stage + 1) / STAGES.length) * 100;
      setProgress(progressPct);

      if (stage < STAGES.length - 1) {
        stage += 1;
        setCurrentStage(stage);
        const id = setTimeout(tick, STAGE_MS);
        timersRef.current.push(id);
      } else {
        setIsRunning(false);
        setProgress(100);
        const revealId = setTimeout(() => setShowResult(true), 200);
        timersRef.current.push(revealId);
      }
    };

    const startId = setTimeout(tick, STAGE_MS);
    timersRef.current.push(startId);
  }, [clearTimers, prefersReducedMotion]);

  useEffect(() => {
    if (isInView && !hasAutoPlayed) {
      setHasAutoPlayed(true);
      const id = setTimeout(runPipeline, 800);
      return () => clearTimeout(id);
    }
  }, [isInView, hasAutoPlayed, runPipeline]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const handleStyleChange = (style: StylePreset) => {
    if (isRunning) return;
    setActiveStyle(style);
    runPipeline();
  };

  const isComplete = showResult && !isRunning;
  const hasStarted = currentStage >= 0;
  const showProcessing =
    !prefersReducedMotion && hasStarted && !showResult;

  return (
    <Section surface="surface-soft" id="ai-demo">
      <div ref={sectionRef}>
        <AnimateIn>
          <h2 className="font-display text-[32px] font-semibold text-ink md:text-[44px]">
            Watch the AI turn a snapshot into a sale.
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            See how Seller7 Studio transforms a plain phone photo into a
            polished marketing creative — in seconds.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-hairline bg-canvas shadow-[0_1px_3px_rgba(20,20,19,0.08)]">
            {/* App chrome */}
            <div className="flex items-center gap-2 border-b border-hairline bg-surface-soft/80 px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-hairline" />
                <div className="h-2.5 w-2.5 rounded-full bg-hairline" />
                <div className="h-2.5 w-2.5 rounded-full bg-hairline" />
              </div>
              <span className="mx-auto text-[11px] font-mono text-muted">
                seller7.in/generate
              </span>
            </div>

            {/* Progress bar — synced to stages */}
            {!prefersReducedMotion && hasStarted && (
              <div className="h-1 w-full bg-hairline">
                <motion.div
                  className="h-full bg-primary"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            )}

            {/* Stepper — visible once pipeline starts */}
            {!prefersReducedMotion && hasStarted && (
              <PipelineStepper
                currentStage={currentStage}
                isRunning={isRunning}
                isComplete={isComplete}
              />
            )}

            {/* Workspace */}
            <div className="grid grid-cols-1 items-center gap-3 p-4 md:grid-cols-[1fr_auto_1fr] md:gap-4 md:p-6">
              <div className="mx-auto w-full max-w-[260px] md:max-w-none">
                <InputPanel />
              </div>

              <FlowArrow active={showProcessing} />

              <div className="mx-auto w-full max-w-[260px] md:max-w-none relative">
                {showProcessing ? (
                  <ProcessingPanel stageIndex={currentStage} />
                ) : (
                  <OutputPanel
                    style={activeStyle}
                    showResult={showResult || !!prefersReducedMotion}
                    prefersReducedMotion={!!prefersReducedMotion}
                  />
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-4 border-t border-hairline bg-surface-soft/30 px-4 py-5 md:px-6">
              <button
                onClick={runPipeline}
                disabled={isRunning}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-sm font-medium text-on-primary shadow-sm transition-all hover:bg-primary-active hover:shadow disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Generate AI creative"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating…
                  </>
                ) : showResult ? (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Regenerate
                  </>
                ) : (
                  "Generate"
                )}
              </button>

              <div className="w-full">
                <p className="mb-3 text-center text-xs font-medium text-muted">
                  Try another style
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {STYLE_PRESETS.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleStyleChange(style)}
                      disabled={isRunning}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all disabled:opacity-50 ${
                        activeStyle.id === style.id
                          ? "bg-primary text-on-primary shadow-sm"
                          : "bg-canvas border border-hairline text-body hover:border-primary/30"
                      }`}
                      aria-pressed={activeStyle.id === style.id}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full ring-1 ring-black/10"
                        style={{ backgroundColor: style.swatch }}
                      />
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </Section>
  );
}
