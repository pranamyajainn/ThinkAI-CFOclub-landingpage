"use client";

import React, { useState, useMemo } from "react";
import { Article, ArticleCategory } from "@/types/article";
import ArticleCard from "./ArticleCard";
import { Search, X, Filter, BookOpen } from "lucide-react";

interface ArticleGridProps {
  initialArticles: Article[];
  categories: ArticleCategory[];
}

export default function ArticleGrid({ initialArticles, categories }: ArticleGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    return initialArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCategory;

      const matchesSearch =
        article.title.toLowerCase().includes(q) ||
        article.subtitle.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        article.tags.some((t: string) => t.toLowerCase().includes(q)) ||
        article.author.name.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [initialArticles, selectedCategory, searchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-surface-dim/60">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-subtle text-text-muted hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80 flex-shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search articles, topics, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 rounded-lg bg-surface-pure border border-surface-dim text-xs sm:text-sm text-on-surface placeholder:text-text-muted/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-on-surface"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid Results Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold font-display text-on-surface flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span>
            {selectedCategory === "All" ? "All Articles & Analyses" : `${selectedCategory}`}
          </span>
          <span className="text-xs font-normal text-text-muted bg-surface-container px-2 py-0.5 rounded-full">
            {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
          </span>
        </h3>

        {(selectedCategory !== "All" || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="text-xs font-semibold text-secondary hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-surface-pure rounded-2xl border border-surface-dim/70">
          <div className="w-12 h-12 rounded-full bg-surface-container text-primary flex items-center justify-center mx-auto mb-4">
            <Filter className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold font-display text-on-surface mb-2">
            No articles found
          </h4>
          <p className="text-sm text-text-muted max-w-sm mx-auto mb-6">
            We couldn't find any articles matching "{searchQuery}" in {selectedCategory}.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
