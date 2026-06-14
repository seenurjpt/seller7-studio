"use client";

import { FormPasswordField, FormTextField } from "@/components/forms";
import { Button } from "@/components/ui/heroui";
import { useZodForm } from "@/lib/forms";
import { signupSchema, type SignupFormValues } from "@/lib/forms/schemas/auth";
import LinkNext from "next/link";
import { AuthFormIntro } from "./auth-form-intro";

export function SignupForm() {
  const form = useZodForm(signupSchema, {
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    } satisfies SignupFormValues,
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log("Signup", data);
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
            onClick={() => form.reset()}
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
