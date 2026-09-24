import { Poll } from "@/types/poll";

export const pollGenAIScalingBarrier: Poll = {
  id: "genai-scaling-barrier-2026",
  editionNumber: 1,
  question: "What is your biggest barrier to scaling Generative AI initiatives within your business?",
  context: "Cast your vote below to benchmark your organization against your peers in the CFO AI Hub community.",
  category: "AI Strategy",
  status: "active",
  publishedAt: "2026-09-24",
  closingDate: "2026-10-22",
  relatedArticleSlug: "smbs-can-outsmart-enterprises-on-ai",
  relatedArticleTitle: "Why SMBs Can and Should Outsmart Large Enterprises on AI?",
  keyTakeawayInsight: "Voting is open — results will be benchmarked and published in an upcoming CFO AI Hub executive briefing.",
  tags: ["Generative AI", "AI Strategy", "AI Adoption", "Budget & Cost", "Executive Poll"],
  // New poll, no baseline: every count starts at zero and is built entirely
  // from votes cast on the site. See src/lib/pollVotes.ts — Firestore seeds
  // `pollVotes/{id}` from these numbers on first access.
  totalVotes: 0,
  options: [
    {
      id: "budget-token-costs",
      label: "Budget & token costs",
      votes: 0,
    },
    {
      id: "lack-of-expertise",
      label: "Lack of in-house expertise",
      votes: 0,
    },
    {
      id: "data-privacy-security",
      label: "Data privacy & security",
      votes: 0,
    },
    {
      id: "unclear-roi",
      label: "Unclear ROI",
      votes: 0,
    },
  ],
};
