"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { FormPasswordField, FormTextField } from "@/components/forms";
import { Button, toast } from "@/components/ui/heroui";
import { useAuth } from "@/context/auth-context";
import { authApi } from "@/lib/api/auth";
import { usersApi } from "@/lib/api/users";
import { ApiError } from "@/lib/api/client";
import { useZodForm } from "@/lib/forms";
import {
  changePasswordSchema,
  profileSchema,
  type ChangePasswordFormValues,
  type ProfileFormValues,
} from "@/lib/forms/schemas/settings";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-hairline bg-surface-card p-6">
      <h2 className="font-display text-xl font-medium text-ink">{title}</h2>
      <p className="mt-1 text-sm text-muted">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function SettingsPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">


      <ProfileSection />
      <SecuritySection />
      <AppearanceSection />
    </div>
  );
}

function ProfileSection() {
  const { user, accessToken, updateUser } = useAuth();

  const form = useZodForm(profileSchema, {
    defaultValues: { name: user?.name ?? "" } satisfies ProfileFormValues,
  });

  // Keep the field in sync once the user loads from silent refresh.
  useEffect(() => {
    if (user?.name) form.reset({ name: user.name });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.name]);

  const onSubmit = form.handleSubmit(async ({ name }) => {
    if (!accessToken) return;
    try {
      const { data } = await usersApi.updateMe({ name: name.trim() }, accessToken);
      if (data) updateUser({ name: data.name });
      form.reset({ name: name.trim() });
      toast.success("Profile updated");
    } catch (err) {
      toast.danger("Couldn't update profile", {
        description: err instanceof ApiError ? err.message : "Please try again.",
      });
    }
  });

  return (
    <Section title="Profile" description="Your name and account email.">
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <FormTextField
          control={form.control}
          name="name"
          label="Display name"
          placeholder="Your name"
          autoComplete="name"
          isRequired
        />

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Email</span>
          <div className="rounded-xl border border-hairline bg-surface-soft px-4 py-2.5 text-sm text-muted">
            {user?.email ?? "—"}
          </div>
          <span className="text-xs text-muted-soft">
            Email changes aren&apos;t supported yet — contact support if needed.
          </span>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            className="rounded-full px-6"
            isDisabled={form.formState.isSubmitting || !form.formState.isDirty}
          >
            {form.formState.isSubmitting ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </form>
    </Section>
  );
}

function SecuritySection() {
  const { accessToken } = useAuth();

  const form = useZodForm(changePasswordSchema, {
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    } satisfies ChangePasswordFormValues,
  });

  const onSubmit = form.handleSubmit(async ({ currentPassword, newPassword }) => {
    if (!accessToken) return;
    try {
      await authApi.changePassword(currentPassword, newPassword, accessToken);
      form.reset({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Password changed", {
        description: "Use your new password next time you log in.",
      });
    } catch (err) {
      toast.danger("Couldn't change password", {
        description: err instanceof ApiError ? err.message : "Please try again.",
      });
    }
  });

  return (
    <Section title="Security" description="Change your account password.">
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <FormPasswordField
          control={form.control}
          name="currentPassword"
          label="Current password"
          autoComplete="current-password"
          isRequired
        />
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

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            className="rounded-full px-6"
            isDisabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Updating…" : "Update password"}
          </Button>
        </div>
      </form>
    </Section>
  );
}

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

function AppearanceSection() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const active = mounted ? theme ?? "system" : undefined;

  return (
    <Section title="Appearance" description="Choose how Seller7 Studio looks to you.">
      <div className="grid grid-cols-3 gap-3">
        {THEME_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isActive = active === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setTheme(opt.value)}
              aria-pressed={isActive}
              className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-all ${
                isActive
                  ? "border-primary bg-primary/[0.06] text-primary ring-1 ring-primary"
                  : "border-hairline text-muted hover:border-primary/40 hover:text-ink"
              }`}
            >
              <Icon className="h-5 w-5" />
              {opt.label}
            </button>
          );
        })}
      </div>
    </Section>
  );
}
