"use client";

import { FormPasswordField, FormTextField } from "@/components/forms";
import { Button } from "@/components/ui/heroui";
import { useAuth } from "@/context/auth-context";
import { ApiError } from "@/lib/api/client";
import { useZodForm } from "@/lib/forms";
import { signupSchema, type SignupFormValues } from "@/lib/forms/schemas/auth";
import LinkNext from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthFormIntro } from "./auth-form-intro";

export function SignupForm() {
  const { signup } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useZodForm(signupSchema, {
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    } satisfies SignupFormValues,
  });

  const onSubmit = form.handleSubmit(async ({ firstName, lastName, email, password }) => {
    setServerError(null);
    try {
      const name = `${firstName.trim()} ${lastName.trim()}`;
      await signup(name, email, password);
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
        eyebrow="Start for free"
        title="Create new account"
        titleAccent="."
        footer={
          <>
            Already a member?{" "}
            <LinkNext
              href="/login"
              className="font-medium text-primary hover:text-primary-active"
            >
              Log in
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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormTextField
            control={form.control}
            name="firstName"
            label="First name"
            placeholder="Priya"
            autoComplete="given-name"
            isRequired
          />
          <FormTextField
            control={form.control}
            name="lastName"
            label="Last name"
            placeholder="Sharma"
            autoComplete="family-name"
            isRequired
          />
        </div>

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
          autoComplete="new-password"
          isRequired
        />

        <FormPasswordField
          control={form.control}
          name="confirmPassword"
          label="Confirm password"
          autoComplete="new-password"
          isRequired
        />

        <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            className="rounded-full px-6"
            onPress={() => {
              form.reset();
              setServerError(null);
            }}
          >
            Clear form
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="min-w-[160px] rounded-full px-8"
            isDisabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating…" : "Create account"}
          </Button>
        </div>
      </form>
    </div>
  );
}
