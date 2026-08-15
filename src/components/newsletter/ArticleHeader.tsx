import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NewsletterArticle } from "@/types/newsletter";
import { ChevronRight, Calendar, Clock, Sparkles } from "lucide-react";

interface ArticleHeaderProps {
  article: NewsletterArticle;
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="pt-32 pb-12 px-6 max-w-4xl mx-auto">
      {/* Breadcrumb navigation */}
      <nav className="flex items-center gap-2 text-xs text-text-muted mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/newsletter" className="hover:text-primary transition-colors">
          Newsletter
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-on-surface font-medium truncate max-w-[200px] sm:max-w-xs">
          Edition #{article.editionNumber}
        </span>
      </nav>

      {/* Badges & Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondary-container/15 text-secondary text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Edition #{article.editionNumber}
        </span>
        <span className="px-3 py-1 rounded-md bg-surface-container text-primary text-xs font-semibold">
          {article.category}
        </span>
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <Clock className="w-3.5 h-3.5" />
          <span>{article.readTime}</span>
        </div>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-on-surface tracking-tight leading-[1.18] mb-6">
        {article.title}
      </h1>

      {/* Subtitle */}
      <p className="text-lg sm:text-xl text-on-surface-variant leading-relaxed mb-8 font-normal">
        {article.subtitle}
      </p>

      {/* Author Bar */}
      <div className="flex items-center justify-between py-5 border-y border-surface-dim/60 mb-8">
        <div className="flex items-center gap-3.5">
          {article.author.avatar ? (
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover border border-surface-dim"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-sm">
              {article.author.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="text-sm font-bold text-on-surface">{article.author.name}</div>
            <div className="text-xs text-text-muted">
              {article.author.role} {article.author.company && `• ${article.author.company}`}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="hidden sm:flex items-center gap-1.5">
          {article.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded bg-surface-subtle text-[11px] font-medium text-text-muted"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics Banner */}
      {article.metricsHighlight && article.metricsHighlight.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {article.metricsHighlight.map((metric, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-surface-pure border border-surface-dim/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            >
              <div className="text-2xl font-bold font-display text-primary">
                {metric.value}
              </div>
              <div className="text-xs font-semibold text-on-surface mt-0.5">
                {metric.label}
              </div>
              {metric.change && (
                <div className="text-[11px] text-text-muted mt-1 font-medium">
                  {metric.change}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
