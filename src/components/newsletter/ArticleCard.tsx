import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NewsletterArticle } from "@/types/newsletter";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";

interface ArticleCardProps {
  article: NewsletterArticle;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group flex flex-col justify-between bg-surface-pure rounded-xl border border-surface-dim/70 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-200">
      {article.coverImage && (
        <Link
          href={`/newsletter/${article.slug}`}
          className="relative aspect-[16/9] w-full overflow-hidden block bg-surface-container"
        >
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}

      <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between">
        <div>
          {/* Category & Edition Meta */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-surface-container text-primary text-xs font-semibold">
              {article.category}
            </span>
            <span className="text-[11px] font-semibold text-text-muted">
              Edition #{article.editionNumber}
            </span>
          </div>

          {/* Title */}
          <Link href={`/newsletter/${article.slug}`} className="block mb-3">
            <h3 className="text-lg sm:text-xl font-bold font-display text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2">
              {article.title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="text-sm text-on-surface-variant line-clamp-3 leading-relaxed mb-6">
            {article.excerpt}
          </p>

          {/* Metric Badges if present */}
          {article.metricsHighlight && article.metricsHighlight.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {article.metricsHighlight.slice(0, 2).map((m, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-subtle text-xs font-medium text-primary border border-surface-dim/40"
                >
                  <strong className="font-bold">{m.value}</strong>
                  <span className="text-text-muted text-[11px]">{m.label}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Author & Date */}
        <div className="pt-4 border-t border-surface-dim/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {article.author.avatar ? (
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover border border-surface-dim"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs">
                {article.author.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="text-xs font-semibold text-on-surface">{article.author.name}</div>
              <div className="flex items-center gap-2 text-[11px] text-text-muted">
                <span>{formattedDate}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          <Link
            href={`/newsletter/${article.slug}`}
            className="p-2 rounded-lg text-primary hover:bg-surface-container group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            aria-label={`Read ${article.title}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
