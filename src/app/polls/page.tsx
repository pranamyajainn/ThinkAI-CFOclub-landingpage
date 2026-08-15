import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PollHero from "@/components/polls/PollHero";
import PollVotingCard from "@/components/polls/PollVotingCard";
import PollsGrid from "@/components/polls/PollsGrid";
import NewsletterSubscribe from "@/components/newsletter/NewsletterSubscribe";
import { getAllPolls, getActivePoll, getAllPollCategories } from "@/lib/polls";

export const metadata: Metadata = {
  title: "Executive Finance Polls & Benchmarks — CFO AI Hub",
  description: "Participate in weekly CFO community pulse polls on Making Tax Digital, AI budgeting, autonomous FP&A, and liquidity forecasting.",
  openGraph: {
    title: "Executive Finance Polls & Benchmarks — CFO AI Hub",
    description: "Real-time practitioner sentiment from 1,200+ senior finance leaders across the UK and globally.",
    type: "website",
  },
};

export default function PollsHubPage() {
  const polls = getAllPolls();
  const activePoll = getActivePoll();
  const categories = getAllPollCategories();
  const totalVotes = polls.reduce((sum, p) => sum + p.totalVotes, 0);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-on-surface">
      <Navbar />

      <main className="flex-grow">
        {/* Header Hero */}
        <PollHero totalPolls={polls.length} totalVotes={totalVotes} />

        {/* Active Featured Poll Spotlight */}
        {activePoll && (
          <div className="w-full max-w-4xl mx-auto px-6 mb-16">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                🔥 Active Community Spotlight
              </span>
              <span className="text-xs text-text-muted">
                Closes {activePoll.closingDate ? new Date(activePoll.closingDate).toLocaleDateString() : "Soon"}
              </span>
            </div>
            <PollVotingCard poll={activePoll} />
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
