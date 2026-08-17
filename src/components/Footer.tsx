import React from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-on-primary py-16 border-t border-primary-container">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-2 flex flex-col items-start">
          <div className="flex items-center mb-4">
            <Link href="/">
              <Image
                src="/cfo-ai-hub-logo.png"
                alt="CFO AI Hub Logo"
                width={160}
                height={40}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
          </div>
          <p className="text-xs text-on-primary/70 max-w-sm leading-relaxed mb-4">
            {"CFO AI Hub is Selona's practitioner-built newsletter and community for finance leaders implementing AI. Built from 9 months of live CFO events across the UK and India."}
          </p>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-primary-container text-[11px] font-medium text-secondary-fixed">
            <span>Weekly Friday Briefing</span>
          </div>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-container mb-4 font-display">
            Platform
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link
                href="/newsletter"
                className="text-xs text-on-primary/80 hover:text-white transition-colors font-medium flex items-center gap-1.5"
              >
                <span>Newsletter Hub</span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-container" />
              </Link>
            </li>
            <li>
              <Link
                href="/polls"
                className="text-xs text-on-primary/80 hover:text-white transition-colors font-medium flex items-center gap-1.5"
              >
                <span>Community Polls</span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-secondary-container text-white">
                  Live
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/#why-join"
                className="text-xs text-on-primary/70 hover:text-white transition-colors font-medium"
              >
                Why Join
              </Link>
            </li>
            <li>
              <Link
                href="/#playground"
                className="text-xs text-on-primary/70 hover:text-white transition-colors font-medium"
              >
                Content Preview
              </Link>
            </li>
            <li>
              <Link
                href="/#community-leaders"
                className="text-xs text-on-primary/70 hover:text-white transition-colors font-medium"
              >
                Community Leaders
              </Link>
            </li>
            <li>
              <Link
                href="/#apply"
                className="text-xs text-on-primary/70 hover:text-white transition-colors font-medium"
              >
                Join Waitlist
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-container mb-4 font-display">
            Legal
          </h4>
          <ul className="space-y-2.5">
            <li>
              <a
                href="#"
                className="text-xs text-on-primary/70 hover:text-white transition-colors font-medium"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-xs text-on-primary/70 hover:text-white transition-colors font-medium"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Connect Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-container mb-4 font-display">
            Connect
          </h4>
          <ul className="space-y-2.5">
            <li>
              <a
                href="mailto:contact@selona.ai"
                className="text-xs text-on-primary/70 hover:text-white transition-colors font-medium"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-on-primary/70 hover:text-white transition-colors font-medium inline-flex items-center gap-1 group"
              >
                LinkedIn
                <ArrowUpRight className="w-3.5 h-3.5 text-on-primary/40 group-hover:text-white transition-colors" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copy */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-on-primary/10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-medium text-on-primary/40">
          © 2026 CFO AI Hub by Selona. All rights reserved.
        </p>
        <p className="text-[10px] font-medium text-on-primary/40">
          Curated by practitioners, engineered with precision.
        </p>
      </div>
    </footer>
  );
}
