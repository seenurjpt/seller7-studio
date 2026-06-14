import Image from "next/image";
import { SpikeMark } from "@/components/ui/SpikeMark";

export const AUTH_HERO_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80";

type AuthVisualPanelProps = {
  /** Which side the wave sits on (toward the form panel) */
  waveSide: "left" | "right";
};

export function AuthVisualPanel({ waveSide }: AuthVisualPanelProps) {
  return (
    <div className="relative hidden min-h-full w-1/2 overflow-hidden lg:block">
      <Image
        src={AUTH_HERO_IMAGE}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

      {/* Wavy edge bleeding into form panel */}
      <svg
        aria-hidden
        viewBox="0 0 80 800"
        preserveAspectRatio="none"
        className={`pointer-events-none absolute top-0 z-10 h-full w-[80px] text-canvas ${
          waveSide === "left"
            ? "left-0 -translate-x-[99%] scale-x-[-1]"
            : "right-0 translate-x-[99%]"
        }`}
      >
        <path
          fill="currentColor"
          d="M80,0 C20,100 80,180 25,280 C80,380 15,480 80,580 C25,680 80,760 80,800 L0,800 L0,0 Z"
        />
      </svg>

      <div className="absolute bottom-8 right-8 flex items-center gap-2 text-white/90">
        <SpikeMark size={28} color="#ffffff" />
        <span className="font-display text-2xl font-semibold tracking-tight">
          S7
        </span>
      </div>
    </div>
  );
}
