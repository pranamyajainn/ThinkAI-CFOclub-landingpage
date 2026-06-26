"use client";

import React from "react";
import { motion } from "framer-motion";

export default function WhatWeCover() {
  const categories = [
    "AI Use Cases in Finance",
    "Tools & LLMs",
    "System Connectors & Integrations",
    "Regulation & Compliance",
    "Case Studies",
    "Guest POV",
    "Geographical Trends",
    "Tax",
    "Sector-Specific Accounting",
    "Carbon Accounting",
    "Benchmarks",
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  } as const;

  const pillVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  } as const;

  return (
    <section className="py-20 bg-surface-subtle" id="what-we-cover">
      <div className="max-w-[800px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-4">
            What We Cover Every Month
          </h2>
          <p className="font-sans text-base md:text-lg text-on-surface-variant leading-relaxed">
            11 content categories. Every issue covers 3–4 of them. Skim to what matters to you.
          </p>
        </div>

        {/* Categories Pills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap gap-3 justify-center max-w-[800px] mx-auto"
        >
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={pillVariants}
              whileHover={{ scale: 1.03, y: -2, transition: { duration: 0.2 } }}
              className="bg-[#1B2B6B] text-white rounded-[6px] border-l-[3px] border-l-[#E8762B] py-3 px-5 text-sm font-medium shadow-[0_2px_8px_rgba(27,43,107,0.08)] select-none cursor-default"
            >
              {category}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
