import { NewsletterArticle } from "@/types/newsletter";
import { articleMakingTaxDigital } from "./making-tax-digital-uk-midsize-companies";

/**
 * MASTER LIST OF ALL NEWSLETTER ARTICLES
 *
 * To add a new weekly article:
 * 1. Create a new file in `src/content/articles/your-new-article.ts`
 * 2. Import it here and add it to the `allArticles` array below (latest first).
 */
export const allArticles: NewsletterArticle[] = [
  articleMakingTaxDigital,
];
