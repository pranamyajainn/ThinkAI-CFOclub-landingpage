"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Terminal, Users, GraduationCap } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-on-primary" />,
      title: "Monthly Briefings",
      description: "15-minute executive summaries of AI breakthroughs impacting finance.",
      popular: false,
    },
    {
      icon: <Terminal className="w-6 h-6 text-on-primary" />,
      title: "Prompt Library",
      description: "Copy-paste prompts for variance analyses, forecasting, and NetSuite audits.",
      popular: true,
    },
    {
      icon: <Users className="w-6 h-6 text-on-primary" />,
      title: "Peer Forum",
      description: "Direct channel to verified mid-market & enterprise CFOs deploying AI.",
      popular: false,
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-on-primary" />,
      title: "Live Workshops",
      description: "Interactive monthly builds showing real-world finance API integrations.",
      popular: false,
    },
  ];

  return (
    <section className="py-24 bg-surface noise-bg" id="what-you-get">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-sans text-xs font-bold text-secondary-container uppercase tracking-wider mb-3 block">
            Inside the Club
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-primary mb-4">
            Everything Inside the Club
          </h2>
          <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
            A targeted, highly structured ecosystem designed to move you from AI curiosity to operational AI mastery.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeInOut" } }}
              className="relative bg-surface-pure rounded-2xl p-7 border border-surface-dim shadow-[0_4px_20px_rgba(0,19,86,0.01)] hover:shadow-[0_15px_40px_rgba(0,19,86,0.06)] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Popular Badge */}
              {feature.popular && (
                <div className="absolute -top-3.5 left-7 px-3.5 py-1 rounded-full bg-secondary-container text-on-secondary text-[10px] font-bold tracking-wider uppercase shadow-md animate-pulse">
                  Most Popular
                </div>
              )}

              <div className="pt-2">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-6 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
