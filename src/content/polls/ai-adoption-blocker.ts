import { Poll } from "@/types/poll";

export const pollAIAdoptionBlocker: Poll = {
  id: "1",
  editionNumber: 1,
  question: "What’s the biggest thing stopping your finance team from using AI more?",
  context: "Cast your vote below to benchmark your organization against 400+ CFOs and finance leaders.",
  category: "AI Strategy",
  status: "active",
  publishedAt: "2026-08-16",
  closingDate: "2026-09-15",
  relatedArticleSlug: "from-artificial-intelligence-to-applied-intelligence-human-ai-finance",
  relatedArticleTitle: "From Artificial Intelligence to Applied Intelligence: Why Finance Needs the Human + AI Equation",
  keyTakeawayInsight: "Data security and internal skills deficit continue to account for over 60% of all adoption bottlenecks among mid-market finance organizations.",
  tags: ["AI Adoption", "Finance Strategy", "Data Security", "FP&A", "Executive Poll"],
  totalVotes: 428,
  options: [
    {
      id: "data-security",
      label: "Data security concerns",
      votes: 142,
    },
    {
      id: "lack-of-skills",
      label: "Lack of knowledge or skills",
      votes: 118,
    },
    {
      id: "unclear-roi",
      label: "Unclear ROI",
      votes: 78,
    },
    {
      id: "no-time",
      label: "No time to explore",
      votes: 46,
    },
    {
      id: "tools-complex",
      label: "Tools feel too complex",
      votes: 28,
    },
    {
      id: "already-using",
      label: "We’re already using it effectively",
      votes: 16,
    },
  ],
};
