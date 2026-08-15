import { NewsletterArticle, ArticleCategory } from "@/types/newsletter";
import { allArticles } from "@/content/articles";

/**
 * Returns all newsletter articles sorted by publication date (most recent first)
 */
export function getAllArticles(): NewsletterArticle[] {
  return [...allArticles].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

/**
 * Retrieves the featured article or the latest article if none is flagged as featured
 */
export function getFeaturedArticle(): NewsletterArticle | undefined {
  const articles = getAllArticles();
  return articles.find((a) => a.featured) || articles[0];
}

/**
 * Retrieves an article by its unique slug
 */
export function getArticleBySlug(slug: string): NewsletterArticle | undefined {
  return allArticles.find((a) => a.slug === slug);
}

/**
 * Retrieves articles by category
 */
export function getArticlesByCategory(category: ArticleCategory): NewsletterArticle[] {
  const articles = getAllArticles();
  if (category === "All") return articles;
  return articles.filter((a) => a.category === category);
}

/**
 * Retrieves related articles for a given article slug
 */
export function getRelatedArticles(slug: string, limit = 3): NewsletterArticle[] {
  const current = getArticleBySlug(slug);
  if (!current) return getAllArticles().slice(0, limit);

  // If specific relatedSlugs are defined, prefer those
  if (current.relatedSlugs && current.relatedSlugs.length > 0) {
    const explicitRelated = current.relatedSlugs
      .map((s) => getArticleBySlug(s))
      .filter((a): a is NewsletterArticle => a !== undefined);

    if (explicitRelated.length >= limit) {
      return explicitRelated.slice(0, limit);
    }
  }

  // Fallback: match by same category or other recent articles excluding current
  const others = getAllArticles().filter((a) => a.slug !== slug);
  const sameCategory = others.filter((a) => a.category === current.category);
  const differentCategory = others.filter((a) => a.category !== current.category);

  return [...sameCategory, ...differentCategory].slice(0, limit);
}

/**
 * Search articles by query (searches title, subtitle, excerpt, category, tags, author)
 */
export function searchArticles(query: string, category: ArticleCategory = "All"): NewsletterArticle[] {
  let list = getAllArticles();

  if (category !== "All") {
    list = list.filter((a) => a.category === category);
  }

  const q = query.trim().toLowerCase();
  if (!q) return list;

  return list.filter((a) => {
    return (
      a.title.toLowerCase().includes(q) ||
      a.subtitle.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      a.author.name.toLowerCase().includes(q)
    );
  });
}

/**
 * Returns available unique categories
 */
export function getAllCategories(): ArticleCategory[] {
  return [
    "All",
    "AI Strategy",
    "FP&A Automation",
    "Risk & Governance",
    "Case Studies",
    "Executive Briefing",
  ];
}
