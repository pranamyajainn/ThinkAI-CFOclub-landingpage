import { Poll } from "@/types/poll";

export const pollMTDReadiness: Poll = {
  id: "mtd-digital-links-readiness-2026",
  editionNumber: 1,
  question: "How is your finance team currently managing HMRC Making Tax Digital digital-link compliance?",
  context: "With HMRC penalties of up to £400 per return and expanding MTD mandates (ITSA in 2026/2027), where does your mid-size finance operation stand on unbroken digital links?",
  category: "Risk & Governance",
  status: "active",
  publishedAt: "2026-08-15",
  closingDate: "2026-08-30",
  relatedArticleSlug: "making-tax-digital-permanent-operational-shift-midsize-uk",
  relatedArticleTitle: "Making Tax Digital Isn't a One-Time Project. For Mid-Size UK Companies, It's a Permanent Operational Shift.",
  keyTakeawayInsight: "Initial responses from 340+ UK finance leaders show over 68% still rely on manual PDF entry or Excel VAT adjustments, leaving them exposed to broken digital link audits.",
  tags: ["Making Tax Digital", "UK VAT", "HMRC", "AP/AR Automation", "Compliance"],
  totalVotes: 342,
  options: [
    {
      id: "fully-automated",
      label: "Fully Automated & Unbroken",
      description: "Direct machine-read intake, 3-way matching, and automated API ledger sync with zero manual retyping.",
      votes: 74, // ~22%
    },
    {
      id: "partially-automated",
      label: "Partially Automated (With Manual Excel Patches)",
      description: "Accounting software is connected, but staff still key in PDF invoices and summarize VAT on spreadsheets.",
      votes: 184, // ~54%
    },
    {
      id: "outsourced-manual",
      label: "Outsourced to External Accountants / Manual",
      description: "We send invoices and statements to external bookkeepers at month-end without verified digital link trails.",
      votes: 52, // ~15%
    },
    {
      id: "auditing-this-quarter",
      label: "Uncertain / Currently Auditing AP/AR Process",
      description: "We are evaluating our intake workflows before upcoming HMRC penalty thresholds and ITSA expansion.",
      votes: 32, // ~9%
    },
  ],
};
