"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Poll } from "@/types/poll";
import {
  CheckCircle2,
  Share2,
  Check,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { usePollVoting } from "@/hooks/usePollVoting";

interface ExecutivePollCardProps {
  poll: Poll;
}

export default function ExecutivePollCard({ poll }: ExecutivePollCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { pollData, hasVoted, votedOptionId, isSubmitting, error, vote } = usePollVoting(poll);

  const handleSelectAndVote = async (optionId: string) => {
    if (hasVoted || isSubmitting) return;
    setSelectedOption(optionId);

    const success = await vote(optionId, "Finance Leader");
    if (!success) return;

    // Only celebrate once the server has actually confirmed the vote.
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // ignore
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/poll/${poll.id}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative w-full max-w-[540px] mx-auto">
      {/* Subtle decorative background watermarks (candlestick chart top-right & dots pattern) */}
      <div className="absolute -top-12 -left-12 w-32 h-32 opacity-20 pointer-events-none -z-10 grid-pattern" />
      
      {/* Decorative Candlestick watermark (top right) */}
      <div className="absolute -top-10 -right-8 opacity-25 pointer-events-none -z-10 hidden sm:flex items-end gap-1.5 h-24">
        <div className="w-1.5 h-16 bg-primary/40 rounded-sm relative">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-20 bg-primary/40" />
        </div>
        <div className="w-1.5 h-12 bg-primary/30 rounded-sm relative">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-14 bg-primary/30" />
        </div>
        <div className="w-1.5 h-20 bg-secondary-container/40 rounded-sm relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-24 bg-secondary-container/40" />
        </div>
        <div className="w-1.5 h-10 bg-primary/30 rounded-sm" />
      </div>

      {/* Decorative connecting curve */}
      <svg className="absolute -right-16 top-1/3 w-32 h-64 opacity-20 pointer-events-none -z-10 text-primary" viewBox="0 0 100 200" fill="none" stroke="currentColor">
        <path d="M0,100 C50,150 80,50 100,120" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="100" cy="120" r="4" fill="currentColor" />
      </svg>

      {/* Main Clean Rounded Card */}
      <div className="relative bg-white rounded-[28px] sm:rounded-[34px] border border-[#E2E8F4] p-7 sm:p-10 shadow-[0_20px_50px_rgba(0,19,86,0.06)] overflow-hidden transition-all duration-300">
        
        {/* Question Headline */}
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#001356] tracking-tight leading-[1.22] mb-8">
          {poll.question}
        </h2>

        {/* Voting Options List */}
        {!hasVoted ? (
          <div className="space-y-3.5">
            {pollData.options.map((option) => {
              const isSelected = selectedOption === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelectAndVote(option.id)}
                  disabled={isSubmitting}
                  className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border transition-all duration-200 flex items-center gap-4 group cursor-pointer ${
                    isSelected
                      ? "border-[#001356] bg-[#001356]/5 shadow-sm"
                      : "border-[#DCE4F0] bg-white hover:border-[#001356] hover:bg-[#F8FAFC] hover:shadow-[0_4px_12px_rgba(0,19,86,0.04)]"
                  }`}
                >
                  {/* Large Circular Radio Icon */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected
                        ? "border-[#001356] bg-[#001356]"
                        : "border-[#1B2B6B] bg-white group-hover:border-[#001356]"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white animate-scaleIn" />
                    )}
                  </div>

                  {/* Option Label */}
                  <span className="text-base sm:text-[17px] font-medium text-[#1A1A2E] leading-snug group-hover:text-[#001356] transition-colors">
                    {option.label}
                  </span>
                </button>
              );
            })}

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-medium">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        ) : (
          /* Results View with Live Animated Percentage Bars */
          <div className="space-y-3 animate-fadeIn">
            <div className="p-3 rounded-xl bg-secondary-container/10 border border-secondary-container/20 flex items-center justify-between text-xs text-secondary font-bold mb-4">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Your vote is counted! Live results:
              </span>
              <span className="text-text-muted font-semibold">
                {pollData.totalVotes.toLocaleString()} responses
              </span>
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
                  className={`relative p-4 rounded-2xl border overflow-hidden transition-all ${
                    isUserChoice
                      ? "border-[#001356] bg-[#001356]/5 shadow-sm"
                      : "border-[#DCE4F0] bg-white"
                  }`}
                >
                  {/* Animated Fill Bar */}
                  <div
                    className={`absolute top-0 bottom-0 left-0 transition-all duration-700 ${
                      isUserChoice ? "bg-secondary-container/25" : "bg-[#F0F4FA]"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />

                  {/* Text & Stats */}
                  <div className="relative z-10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isUserChoice
                            ? "border-[#001356] bg-[#001356] text-white"
                            : "border-text-muted/40 bg-white"
                        }`}
                      >
                        {isUserChoice && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-[#1A1A2E] truncate">
                        {option.label}
                      </span>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-base sm:text-lg font-bold font-display text-[#001356]">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Card Footer Meta */}
        <div className="mt-8 pt-5 border-t border-[#EEF2F8] flex flex-wrap items-center justify-between gap-3 text-xs text-text-muted">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#001356]">
              {pollData.totalVotes.toLocaleString()} votes
            </span>
            <span>•</span>
            <span>Anonymous CFO Survey</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F7FB] hover:bg-[#EBF0FA] border border-[#E2E8F4] text-xs font-semibold text-[#001356] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-secondary font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-text-muted" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Accompanying Newsletter Briefing Link */}
        {poll.relatedArticleSlug && (
          <div className="mt-5 pt-4 border-t border-[#EEF2F8] text-center">
            <Link
              href={`/newsletter/${poll.relatedArticleSlug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:text-secondary-container transition-colors"
            >
              <span>Read Accompanying Weekly Intelligence Briefing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
