"use client";

import { FormPasswordField, FormTextField } from "@/components/forms";
import { Button, Link } from "@/components/ui/heroui";
import { useZodForm } from "@/lib/forms";
import { loginSchema, type LoginFormValues } from "@/lib/forms/schemas/auth";
import LinkNext from "next/link";
import { AuthFormIntro } from "./auth-form-intro";

export function LoginForm() {
  const form = useZodForm(loginSchema, {
    defaultValues: {
      email: "",
      password: "",
    } satisfies LoginFormValues,
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log("Login", data);
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
          <Link
            href="#"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            Forgot password?
          </Link>
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
