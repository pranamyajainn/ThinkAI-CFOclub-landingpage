import { Poll } from "@/types/poll";

export const pollAIROIMeasurement: Poll = {
  id: "ai-roi-measurement-2026",
  editionNumber: 1,
  question: "How do you measure ROI on AI investments?",
  context: "Cast your vote below to benchmark your organization against your peers in the CFO AI Hub community.",
  category: "AI Strategy",
  status: "active",
  publishedAt: "2026-11-06",
  closingDate: "2026-12-04",
  keyTakeawayInsight: "Voting is open — results will be benchmarked and published in an upcoming CFO AI Hub executive briefing.",
  tags: ["AI ROI", "AI Investment", "AI Adoption", "Executive Poll"],
  // New poll, no baseline: every count starts at zero and is built entirely
  // from votes cast on the site. See src/lib/pollVotes.ts — Firestore seeds
  // `pollVotes/{id}` from these numbers on first access.
  totalVotes: 0,
  options: [
    { id: "time-cost-savings", label: "Time and cost savings", votes: 0 },
    { id: "accuracy-error-reduction", label: "Accuracy and error reduction", votes: 0 },
    { id: "revenue-impact", label: "Revenue impact", votes: 0 },
    { id: "employee-productivity", label: "Employee productivity", votes: 0 },
    { id: "not-measured-yet", label: "We don't measure it yet", votes: 0 },
  ],
};
