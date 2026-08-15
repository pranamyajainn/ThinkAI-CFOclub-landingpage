import React from "react";
import Link from "next/link";
import { getAllArticles } from "@/lib/newsletter";
import { ArrowRight, Sparkles, Calendar, Clock, BookOpen } from "lucide-react";

export default function NewsletterTeaser() {
  const articles = getAllArticles().slice(0, 3);

  return (
    <section className="w-full py-20 bg-surface-subtle/50 border-t border-surface-dim/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-secondary-container" />
              <span>Weekly Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-on-surface tracking-tight">
              Latest from the CFO AI Hub Newsletter
            </h2>
            <p className="text-base text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
              Every week, we publish tactical briefings, algorithmic risk teardowns, and autonomous finance blueprints.
            </p>
          </div>

          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-container transition-all self-start md:self-end whitespace-nowrap"
          >
            <span>Browse All Briefings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Teaser Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article) => {
            const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });

            return (
              <article
                key={article.slug}
                className="group flex flex-col justify-between bg-surface-pure rounded-xl border border-surface-dim/70 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-surface-container text-primary text-[11px] font-semibold">
                      {article.category}
                    </span>
                    <span className="text-[11px] font-semibold text-text-muted">
                      Edition #{article.editionNumber}
                    </span>
                  </div>

                  <Link href={`/newsletter/${article.slug}`}>
                    <h3 className="text-base sm:text-lg font-bold font-display text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2.5">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-surface-dim/40 flex items-center justify-between text-xs text-text-muted">
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formattedDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <Link
                    href={`/newsletter/${article.slug}`}
                    className="text-secondary font-semibold hover:underline inline-flex items-center gap-1 text-[11px]"
                  >
                    Read
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
