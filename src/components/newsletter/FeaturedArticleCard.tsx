import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Article, MetricHighlight } from "@/types/article";
import { ArrowRight, Clock, Calendar, Sparkles } from "lucide-react";

interface FeaturedArticleCardProps {
  article: Article;
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

        <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Cover Image & Takeaways Preview */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {article.coverImage ? (
              <Link
                href={`/articles/${article.slug}`}
                className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-surface-dim group-hover:shadow-md transition-all block"
              >
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs text-white font-semibold flex items-center gap-1">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ) : null}

            {/* Quick Takeaway box */}
            <div className="bg-surface-subtle rounded-xl p-5 border border-surface-dim/60">
              <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                Executive Summary
              </div>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                {article.keyTakeaways[0] || article.excerpt}
              </p>
            </div>
          </div>

          {/* Right Column: Metadata, Headline, Subtitle, Metric Highlights & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondary-container/15 text-secondary text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Article
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
              <Link href={`/articles/${article.slug}`}>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-on-surface hover:text-primary transition-colors tracking-tight leading-snug mb-3">
                  {article.title}
                </h2>
              </Link>

              {/* Subtitle / Excerpt */}
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6">
                {article.excerpt}
              </p>

              {/* Key metric highlights */}
              {article.metricsHighlight && article.metricsHighlight.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {article.metricsHighlight.slice(0, 3).map((metric: MetricHighlight, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-surface-subtle border border-surface-dim/40"
                    >
                      <div className="text-lg sm:text-xl font-bold font-display text-primary">
                        {metric.value}
                      </div>
                      <div className="text-[11px] font-medium text-text-muted leading-tight mt-0.5">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Author & CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-surface-dim/50">
              <div className="flex items-center gap-3">
                {article.author.avatar ? (
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover border border-surface-dim"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-sm">
                    {article.author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="text-sm font-bold text-on-surface">{article.author.name}</div>
                  <div className="text-xs text-text-muted">{article.author.role}</div>
                </div>
              </div>

              <Link
                href={`/articles/${article.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-container transition-all group-hover:translate-x-0.5"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
