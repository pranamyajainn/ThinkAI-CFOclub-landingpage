import { Poll } from "@/types/poll";

export const pollAIFirstFinanceArea: Poll = {
  id: "ai-first-finance-area-2026",
  editionNumber: 1,
  question: "Which area of finance would you bring AI into first?",
  context: "Cast your vote below to benchmark your organization against your peers in the CFO AI Hub community.",
  category: "AI Strategy",
  status: "active",
  publishedAt: "2026-10-09",
  closingDate: "2026-11-06",
  relatedArticleSlug: "stable-system-most-expensive-asset",
  relatedArticleTitle: "Why a \"Stable\" System Might Be Your Most Expensive Asset",
  keyTakeawayInsight: "Voting is open — results will be benchmarked and published in an upcoming CFO AI Hub executive briefing.",
  tags: ["AI Adoption", "Tax & Compliance", "Month-End Close", "FP&A", "Executive Poll"],
  // New poll, no baseline: every count starts at zero and is built entirely
  // from votes cast on the site. See src/lib/pollVotes.ts — Firestore seeds
  // `pollVotes/{id}` from these numbers on first access.
  totalVotes: 0,
  options: [
    { id: "tax-compliance", label: "Tax and compliance", votes: 0 },
    { id: "month-end-close", label: "Month-end close", votes: 0 },
    { id: "fpa", label: "FP&A", votes: 0 },
    { id: "something-else", label: "Something else", votes: 0 },
  ],
};
