import { Section } from "@/components/ui/Section";

const marketplaces = [
  "Amazon",
  "Flipkart",
  "Meesho",
  "Instagram",
  "WhatsApp Business",
];

export function LogosStrip() {
  return (
    <Section surface="surface-card" className="py-10 md:py-12">
      <p className="text-center text-sm text-muted mb-6">
        Trusted by sellers on
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12">
        {marketplaces.map((name) => (
          <span
            key={name}
            className="text-sm font-medium tracking-wide text-muted-soft/70 select-none"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {name}
          </span>
        ))}
      </div>
    </Section>
  );
}
