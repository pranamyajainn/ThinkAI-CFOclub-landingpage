"use client";

import React from "react";
import { motion as framerMotion } from "framer-motion";
import { TrendingUp, AlertCircle, Mail } from "lucide-react";

export default function Ticker() {
  const items = [
    {
      icon: <TrendingUp className="w-5 h-5 text-secondary-container" />,
      highlight: "90%",
      text: "of CFOs expect transformational AI impact in 2 years",
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-secondary-container" />,
      highlight: "0%",
      text: "of 26 executive attendees are using AI effectively",
    },
    {
      icon: <Mail className="w-5 h-5 text-secondary-container" />,
      highlight: "64%",
      text: "remain stuck using AI strictly for emails",
    },
  ];

  return (
    <section className="py-8 bg-surface-pure border-y border-surface-dim/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <framerMotion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12"
        >
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              <framerMotion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 bg-primary px-6 py-3.5 rounded-full text-on-primary shadow-sm hover:shadow-md transition-shadow cursor-default"
              >
                {item.icon}
                <p className="font-sans text-xs md:text-sm font-medium">
                  <span className="text-secondary-container font-extrabold mr-1">{item.highlight}</span>
                  {item.text}
                </p>
              </framerMotion.div>
              {idx < items.length - 1 && (
                <div className="hidden md:block w-px h-6 bg-surface-dim"></div>
              )}
            </React.Fragment>
          ))}
        </framerMotion.div>
        <p className="text-center text-[10px] font-semibold text-text-muted mt-5">
          {"*Real survey data collected from Selona's June 2026 Financial AI Summit"}
        </p>
      </div>
    </section>
  );
}
