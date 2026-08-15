"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Poll } from "@/types/poll";
import { Vote, ArrowRight, CheckCircle2, BarChart3, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface EmbeddedPollWidgetProps {
  poll: Poll;
}

export default function EmbeddedPollWidget({ poll }: EmbeddedPollWidgetProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null);
  const [pollData, setPollData] = useState<Poll>(poll);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`cfo_poll_${poll.id}`);
      if (stored) {
        setHasVoted(true);
        setVotedOptionId(stored);
      }
    }
  }, [poll.id]);

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption || hasVoted) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/polls/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pollId: poll.id,
          optionId: selectedOption,
          voterRole: "Article Reader",
        }),
      });

      const updated = pollData.options.map((opt) =>
        opt.id === selectedOption ? { ...opt, votes: opt.votes + 1 } : opt
      );

      setPollData({
        ...pollData,
        totalVotes: pollData.totalVotes + 1,
        options: updated,
      });

      setHasVoted(true);
      setVotedOptionId(selectedOption);

      if (typeof window !== "undefined") {
        localStorage.setItem(`cfo_poll_${poll.id}`, selectedOption);
      }

      try {
        confetti({
          particleCount: 35,
          spread: 50,
          origin: { y: 0.8 },
        });
      } catch {
        // ignore
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-12 rounded-2xl bg-surface-container/70 border border-surface-dim/90 p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondary-container/20 text-secondary text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Edition #{poll.editionNumber} Community Pulse Poll
        </span>
        <span className="text-xs font-semibold text-text-muted flex items-center gap-1">
          <Vote className="w-3.5 h-3.5 text-primary" />
          {pollData.totalVotes.toLocaleString()} votes
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-bold font-display text-on-surface mb-2">
        {poll.question}
      </h3>
      <p className="text-xs sm:text-sm text-text-muted mb-6">
        {poll.context}
      </p>

      {!hasVoted ? (
        <form onSubmit={handleVote} className="space-y-2.5 mb-6">
          {pollData.options.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedOption(option.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? "bg-primary/5 border-primary ring-1 ring-primary shadow-sm"
                    : "bg-surface-pure hover:bg-surface-subtle border-surface-dim"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center flex-shrink-0 ${
                    isSelected ? "border-primary bg-primary" : "border-text-muted"
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-on-surface">
                  {option.label}
                </div>
              </button>
            );
          })}

          <div className="pt-3 flex items-center justify-between gap-4">
            <Link
              href={`/polls/${poll.id}`}
              className="text-xs font-semibold text-text-muted hover:text-primary transition-colors inline-flex items-center gap-1"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>View Discussion on /polls</span>
            </Link>

            <button
              type="submit"
              disabled={!selectedOption || isSubmitting}
              className="px-5 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container disabled:opacity-40 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isSubmitting ? "Voting..." : "Submit Vote"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3 mb-6 animate-fadeIn">
          <div className="flex items-center justify-between text-xs text-secondary font-bold mb-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Your vote is recorded!
            </span>
            <Link
              href={`/polls/${poll.id}`}
              className="text-primary hover:underline flex items-center gap-1"
            >
              Full Breakdown →
            </Link>
          </div>

          {pollData.options.map((option) => {
            const percentage =
              pollData.totalVotes > 0
                ? Math.round((option.votes / pollData.totalVotes) * 100)
                : 0;
            const isUserChoice = votedOptionId === option.id;

            return (
              <div
                key={option.id}
                className={`relative p-3 rounded-lg border overflow-hidden text-xs sm:text-sm ${
                  isUserChoice ? "border-primary bg-primary/5 font-bold" : "border-surface-dim bg-surface-pure"
                }`}
              >
                <div
                  className={`absolute top-0 bottom-0 left-0 transition-all duration-500 ${
                    isUserChoice ? "bg-secondary-container/20" : "bg-surface-container"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="text-on-surface truncate">
                    {option.label} {isUserChoice && "(Your Vote)"}
                  </span>
                  <span className="font-bold font-display text-primary flex-shrink-0">
                    {percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer link to /polls hub */}
      <div className="pt-4 border-t border-surface-dim/60 flex items-center justify-between text-xs">
        <span className="text-text-muted">Part of CFO AI Hub Weekly Research</span>
        <Link
          href="/polls"
          className="text-secondary font-bold hover:underline inline-flex items-center gap-1"
        >
          <span>Explore All Community Polls</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
