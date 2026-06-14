import type { ReactNode } from "react";
import { AuthHeader } from "./auth-header";
import { AuthVisualPanel } from "./auth-visual-panel";

type AuthSplitLayoutProps = {
  variant: "login" | "signup";
  alternateHref: string;
  alternateLabel: string;
  children: ReactNode;
};

export function AuthSplitLayout({
  variant,
  alternateHref,
  alternateLabel,
  children,
}: AuthSplitLayoutProps) {
  const isLogin = variant === "login";

  return (
    <div className="min-h-svh bg-canvas lg:flex lg:items-center lg:justify-center lg:bg-surface-soft lg:p-8 xl:p-12">
      <div
        className={`mx-auto flex min-h-svh w-full max-w-6xl flex-col lg:min-h-[min(720px,88vh)] lg:flex-row lg:overflow-hidden lg:rounded-[2rem] lg:bg-canvas lg:shadow-[0_24px_80px_rgba(20,20,19,0.12)] ${
          isLogin ? "" : "lg:flex-row-reverse"
        }`}
      >
        <div className="flex w-full flex-col px-5 py-6 sm:px-8 lg:w-1/2 lg:px-12 lg:py-10 xl:px-14 xl:py-12">
          <AuthHeader
            alternateHref={alternateHref}
            alternateLabel={alternateLabel}
          />
          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8 lg:mx-0 lg:max-w-none lg:py-10">
            {children}
          </div>
        </div>

        <AuthVisualPanel waveSide={isLogin ? "left" : "right"} />
      </div>
    </div>
  );
}
