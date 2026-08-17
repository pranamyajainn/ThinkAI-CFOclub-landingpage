import { Article } from "@/types/article";

/**
 * 📝 TEMPLATE FOR STANDALONE ARTICLES
 *
 * Articles are standalone thought-leadership pieces — NOT newsletter
 * editions, so they carry no edition number. For a complete periodic
 * newsletter issue, see src/content/newsletter/ instead.
 *
 * To add a new article:
 * 1. Duplicate this file and rename it (e.g. `your-article-topic.ts`)
 * 2. Fill in the fields below
 * 3. Import and add your article object in `src/content/articles/index.ts`
 * 4. Done! The article will automatically appear in `/articles` and at `/articles/[slug]`.
 */

export const templateArticle: Article = {
  // Unique URL identifier (e.g. "ai-vendor-selection-checklist")
  slug: "sample-article-slug-change-me",

  // Compelling headline for finance leaders
  title: "Article Title: The Strategic Transformation of Finance Operations",
  
  // Executive subtitle elaborating on the core thesis
  subtitle: "A detailed breakdown of tactical implementations, cost metrics, and leadership decisions.",
  
  // 1-2 sentence preview for cards and SEO metadata
  excerpt: "Discover the key takeaways, framework implementations, and executive insights from this week's briefing.",
  
  // Category choices: "AI Strategy" | "FP&A Automation" | "Risk & Governance" | "Case Studies" | "Executive Briefing"
  category: "AI Strategy",
  
  // Relevant search and filter tags
  tags: ["AI Strategy", "FP&A", "Executive Leadership"],
  
  // Publication date: YYYY-MM-DD
  publishedAt: "2026-08-21",
  
  // Estimated reading duration
  readTime: "5 min read",
  
  // Optional: Set to true if this should be the featured hero banner on the newsletter index
  featured: false,
  
  // Author information
  author: {
    name: "Finance Contributor",
    role: "Practitioner & AI Research Lead",
    company: "CFO AI Hub",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  
  // Optional: High-impact KPI badges shown on cards and top of article
  metricsHighlight: [
    { label: "Cycle Time Reduction", value: "-45%", change: "Measurable benchmark", isPositive: true },
    { label: "Implementation Cost", value: "3.2x ROI", change: "Within 6 months", isPositive: true }
  ],
  
  // Key executive bullet points summarized in the top callout
  keyTakeaways: [
    "First core principle or major finding from this analysis.",
    "Second tactical implementation advice or organizational risk.",
    "Third actionable recommendation for the CFO and executive team."
  ],
  
  // Main article content sections
  sections: [
    {
      heading: "1. The Strategic Context and Challenge",
      paragraphs: [
        "Write the opening context explaining why this problem matters right now to finance executives.",
        "Include background details, industry friction points, or common pitfalls."
      ],
      // Optional callout box: type can be "tip" | "warning" | "insight" | "stat"
      callout: {
        type: "insight",
        title: "Key Takeaway for Leadership",
        text: "Highlight an essential executive insight that demands immediate attention."
      }
    },
    {
      heading: "2. The Framework & Tactical Implementation",
      paragraphs: [
        "Detail the step-by-step methodology, architectural blueprints, or operational roadmap."
      ],
      bullets: [
        "Step 1: Audit current data feeds and establish baseline accuracy.",
        "Step 2: Implement deterministic verification layers.",
        "Step 3: Train finance controllers on AI-assisted workflows."
      ],
      // Optional comparison or data table
      table: {
        headers: ["Phase", "Legacy Process", "AI-Augmented Architecture"],
        rows: [
          ["Phase 1", "Manual consolidation", "Continuous streaming data"],
          ["Phase 2", "Periodic review", "Automated anomaly alerts"]
        ]
      }
    }
  ],
  
  // Concluding section with actionable next steps
  conclusion: {
    heading: "Actionable Next Steps",
    text: "Wrap up the briefing with clear executive directives and expected timeline.",
    actionItem: "Download the accompanying template in the CFO AI Hub member library."
  },
  
  // Slugs of related articles to display at the bottom
  relatedSlugs: [
    "from-artificial-intelligence-to-applied-intelligence-human-ai-finance",
    "making-tax-digital-permanent-operational-shift-midsize-uk"
  ]
};
