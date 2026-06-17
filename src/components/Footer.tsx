import React from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-on-primary py-16 border-t border-primary-container">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-2 flex flex-col items-start">
          <div className="flex items-center mb-4">
            <Image
              src="/selona-logo.png"
              alt="Selona Logo"
              width={105}
              height={28}
              className="h-7 w-auto object-contain brightness-0 invert"
            />
          </div>
          <p className="text-xs text-on-primary/60 max-w-sm leading-relaxed">
            {"Selona's CFO Intelligence Club represents a private executive-level task force dedicated to scaling AI operations securely inside mid-market and enterprise finance divisions."}
          </p>
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
                href="#"
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
          © 2026 Selona CFO Intelligence Club. All rights reserved.
        </p>
        <p className="text-[10px] font-medium text-on-primary/40">
          Curated by practitioners, engineered with precision.
        </p>
      </div>
    </footer>
  );
}
