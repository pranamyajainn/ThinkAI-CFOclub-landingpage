import { Poll } from "@/types/poll";

/**
 * 📝 TEMPLATE FOR WEEKLY NEWSLETTER POLLS
 *
 * To add a new weekly poll:
 * 1. Duplicate this file and rename it (e.g. `your-poll-topic.ts`)
 * 2. Fill in the fields below
 * 3. Import and add your poll in `src/content/polls/index.ts`
 * 4. Done! The poll will automatically appear on `/polls` and link to its newsletter edition.
 */

export const templatePoll: Poll = {
  // Unique URL identifier / ID
  id: "sample-poll-id-change-me",
  
  // Newsletter edition number this poll corresponds to
  editionNumber: 2,
  
  // Core executive question
  question: "What is your organization's highest priority for finance automation this year?",
  
  // Brief context or background on why this matters
  context: "Executive sentiment survey following this week's briefing on modern finance stacks.",
  
  // Category choices: "Risk & Governance" | "AI Strategy" | "FP&A Automation" | "Treasury & Liquidity" | "Executive Sentiment"
  category: "Executive Sentiment",
  
  // Status: "active" (open for voting) | "closed" (voting closed, showing final results)
  status: "active",
  
  // Publication date (YYYY-MM-DD)
  publishedAt: "2026-08-22",
  closingDate: "2026-09-05",
  
  // Optional: Connect this poll to a specific article (its slug under src/content/articles/)
  relatedArticleSlug: "your-related-article-slug",
  relatedArticleTitle: "Your Related Article Title",
  
  // Optional: Takeaway summary or benchmark comment
  keyTakeawayInsight: "Insights will be analyzed and published in next week's executive newsletter.",
  
  tags: ["FP&A", "AI Adoption", "Finance Strategy"],
  
  // Initial starting vote count (or 0 for new polls)
  totalVotes: 120,
  
  // 3-5 voting choices
  options: [
    {
      id: "option-a",
      label: "Sub-Ledger Reconciliation & Close Cycle",
      description: "Automating manual journal entries, bank matching, and intercompany eliminations.",
      votes: 45,
    },
    {
      id: "option-b",
      label: "Continuous Cash Flow & Liquidity Forecasting",
      description: "Real-time 13-week simulation and dynamic vendor payment timing.",
      votes: 38,
    },
    {
      id: "option-c",
      label: "AI Governance & Data Protection Enclaves",
      description: "Zero-retention gateways for sensitive GL data.",
      votes: 25,
    },
    {
      id: "option-d",
      label: "Board Reporting & Natural Language Commentary",
      description: "Automated variance narratives and dynamic boardroom dashboards.",
      votes: 12,
    },
  ],
};
