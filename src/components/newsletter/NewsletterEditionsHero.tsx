"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Mail, TrendingUp, ShieldCheck } from "lucide-react";

interface NewsletterEditionsHeroProps {
  latestEdition: number;
}

export default function NewsletterEditionsHero({ latestEdition }: NewsletterEditionsHeroProps) {
  return (
    <section className="relative pt-32 pb-16 px-6 overflow-hidden bg-gradient-to-b from-surface via-surface-container-low to-surface">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-surface-container-highest/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-primary text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-secondary-container" />
          <span>The CFO AI Hub Newsletter</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-on-surface tracking-tight leading-[1.15] mb-6"
        >
          Complete Weekly Editions, <br className="hidden sm:inline" />
          <span className="text-gradient-primary">Straight From the Newsroom</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Every full edition of the CFO AI Hub newsletter — news roundups, featured practitioner articles, tool comparisons, and community polls — in one place.
        </motion.p>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-text-muted"
        >
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            <span>Delivered Every Friday</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-secondary" />
            <span>Edition #{latestEdition} Active</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Zero Vendor Fluff • 100% Practitioner Tested</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
