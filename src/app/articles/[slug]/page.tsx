import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleHeader from "@/components/newsletter/ArticleHeader";
import ArticleBody from "@/components/newsletter/ArticleBody";
import ArticleShare from "@/components/newsletter/ArticleShare";
import NewsletterSubscribe from "@/components/newsletter/NewsletterSubscribe";
import RelatedArticles from "@/components/newsletter/RelatedArticles";
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/articles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found — CFO AI Hub",
    };
  }

  return {
    title: `${article.title} — CFO AI Hub`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} — CFO AI Hub`,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.slug, 3);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-on-surface">
      <Navbar />

      <main className="flex-grow">
        {/* Article Header */}
        <ArticleHeader article={article} />

        {/* Article Body Content */}
        <ArticleBody article={article} />

        {/* Share & Navigation Bar */}
        <ArticleShare article={article} />

        {/* In-article newsletter subscription */}
        <NewsletterSubscribe />

        {/* Contextual Related Reads */}
        <RelatedArticles articles={relatedArticles} />
      </main>

      <Footer />
    </div>
  );
}
