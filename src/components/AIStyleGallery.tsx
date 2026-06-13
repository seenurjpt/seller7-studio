"use client";

import { AnimateIn } from "@/components/ui/AnimateIn";
import { Section } from "@/components/ui/Section";
import Image from "next/image";

type StyleCard = {
  name: string;
  image: string;
};

const STYLES: StyleCard[] = [
  { name: "Minimal Studio", image: "/assets/landing/minimal_studio.jpeg" },
  { name: "Premium Black", image: "/assets/landing/premium_black.jpeg" },
  { name: "Festive Diwali", image: "/assets/landing/festive_diwali.jpeg" },
  { name: "Lifestyle Kitchen", image: "/assets/landing/lifestyle_kitchen.jpeg" },
  { name: "Bold Sale", image: "/assets/landing/bold_sale.jpeg" },
  { name: "Pastel Soft", image: "/assets/landing/pastel_soft.jpeg" },
  { name: "Marble Luxe", image: "/assets/landing/marble_luxe.jpeg" },
  { name: "Nature Fresh", image: "/assets/landing/nature_fresh.jpeg" },
];

/** Matches source assets (768×1376) so nothing gets cropped */
const CARD_CLASS =
  "relative w-full aspect-[768/1376] overflow-hidden rounded-xl border border-hairline bg-surface-card";

function StyleThumbnail({ style }: { style: StyleCard }) {
  return (
    <div
      className={`group ${CARD_CLASS} transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_1px_3px_rgba(20,20,19,0.08)]`}
    >
      <Image
        src={style.image}
        alt={`${style.name} AI style preset`}
        fill
        sizes="(max-width: 640px) 220px, (max-width: 1024px) 33vw, 25vw"
        className="object-contain"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/75 via-black/40 to-transparent px-3 pb-3 pt-14">
        <p className="font-display text-sm font-medium text-white">
          {style.name}
        </p>
      </div>
    </div>
  );
}

export function AIStyleGallery() {
  return (
    <Section surface="canvas" id="ai-styles">
      <AnimateIn>
        <h2 className="font-display text-[32px] font-semibold text-ink md:text-[44px]">
          One photo. Many styles.
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          Same product, completely different looks — pick a preset or let AI
          suggest the best fit for your category.
        </p>
      </AnimateIn>

      {/* Desktop grid — 4 cols gives ~270px-wide cards at full bleed */}
      <div className="mt-10 hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {STYLES.map((style, i) => (
          <AnimateIn key={style.name} delay={i * 0.05}>
            <StyleThumbnail style={style} />
          </AnimateIn>
        ))}
      </div>

      {/* Mobile horizontal scroll — wider cards so baked-in text stays readable */}
      <div className="mt-10 flex gap-4 overflow-x-auto pb-4 sm:hidden snap-x snap-mandatory scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {STYLES.map((style) => (
          <div key={style.name} className="w-[220px] shrink-0 snap-start">
            <StyleThumbnail style={style} />
          </div>
        ))}
      </div>
    </Section>
  );
}
