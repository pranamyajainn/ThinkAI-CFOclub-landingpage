# CFO AI Hub — Newsletter & Blog Content Architecture

This directory (`src/content/articles/`) contains all weekly newsletter briefings, articles, and case studies for the CFO AI Hub platform.

## 🚀 How to Add a New Article (Weekly Workflow)

Adding a new weekly article is a 3-step, fully type-safe process:

### Step 1: Create a new article file
Create a new file in `src/content/articles/` named after your topic (e.g., `ai-vendor-selection-guide.ts`).

You can copy from `template.example.ts` as a starting point.

```typescript
import { NewsletterArticle } from "@/types/newsletter";

export const articleVendorSelection: NewsletterArticle = {
  slug: "ai-vendor-selection-guide",
  editionNumber: 13,
  title: "AI Vendor Selection: The CFO's Procurement Checklist",
  subtitle: "Avoid locked-in contracts and evaluate true total cost of ownership.",
  excerpt: "A practical guide to negotiating enterprise AI contracts with strict SLAs and zero data retention.",
  category: "AI Strategy",
  tags: ["Procurement", "Vendor Management", "Contract Negotiation"],
  publishedAt: "2026-08-22",
  readTime: "5 min read",
  featured: false, // Set to true to highlight as this week's featured hero article
  author: {
    name: "Alexandre Moreau",
    role: "Head of AI Architecture",
    company: "Selona AI Hub",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  metricsHighlight: [
    { label: "Cost Savings", value: "32%", isPositive: true },
    { label: "Contract Risk", value: "-80%", isPositive: true }
  ],
  keyTakeaways: [
    "Negotiate Zero Data Retention (ZDR) clauses upfront.",
    "Benchmark token consumption vs dedicated hosting tiers.",
    "Require SOC2 Type II and ISO 42001 certifications."
  ],
  sections: [
    {
      heading: "Why Standard SaaS Contracts Fail for AI",
      paragraphs: [
        "Traditional software agreements assume deterministic compute costs...",
        "With LLM infrastructure, variable usage can rapidly compound."
      ],
      callout: {
        type: "tip",
        title: "Negotiation Leverage",
        text: "Always cap monthly token overage fees at 120% of baseline."
      }
    }
  ],
  conclusion: {
    heading: "Summary",
    text: "Review our vendor scorecard before signing your next enterprise contract.",
    actionItem: "Download the Vendor Scorecard spreadsheet."
  },
  relatedSlugs: ["enterprise-ai-governance-framework-cfo"]
};
```

### Step 2: Register it in `index.ts`
Open `src/content/articles/index.ts` and add the import and array entry:

```typescript
import { articleVendorSelection } from "./ai-vendor-selection-guide";

export const allArticles: NewsletterArticle[] = [
  articleVendorSelection, // Add at top for latest
  ...
];
```

### Step 3: That's It!
Next.js will automatically:
1. Render the new article on the `/newsletter` hub page.
2. Generate its dedicated dynamic page at `/newsletter/ai-vendor-selection-guide`.
3. Provide SEO metadata, breadcrumbs, search indexing, and category filtering.
