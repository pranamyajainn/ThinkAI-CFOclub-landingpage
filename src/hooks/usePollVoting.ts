"use client";

import { useCallback, useEffect, useState } from "react";
import { Poll } from "@/types/poll";

const VOTE_STORAGE_PREFIX = "cfo_poll_";

interface UsePollVotingResult {
  /** The poll, with its options' vote counts kept in sync with the live Firestore totals. */
  pollData: Poll;
  hasVoted: boolean;
  votedOptionId: string | null;
  isSubmitting: boolean;
  /** Set when the last vote attempt failed — surface this to the user, don't fail silently. */
  error: string | null;
  /** Resolves to true if the vote was actually recorded, false if it failed. */
  vote: (optionId: string, voterRole?: string) => Promise<boolean>;
}

/**
 * Shared voting/results state for the poll widgets. Restores a prior vote
 * from localStorage, fetches the true live tally on mount, and records
 * votes through the API — only marking the poll as "voted" once the
 * server actually confirms the vote was recorded.
 */
export function usePollVoting(initialPoll: Poll): UsePollVotingResult {
  const [pollData, setPollData] = useState<Poll>(initialPoll);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`${VOTE_STORAGE_PREFIX}${initialPoll.id}`);
      if (stored) {
        setHasVoted(true);
        setVotedOptionId(stored);
      }
    }

    let cancelled = false;
    fetch(`/api/polls/${initialPoll.id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!cancelled && json?.poll) {
          setPollData(json.poll);
        }
      })
      .catch(() => {
        // Keep the static baseline (real seed numbers) if the live fetch fails.
      });

    return () => {
      cancelled = true;
    };
  }, [initialPoll.id]);

  const vote = useCallback(
    async (optionId: string, voterRole?: string): Promise<boolean> => {
      if (hasVoted || isSubmitting) return false;
      setIsSubmitting(true);
      setError(null);

      try {
        const res = await fetch("/api/polls/vote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pollId: initialPoll.id, optionId, voterRole }),
        });

        const json = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(json?.error || `Vote failed with status ${res.status}`);
        }

        if (json?.poll) {
          setPollData(json.poll);
        }

        setHasVoted(true);
        setVotedOptionId(optionId);
        if (typeof window !== "undefined") {
          localStorage.setItem(`${VOTE_STORAGE_PREFIX}${initialPoll.id}`, optionId);
        }
        return true;
      } catch (err) {
        console.error("Error casting poll vote:", err);
        setError("We couldn't record your vote — please try again.");
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [hasVoted, isSubmitting, initialPoll.id]
  );

  return { pollData, hasVoted, votedOptionId, isSubmitting, error, vote };
}
