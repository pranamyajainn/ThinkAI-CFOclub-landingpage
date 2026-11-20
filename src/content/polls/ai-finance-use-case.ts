import { Poll } from "@/types/poll";

export const pollAIFinanceUseCase: Poll = {
  id: "ai-finance-use-case-2026",
  editionNumber: 1,
  question: "Which finance use case would you most like to use AI for?",
  context: "Cast your vote below to benchmark your organization against your peers in the CFO AI Hub community.",
  category: "AI Strategy",
  status: "active",
  publishedAt: "2026-11-20",
  closingDate: "2026-12-18",
  keyTakeawayInsight: "Voting is open — results will be benchmarked and published in an upcoming CFO AI Hub executive briefing.",
  tags: ["AI Use Cases", "Finance Automation", "AI Adoption", "Executive Poll"],
  // New poll, no baseline: every count starts at zero and is built entirely
  // from votes cast on the site. See src/lib/pollVotes.ts — Firestore seeds
  // `pollVotes/{id}` from these numbers on first access.
  totalVotes: 0,
  options: [
    { id: "month-end-close-reconciliations", label: "Month-end close & reconciliations", votes: 0 },
    { id: "forecasting-scenario-planning", label: "Forecasting & scenario planning", votes: 0 },
    { id: "cash-flow-working-capital", label: "Cash flow & working capital", votes: 0 },
    { id: "board-management-deck", label: "Board / management deck", votes: 0 },
    { id: "audit-compliance", label: "Audit & compliance", votes: 0 },
    { id: "spend-ap-ar-automation", label: "Spend / AP & AR automation", votes: 0 },
  ],
};
