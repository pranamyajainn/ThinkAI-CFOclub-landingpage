"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Poll } from "@/types/poll";
import {
  BarChart3,
  CheckCircle2,
  Share2,
  Sparkles,
  ArrowRight,
  Check,
  Calendar,
  Lock,
  Vote,
  TrendingUp,
} from "lucide-react";
import confetti from "canvas-confetti";

interface PollVotingCardProps {
  poll: Poll;
  isStandalone?: boolean;
}

export default function PollVotingCard({ poll, isStandalone = false }: PollVotingCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userRole, setUserRole] = useState("CFO / VP Finance");
  const [hasVoted, setHasVoted] = useState(false);
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null);
  const [pollData, setPollData] = useState<Poll>(poll);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedVote = localStorage.getItem(`cfo_poll_${poll.id}`);
      if (storedVote) {
        setHasVoted(true);
        setVotedOptionId(storedVote);
      }
    }
  }, [poll.id]);

  const handleVoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption || hasVoted) return;

    setIsSubmitting(true);

    try {
      // Send vote to API endpoint
      await fetch("/api/polls/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pollId: poll.id,
          optionId: selectedOption,
          voterRole: userRole,
        }),
      });

      // Optimistic update
      const updatedOptions = pollData.options.map((opt) => {
        if (opt.id === selectedOption) {
          return { ...opt, votes: opt.votes + 1 };
        }
        return opt;
      });

      setPollData({
        ...pollData,
        totalVotes: pollData.totalVotes + 1,
        options: updatedOptions,
      });

      setHasVoted(true);
      setVotedOptionId(selectedOption);

      if (typeof window !== "undefined") {
        localStorage.setItem(`cfo_poll_${poll.id}`, selectedOption);
      }

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 45,
          spread: 55,
          origin: { y: 0.7 },
        });
      } catch {
        // ignore confetti errors
      }
    } catch (err) {
      console.error("Failed to submit vote", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/polls/${poll.id}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const formattedDate = new Date(poll.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={`w-full bg-surface-pure rounded-2xl border border-surface-dim/80 shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_35px_rgba(0,0,0,0.06)] transition-all overflow-hidden ${isStandalone ? "max-w-3xl mx-auto" : ""}`}>
      {/* Top Accent Gradient */}
      <div className="h-1.5 w-full bg-gradient-to-r from-secondary-container via-primary to-primary-container" />

      <div className="p-6 sm:p-8 lg:p-10">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondary-container/15 text-secondary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Edition #{poll.editionNumber} Poll
            </span>
            <span className="px-2.5 py-1 rounded-md bg-surface-container text-primary text-xs font-semibold">
              {poll.category}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-primary">
              <Vote className="w-3.5 h-3.5 text-secondary" />
              {pollData.totalVotes.toLocaleString()} votes
            </span>
          </div>
        </div>

        {/* Question Title */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-on-surface tracking-tight leading-snug mb-3">
          {poll.question}
        </h2>

        {/* Context */}
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
          {poll.context}
        </p>

        {/* Voting Form / Results View */}
        {!hasVoted ? (
          <form onSubmit={handleVoteSubmit} className="space-y-3 mb-6">
            {pollData.options.map((option) => {
              const isSelected = selectedOption === option.id;
              return (
                <label
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-primary/5 border-primary ring-1 ring-primary shadow-sm"
                      : "bg-surface-subtle/50 hover:bg-surface-container border-surface-dim/70"
                  }`}
                >
                  <input
                    type="radio"
                    name={`poll-${poll.id}`}
                    value={option.id}
                    checked={isSelected}
                    onChange={() => setSelectedOption(option.id)}
                    className="mt-1 w-4 h-4 text-primary accent-primary focus:ring-primary"
                  />
                  <div className="flex-grow">
                    <div className="text-sm sm:text-base font-bold text-on-surface">
                      {option.label}
                    </div>
                    {option.description && (
                      <div className="text-xs text-text-muted mt-0.5 leading-relaxed">
                        {option.description}
                      </div>
                    )}
                  </div>
                </label>
              );
            })}

            {/* Voter Demographics & Submit Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-text-muted">Your Role:</span>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-surface-subtle border border-surface-dim text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
                >
                  <option value="CFO / VP Finance">CFO / VP Finance</option>
                  <option value="Head of FP&A">Head of FP&A</option>
                  <option value="Finance Controller">Finance Controller</option>
                  <option value="Treasurer">Treasurer</option>
                  <option value="Other Finance Leader">Other</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={!selectedOption || isSubmitting}
                className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-container disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{isSubmitting ? "Recording Vote..." : "Cast Your Vote"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          /* Live Results View */
          <div className="space-y-4 mb-6 animate-fadeIn">
            <div className="p-3 rounded-xl bg-secondary-container/10 border border-secondary-container/20 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-secondary font-bold">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>Your vote has been recorded! Here is how your peers responded:</span>
              </div>
              <span className="text-text-muted font-medium">
                {pollData.totalVotes.toLocaleString()} total responses
              </span>
            </div>

            <div className="space-y-3">
              {pollData.options.map((option) => {
                const percentage =
                  pollData.totalVotes > 0
                    ? Math.round((option.votes / pollData.totalVotes) * 100)
                    : 0;
                const isUserChoice = votedOptionId === option.id;

                return (
                  <div
                    key={option.id}
                    className={`relative p-4 rounded-xl border overflow-hidden transition-all ${
                      isUserChoice
                        ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/40"
                        : "border-surface-dim bg-surface-subtle/40"
                    }`}
                  >
                    {/* Animated Fill Bar */}
                    <div
                      className={`absolute top-0 bottom-0 left-0 transition-all duration-700 ${
                        isUserChoice
                          ? "bg-secondary-container/20"
                          : "bg-surface-container-high/60"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />

                    <div className="relative z-10 flex items-center justify-between gap-4">
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-on-surface">
                            {option.label}
                          </span>
                          {isUserChoice && (
                            <span className="px-2 py-0.5 rounded bg-primary text-white text-[10px] font-bold">
                              Your Choice
                            </span>
                          )}
                        </div>
                        {option.description && (
                          <div className="text-[11px] text-text-muted line-clamp-1 mt-0.5">
                            {option.description}
                          </div>
                        )}
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="text-base sm:text-lg font-bold font-display text-primary">
                          {percentage}%
                        </div>
                        <div className="text-[10px] font-medium text-text-muted">
                          {option.votes} {option.votes === 1 ? "vote" : "votes"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Key Takeaway Insight if available */}
        {poll.keyTakeawayInsight && (
          <div className="p-4 rounded-xl bg-surface-subtle border border-surface-dim/60 mb-6 flex items-start gap-3">
            <TrendingUp className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-on-surface leading-relaxed">
              <strong>Executive Takeaway:</strong> {poll.keyTakeawayInsight}
            </p>
          </div>
        )}

        {/* Footer: Related Article link & Share button */}
        <div className="pt-4 border-t border-surface-dim/50 flex flex-wrap items-center justify-between gap-4">
          {poll.relatedArticleSlug ? (
            <Link
              href={`/newsletter/${poll.relatedArticleSlug}`}
              className="text-xs font-bold text-primary hover:text-secondary transition-colors inline-flex items-center gap-1.5"
            >
              <span>Read Edition #{poll.editionNumber} Full Briefing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <span className="text-xs text-text-muted">Weekly CFO Poll</span>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-subtle hover:bg-surface-container border border-surface-dim text-xs font-semibold text-on-surface transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-secondary font-bold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-text-muted" />
                  <span>Share Poll</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
