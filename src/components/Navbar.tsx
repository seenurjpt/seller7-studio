"use client";

import { SpikeMark } from "@/components/ui/SpikeMark";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          scrolled
            ? "bg-canvas/80 backdrop-blur-md border-b border-hairline"
            : "bg-canvas"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-5 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <SpikeMark size={22} className="text-ink" />
            <span className="text-sm font-medium text-ink tracking-tight">
              Seller7 Studio
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              ✨ Powered by AI
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="#"
              className="text-sm text-muted transition-colors hover:text-ink px-2"
            >
              Sign in
            </Link>
            <Link
              href="#pricing"
              className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-on-primary transition-colors hover:bg-primary-active"
            >
              Start free
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-ink hover:bg-surface-card"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-canvas lg:hidden pt-16"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="flex flex-col gap-1 px-5 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-lg text-ink hover:bg-surface-card transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3 border-t border-hairline pt-6">
              <Link
                href="#"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-center text-muted hover:bg-surface-card"
              >
                Sign in
              </Link>
              <Link
                href="#pricing"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-primary px-4 py-3 text-center text-sm font-medium text-on-primary hover:bg-primary-active"
              >
                Start free
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
