"use client";

import { AnimateIn } from "@/components/ui/AnimateIn";
import { Section } from "@/components/ui/Section";
import { Check } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Trial",
    price: "₹299",
    images: "10 images",
    perImage: "₹30/image",
    tagline: "Test the waters",
    featured: false,
    features: [
      "10 credits",
      "All styles",
      "Brand kit",
      "Standard support",
    ],
  },
  {
    name: "Starter",
    price: "₹699",
    images: "30 images",
    perImage: "₹23/image",
    tagline: "For getting going",
    featured: false,
    features: [
      "30 credits",
      "All styles",
      "Brand kit",
      "Standard support",
    ],
  },
  {
    name: "Popular",
    price: "₹1,999",
    images: "100 images",
    perImage: "₹20/image",
    tagline: "Best value for regular sellers",
    featured: true,
    features: [
      "100 credits",
      "All styles",
      "Brand kit",
      "Priority generation",
      "Multi-format export",
    ],
  },
  {
    name: "Bulk",
    price: "₹7,999",
    images: "500 images",
    perImage: "₹16/image",
    tagline: "For high-volume sellers & agencies",
    featured: false,
    features: [
      "500 credits",
      "All styles",
      "Brand kit",
      "Priority generation",
      "Multi-format export",
      "Dedicated support",
    ],
  },
];

const MAX_FEATURES = Math.max(...tiers.map((t) => t.features.length));

export function Pricing() {
  return (
    <Section id="pricing" surface="canvas">
      <AnimateIn>
        <h2 className="font-display text-[32px] font-semibold text-ink md:text-[44px]">
          Pay only for what you create
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          Buy credits when you need them. No subscriptions, no lock-in.
        </p>
      </AnimateIn>

      <div className="mt-12 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {tiers.map((tier, i) => (
          <AnimateIn key={tier.name} delay={i * 0.08} className="h-full">
            <div
              className={`group relative flex h-full flex-col rounded-xl border p-8 transition-all duration-300 ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0 ${
                tier.featured
                  ? "border-white/10 bg-surface-dark text-on-dark shadow-sm hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(204,120,92,0.15)]"
                  : "border-hairline bg-surface-card hover:border-primary/25 hover:shadow-[0_8px_24px_rgba(20,20,19,0.08)]"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-on-primary shadow-sm">
                  Most Popular
                </span>
              )}

              {/* Header — fixed-height block so prices & taglines align */}
              <div className="shrink-0">
                <h3
                  className={`font-display text-[22px] font-medium ${
                    tier.featured ? "text-on-dark" : "text-ink"
                  }`}
                >
                  {tier.name}
                  {tier.featured && " ⭐"}
                </h3>
                <p
                  className={`font-display mt-3 text-[40px] font-semibold leading-none ${
                    tier.featured ? "text-on-dark" : "text-ink"
                  }`}
                >
                  {tier.price}
                </p>
                <p
                  className={`mt-1 text-sm ${
                    tier.featured ? "text-on-dark-soft" : "text-muted"
                  }`}
                >
                  {tier.images} · {tier.perImage}
                </p>
                <p
                  className={`mt-2 min-h-[2.75rem] text-sm leading-snug ${
                    tier.featured ? "text-on-dark-soft" : "text-muted"
                  }`}
                >
                  {tier.tagline}
                </p>
              </div>

              {/* Button — always at the same vertical slot */}
              <Link
                href="#"
                className={`mt-5 inline-flex h-10 shrink-0 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
                  tier.featured
                    ? "bg-canvas text-ink hover:bg-surface-soft group-hover:shadow-md"
                    : "bg-primary text-on-primary hover:bg-primary-active group-hover:shadow-md"
                }`}
              >
                Buy credits
              </Link>

              {/* Features — pad shorter lists so card bottoms align */}
              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span
                      className={
                        tier.featured ? "text-on-dark-soft" : "text-body"
                      }
                    >
                      {f}
                    </span>
                  </li>
                ))}
                {Array.from({ length: MAX_FEATURES - tier.features.length }).map(
                  (_, idx) => (
                    <li
                      key={`spacer-${idx}`}
                      className="invisible flex items-start gap-2 text-sm"
                      aria-hidden
                    >
                      <span className="h-4 w-4 shrink-0" />
                      <span>placeholder</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </AnimateIn>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        Credits never expire · UPI, cards & netbanking via Razorpay · GST
        invoice available
      </p>
    </Section>
  );
}
