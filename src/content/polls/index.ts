import { Poll } from "@/types/poll";
import { pollMTDReadiness } from "./mtd-digital-links-readiness";

/**
 * MASTER LIST OF ALL WEEKLY NEWSLETTER POLLS
 *
 * To add a new weekly poll:
 * 1. Create a new file in `src/content/polls/your-poll-name.ts`
 * 2. Import it here and add it to `allPolls` below (latest first).
 */
export const allPolls: Poll[] = [
  pollMTDReadiness,
];
