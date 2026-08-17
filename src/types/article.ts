export type ArticleCategory =
  | "All"
  | "AI Strategy"
  | "FP&A Automation"
  | "Risk & Governance"
  | "Case Studies"
  | "Executive Briefing";

export interface ArticleAuthor {
  name: string;
  role: string;
  avatar?: string;
  company?: string;
  linkedin?: string;
}

export interface MetricHighlight {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface ArticleMedia {
  type: "image" | "video" | "workflow" | "timeline";
  src?: string;
  alt?: string;
  caption?: string;
  title?: string;
  duration?: string;
  poster?: string;
}

export interface ArticleSection {
  heading?: string;
  subheading?: string;
  paragraphs: string[];
  media?: ArticleMedia;
  callout?: {
    type: "tip" | "warning" | "insight" | "stat";
    title?: string;
    text: string;
  };
  quote?: {
    text: string;
    author: string;
    role?: string;
  };
  bullets?: string[];
  checklist?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
}

/**
 * A standalone, long-form thought-leadership piece. Lives at /articles/[slug].
 *
 * Articles are NOT newsletter editions — they carry no edition number.
 * An article may be featured or linked from inside a newsletter edition,
 * but it remains its own resource with its own URL. See NewsletterEdition
 * in src/types/newsletter.ts for complete periodic newsletter issues.
 */
export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: Exclude<ArticleCategory, "All">;
  tags: string[];
  publishedAt: string; // YYYY-MM-DD
  readTime: string;
  featured?: boolean;
  coverImage?: string;
  coverImageCaption?: string;
  author: ArticleAuthor;
  metricsHighlight?: MetricHighlight[];
  keyTakeaways: string[];
  sections: ArticleSection[];
  conclusion?: {
    heading: string;
    text: string;
    actionItem?: string;
  };
  relatedSlugs?: string[];
}
