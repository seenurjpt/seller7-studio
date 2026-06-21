import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password — Seller7 Studio",
  description: "Set a new password for your Seller7 Studio account.",
};

export default function ResetPasswordPage() {
  return (
    <AuthSplitLayout
      variant="reset-password"
      alternateHref="/login"
      alternateLabel="Log in"
    >
      {/* Suspense required for useSearchParams inside ResetPasswordForm */}
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </AuthSplitLayout>
  );
}
