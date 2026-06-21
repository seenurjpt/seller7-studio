"use client";

import { FormPasswordField, FormTextField } from "@/components/forms";
import { Button } from "@/components/ui/heroui";
import { useAuth } from "@/context/auth-context";
import { ApiError } from "@/lib/api/client";
import { useZodForm } from "@/lib/forms";
import { loginSchema, type LoginFormValues } from "@/lib/forms/schemas/auth";
import LinkNext from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthFormIntro } from "./auth-form-intro";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useZodForm(loginSchema, {
    defaultValues: { email: "", password: "" } satisfies LoginFormValues,
  });

  const onSubmit = form.handleSubmit(async ({ email, password }) => {
    setServerError(null);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setServerError(
        err instanceof ApiError ? err.message : "Something went wrong. Please try again.",
      );
    }
  });

  return (
    <div>
      <AuthFormIntro
        eyebrow="Welcome back"
        title="Log in to your account"
        titleAccent="."
        footer={
          <>
            Don&apos;t have an account?{" "}
            <LinkNext
              href="/signup"
              className="font-medium text-primary hover:text-primary-active"
            >
              Sign up
            </LinkNext>
          </>
        }
      />

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        {serverError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800/40 dark:bg-red-950/30 dark:text-red-400">
            {serverError}
          </div>
        )}

        <FormTextField
          control={form.control}
          name="email"
          label="Email"
          placeholder="you@example.com"
          type="email"
          autoComplete="email"
          isRequired
        />

        <FormPasswordField
          control={form.control}
          name="password"
          label="Password"
          autoComplete="current-password"
          isRequired
        />

        <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <LinkNext
            href="/forgot-password"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            Forgot password?
          </LinkNext>
          <Button
            type="submit"
            variant="primary"
            className="min-w-[140px] rounded-full px-8"
            isDisabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Signing in…" : "Log in"}
          </Button>
        </div>
      </form>
    </div>
  );
}
