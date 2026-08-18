import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

/**
 * Shared shell for legal documents (Privacy Policy, Terms of Service).
 * Plain, readable prose — no marketing chrome — with the site's own
 * nav/footer/fonts/colors around it.
 */
export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-on-surface">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-secondary transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold font-display text-primary tracking-tight mb-3">
            {title}
          </h1>
          <p className="text-xs text-text-muted font-semibold mb-12">
            Last updated: {lastUpdated}
          </p>

          <div className="prose-legal space-y-8 text-sm sm:text-base text-on-surface-variant leading-relaxed">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
