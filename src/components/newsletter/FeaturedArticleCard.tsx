import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NewsletterArticle } from "@/types/newsletter";
import { ArrowRight, Clock, Calendar, Sparkles } from "lucide-react";

interface FeaturedArticleCardProps {
  article: NewsletterArticle;
}

export default function FeaturedArticleCard({ article }: FeaturedArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-6 mb-16">
      <div className="relative group bg-surface-pure rounded-2xl border border-surface-dim/60 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_35px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden">
        {/* Top Accent Gradient Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary-container to-secondary-container" />

        <div className="p-8 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Metadata & Core Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondary-container/15 text-secondary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Edition #{article.editionNumber}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-surface-container text-primary text-xs font-semibold">
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

              {/* Title */}
              <Link href={`/newsletter/${article.slug}`}>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-on-surface hover:text-primary transition-colors tracking-tight leading-tight mb-4">
                  {article.title}
                </h2>
              </Link>

              {/* Subtitle / Excerpt */}
              <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed mb-6">
                {article.excerpt}
              </p>

              {/* Key metric highlights */}
              {article.metricsHighlight && article.metricsHighlight.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                  {article.metricsHighlight.slice(0, 3).map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-surface-subtle border border-surface-dim/40"
                    >
                      <div className="text-xl font-bold font-display text-primary">
                        {metric.value}
                      </div>
                      <div className="text-xs font-medium text-text-muted leading-tight mt-0.5">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Author & CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-surface-dim/50">
              <div className="flex items-center gap-3">
                {article.author.avatar ? (
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-full object-cover border border-surface-dim"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-sm">
                    {article.author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="text-sm font-bold text-on-surface">{article.author.name}</div>
                  <div className="text-xs text-text-muted">{article.author.role}</div>
                </div>
              </div>

              <Link
                href={`/newsletter/${article.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-container transition-all group-hover:translate-x-0.5"
              >
                <span>Read Full Briefing</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Executive Takeaways Box */}
          <div className="lg:col-span-5 bg-surface-subtle/80 rounded-xl p-6 sm:p-8 border border-surface-dim/60 flex flex-col justify-between h-full">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                Executive Summary & Takeaways
              </div>

              <ul className="space-y-3.5 mb-6">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary font-bold text-[11px] flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-surface-dim/40 flex items-center justify-between text-xs text-text-muted">
              <span>Includes Architecture Diagrams & Tables</span>
              <Link
                href={`/newsletter/${article.slug}`}
                className="text-secondary font-semibold hover:underline"
              >
                Inspect Framework →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
