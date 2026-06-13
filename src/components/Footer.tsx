import { SpikeMark } from "@/components/ui/SpikeMark";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "Help center", href: "#" },
    { label: "API docs", href: "#" },
    { label: "Brand kit guide", href: "#" },
    { label: "Marketplace sizes", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Refund policy", href: "#" },
    { label: "GST info", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-surface-dark text-on-dark">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <SpikeMark size={22} color="#faf9f5" />
              <span className="text-sm font-medium tracking-tight">
                Seller7 Studio
              </span>
            </div>
            <p className="mt-3 text-sm text-on-dark-soft">
              AI product photos for Indian sellers. One photo in, marketing-ready
              creatives out.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-xs font-medium uppercase tracking-wider text-on-dark-soft">
                  {category}
                </h4>
                <ul className="mt-3 flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-on-dark-soft transition-colors hover:text-on-dark"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-sm text-on-dark-soft">
            A{" "}
            <Link
              href="https://vertexvista.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-dark underline underline-offset-2 hover:text-primary"
            >
              VertexVista
            </Link>{" "}
            product
          </p>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-xs text-muted-soft">
              © {new Date().getFullYear()} Seller7 Studio ·{" "}
              <Link
                href="https://vertexvista.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-on-dark"
              >
                VertexVista
              </Link>
              . Made in India 🇮🇳
            </p>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
