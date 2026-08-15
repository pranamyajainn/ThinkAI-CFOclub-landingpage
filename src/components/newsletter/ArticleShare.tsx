"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Copy, Check, Share2, ArrowLeft } from "lucide-react";
import { NewsletterArticle } from "@/types/newsletter";

interface ArticleShareProps {
  article: NewsletterArticle;
}

export default function ArticleShare({ article }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = encodeURIComponent(`${article.title} — CFO AI Hub Weekly Briefing`);

  return (
    <div className="max-w-4xl mx-auto px-6 mb-16">
      <div className="p-6 rounded-2xl bg-surface-subtle border border-surface-dim flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary-container transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Newsletter Briefings</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-text-muted flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5" />
            Share Briefing:
          </span>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="p-2 rounded-lg bg-surface-pure hover:bg-surface-container border border-surface-dim text-xs font-medium text-on-surface flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Copy link to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-secondary" />
                <span className="text-secondary font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-text-muted" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          {/* LinkedIn Share */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              shareUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-surface-pure hover:bg-surface-container border border-surface-dim text-on-surface transition-colors flex items-center justify-center"
            title="Share on LinkedIn"
            aria-label="Share on LinkedIn"
          >
            <svg className="w-3.5 h-3.5 fill-[#0A66C2]" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>

          {/* Twitter / X Share */}
          <a
            href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(
              shareUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-surface-pure hover:bg-surface-container border border-surface-dim text-on-surface transition-colors flex items-center justify-center"
            title="Share on X"
            aria-label="Share on X"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
