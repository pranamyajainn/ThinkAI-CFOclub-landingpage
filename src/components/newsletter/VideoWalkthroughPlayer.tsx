"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Sparkles, X, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { ArticleMedia } from "@/types/newsletter";

interface VideoWalkthroughPlayerProps {
  media: ArticleMedia;
}

export default function VideoWalkthroughPlayer({ media }: VideoWalkthroughPlayerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const demoSteps = [
    {
      title: "Step 1: Automated PDF Intake & OCR Extraction",
      desc: "Incoming supplier invoices are ingested via email/API. Neoflo extracts VAT line items, currency codes, and supplier TINs with 99.8% precision—preventing manual retyping.",
      stat: "Zero manual data entry",
    },
    {
      title: "Step 2: Continuous 3-Way Reconciliation",
      desc: "The system matches line items against Purchase Orders (POs) and Goods Received Notes (GRNs) in real time. Anomalies are flagged before month-end.",
      stat: "100% auditable link graph",
    },
    {
      title: "Step 3: Direct HMRC Ledger Sync",
      desc: "Validated transactions flow through an unbroken digital API pipe into your cloud accounting ledger and ready-to-file VAT return with timestamped proof logs.",
      stat: "Full compliance guaranteed",
    },
  ];

  return (
    <>
      <div className="my-10 rounded-2xl overflow-hidden bg-surface-pure border border-surface-dim/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        {/* Video Poster with Play Overlay */}
        <div className="relative aspect-video w-full group cursor-pointer overflow-hidden bg-primary" onClick={() => setModalOpen(true)}>
          {media.poster ? (
            <Image
              src={media.poster}
              alt={media.title || "Video Walkthrough"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            />
          ) : (
            <div className="w-full h-full bg-primary flex items-center justify-center text-white">
              Video Walkthrough
            </div>
          )}

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />

          {/* Play Button & Tag */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
            <button
              onClick={() => setModalOpen(true)}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-secondary-container text-white flex items-center justify-center shadow-[0_0_30px_rgba(252,133,58,0.5)] group-hover:scale-110 group-active:scale-95 transition-all duration-300 mb-4 cursor-pointer"
              aria-label="Play video walkthrough"
            >
              <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white translate-x-1" />
            </button>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-secondary-container" />
              <span>Interactive Operations Walkthrough</span>
              {media.duration && <span>• {media.duration}</span>}
            </div>
            <h4 className="text-base sm:text-xl font-bold font-display text-white max-w-xl line-clamp-2">
              {media.title}
            </h4>
          </div>
        </div>

        {/* Caption bar */}
        {media.caption && (
          <div className="p-4 sm:p-5 bg-surface-subtle/80 border-t border-surface-dim/60 flex items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              {media.caption}
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:text-secondary-container whitespace-nowrap flex-shrink-0 cursor-pointer"
            >
              <span>Launch Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Interactive Video / Walkthrough Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-surface-pure rounded-2xl border border-surface-dim shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-5 bg-primary text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-secondary-container font-bold flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  Neoflo Product Simulation
                </span>
                <h3 className="text-lg font-bold font-display">{media.title}</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close demo"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video / Graphic Frame */}
            <div className="relative aspect-video w-full bg-black">
              {media.poster && (
                <Image
                  src={media.poster}
                  alt="Neoflo Dashboard"
                  fill
                  className="object-cover"
                />
              )}
              {/* Active Step Highlight Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-primary/90 text-white backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-secondary-container">
                    {demoSteps[activeStep].title}
                  </div>
                  <div className="text-xs text-white/80 mt-0.5 max-w-xl">
                    {demoSteps[activeStep].desc}
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                  <div className="text-xs font-bold text-white bg-white/15 px-2.5 py-1 rounded">
                    {demoSteps[activeStep].stat}
                  </div>
                </div>
              </div>
            </div>

            {/* Step Navigation Tabs */}
            <div className="p-4 sm:p-6 bg-surface-subtle border-t border-surface-dim grid grid-cols-3 gap-3">
              {demoSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    activeStep === idx
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-surface-pure text-on-surface border-surface-dim hover:bg-surface-container"
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1.5 mb-1">
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${
                        activeStep === idx ? "text-secondary-container" : "text-text-muted"
                      }`}
                    />
                    <span>Step {idx + 1}</span>
                  </div>
                  <div className={`text-xs truncate ${activeStep === idx ? "text-white/80" : "text-text-muted"}`}>
                    {step.title.split(":")[1] || step.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
