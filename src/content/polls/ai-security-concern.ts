import { Poll } from "@/types/poll";

export const pollAISecurityConcern: Poll = {
  id: "ai-security-concern-2026",
  editionNumber: 1,
  question: "What's your top AI-related security concern?",
  context: "Cast your vote below to benchmark your organization against your peers in the CFO AI Hub community.",
  category: "Risk & Governance",
  status: "active",
  publishedAt: "2026-11-12",
  closingDate: "2026-12-10",
  keyTakeawayInsight: "Voting is open — results will be benchmarked and published in an upcoming CFO AI Hub executive briefing.",
  tags: ["AI Security", "AI Governance", "Shadow AI", "Executive Poll"],
  // New poll, no baseline: every count starts at zero and is built entirely
  // from votes cast on the site. See src/lib/pollVotes.ts — Firestore seeds
  // `pollVotes/{id}` from these numbers on first access.
  totalVotes: 0,
  options: [
    { id: "data-leakage-third-party-models", label: "Data leakage to third-party models", votes: 0 },
    { id: "ai-powered-fraud", label: "AI-powered fraud (deepfakes, phishing)", votes: 0 },
    { id: "model-errors-hallucinations", label: "Model errors or hallucinations", votes: 0 },
    { id: "vendor-supply-chain-risk", label: "Vendor and supply-chain risk", votes: 0 },
    { id: "shadow-ai", label: "Shadow AI (unapproved tools)", votes: 0 },
  ],
};
