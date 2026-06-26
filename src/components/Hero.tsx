"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, DollarSign, Brain } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden bg-surface noise-bg">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/hero-bg-new.png"
          alt="CFO AI Hub Hero Background"
          fill
          className="object-cover object-right opacity-30 md:opacity-40"
          priority
        />
      </div>

      {/* Dynamic Aurora glow effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-surface-container-highest/60 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute top-1/2 -left-60 w-[500px] h-[500px] rounded-full bg-surface-dim/40 blur-[120px] animate-float"></div>
        <div className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-surface-container/50 blur-[90px] animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Headline and Copy */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Status Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high/80 border border-surface-dim/80 shadow-[0_2px_10px_rgba(0,0,0,0.01)] mb-6"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse"></span>
            <span className="font-sans text-xs font-semibold text-primary tracking-wide">
              Applications open for Founding Members
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-3xl sm:text-5xl md:text-7xl font-black text-primary mb-6 tracking-tight leading-none"
          >
            90% of CFOs believe AI will transform finance.{" "}
            <span className="text-gradient-secondary">0%</span> are using it effectively.{" "}
            <span className="text-secondary-container">Yet.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-base md:text-lg text-on-surface-variant mb-8 leading-relaxed max-w-2xl"
          >
            We close that gap. Get monthly practitioner briefings, interactive workshops, and a peer community of finance leaders actually executing AI integrations.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a
              href="#apply"
              className="bg-secondary-container hover:bg-secondary text-on-secondary px-8 py-4 rounded-xl font-bold text-base text-center transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
            >
              Apply for Membership
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#playground"
              className="border border-outline-variant hover:border-outline text-primary bg-surface-pure/40 hover:bg-surface-pure/80 backdrop-blur-sm px-7 py-4 rounded-xl font-semibold text-base text-center transition-all duration-200 hover:shadow-sm"
            >
              Explore AI Playground
            </a>
          </motion.div>

          {/* Integrations row */}
          <motion.div
            variants={itemVariants}
            className="mt-10 pt-6 border-t border-surface-dim/50 w-full"
          >
            <p className="text-[10px] uppercase tracking-wider font-extrabold text-text-muted mb-3">
              INTEGRATES SECURELY WITH:
            </p>
            <div className="flex flex-wrap gap-2.5 text-[10px] text-primary/60 font-sans font-bold select-none">
              <span className="px-2.5 py-1 rounded bg-surface-container-low border border-surface-dim/40">NetSuite</span>
              <span className="px-2.5 py-1 rounded bg-surface-container-low border border-surface-dim/40">Stripe</span>
              <span className="px-2.5 py-1 rounded bg-surface-container-low border border-surface-dim/40">Salesforce</span>
              <span className="px-2.5 py-1 rounded bg-surface-container-low border border-surface-dim/40">Excel</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Floating Premium Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.4 }}
          className="lg:col-span-5 relative hidden lg:block"
        >
          {/* Ambient Glow behind Dashboard */}
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary-container/10 to-primary-container/20 rounded-3xl -m-6 blur-2xl opacity-75"></div>

          {/* Core Mockup Container */}
          <div className="relative z-10 glass-panel rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,19,86,0.08)] animate-float">
            {/* Window bar */}
            <div className="flex items-center justify-between pb-4 border-b border-surface-dim mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400/80"></span>
                <span className="w-3 h-3 rounded-full bg-green-400/80"></span>
              </div>
              <span className="text-xs text-text-muted font-medium bg-surface-container px-3 py-1 rounded-full">
                selona.ai/dashboard
              </span>
              <Sparkles className="w-4 h-4 text-secondary-container" />
            </div>

            {/* Simulated Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Stat 1 */}
              <div className="bg-surface-pure/90 p-4 rounded-xl border border-surface-dim shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-text-muted">AI Efficiency Gain</span>
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold text-primary font-display">+42.8%</div>
                <span className="text-[10px] text-emerald-500 font-medium">+8.2% vs last month</span>
              </div>

              {/* Stat 2 */}
              <div className="bg-surface-pure/90 p-4 rounded-xl border border-surface-dim shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-text-muted">CFO Time Saved</span>
                  <Brain className="w-4 h-4 text-secondary-container" />
                </div>
                <div className="text-2xl font-bold text-primary font-display">18.5 hrs</div>
                <span className="text-[10px] text-text-muted">Saved per manager / mo</span>
              </div>
            </div>

            {/* Custom Visualized SVG Chart Container */}
            <div className="bg-primary-container text-on-primary p-4 rounded-xl border border-primary/20 shadow-[0_4px_12px_rgba(0,0,0,0.02)] relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-xs font-semibold text-on-primary/60">Automated Cash Flow Forecast</h4>
                  <div className="text-lg font-bold font-display text-white">$1,482,000</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-white font-medium flex items-center gap-1">
                  <DollarSign className="w-2.5 h-2.5" /> Live
                </span>
              </div>

              {/* Simulated Chart Line */}
              <div className="h-28 flex items-end pt-4 relative">
                <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                  <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                  <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

                  {/* Shaded Area */}
                  <path
                    d="M 0 35 Q 15 28, 30 18 T 60 12 T 80 15 T 100 2 L 100 40 L 0 40 Z"
                    fill="url(#chartGlow)"
                    opacity="0.3"
                  />
                  {/* Glowing Line */}
                  <path
                    d="M 0 35 Q 15 28, 30 18 T 60 12 T 80 15 T 100 2"
                    fill="none"
                    stroke="#fc853a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Gradient definitions */}
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fc853a" />
                      <stop offset="100%" stopColor="#fc853a" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Floating tooltips */}
                <div className="absolute top-2 right-4 bg-secondary-container text-on-secondary px-1.5 py-0.5 rounded text-[8px] font-bold shadow-md">
                  AI Model: 98.4% Acc
                </div>
              </div>
            </div>

            {/* Bottom active notification card */}
            <div className="mt-4 p-3 bg-surface-container rounded-lg border border-surface-dim flex items-center gap-3">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary/5 text-primary">
                <Brain className="w-4 h-4 animate-bounce" />
              </div>
              <div>
                <p className="text-xs font-semibold text-primary">AI Agent: Audit Prep complete</p>
                <p className="text-[10px] text-text-muted">Reconciled 14,281 entries in 42 seconds</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
