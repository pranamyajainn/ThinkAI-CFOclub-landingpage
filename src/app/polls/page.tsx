import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PollCard from "@/components/polls/PollCard";
import { getActivePoll } from "@/lib/polls";

export const metadata: Metadata = {
  title: "Executive Finance Polls & Benchmarks — CFO AI Hub",
  description: "Participate in weekly CFO community pulse polls on AI adoption, Making Tax Digital, autonomous FP&A, and liquidity forecasting.",
  openGraph: {
    title: "Executive Finance Polls & Benchmarks — CFO AI Hub",
    description: "Real-time practitioner sentiment from 400+ senior finance leaders across the UK and globally.",
    type: "website",
  },
};

export default function PollsHubPage() {
  const activePoll = getActivePoll();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8F9FD] text-on-surface">
      <Navbar />

      <main className="flex-grow">
        {activePoll && (
          <div className="w-full max-w-2xl mx-auto px-6 pt-40 pb-20">
            {/* Live Community Survey — the only thing above the poll itself */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-secondary text-white text-sm font-extrabold uppercase tracking-wider shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                </span>
                <span>Live Community Survey</span>
              </div>
            </div>

            <PollCard poll={activePoll} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
