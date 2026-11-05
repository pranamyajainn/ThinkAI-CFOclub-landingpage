import { Poll } from "@/types/poll";

export const pollCurrentAIUseInFinance: Poll = {
  id: "current-ai-use-in-finance-2026",
  editionNumber: 1,
  question: "How would you describe your current use of AI in finance?",
  context: "Cast your vote below to benchmark your organization against your peers in the CFO AI Hub community.",
  category: "AI Strategy",
  status: "active",
  publishedAt: "2026-11-05",
  closingDate: "2026-12-03",
  keyTakeawayInsight: "Voting is open — results will be benchmarked and published in an upcoming CFO AI Hub executive briefing.",
  tags: ["AI Adoption", "AI Maturity", "Finance Teams", "Executive Poll"],
  // New poll, no baseline: every count starts at zero and is built entirely
  // from votes cast on the site. See src/lib/pollVotes.ts — Firestore seeds
  // `pollVotes/{id}` from these numbers on first access.
  totalVotes: 0,
  options: [
    { id: "not-using-ai", label: "Not using AI at all", votes: 0 },
    { id: "tried-few-times", label: "Tried it a few times", votes: 0 },
    { id: "small-tasks", label: "Using it for small tasks (summaries, emails)", votes: 0 },
    { id: "regular-workflows", label: "Using it regularly in workflows", votes: 0 },
    { id: "embedded-in-processes", label: "AI is embedded in our processes", votes: 0 },
  ],
};
