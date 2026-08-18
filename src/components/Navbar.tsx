"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown, Mail, Newspaper, BarChart3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isResourcesRoute =
    pathname.startsWith("/newsletter") ||
    pathname.startsWith("/articles") ||
    pathname.startsWith("/polls") ||
    pathname.startsWith("/poll/");

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

  // Close the desktop Resources dropdown on outside click or Escape
  useEffect(() => {
    if (!resourcesOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setResourcesOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [resourcesOpen]);

  const getHref = (hash: string) => {
    return isHomePage ? hash : `/${hash}`;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "h-16 bg-surface-container-lowest/90 backdrop-blur-md border-b border-surface-dim/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            : "h-24 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/cfo-ai-hub-logo.png"
              alt="CFO AI Hub Logo"
              width={200}
              height={50}
              className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center space-x-7 lg:space-x-8">
            <li>
              <a
                href={getHref("#why-join")}
                className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium tracking-wide"
              >
                Why Join
              </a>
            </li>
            <li>
              <a
                href={getHref("#what-you-get")}
                className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium tracking-wide"
              >
                What You Get
              </a>
            </li>
            <li>
              <a
                href={getHref("#about-us")}
                className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium tracking-wide"
              >
                About Us
              </a>
            </li>

            {/* Resources Dropdown */}
            <li
              ref={resourcesRef}
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setResourcesOpen((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={resourcesOpen}
                className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors cursor-pointer ${
                  isResourcesRoute
                    ? "text-primary font-bold"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                <span>Resources</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-56"
                  >
                    <div className="rounded-xl bg-surface-pure border border-surface-dim shadow-[0_12px_32px_rgba(0,0,0,0.08)] overflow-hidden">
                      <Link
                        href="/newsletter"
                        onClick={() => setResourcesOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-on-surface hover:bg-surface-subtle transition-colors"
                      >
                        <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                        <span className="flex-grow">Newsletter</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-secondary-container/15 text-secondary">
                          Editions
                        </span>
                      </Link>
                      <div className="border-t border-surface-dim/60" />
                      <Link
                        href="/articles"
                        onClick={() => setResourcesOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-on-surface hover:bg-surface-subtle transition-colors"
                      >
                        <Newspaper className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="flex-grow">Articles</span>
                      </Link>
                      <div className="border-t border-surface-dim/60" />
                      <Link
                        href="/polls"
                        onClick={() => setResourcesOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-on-surface hover:bg-surface-subtle transition-colors"
                      >
                        <BarChart3 className="w-4 h-4 text-secondary flex-shrink-0" />
                        <span className="flex-grow">Polls</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-secondary-container/15 text-secondary">
                          Live
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li>
              <a
                href={getHref("#apply")}
                className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium tracking-wide"
              >
                Waitlist
              </a>
            </li>
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href={getHref("#apply")}
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
            className="fixed inset-0 z-40 md:hidden bg-surface pt-28 px-6 pb-8 flex flex-col justify-between overflow-y-auto"
          >
            <div className="flex flex-col space-y-5">
              <a
                onClick={() => setMobileMenuOpen(false)}
                href={getHref("#why-join")}
                className="text-2xl font-display font-semibold text-primary pb-3 border-b border-surface-dim"
              >
                Why Join
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                href={getHref("#what-you-get")}
                className="text-2xl font-display font-semibold text-primary pb-3 border-b border-surface-dim"
              >
                What You Get
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                href={getHref("#about-us")}
                className="text-2xl font-display font-semibold text-primary pb-3 border-b border-surface-dim"
              >
                About Us
              </a>

              {/* Mobile Resources expandable submenu */}
              <div className="border-b border-surface-dim pb-3">
                <button
                  type="button"
                  onClick={() => setMobileResourcesOpen((prev) => !prev)}
                  aria-expanded={mobileResourcesOpen}
                  className="w-full flex items-center justify-between text-2xl font-display font-semibold text-primary cursor-pointer"
                >
                  <span>Resources</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${mobileResourcesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {mobileResourcesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-1 pt-4">
                        <Link
                          onClick={() => setMobileMenuOpen(false)}
                          href="/newsletter"
                          className="flex items-center gap-3 py-3 px-1 text-lg font-semibold text-on-surface active:text-primary"
                        >
                          <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                          <span>Newsletter</span>
                        </Link>
                        <Link
                          onClick={() => setMobileMenuOpen(false)}
                          href="/articles"
                          className="flex items-center gap-3 py-3 px-1 text-lg font-semibold text-on-surface active:text-primary"
                        >
                          <Newspaper className="w-5 h-5 text-primary flex-shrink-0" />
                          <span>Articles</span>
                        </Link>
                        <Link
                          onClick={() => setMobileMenuOpen(false)}
                          href="/polls"
                          className="flex items-center gap-3 py-3 px-1 text-lg font-semibold text-on-surface active:text-primary"
                        >
                          <BarChart3 className="w-5 h-5 text-secondary flex-shrink-0" />
                          <span>Polls</span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                onClick={() => setMobileMenuOpen(false)}
                href={getHref("#apply")}
                className="text-2xl font-display font-semibold text-primary pb-3 border-b border-surface-dim"
              >
                Waitlist
              </a>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <a
                onClick={() => setMobileMenuOpen(false)}
                href={getHref("#apply")}
                className="w-full py-4 text-center rounded-xl bg-secondary-container text-on-secondary font-bold text-lg flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
              >
                Join the Waitlist
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-center text-xs text-text-muted">
                Join our waitlist for weekly briefings & community access.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
