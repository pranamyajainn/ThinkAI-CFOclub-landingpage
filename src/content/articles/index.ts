import { NewsletterArticle } from "@/types/newsletter";
import { articleMakingTaxDigital } from "./making-tax-digital-uk-midsize-companies";
import { articleAutonomousFPA } from "./autonomous-fpa-stack";
import { articleEnterpriseAIGovernance } from "./enterprise-ai-governance-framework";
import { articleAgenticTreasury } from "./agentic-treasury-cashflow-ai";
import { articleGenAIROI } from "./genai-roi-finance-calculator";
import { articleNextGenBoardDeck } from "./next-gen-board-deck-multimodal";

/**
 * MASTER LIST OF ALL NEWSLETTER ARTICLES
 *
 * To add a new weekly article:
 * 1. Create a new file in `src/content/articles/your-new-article.ts`
 * 2. Import it here and add it to the `allArticles` array below (latest first).
 */
export const allArticles: NewsletterArticle[] = [
  articleMakingTaxDigital,
  articleAutonomousFPA,
  articleEnterpriseAIGovernance,
  articleAgenticTreasury,
  articleGenAIROI,
  articleNextGenBoardDeck,
];
