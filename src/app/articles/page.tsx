import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticlesHero from "@/components/newsletter/ArticlesHero";
import FeaturedArticleCard from "@/components/newsletter/FeaturedArticleCard";
import ArticleGrid from "@/components/newsletter/ArticleGrid";
import NewsletterSubscribe from "@/components/newsletter/NewsletterSubscribe";
import { getAllArticles, getFeaturedArticle, getAllCategories } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles — AI in Finance for Practitioners — CFO AI Hub",
  description: "Standalone operational teardowns, algorithmic risk frameworks, and real-world deployment case studies curated specifically for CFOs and senior finance leaders.",
  openGraph: {
    title: "Articles — CFO AI Hub",
    description: "Tactical articles on AI deployment in corporate finance, autonomous FP&A, and treasury.",
    type: "website",
  },
};

export default function ArticlesHubPage() {
  const allArticles = getAllArticles();
  const featuredArticle = getFeaturedArticle();
  const categories = getAllCategories();

  // Filter out featured article from the initial grid view if it's already shown in the featured spotlight
  const initialGridArticles = featuredArticle
    ? allArticles.filter((a) => a.slug !== featuredArticle.slug)
    : allArticles;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-on-surface">
      <Navbar />

      <main className="flex-grow">
        {/* Articles Header Banner */}
        <ArticlesHero totalArticles={allArticles.length} />

        {/* Featured Article Spotlight */}
        {featuredArticle && <FeaturedArticleCard article={featuredArticle} />}

        {/* Search, Filter & Grid of Articles — skip entirely when every
            article is already shown in the Featured spotlight above, so
            visitors don't hit a confusing "no articles found" empty state. */}
        {initialGridArticles.length > 0 && (
          <ArticleGrid
            initialArticles={initialGridArticles}
            categories={categories}
          />
        )}

        {/* Email Subscription Box */}
        <NewsletterSubscribe />
      </main>

      <Footer />
    </div>
  );
}
