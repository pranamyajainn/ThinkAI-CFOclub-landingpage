import { Poll } from "@/types/poll";
import { pollAIAdoptionBlocker } from "./ai-adoption-blocker";
import { pollMTDReadiness } from "./mtd-digital-links-readiness";
import { pollAIPriorityFinanceFunction } from "./ai-priority-finance-function";

/**
 * MASTER LIST OF ALL WEEKLY NEWSLETTER POLLS
 *
 * The poll shown on /polls is the most recently published active one —
 * see getActivePoll() in src/lib/polls.ts. Older polls stay reachable at
 * /polls/[pollId] and keep their live Firestore tallies.
 */
export const allPolls: Poll[] = [
  pollAIPriorityFinanceFunction,
  pollAIAdoptionBlocker, // Poll ID "1"
  pollMTDReadiness,
];
