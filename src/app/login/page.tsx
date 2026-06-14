import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in — Seller7 Studio",
  description: "Sign in to Seller7 Studio and create AI product photos for your store.",
};

export default function LoginPage() {
  return (
    <AuthSplitLayout
      variant="login"
      alternateHref="/signup"
      alternateLabel="Join"
    >
      <LoginForm />
    </AuthSplitLayout>
  );
}
