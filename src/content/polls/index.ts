import { Poll } from "@/types/poll";
import { pollAIAdoptionBlocker } from "./ai-adoption-blocker";
import { pollMTDReadiness } from "./mtd-digital-links-readiness";

/**
 * MASTER LIST OF ALL WEEKLY NEWSLETTER POLLS
 */
export const allPolls: Poll[] = [
  pollAIAdoptionBlocker, // Poll ID "1"
  pollMTDReadiness,
];
