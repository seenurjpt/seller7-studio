"use client";

import { FormPasswordField } from "@/components/forms";
import { Button } from "@/components/ui/heroui";
import { ApiError } from "@/lib/api/client";
import { authApi } from "@/lib/api/auth";
import { useZodForm } from "@/lib/forms";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/lib/forms/schemas/auth";
import { ShieldCheck } from "lucide-react";
import LinkNext from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { AuthFormIntro } from "./auth-form-intro";

type Phase = "form" | "success";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [phase, setPhase] = useState<Phase>("form");
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useZodForm(resetPasswordSchema, {
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    } satisfies ResetPasswordFormValues,
  });

  const onSubmit = form.handleSubmit(async ({ newPassword }) => {
    setServerError(null);

    if (!token) {
      setServerError("Reset token is missing. Please use the link from your email.");
      return;
    }

    try {
      await authApi.resetPassword(token, newPassword);
      setPhase("success");
    } catch (err) {
      setServerError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  });

  if (phase === "success") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success/10">
          <ShieldCheck className="h-7 w-7 text-success" />
        </div>

        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-soft">
            All done
          </p>
          <h1 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.35rem)] font-semibold leading-tight tracking-tight text-ink">
            Password updated
            <span className="text-primary">.</span>
          </h1>
          <p className="mt-3 text-sm text-muted">
            Your password has been changed. All previous sessions have been
            signed out for your security.
          </p>
        </div>

        <LinkNext
          href="/login"
          className="inline-flex w-fit items-center justify-center rounded-full bg-primary px-8 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-primary-active"
        >
          Log in with new password
        </LinkNext>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-soft">
            Invalid link
          </p>
          <h1 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.35rem)] font-semibold leading-tight tracking-tight text-ink">
            Link not valid
            <span className="text-primary">.</span>
          </h1>
          <p className="mt-3 text-sm text-muted">
            This reset link is missing or malformed. Please request a new one.
          </p>
        </div>
        <LinkNext
          href="/forgot-password"
          className="inline-flex w-fit items-center justify-center rounded-full bg-primary px-8 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-primary-active"
        >
          Request new link
        </LinkNext>
      </div>
    );
  }

  return (
    <div>
      <AuthFormIntro
        eyebrow="Choose a new password"
        title="Reset your password"
        titleAccent="."
        footer={
          <>
            Changed your mind?{" "}
            <LinkNext
              href="/login"
              className="font-medium text-primary hover:text-primary-active"
            >
              Back to log in
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

        <FormPasswordField
          control={form.control}
          name="newPassword"
          label="New password"
          autoComplete="new-password"
          isRequired
        />

        <FormPasswordField
          control={form.control}
          name="confirmPassword"
          label="Confirm new password"
          autoComplete="new-password"
          isRequired
        />

        <p className="text-xs text-muted-soft">
          Minimum 8 characters, at least one uppercase letter and one number.
        </p>

        <div className="mt-2 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            className="min-w-[180px] rounded-full px-8"
            isDisabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving…" : "Set new password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
