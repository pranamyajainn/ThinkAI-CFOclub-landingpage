import { Poll } from "@/types/poll";

export const pollAIOutputSignoff: Poll = {
  id: "ai-output-signoff-2026",
  editionNumber: 1,
  question: "Who signs off AI output before it leaves your finance team?",
  context: "Cast your vote below to benchmark your organization against your peers in the CFO AI Hub community.",
  category: "Risk & Governance",
  status: "active",
  publishedAt: "2026-11-27",
  closingDate: "2026-12-25",
  keyTakeawayInsight: "Voting is open — results will be benchmarked and published in an upcoming CFO AI Hub executive briefing.",
  tags: ["AI Governance", "Human in the Loop", "Finance Controls", "Executive Poll"],
  // New poll, no baseline: every count starts at zero and is built entirely
  // from votes cast on the site. See src/lib/pollVotes.ts — Firestore seeds
  // `pollVotes/{id}` from these numbers on first access.
  // Option order matters: newsletter links use ?a=1..4 to pre-select an answer.
  totalVotes: 0,
  options: [
    { id: "person-who-ran-it", label: "The person who ran it", votes: 0 },
    { id: "reviewer-or-manager", label: "A reviewer or manager", votes: 0 },
    { id: "cfo-or-finance-director", label: "The CFO or finance director", votes: 0 },
    { id: "nobody-formally-yet", label: "Nobody formally, yet", votes: 0 },
  ],
};
