"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Clock,
  Layers,
  CheckCircle2,
  Users,
  ShieldCheck,
  TrendingUp,
  FolderLock,
  ChevronRight,
} from "lucide-react";

export default function ProblemSolution() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.15,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const problemCards = [
    {
      icon: <Brain className="w-6 h-6 text-primary" />,
      tag: "21/25 CFOs",
      title: "The Knowledge Gap",
      description:
        "A fundamental lack of practical AI skill sets stands as the number one blocker to organizational implementations.",
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      tag: "10/25 CFOs",
      title: "No Time to Learn",
      description:
        "Teams remain buried under month-end closes, audits, and spreadsheet reconciliation, leaving zero bandwidth for research.",
    },
    {
      icon: <Layers className="w-6 h-6 text-primary" />,
      tag: "48% Unused Subscriptions",
      title: "Overwhelmed by Noise",
      description:
        "Thousands of AI apps launch daily. Finance leaders lack a trusted, CFO-level filter to determine which tools actually drive ROI.",
    },
  ];

  const members = [
    { name: "Sarah M.", role: "CFO", company: "Acme Enterprise", match: "Stripe Automation" },
    { name: "Marcus K.", role: "VP Finance", company: "Aether Logistics", match: "Monte Carlo Sim" },
    { name: "David L.", role: "Head of FP&A", company: "Vertex Biotech", match: "SG&A Variance AI" },
  ];

  return (
    <div id="why-join" className="overflow-hidden">
      {/* SECTION: The Problem */}
      <section className="py-24 bg-surface noise-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-sans text-xs font-bold text-secondary-container uppercase tracking-wider mb-3 block">
              The Reality
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-primary mb-4">
              Why CFOs Are Falling Behind
            </h2>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
              The speed of AI progress creates a massive execution gap between elite tech companies
              and traditional finance departments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {problemCards.map((card, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
                className="bg-surface-pure rounded-2xl p-8 border-l-4 border-l-secondary-container border border-surface-dim shadow-[0_4px_25px_rgba(0,19,86,0.02)] hover:shadow-[0_12px_40px_rgba(0,19,86,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center mb-6">
                    {card.icon}
                  </div>
                  <span className="inline-block px-2.5 py-0.5 mb-3.5 rounded bg-secondary-container/10 text-secondary-container text-xs font-bold font-sans">
                    {card.tag}
                  </span>
                  <h3 className="font-display font-bold text-xl text-primary mb-3">
                    {card.title}
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: The Answer */}
      <section className="py-24 bg-surface-subtle border-t border-surface-dim/40">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center">
          {/* Answer Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <span className="font-sans text-xs font-bold text-secondary-container uppercase tracking-wider mb-3 block">
              The Answer
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-primary mb-6 leading-tight">
              Stay Informed.
              <br />
              Without the Research Burden.
            </h2>
            <p className="font-sans text-base md:text-lg text-on-surface-variant mb-8 leading-relaxed">
              CFO Intelligence Club filters the daily tech noise into direct financial applications.
              You gain practical capabilities in under 90 minutes a month.
            </p>

            <ul className="space-y-4 w-full">
              {[
                "Curated insights engineered specifically for senior finance leaders",
                "Ready-to-use custom prompt libraries that automate complex reporting",
                "Strictly practitioner-led briefings—absolutely no product sales pitches",
                "A vetted network of high-caliber peers facing identical challenges",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-secondary-container shrink-0 mt-0.5" />
                  <span className="font-sans text-sm md:text-base text-on-surface-variant">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Interactive Roster Mockup Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            {/* Soft decorative shadow */}
            <div className="absolute inset-0 bg-primary-container/5 rounded-3xl -m-4 blur-xl"></div>

            {/* Simulated Community Roster Dashboard */}
            <div className="relative z-10 glass-panel rounded-2xl p-6 shadow-[0_15px_40px_rgba(0,19,86,0.05)] border border-surface-dim">
              <div className="flex items-center justify-between pb-4 border-b border-surface-dim mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <h4 className="text-xs font-bold text-primary font-display">
                    Exclusive Peer Network Directory
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-secondary-container px-2 py-0.5 bg-secondary-container/5 rounded border border-secondary-container/10">
                  Vetted Members Only
                </span>
              </div>

              {/* Roster profiles */}
              <div className="space-y-3">
                {members.map((member, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-surface-pure/90 rounded-xl border border-surface-dim flex items-center justify-between hover:bg-surface-pure transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-display font-bold text-xs shadow-sm">
                        {member.name.split(" ")[0][0]}
                        {member.name.split(" ")[1] ? member.name.split(" ")[1][0] : ""}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-primary flex items-center gap-1.5">
                          {member.name}
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 fill-emerald-50" />
                        </div>
                        <p className="text-[10px] text-text-muted">
                          {member.role} — {member.company}
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-1 rounded bg-surface-container text-primary font-semibold flex items-center gap-1">
                      <TrendingUp className="w-2.5 h-2.5 text-secondary-container" />
                      {member.match}
                    </span>
                  </div>
                ))}
              </div>

              {/* Active Prompt Library Indicator */}
              <div className="mt-4 p-4 bg-primary text-on-primary rounded-xl border border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
                    <FolderLock className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold">Active Prompt Library</h5>
                    <p className="text-[9px] text-on-primary/60">Updated 4 hours ago by fp&a task force</p>
                  </div>
                </div>
                <a
                  href="#playground"
                  className="text-[10px] font-bold text-secondary-container flex items-center gap-1 hover:text-white transition-colors"
                >
                  Inspect Library
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
