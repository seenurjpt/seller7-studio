import Link from "next/link";
import { Sparkles, Images, Palette, CreditCard, ArrowRight } from "lucide-react";

const quickActions = [
  {
    icon: Sparkles,
    label: "Generate Creative",
    description: "Turn a product photo into AI-powered marketing images",
    href: "/dashboard/generate",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Images,
    label: "My Creatives",
    description: "Browse, download, and manage your generated images",
    href: "/dashboard/library",
    iconBg: "bg-accent-teal/10",
    iconColor: "text-accent-teal",
  },
  {
    icon: Palette,
    label: "Brand Kit",
    description: "Upload your logo and set brand colors",
    href: "/dashboard/brand-kit",
    iconBg: "bg-accent-amber/10",
    iconColor: "text-accent-amber",
  },
  {
    icon: CreditCard,
    label: "Credits & Billing",
    description: "View your credit balance and top up",
    href: "/dashboard/billing",
    iconBg: "bg-surface-card",
    iconColor: "text-muted",
  },
];

export default function DashboardHomePage() {
  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="space-y-1">
        <h2 className="font-display text-3xl font-medium text-ink">
          Welcome back
        </h2>
        <p className="text-sm text-muted">
          Pick up where you left off, or start something new.
        </p>
      </div>

      {/* Quick action grid */}
      <section aria-labelledby="quick-actions-label">
        <h3
          id="quick-actions-label"
          className="mb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-soft"
        >
          Quick actions
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="group flex flex-col gap-4 rounded-xl border border-hairline bg-surface-card p-5 transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <div
                  className={`w-fit rounded-lg p-2.5 ${action.iconBg} ${action.iconColor}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-ink group-hover:text-primary transition-colors">
                      {action.label}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    {action.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Workspace canvas — blank, ready for content */}
      <section
        aria-labelledby="workspace-label"
        className="min-h-[320px] rounded-xl border border-dashed border-hairline bg-surface-soft/40 flex flex-col items-center justify-center gap-3 p-8"
      >
        <h3 id="workspace-label" className="sr-only">
          Workspace
        </h3>
        <div className="h-10 w-10 rounded-full bg-surface-card flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-muted-soft" aria-hidden="true" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-muted">Your workspace is ready</p>
          <p className="text-xs text-muted-soft mt-0.5">
            Generate your first creative to get started
          </p>
        </div>
        <Link
          href="/dashboard/generate"
          className="mt-1 flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-on-primary transition-colors hover:bg-primary-active"
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Start generating
        </Link>
      </section>
    </div>
  );
}
