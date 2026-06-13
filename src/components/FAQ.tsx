"use client";

import { AnimateIn } from "@/components/ui/AnimateIn";
import { Section } from "@/components/ui/Section";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What kind of photos work best?",
    answer:
      "Any clear photo of your product works — phone camera is fine. Plain or slightly cluttered backgrounds both work. Avoid extreme blur or very dark photos for best results.",
  },
  {
    question: "Do I need any design skills?",
    answer:
      "Not at all. Upload your photo, pick a style, and download. Seller7 Studio handles background removal, lighting, branding, and layout automatically.",
  },
  {
    question: "How good is the quality really?",
    answer:
      "Our AI is tuned specifically for Indian product categories. You get studio-quality lighting, clean backgrounds, and professional layouts — comparable to a freelance designer at a fraction of the cost.",
  },
  {
    question: "Can I use my logo & brand colors?",
    answer:
      "Yes. Set up your brand kit once with your logo and color palette. Every creative will automatically include your branding in the right places.",
  },
  {
    question: "What about refunds and credit expiry?",
    answer:
      "Credits never expire — use them whenever you need. If a generation fails, the credit is refunded automatically. We also offer GST invoices for all purchases.",
  },
  {
    question: "Is it good for Indian marketplaces?",
    answer:
      "Absolutely. We export in the exact sizes required by Amazon, Flipkart, Meesho, and Instagram — square, story, banner, and catalog formats, all optimized for Indian sellers.",
  },
];

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-hairline last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-primary md:py-6"
        aria-expanded={isOpen}
      >
        <span className="font-display text-[18px] font-medium text-ink md:text-[20px]">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96 pb-5 md:pb-6" : "max-h-0"
        }`}
        role="region"
        aria-hidden={!isOpen}
      >
        <p className="max-w-prose text-sm leading-relaxed text-muted md:text-[15px]">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" surface="surface-soft">
      <div className="mx-auto max-w-3xl">
        <AnimateIn>
          <div className="text-center">
            <h2 className="font-display text-[32px] font-semibold text-ink md:text-[44px]">
              Frequently asked questions
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted">
              Everything you need to know before you start.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mt-10 rounded-xl border border-hairline bg-canvas px-5 md:px-8">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </AnimateIn>
      </div>
    </Section>
  );
}
