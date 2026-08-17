import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getPollById } from "@/lib/polls";
import { Poll } from "@/types/poll";

/**
 * Live vote counts are stored in Firestore, one document per poll, under
 * `pollVotes/{pollId}`:
 *
 *   { optionVotes: { [optionId]: number }, totalVotes: number, ... }
 *
 * The document is seeded on first read/vote from the poll's baseline
 * numbers in src/content/polls (the real starting counts from the launch
 * event), so the count never resets to zero — every vote cast on the site
 * is added on top of that real baseline. All increments go through a
 * Firestore transaction so concurrent voters can never clobber each other.
 */

interface PollVoteDoc {
  optionVotes: Record<string, number>;
  totalVotes: number;
}

export class InvalidVoteError extends Error {}

function pollVoteDocRef(pollId: string) {
  return doc(db, "pollVotes", pollId);
}

function baselineVoteDoc(poll: Poll): PollVoteDoc {
  return {
    optionVotes: Object.fromEntries(poll.options.map((o) => [o.id, o.votes])),
    totalVotes: poll.totalVotes,
  };
}

function applyLiveCounts(poll: Poll, live: PollVoteDoc): Poll {
  return {
    ...poll,
    totalVotes: live.totalVotes,
    options: poll.options.map((o) => ({
      ...o,
      votes: live.optionVotes[o.id] ?? 0,
    })),
  };
}

/**
 * Returns `poll` with its options' vote counts replaced by the live
 * Firestore totals. Seeds Firestore from the poll's baseline on first
 * access. Falls back to the static baseline (never fake/random numbers —
 * just the real seed data) if Firestore is unreachable, e.g. missing
 * credentials in a preview/dev environment.
 */
export async function getLivePoll(poll: Poll): Promise<Poll> {
  try {
    const ref = pollVoteDocRef(poll.id);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      const seed = baselineVoteDoc(poll);
      await setDoc(ref, {
        ...seed,
        seededAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return applyLiveCounts(poll, seed);
    }

    const data = snap.data();
    return applyLiveCounts(poll, {
      optionVotes: data.optionVotes ?? {},
      totalVotes: data.totalVotes ?? poll.totalVotes,
    });
  } catch (err) {
    console.error(`[pollVotes] Live fetch failed for poll "${poll.id}", using static baseline:`, err);
    return poll;
  }
}

/**
 * Atomically records one vote for `optionId` on `pollId` and returns the
 * poll with updated live counts. Validates the option against the poll's
 * static definition first, so only real options can ever be voted on.
 */
export async function castVote(pollId: string, optionId: string): Promise<Poll> {
  const poll = getPollById(pollId);
  if (!poll) {
    throw new InvalidVoteError(`Unknown poll "${pollId}".`);
  }
  if (!poll.options.some((o) => o.id === optionId)) {
    throw new InvalidVoteError(`Unknown option "${optionId}" for poll "${pollId}".`);
  }

  const ref = pollVoteDocRef(pollId);

  const updated = await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const current: PollVoteDoc = snap.exists()
      ? {
          optionVotes: { ...(snap.data().optionVotes ?? {}) },
          totalVotes: snap.data().totalVotes ?? poll.totalVotes,
        }
      : baselineVoteDoc(poll);

    current.optionVotes[optionId] = (current.optionVotes[optionId] ?? 0) + 1;
    current.totalVotes += 1;

    tx.set(
      ref,
      { ...current, updatedAt: serverTimestamp() },
      { merge: true }
    );

    return current;
  });

  return applyLiveCounts(poll, updated);
}
