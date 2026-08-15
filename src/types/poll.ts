export type PollCategory =
  | "All"
  | "Risk & Governance"
  | "AI Strategy"
  | "FP&A Automation"
  | "Treasury & Liquidity"
  | "Executive Sentiment";

export interface PollOption {
  id: string;
  label: string;
  description?: string;
  votes: number;
}

export interface Poll {
  id: string;
  editionNumber: number;
  question: string;
  context: string;
  category: Exclude<PollCategory, "All">;
  status: "active" | "closed";
  options: PollOption[];
  totalVotes: number;
  publishedAt: string; // YYYY-MM-DD
  closingDate?: string;
  relatedArticleSlug?: string;
  relatedArticleTitle?: string;
  keyTakeawayInsight?: string;
  tags?: string[];
}

export interface VoteSubmission {
  pollId: string;
  optionId: string;
  voterRole?: string;
  voterCompanySize?: string;
}
