import type { ReactNode } from "react";

type Surface =
  | "canvas"
  | "surface-soft"
  | "surface-card"
  | "surface-dark"
  | "primary";

const surfaceClasses: Record<Surface, string> = {
  canvas: "bg-canvas",
  "surface-soft": "bg-surface-soft",
  "surface-card": "bg-surface-card",
  "surface-dark": "bg-surface-dark text-on-dark",
  primary: "bg-primary text-on-primary",
};

export function Section({
  id,
  surface = "canvas",
  className = "",
  children,
}: {
  id?: string;
  surface?: Surface;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`py-14 md:py-24 ${surfaceClasses[surface]} ${className}`}
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">{children}</div>
    </section>
  );
}
