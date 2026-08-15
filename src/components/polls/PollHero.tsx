"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Users, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";

interface PollHeroProps {
  totalPolls: number;
  totalVotes: number;
}

export default function PollHero({ totalPolls, totalVotes }: PollHeroProps) {
  return (
    <section className="relative pt-32 pb-14 px-6 overflow-hidden bg-gradient-to-b from-surface via-surface-container-low to-surface">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-secondary-container/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container/15 border border-secondary-container/20 text-secondary text-xs font-bold uppercase tracking-wider mb-6"
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Weekly Executive Sentiment & Community Pulse</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-on-surface tracking-tight leading-[1.15] mb-6"
        >
          Real-Time Benchmarks from <br className="hidden sm:inline" />
          <span className="text-gradient-primary">CFOs & Finance Leaders</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Every newsletter edition features a live community poll on compliance, AI budgeting, and workflow automation. Vote to benchmark your operation against your peers.
        </motion.p>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-text-muted"
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span>Anonymous & Verified Practitioner Data</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-secondary" />
            <span>Instant Results Breakdown</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Tied to Weekly Intelligence Briefings</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
