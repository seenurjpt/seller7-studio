import type { ReactNode } from "react";

type AuthFormIntroProps = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  footer?: ReactNode;
};

export function AuthFormIntro({
  eyebrow,
  title,
  titleAccent,
  footer,
}: AuthFormIntroProps) {
  return (
    <div className="mb-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-soft">
        {eyebrow}
      </p>
      <h1 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.35rem)] font-semibold leading-tight tracking-tight text-ink">
        {title}
        {titleAccent ? (
          <span className="text-primary">{titleAccent}</span>
        ) : null}
      </h1>
      {footer ? <div className="mt-3 text-sm text-muted">{footer}</div> : null}
    </div>
  );
}
