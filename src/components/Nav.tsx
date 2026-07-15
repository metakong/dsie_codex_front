"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/what-is-dsie", label: "What is DSIE?" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
] as const;

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Close the menu whenever navigation completes (covers back/forward too).
  // State is adjusted during render — React's recommended alternative to a
  // setState-in-effect, which the react-hooks lint rule rejects.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    // The blurred header bar and the mobile overlay must be SIBLINGS: backdrop-filter
    // turns an element into the containing block for fixed-position descendants, so a
    // fixed overlay nested inside the blurred bar would size itself against the 64px
    // bar instead of the viewport and render as a collapsed, overlapping jumble.
    <nav aria-label="Main navigation">
      <div className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="font-display text-2xl text-gold tracking-widest hover:text-goldLight transition-colors"
          >
            THE DSIE CODEX
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-sans text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "text-gold"
                    : "text-cream/80 hover:text-gold"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/book"
              className={`border border-gold px-4 py-2 transition-all font-sans text-sm tracking-wide font-medium ${
                pathname === "/book"
                  ? "bg-gold text-background"
                  : "text-cream hover:bg-gold hover:text-background"
              }`}
            >
              Book a Session
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="md:hidden text-cream hover:text-gold focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-16 bg-background flex flex-col items-center justify-center space-y-8 z-40 md:hidden animate-fade-in"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              onClick={() => setIsOpen(false)}
              href={href}
              className={`font-sans text-2xl transition-colors ${
                isActive(href) ? "text-gold" : "text-cream/80 hover:text-gold"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            onClick={() => setIsOpen(false)}
            href="/book"
            className="border border-gold text-gold hover:bg-gold hover:text-background text-xl px-8 py-3 transition-all font-sans tracking-wide font-medium"
          >
            Book a Session
          </Link>
        </div>
      )}
    </nav>
  );
}
