import type { ReactElement } from "react";

type StyleVariant = "minimal" | "premium" | "festive" | "lifestyle";

type ArtComponent = () => ReactElement;

/** Neutral product silhouette — works for any category */
function ProductSilhouette({
  x = 44,
  y = 52,
  scale = 1,
  light = false,
}: {
  x?: number;
  y?: number;
  scale?: number;
  light?: boolean;
}) {
  const fill = light ? "#f5f0e8" : "#d4cfc8";
  const stroke = light ? "#e8e0d2" : "#a09888";
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="22" rx="14" ry="3" fill="#000" opacity="0.12" />
      <rect x="-10" y="-18" width="20" height="32" rx="4" fill={fill} stroke={stroke} strokeWidth="1" />
      <rect x="-6" y="-12" width="12" height="2" rx="1" fill={light ? "#cc785c" : "#8e8b82"} opacity="0.5" />
      <rect x="-5" y="-8" width="10" height="1.5" rx="0.75" fill={light ? "#cc785c" : "#8e8b82"} opacity="0.35" />
      <rect x="-4" y="-22" width="8" height="5" rx="1.5" fill={stroke} opacity="0.6" />
    </g>
  );
}

function MinimalArt() {
  return (
    <svg viewBox="0 0 88 88" fill="none" className="h-full w-full" aria-hidden>
      <rect width="88" height="88" fill="#f5f0e8" />
      <circle cx="72" cy="16" r="20" fill="#cc785c" opacity="0.06" />
      <ProductSilhouette />
      <circle cx="14" cy="14" r="6" fill="#cc785c" opacity="0.8" />
      <rect x="10" y="12" width="8" height="4" rx="2" fill="white" opacity="0.9" />
    </svg>
  );
}

function PremiumArt() {
  return (
    <svg viewBox="0 0 88 88" fill="none" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="prem-spot" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#4a3f38" />
          <stop offset="100%" stopColor="#181715" />
        </radialGradient>
      </defs>
      <rect width="88" height="88" fill="url(#prem-spot)" />
      <ellipse cx="44" cy="78" rx="30" ry="6" fill="#000" opacity="0.35" />
      <ProductSilhouette light />
      <rect x="8" y="8" width="24" height="8" rx="4" fill="white" opacity="0.12" />
      <circle cx="72" cy="72" r="3" fill="#e8a55a" opacity="0.9" />
    </svg>
  );
}

function FestiveArt() {
  return (
    <svg viewBox="0 0 88 88" fill="none" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="fest-bg" x1="0" y1="0" x2="88" y2="88">
          <stop offset="0%" stopColor="#cc785c" />
          <stop offset="50%" stopColor="#e8a55a" />
          <stop offset="100%" stopColor="#cc785c" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <rect width="88" height="88" fill="url(#fest-bg)" />
      {[12, 28, 56, 74].map((cx, i) => (
        <circle key={i} cx={cx} cy={14 + (i % 2) * 8} r={3 + (i % 3)} fill="#faf9f5" opacity={0.25 + i * 0.1} />
      ))}
      <ProductSilhouette light />
      <path d="M8 72 L16 64 L24 72 L16 80 Z" fill="#faf9f5" opacity="0.2" />
      <rect x="58" y="62" width="22" height="14" rx="3" fill="#faf9f5" opacity="0.25" />
    </svg>
  );
}

function LifestyleArt() {
  return (
    <svg viewBox="0 0 88 88" fill="none" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="life-bg" x1="0" y1="88" x2="88" y2="0">
          <stop offset="0%" stopColor="#5db8a6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#faf9f5" />
        </linearGradient>
      </defs>
      <rect width="88" height="88" fill="url(#life-bg)" />
      <ellipse cx="20" cy="24" rx="16" ry="10" fill="#5db8a6" opacity="0.15" />
      <ellipse cx="70" cy="60" rx="20" ry="12" fill="#5db872" opacity="0.12" />
      <path d="M0 70 Q44 58 88 70 L88 88 L0 88 Z" fill="#e8e0d2" opacity="0.5" />
      <ProductSilhouette y={48} />
      <circle cx="68" cy="18" r="8" fill="#5db8a6" opacity="0.2" />
    </svg>
  );
}

const ART: Record<StyleVariant, ArtComponent> = {
  minimal: MinimalArt,
  premium: PremiumArt,
  festive: FestiveArt,
  lifestyle: LifestyleArt,
};

