import React from "react";
import { NewsletterArticle } from "@/types/newsletter";
import ArticleCard from "./ArticleCard";
import { Compass } from "lucide-react";

interface RelatedArticlesProps {
  articles: NewsletterArticle[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 border-t border-surface-dim/60">
      <div className="flex items-center gap-2 mb-8">
        <Compass className="w-5 h-5 text-primary" />
        <h3 className="text-xl sm:text-2xl font-bold font-display text-on-surface">
          Recommended Intelligence Briefings
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
