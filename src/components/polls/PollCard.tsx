"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Poll } from "@/types/poll";
import {
  Sparkles,
  Calendar,
  Vote,
  CheckCircle2,
  Check,
  Share2,
  ArrowRight,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import confetti from "canvas-confetti";
import { usePollVoting } from "@/hooks/usePollVoting";

interface PollCardProps {
  poll: Poll;
  /**
   * "full" — the standalone poll page/hub treatment: category + date meta
   * row, key-takeaway callout, share footer. Used on /polls and /poll/[id].
   * "embedded" — a tighter version with no meta row, for inline use inside
   * an Article or Newsletter edition body.
   */
  variant?: "full" | "embedded";
  className?: string;
}

const ROLE_OPTIONS = [
  "CFO / VP Finance",
  "Head of FP&A",
  "Finance Controller",
  "Treasurer",
  "Other Finance Leader",
];

/**
 * The single canonical poll voting UI, used everywhere a poll appears
 * (/polls, /poll/[id], embedded in Articles and Newsletter editions) so
 * the voting experience never diverges between pages. All answer options
 * render together as one compact, scroll-free group — never inside their
 * own scrolling container — followed immediately by the role selector and
 * the Cast Your Vote action.
 */
export default function PollCard({ poll, variant = "full", className = "" }: PollCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userRole, setUserRole] = useState(ROLE_OPTIONS[0]);
  const [copied, setCopied] = useState(false);
  const { pollData, hasVoted, votedOptionId, isSubmitting, error, vote } = usePollVoting(poll);

  const isEmbedded = variant === "embedded";

  const handleVoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption || hasVoted) return;

    const success = await vote(selectedOption, userRole);
    if (!success) return;

    try {
      confetti({ particleCount: 45, spread: 55, origin: { y: 0.7 } });
    } catch {
      // ignore confetti errors
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

  const formattedDate = new Date(poll.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={`w-full bg-surface-pure rounded-2xl border border-surface-dim/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] overflow-hidden ${
        isEmbedded ? "" : "hover:shadow-[0_8px_35px_rgba(0,0,0,0.06)] transition-shadow"
      } ${className}`}
    >
      {/* Top Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-secondary-container via-primary to-primary-container" />

      <div className={isEmbedded ? "p-5 sm:p-7" : "p-6 sm:p-8"}>
        {/* Meta Row (full variant only) */}
        {!isEmbedded && (
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary-container/15 text-secondary text-xs font-bold uppercase tracking-wider">
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
        )}

        {isEmbedded && (
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container/15 text-secondary text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              Community Pulse
            </span>
            <span className="text-[11px] font-semibold text-text-muted flex items-center gap-1">
              <Vote className="w-3 h-3 text-primary" />
              {pollData.totalVotes.toLocaleString()} votes
            </span>
          </div>
        )}

        {/* Question */}
        <h2
          className={`font-bold font-display text-on-surface tracking-tight leading-snug ${
            isEmbedded ? "text-lg sm:text-xl mb-1.5" : "text-xl sm:text-2xl lg:text-3xl mb-2"
          }`}
        >
          {poll.question}
        </h2>

        {!isEmbedded && poll.context && (
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
            {poll.context}
          </p>
        )}

        {/* Voting Form / Results */}
        {!hasVoted ? (
          <form onSubmit={handleVoteSubmit} className={isEmbedded ? "mt-3" : "mt-5"}>
            {/* Compact option grid — all choices visible together, never in a scroll container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              {pollData.options.map((option) => {
                const isSelected = selectedOption === option.id;
                return (
                  <label
                    key={option.id}
                    onClick={() => setSelectedOption(option.id)}
                    className={`flex items-center gap-2.5 min-h-[44px] px-3.5 py-2.5 rounded-xl border cursor-pointer transition-all ${
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
                      className="w-4 h-4 flex-shrink-0 text-primary accent-primary focus:ring-primary"
                    />
                    <span className="text-sm font-semibold text-on-surface leading-snug">
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Role + Submit — immediately below the options, no scrolling required */}
            <div className="mt-3.5 pt-3.5 border-t border-surface-dim/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-text-muted whitespace-nowrap">Your Role:</span>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="flex-grow sm:flex-grow-0 px-3 py-2 rounded-lg bg-surface-subtle border border-surface-dim text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
                >
                  {ROLE_OPTIONS.map((role) => (
                    <option key={role} value={role}>
                      {role === "Other Finance Leader" ? "Other" : role}
                    </option>
                  ))}
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

            {error && (
              <div className="mt-3 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </form>
        ) : (
          /* Live Results */
          <div className={isEmbedded ? "mt-3 space-y-2" : "mt-5 space-y-2.5"}>
            <div className="p-2.5 rounded-xl bg-secondary-container/10 border border-secondary-container/20 flex items-center justify-between gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-secondary font-bold">
                <CheckCircle2 className="w-4 h-4" />
                Your vote is counted! Live results:
              </span>
              <span className="text-text-muted font-medium">
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
                  className={`relative px-3.5 py-2.5 rounded-xl border overflow-hidden transition-all ${
                    isUserChoice
                      ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/30"
                      : "border-surface-dim bg-surface-subtle/40"
                  }`}
                >
                  <div
                    className={`absolute top-0 bottom-0 left-0 transition-all duration-700 ${
                      isUserChoice ? "bg-secondary-container/20" : "bg-surface-container-high/60"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      {isUserChoice && (
                        <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      )}
                      <span className="text-sm font-bold text-on-surface truncate">
                        {option.label}
                      </span>
                    </div>
                    <span className="text-sm font-bold font-display text-primary flex-shrink-0">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Key Takeaway (full variant only) */}
        {!isEmbedded && poll.keyTakeawayInsight && (
          <div className="mt-5 p-4 rounded-xl bg-surface-subtle border border-surface-dim/60 flex items-start gap-3">
            <TrendingUp className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-on-surface leading-relaxed">
              <strong>Executive Takeaway:</strong> {poll.keyTakeawayInsight}
            </p>
          </div>
        )}

        {/* Footer: related article + share (full variant only) */}
        {!isEmbedded && (
          <div className="mt-5 pt-4 border-t border-surface-dim/50 flex flex-wrap items-center justify-between gap-4">
            {poll.relatedArticleSlug ? (
              <Link
                href={`/articles/${poll.relatedArticleSlug}`}
                className="text-xs font-bold text-primary hover:text-secondary transition-colors inline-flex items-center gap-1.5"
              >
                <span>Read the Related Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <span className="text-xs text-text-muted">Weekly CFO Poll</span>
            )}

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
        )}
      </div>
    </div>
  );
}
