import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password — Seller7 Studio",
  description: "Reset your Seller7 Studio password.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthSplitLayout
      variant="forgot-password"
      alternateHref="/login"
      alternateLabel="Log in"
    >
      <ForgotPasswordForm />
    </AuthSplitLayout>
  );
}
