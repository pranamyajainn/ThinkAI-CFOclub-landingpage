import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PollHero from "@/components/polls/PollHero";
import PollCard from "@/components/polls/PollCard";
import PollsGrid from "@/components/polls/PollsGrid";
import NewsletterSubscribe from "@/components/newsletter/NewsletterSubscribe";
import { getAllPolls, getActivePoll, getAllPollCategories } from "@/lib/polls";

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
  const polls = getAllPolls();
  const activePoll = getActivePoll();
  const categories = getAllPollCategories();
  const totalVotes = polls.reduce((sum, p) => sum + p.totalVotes, 0);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8F9FD] text-on-surface">
      <Navbar />

      <main className="flex-grow">
        {/* Header Hero */}
        <PollHero totalPolls={polls.length} totalVotes={totalVotes} />

        {/* Featured Active Poll Card */}
        {activePoll && (
          <div className="w-full max-w-2xl mx-auto px-6 mb-20">
            {/* Live Community Survey — the first thing visitors should notice here */}
            <div className="flex justify-center mb-5">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-secondary text-white text-sm font-extrabold uppercase tracking-wider shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                </span>
                <span>Live Community Survey</span>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-center">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Featured Weekly Poll
              </span>
            </div>
            <PollCard poll={activePoll} />
          </div>
        )}

        {/* Filterable List of All Polls */}
        <PollsGrid polls={polls} categories={categories} />

        {/* Newsletter Subscription */}
        <NewsletterSubscribe />
      </main>

      <Footer />
    </div>
  );
}
