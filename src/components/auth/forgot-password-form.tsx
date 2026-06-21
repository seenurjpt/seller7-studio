"use client";

import { FormTextField } from "@/components/forms";
import { Button } from "@/components/ui/heroui";
import { SpikeMark } from "@/components/ui/SpikeMark";
import { ApiError } from "@/lib/api/client";
import { authApi } from "@/lib/api/auth";
import { useZodForm } from "@/lib/forms";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/lib/forms/schemas/auth";
import { MailCheck } from "lucide-react";
import LinkNext from "next/link";
import { useState } from "react";
import { AuthFormIntro } from "./auth-form-intro";

type Phase = "form" | "sent";

export function ForgotPasswordForm() {
  const [phase, setPhase] = useState<Phase>("form");
  const [sentEmail, setSentEmail] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useZodForm(forgotPasswordSchema, {
    defaultValues: { email: "" } satisfies ForgotPasswordFormValues,
  });

  const onSubmit = form.handleSubmit(async ({ email }) => {
    setServerError(null);
    try {
      await authApi.forgotPassword(email);
      setSentEmail(email);
      setPhase("sent");
    } catch (err) {
      // Only show unexpected errors — 200 is always returned for this endpoint
      if (err instanceof ApiError && err.status !== 200) {
        setServerError("Something went wrong. Please try again.");
      }
    }
  });

  if (phase === "sent") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <MailCheck className="h-7 w-7 text-primary" />
        </div>

        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-soft">
            Check your inbox
          </p>
          <h1 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.35rem)] font-semibold leading-tight tracking-tight text-ink">
            Reset link sent
            <span className="text-primary">.</span>
          </h1>
          <p className="mt-3 text-sm text-muted">
            If an account exists for{" "}
            <span className="font-medium text-body">{sentEmail}</span>, you'll
            receive a password reset link within a few minutes.
          </p>
        </div>

        <div className="rounded-2xl border border-hairline bg-surface-soft p-4 text-sm text-muted">
          <p className="font-medium text-body">Didn't get the email?</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Check your spam or junk folder</li>
            <li>Make sure you entered the right email</li>
            <li>
              The link expires in{" "}
              <span className="font-medium text-body">15 minutes</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="secondary"
            className="rounded-full px-6"
            onPress={() => {
              form.reset();
              setPhase("form");
            }}
          >
            Try a different email
          </Button>
          <LinkNext
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            Back to log in
          </LinkNext>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AuthFormIntro
        eyebrow="Forgot your password?"
        title="Reset your password"
        titleAccent="."
        footer={
          <>
            Remembered it?{" "}
            <LinkNext
              href="/login"
              className="font-medium text-primary hover:text-primary-active"
            >
              Back to log in
            </LinkNext>
          </>
        }
      />

      <p className="mb-6 -mt-2 text-sm text-muted">
        Enter your email and we&apos;ll send you a secure reset link valid for
        15 minutes.
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        {serverError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800/40 dark:bg-red-950/30 dark:text-red-400">
            {serverError}
          </div>
        )}

        <FormTextField
          control={form.control}
          name="email"
          label="Email address"
          placeholder="you@example.com"
          type="email"
          autoComplete="email"
          isRequired
        />

        <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <LinkNext
            href="/login"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            ← Back to log in
          </LinkNext>
          <Button
            type="submit"
            variant="primary"
            className="min-w-[160px] rounded-full px-8"
            isDisabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Sending…" : "Send reset link"}
          </Button>
        </div>
      </form>
    </div>
  );
}
