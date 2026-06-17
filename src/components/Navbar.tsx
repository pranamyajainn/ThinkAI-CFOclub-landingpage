"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "h-16 bg-surface-container-lowest/80 backdrop-blur-md border-b border-surface-dim/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
            : "h-24 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <Image
              src="/selona-logo.png"
              alt="Selona Logo"
              width={120}
              height={32}
              className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              priority
            />
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <a
                href="#why-join"
                className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium tracking-wide"
              >
                Why Join
              </a>
            </li>
            <li>
              <a
                href="#playground"
                className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium tracking-wide"
              >
                AI Playground
              </a>
            </li>
            <li>
              <a
                href="#what-you-get"
                className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium tracking-wide"
              >
                What You Get
              </a>
            </li>
            <li>
              <a
                href="#apply"
                className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium tracking-wide"
              >
                Waitlist
              </a>
            </li>
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href="#apply"
              className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-secondary-container text-on-secondary font-semibold text-sm transition-all duration-200 hover:bg-secondary hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              Join the Waitlist
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-primary hover:bg-surface-container rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden bg-surface pt-28 px-6 pb-8 flex flex-col justify-between"
          >
            <div className="flex flex-col space-y-6">
              <a
                onClick={() => setMobileMenuOpen(false)}
                href="#why-join"
                className="text-2xl font-display font-semibold text-primary pb-3 border-b border-surface-dim"
              >
                Why Join
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                href="#playground"
                className="text-2xl font-display font-semibold text-primary pb-3 border-b border-surface-dim"
              >
                AI Playground
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                href="#what-you-get"
                className="text-2xl font-display font-semibold text-primary pb-3 border-b border-surface-dim"
              >
                What You Get
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                href="#apply"
                className="text-2xl font-display font-semibold text-primary pb-3 border-b border-surface-dim"
              >
                Waitlist
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <a
                onClick={() => setMobileMenuOpen(false)}
                href="#apply"
                className="w-full py-4 text-center rounded-xl bg-secondary-container text-on-secondary font-bold text-lg flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
              >
                Apply for Membership
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-center text-xs text-text-muted">
                Executive cohort space is strictly limited.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
