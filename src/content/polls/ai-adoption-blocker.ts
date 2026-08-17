import { Poll } from "@/types/poll";

export const pollAIAdoptionBlocker: Poll = {
  id: "1",
  editionNumber: 1,
  question: "What’s the biggest thing stopping your finance team from using AI more?",
  context: "Cast your vote below to benchmark your organization against your peers in the CFO AI Hub community.",
  category: "AI Strategy",
  status: "active",
  publishedAt: "2026-08-16",
  closingDate: "2026-09-15",
  relatedArticleSlug: "from-artificial-intelligence-to-applied-intelligence-human-ai-finance",
  relatedArticleTitle: "From Artificial Intelligence to Applied Intelligence: Why Finance Needs the Human + AI Equation",
  keyTakeawayInsight: "Lack of internal AI skills and time to explore are the two biggest blockers so far — together accounting for more than half of all responses, with data security concerns close behind.",
  tags: ["AI Adoption", "Finance Strategy", "Data Security", "FP&A", "Executive Poll"],
  // Baseline seeded from the live show-of-hands vote taken at our launch event
  // (31 finance leaders in the room). Every vote cast on the site after this
  // is added on top of these real starting numbers — see src/lib/pollVotes.ts.
  totalVotes: 31,
  options: [
    {
      id: "data-security",
      label: "Data security concerns",
      votes: 6,
    },
    {
      id: "lack-of-skills",
      label: "Lack of knowledge or skills",
      votes: 11,
    },
    {
      id: "unclear-roi",
      label: "Unclear ROI",
      votes: 1,
    },
    {
      id: "no-time",
      label: "No time to explore",
      votes: 7,
    },
    {
      id: "internal-buyin",
      label: "Lack of internal buy-in",
      votes: 0,
    },
    {
      id: "tools-complex",
      label: "Tools feel too complex",
      votes: 2,
    },
    {
      id: "already-using",
      label: "We’re already using it effectively",
      votes: 4,
    },
  ],
};
