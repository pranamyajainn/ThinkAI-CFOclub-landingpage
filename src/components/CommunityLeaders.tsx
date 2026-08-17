"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Award, Building2 } from "lucide-react";

interface Leader {
  name: string;
  role: string;
  image: string;
  experiencePill: string;
  companies: string[];
  bio: string[];
}

const leaders: Leader[] = [
  {
    name: "Atul Kulshreshtha",
    role: "Founder – GroByz Partners",
    image: "/images/leaders/atul-kulshreshtha.png",
    experiencePill: "37+ Years Experience",
    companies: ["Capgemini", "GE", "American Express", "FIS", "Tata Group"],
    bio: [
      "Atul is a seasoned business leader with over 37 years of global experience across the ITES industry, having held senior roles at Capgemini, GE, American Express, FIS, and the Tata Group. He founded GroByz Partners, a strategic advisory firm that empowers tech-driven businesses and startups to scale with clarity, precision, and purpose.",
      "His rare combination of expertise across Finance, Business Strategy, Operations, Client Management, and Technology Consulting lets him approach challenges holistically. He is passionate about behavioural science, disruptive technologies, and talent development — and believes success is built on strong teams and flawless execution.",
    ],
  },
  {
    name: "Rahul Jain",
    role: "CEO – Selona & Care By Tech",
    image: "/images/leaders/rahul-jain.png",
    experiencePill: "25+ Years Experience",
    companies: ["Capgemini", "IGATE", "Patni", "Perot Systems (NTT Data)", "Xansa"],
    bio: [
      "Rahul is a professional business builder, entrepreneur and trainer with a passion for scaling AI-led businesses and developing people. As CEO of Care by Tech (AI-driven sales intelligence and digital marketing for B2B start-ups and scale-ups) and CEO of Selona (an AI-only services company automating back-office processes), he combines hands-on leadership with deep domain expertise. As a trainer at upGrad, he runs programmes on Business Consulting and AI for Business Leaders, CXOs and Women CXOs.",
      "With more than 25 years across P&L, portfolio, sales and account management in the insurance sector, he brings a proven track record of building consulting, advisory, digital, cloud, data & analytics and BPO businesses — having worked with Capgemini, IGATE, Patni, Perot Systems (now NTT Data) and Xansa.",
    ],
  },
];

export default function CommunityLeaders() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden" id="community-leaders">
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-secondary-container/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container/15 text-secondary text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Leadership</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-primary tracking-tight mb-4"
          >
            Community Leaders
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base sm:text-lg text-on-surface-variant leading-relaxed"
          >
            Practitioner-builders bringing over 60 years of collective global finance leadership,
            enterprise consulting, and AI-native execution.
          </motion.p>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {leaders.map((leader, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white rounded-[28px] sm:rounded-[32px] border border-surface-dim p-7 sm:p-10 shadow-[0_12px_40px_rgba(0,19,86,0.05)] hover:shadow-[0_20px_50px_rgba(0,19,86,0.09)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Portrait + Identity */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-surface-dim">
                  {/* Portrait Headshot (Clean, full-bleed square portrait with no text inside) */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#F0F3FA] border border-surface-dim shadow-sm flex-shrink-0">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>

                  {/* Name, Role & Experience Tag */}
                  <div className="flex-grow">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-2">
                      <Award className="w-3 h-3" />
                      {leader.experiencePill}
                    </div>

                    <h3 className="text-2xl sm:text-[26px] font-bold font-display text-primary leading-tight">
                      {leader.name}
                    </h3>

                    <p className="text-sm sm:text-base font-semibold text-secondary mt-1">
                      {leader.role}
                    </p>
                  </div>
                </div>

                {/* Bio Paragraphs */}
                <div className="pt-6 space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed font-sans">
                  {leader.bio.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Bottom Metadata: Former Organizations & Enterprise Track Record */}
              <div className="mt-8 pt-6 border-t border-surface-dim">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5 text-secondary" />
                  <span>Leadership & Enterprise Track Record</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {leader.companies.map((org, oIdx) => (
                    <span
                      key={oIdx}
                      className="px-2.5 py-1 rounded-md bg-surface-subtle text-xs font-medium text-text-muted border border-surface-dim/60"
                    >
                      {org}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
