import { Poll } from "@/types/poll";

export const pollAIPriorityFinanceFunction: Poll = {
  id: "ai-priority-finance-function-2026",
  editionNumber: 1,
  question: "Where would you most want AI to help your finance function?",
  context: "Cast your vote below to benchmark your organization against your peers in the CFO AI Hub community.",
  category: "AI Strategy",
  status: "active",
  publishedAt: "2026-09-02",
  closingDate: "2026-09-30",
  relatedArticleSlug: "from-artificial-intelligence-to-applied-intelligence-human-ai-finance",
  relatedArticleTitle: "From Artificial Intelligence to Applied Intelligence: Why Finance Needs the Human + AI Equation",
  keyTakeawayInsight: "Voting is open — results will be benchmarked and published in an upcoming CFO AI Hub executive briefing.",
  tags: ["AI Adoption", "FP&A", "Finance Strategy", "Automation", "Executive Poll"],
  // New poll, no baseline: every count starts at zero and is built entirely
  // from votes cast on the site. See src/lib/pollVotes.ts — Firestore seeds
  // `pollVotes/{id}` from these numbers on first access.
  totalVotes: 0,
  options: [
    {
      id: "automating-reporting",
      label: "Automating reporting",
      votes: 0,
    },
    {
      id: "forecasting-scenario-planning",
      label: "Forecasting & scenario planning",
      votes: 0,
    },
    {
      id: "reducing-manual-data-work",
      label: "Reducing manual data work",
      votes: 0,
    },
    {
      id: "strategic-decision-support",
      label: "Strategic decision support",
      votes: 0,
    },
    {
      id: "risk-compliance",
      label: "Risk & compliance",
      votes: 0,
    },
    {
      id: "cost-optimisation",
      label: "Cost optimisation",
      votes: 0,
    },
  ],
};
