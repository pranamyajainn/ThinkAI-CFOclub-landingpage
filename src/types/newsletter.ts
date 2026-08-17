import { ArticleAuthor } from "@/types/article";

/**
 * A complete, periodic CFO AI Hub newsletter edition — the full multi-story
 * issue as published on Beehiiv, reproduced natively. Lives at
 * /newsletter/[slug]. This is distinct from an Article (src/types/article.ts):
 * a newsletter edition bundles several short items (news roundup, a featured
 * article teaser, a comparison, a poll, closing notes) under one edition
 * number; an Article is a single standalone long-form piece.
 */

export interface NewsletterLink {
  label: string;
  url: string;
}

export interface NewsletterStoryItem {
  headline: string;
  headlineUrl?: string;
  body: string;
  sourceLabel?: string; // e.g. "Mavvrik report via CFO Dive"
  sourceUrl?: string;
}

export interface NewsletterFeaturedContent {
  heading: string;
  headingUrl?: string;
  paragraphs: string[];
  /** Slug of a CFO AI Hub article this teaser links out to (/articles/[slug]) */
  articleSlug?: string;
  inlineLinks?: NewsletterLink[];
}

export interface NewsletterComparisonEntry {
  name: string;
  url: string;
  description: string;
}

export interface NewsletterComparisonSection {
  heading: string;
  entries: NewsletterComparisonEntry[];
}

export interface NewsletterEdition {
  slug: string;
  editionNumber: number;
  title: string;
  subtitle: string;
  excerpt: string;
  publishedAt: string; // YYYY-MM-DD
  readTime?: string;
  author: ArticleAuthor;
  coverImage?: string;
  storiesHeading?: string; // e.g. "Today in Finance AI"
  stories: NewsletterStoryItem[];
  featured?: NewsletterFeaturedContent;
  comparison?: NewsletterComparisonSection;
  /** id of an existing Poll (src/types/poll.ts) embedded natively in this edition */
  pollId?: string;
  ctaLabel?: string;
  ctaHref?: string;
  closingHeading?: string;
  closingText?: string;
  signOff?: string;
}
