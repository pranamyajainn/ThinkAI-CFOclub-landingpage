import { Poll } from "@/types/poll";

export const pollUnwrittenWorkarounds: Poll = {
  id: "unwritten-workarounds-finance-process-2026",
  editionNumber: 1,
  question: "Which finance process in your team runs on the most unwritten workarounds?",
  context: "Cast your vote below to benchmark your organization against your peers in the CFO AI Hub community.",
  category: "AI Strategy",
  status: "active",
  publishedAt: "2026-10-22",
  closingDate: "2026-11-19",
  relatedArticleSlug: "before-ai-comes-process-intelligence",
  relatedArticleTitle: "Before AI, Comes Process Intelligence: Why \"Workarounds\" Break Automation",
  keyTakeawayInsight: "Voting is open — results will be benchmarked and published in an upcoming CFO AI Hub executive briefing.",
  tags: ["Process Intelligence", "Month-End Close", "Accounts Payable", "FP&A", "Reconciliations", "Executive Poll"],
  // New poll, no baseline: every count starts at zero and is built entirely
  // from votes cast on the site. See src/lib/pollVotes.ts — Firestore seeds
  // `pollVotes/{id}` from these numbers on first access.
  totalVotes: 0,
  options: [
    { id: "month-end-close", label: "Month-end close", votes: 0 },
    { id: "accounts-payable", label: "Accounts payable", votes: 0 },
    { id: "collections-ar", label: "Collections and accounts receivable", votes: 0 },
    { id: "forecasting-fpa", label: "Forecasting and FP&A", votes: 0 },
    { id: "reconciliations", label: "Reconciliations", votes: 0 },
  ],
};