export function StylePresetCard({
  variant,
  label,
}: {
  variant: StyleVariant;
  label: string;
}) {
  const Art = ART[variant];
  return (
    <div
      className="overflow-hidden rounded-xl border border-hairline bg-white shadow-[0_8px_24px_rgba(20,20,19,0.12)]"
      style={{ width: 88, height: 118 }}
    >
      <div className="h-[88px] w-full overflow-hidden">
        <Art />
      </div>
      <p className="truncate px-2 py-1.5 text-[9px] font-medium text-muted">
        {label}
      </p>
    </div>
  );
}

/** Plain phone snap — cluttered bg, neutral product */
export function RawUploadChip() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      className="drop-shadow-sm"
      aria-hidden
    >
      <rect width="56" height="56" rx="14" fill="white" stroke="#e6dfd8" strokeWidth="1" />
      <rect x="6" y="6" width="44" height="44" rx="8" fill="#d4cfc4" />
      <rect x="10" y="12" width="14" height="10" rx="2" fill="#b8b0a0" opacity="0.6" />
      <circle cx="38" cy="38" r="4" fill="#a09888" opacity="0.5" />
      <rect x="14" y="32" width="18" height="6" rx="1" fill="#c5bdb0" opacity="0.5" />
      {/* product */}
      <rect x="22" y="20" width="12" height="18" rx="2" fill="#a8a29e" />
      <rect x="24" y="24" width="8" height="1.5" rx="0.75" fill="#8a8580" opacity="0.6" />
      <rect x="25" y="16" width="6" height="4" rx="1" fill="#8a8580" opacity="0.5" />
    </svg>
  );
}

/** Polished output chip — branded creative preview */
export function PolishedOutputChip() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      className="drop-shadow-md"
      aria-hidden
    >
      <defs>
        <linearGradient id="out-bg" x1="0" y1="0" x2="56" y2="56">
          <stop offset="0%" stopColor="#2d2926" />
          <stop offset="100%" stopColor="#4a3f38" />
        </linearGradient>
      </defs>
      <rect width="56" height="56" rx="14" fill="url(#out-bg)" />
      <circle cx="14" cy="12" r="4" fill="white" opacity="0.9" />
      <circle cx="14" cy="12" r="2" fill="#cc785c" />
      <rect x="22" y="18" width="12" height="20" rx="2" fill="#e8e4df" />
      <rect x="24" y="22" width="8" height="1.5" rx="0.75" fill="#cc785c" opacity="0.6" />
      <rect x="36" y="38" width="14" height="8" rx="2" fill="#cc785c" />
      <path
        d="M8 8 L12 4 M48 8 L44 4"
        stroke="#e8a55a"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

/** Format export icons — square, story, banner */
export function FormatsMiniGrid() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect width="48" height="48" rx="12" fill="white" stroke="#e6dfd8" strokeWidth="1" />
      <rect x="8" y="8" width="14" height="14" rx="2" fill="#f5f0e8" stroke="#cc785c" strokeWidth="1" opacity="0.9" />
      <rect x="26" y="8" width="10" height="18" rx="2" fill="#5db8a6" opacity="0.25" stroke="#5db8a6" strokeWidth="0.75" />
      <rect x="8" y="26" width="20" height="10" rx="2" fill="#e8a55a" opacity="0.2" stroke="#e8a55a" strokeWidth="0.75" />
      <rect x="10" y="11" width="6" height="6" rx="1" fill="#cc785c" opacity="0.35" />
    </svg>
  );
}

/** AI magic wand burst */
export function AiBurstIcon({ size = 56 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      aria-hidden
    >
      <rect width="56" height="56" rx="14" fill="#cc785c" />
      <path
        d="M28 14 L30 24 L40 26 L30 28 L28 38 L26 28 L16 26 L26 24 Z"
        fill="white"
        opacity="0.95"
      />
      <path
        d="M38 12 L39 16 L43 17 L39 18 L38 22 L37 18 L33 17 L37 16 Z"
        fill="white"
        opacity="0.6"
      />
      <circle cx="20" cy="36" r="2" fill="white" opacity="0.5" />
    </svg>
  );
}

export const STYLE_VARIANTS: { variant: StyleVariant; label: string }[] = [
  { variant: "minimal", label: "Minimal" },
  { variant: "premium", label: "Premium" },
  { variant: "festive", label: "Festive" },
  { variant: "lifestyle", label: "Lifestyle" },
];
