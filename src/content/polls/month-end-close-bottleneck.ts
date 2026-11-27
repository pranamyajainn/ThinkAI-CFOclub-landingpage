import { Poll } from "@/types/poll";

export const pollMonthEndCloseBottleneck: Poll = {
  id: "month-end-close-bottleneck-2026",
  editionNumber: 1,
  question: "What slows your month-end close most?",
  context: "Cast your vote below to benchmark your organization against your peers in the CFO AI Hub community.",
  category: "FP&A Automation",
  status: "active",
  publishedAt: "2026-11-27",
  closingDate: "2026-12-25",
  keyTakeawayInsight: "Voting is open — results will be benchmarked and published in an upcoming CFO AI Hub executive briefing.",
  tags: ["Month-End Close", "Close Bottleneck", "Finance Operations", "Executive Poll"],
  // New poll, no baseline: every count starts at zero and is built entirely
  // from votes cast on the site. See src/lib/pollVotes.ts — Firestore seeds
  // `pollVotes/{id}` from these numbers on first access.
  // Option order matters: newsletter links use ?a=1..4 to pre-select an answer.
  totalVotes: 0,
  options: [
    { id: "bank-intercompany-recs", label: "Bank/intercompany recs", votes: 0 },
    { id: "manual-journals-accruals", label: "Manual journals & accruals", votes: 0 },
    { id: "chasing-data-from-teams", label: "Chasing data from teams", votes: 0 },
    { id: "erp-system-limitations", label: "ERP/system limitations", votes: 0 },
  ],
};
