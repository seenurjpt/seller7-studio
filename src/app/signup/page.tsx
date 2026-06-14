import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { SignupForm } from "@/components/auth/signup-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up — Seller7 Studio",
  description:
    "Create your Seller7 Studio account and start generating AI product photos for free.",
};

export default function SignupPage() {
  return (
    <AuthSplitLayout
      variant="signup"
      alternateHref="/login"
      alternateLabel="Log in"
    >
      <SignupForm />
    </AuthSplitLayout>
  );
}
