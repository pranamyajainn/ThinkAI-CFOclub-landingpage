"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Poll } from "@/types/poll";
import { Vote, ArrowRight, CheckCircle2, Check, Sparkles } from "lucide-react";
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

  const handleVote = async (optionId: string) => {
    if (hasVoted || isSubmitting) return;

    setSelectedOption(optionId);
    setIsSubmitting(true);
    try {
      await fetch("/api/polls/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pollId: poll.id,
          optionId: optionId,
          voterRole: "Newsletter Reader",
        }),
      });

      const updated = pollData.options.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      );

      setPollData({
        ...pollData,
        totalVotes: pollData.totalVotes + 1,
        options: updated,
      });

      setHasVoted(true);
      setVotedOptionId(optionId);

      if (typeof window !== "undefined") {
        localStorage.setItem(`cfo_poll_${poll.id}`, optionId);
      }

      try {
        confetti({
          particleCount: 40,
          spread: 55,
          origin: { y: 0.8 },
        });
      } catch {
        // ignore
      }
    } catch (err) {
      console.error("Error voting:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-14 rounded-[28px] sm:rounded-[32px] bg-white border border-[#E2E8F4] p-6 sm:p-9 shadow-[0_15px_45px_rgba(0,19,86,0.05)]">
      {/* Badge & Meta */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/15 text-secondary text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Weekly Community Pulse
        </span>
        <span className="text-xs font-semibold text-text-muted flex items-center gap-1">
          <Vote className="w-3.5 h-3.5 text-primary" />
          {pollData.totalVotes.toLocaleString()} votes
        </span>
      </div>

      {/* Question */}
      <h3 className="text-xl sm:text-2xl font-bold font-display text-[#001356] leading-snug mb-6">
        {poll.question}
      </h3>

      {!hasVoted ? (
        <div className="space-y-3 mb-6">
          {pollData.options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleVote(option.id)}
              disabled={isSubmitting}
              className="w-full text-left p-3.5 sm:p-4 rounded-xl border border-[#DCE4F0] hover:border-[#001356] bg-white hover:bg-[#F8FAFC] transition-all flex items-center gap-3.5 group cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full border-2 border-[#1B2B6B] group-hover:border-[#001356] flex items-center justify-center flex-shrink-0 bg-white" />
              <span className="text-sm sm:text-base font-medium text-[#1A1A2E] group-hover:text-[#001356]">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-2.5 mb-6 animate-fadeIn">
          <div className="flex items-center justify-between text-xs text-secondary font-bold mb-3 p-2.5 rounded-lg bg-secondary-container/10">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Your vote has been counted!
            </span>
            <Link
              href={`/poll/${poll.id}`}
              className="text-primary hover:underline flex items-center gap-1 font-semibold"
            >
              Full Page View →
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
                className={`relative p-3.5 rounded-xl border overflow-hidden text-xs sm:text-sm ${
                  isUserChoice ? "border-[#001356] bg-[#001356]/5 font-bold" : "border-[#DCE4F0] bg-white"
                }`}
              >
                <div
                  className={`absolute top-0 bottom-0 left-0 transition-all duration-700 ${
                    isUserChoice ? "bg-secondary-container/25" : "bg-[#F0F4FA]"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    {isUserChoice && <Check className="w-3.5 h-3.5 text-secondary flex-shrink-0" />}
                    <span className="text-[#1A1A2E] truncate">{option.label}</span>
                  </div>
                  <span className="font-bold font-display text-[#001356] flex-shrink-0">
                    {percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div className="pt-4 border-t border-[#EEF2F8] flex items-center justify-between text-xs">
        <span className="text-text-muted">CFO AI Hub Practitioner Sentiment</span>
        <Link
          href={`/poll/${poll.id}`}
          className="text-secondary font-bold hover:underline inline-flex items-center gap-1"
        >
          <span>Open on /poll/{poll.id}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
