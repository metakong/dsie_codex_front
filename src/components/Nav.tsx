"use client";

import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Brand */}
        <Link href="/" className="font-display text-2xl text-gold tracking-widest hover:text-goldLight transition-colors">
          THE DSIE CODEX
        </Link>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/how-it-works" className="font-sans text-sm font-medium text-cream/80 hover:text-gold transition-colors">
            How It Works
          </Link>
          <Link href="/services" className="font-sans text-sm font-medium text-cream/80 hover:text-gold transition-colors">
            Services
          </Link>
          <Link href="/about" className="font-sans text-sm font-medium text-cream/80 hover:text-gold transition-colors">
            About
          </Link>
        </div>

        {/* Right: CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/book"
            className="border border-gold text-cream px-4 py-2 hover:bg-gold hover:text-background transition-all font-sans text-sm tracking-wide font-medium"
          >
            Book a Session
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="md:hidden text-cream hover:text-gold focus:outline-none"
          aria-label="Toggle menu"
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

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-16 bg-background flex flex-col items-center justify-center space-y-8 z-40 md:hidden animate-fade-in">
          <Link
            onClick={() => setIsOpen(false)}
            href="/how-it-works"
            className="font-sans text-2xl text-cream/80 hover:text-gold transition-colors"
          >
            How It Works
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href="/services"
            className="font-sans text-2xl text-cream/80 hover:text-gold transition-colors"
          >
            Services
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href="/about"
            className="font-sans text-2xl text-cream/80 hover:text-gold transition-colors"
          >
            About
          </Link>
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
