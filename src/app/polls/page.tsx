import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PollHero from "@/components/polls/PollHero";
import ExecutivePollCard from "@/components/polls/ExecutivePollCard";
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

        {/* Featured Active Poll Card matching user design */}
        {activePoll && (
          <div className="w-full max-w-4xl mx-auto px-6 mb-20">
            <div className="max-w-[540px] mx-auto mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Featured Weekly Poll
              </span>
              <span className="text-xs text-text-muted font-medium">
                Live Community Survey
              </span>
            </div>
            <ExecutivePollCard poll={activePoll} />
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
