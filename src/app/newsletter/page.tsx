import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterHero from "@/components/newsletter/NewsletterHero";
import FeaturedArticleCard from "@/components/newsletter/FeaturedArticleCard";
import ArticleGrid from "@/components/newsletter/ArticleGrid";
import NewsletterSubscribe from "@/components/newsletter/NewsletterSubscribe";
import { getAllArticles, getFeaturedArticle, getAllCategories } from "@/lib/newsletter";

export const metadata: Metadata = {
  title: "Weekly CFO Intelligence Briefings — AI in Finance by Practitioners",
  description: "Weekly operational teardowns, algorithmic risk frameworks, and real-world deployment case studies curated specifically for CFOs and senior finance leaders.",
  openGraph: {
    title: "Weekly CFO Intelligence Briefings — CFO AI Hub",
    description: "Tactical weekly briefings on AI deployment in corporate finance, autonomous FP&A, and treasury.",
    type: "website",
  },
};

export default function NewsletterHubPage() {
  const allArticles = getAllArticles();
  const featuredArticle = getFeaturedArticle();
  const categories = getAllCategories();
  const latestEdition = allArticles.length > 0 ? allArticles[0].editionNumber : 1;

  // Filter out featured article from the initial grid view if it's already shown in the featured spotlight
  const initialGridArticles = featuredArticle
    ? allArticles.filter((a) => a.slug !== featuredArticle.slug)
    : allArticles;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-on-surface">
      <Navbar />

      <main className="flex-grow">
        {/* Newsletter Header Banner */}
        <NewsletterHero totalArticles={allArticles.length} latestEdition={latestEdition} />

        {/* Featured Weekly Edition Spotlight */}
        {featuredArticle && <FeaturedArticleCard article={featuredArticle} />}

        {/* Search, Filter & Grid of Articles */}
        <ArticleGrid
          initialArticles={allArticles}
          categories={categories}
        />

        {/* Email Subscription Box */}
        <NewsletterSubscribe />
      </main>

      <Footer />
    </div>
  );
}
