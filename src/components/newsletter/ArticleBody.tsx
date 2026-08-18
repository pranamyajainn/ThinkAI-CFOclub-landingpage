"use client";

import React, { useState } from "react";
import { Article } from "@/types/article";
import {
  Lightbulb,
  AlertTriangle,
  Info,
  TrendingUp,
  Quote,
  CheckSquare,
  Square,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import VideoWalkthroughPlayer from "./VideoWalkthroughPlayer";
import PollCard from "@/components/polls/PollCard";
import { getPollByArticleSlug } from "@/lib/polls";

interface ArticleBodyProps {
  article: Article;
}

export default function ArticleBody({ article }: ArticleBodyProps) {
  // Local state for interactive checklists
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const linkedPoll = getPollByArticleSlug(article.slug);

  return (
    <article className="max-w-4xl mx-auto px-6 pb-16">
      {/* Executive Key Takeaways Box */}
      <div className="mb-12 rounded-2xl bg-surface-subtle border border-surface-dim/70 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-4">
          <Sparkles className="w-4 h-4 text-secondary-container" />
          <span>Executive Summary & Core Takeaways</span>
        </div>
        <ul className="space-y-3">
          {article.keyTakeaways.map((takeaway, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-on-surface leading-relaxed">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center mt-0.5">
                {idx + 1}
              </span>
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-12 text-on-surface">
        {article.sections.map((section, sIdx) => (
          <section key={sIdx} className="space-y-6">
            {section.heading && (
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-primary tracking-tight pt-4 border-t border-surface-dim/40">
                {section.heading}
              </h2>
            )}

            {section.subheading && (
              <h3 className="text-lg sm:text-xl font-semibold font-display text-on-surface-variant">
                {section.subheading}
              </h3>
            )}

            {/* Paragraphs */}
            {section.paragraphs.map((p, pIdx) => (
              <p
                key={pIdx}
                className="text-base sm:text-lg text-on-surface leading-relaxed font-sans"
              >
                {p}
              </p>
            ))}

            {/* Embedded Video / Media Walkthrough */}
            {section.media && section.media.type === "video" && (
              <VideoWalkthroughPlayer media={section.media} />
            )}

            {/* Bullet Points */}
            {section.bullets && section.bullets.length > 0 && (
              <ul className="space-y-3 pl-2 sm:pl-4">
                {section.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3 text-base text-on-surface-variant leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-container mt-2.5 flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Callout Box */}
            {section.callout && (
              <div
                className={`p-5 sm:p-6 rounded-xl border my-6 ${
                  section.callout.type === "warning"
                    ? "bg-error-container/20 border-error/30 text-on-surface"
                    : section.callout.type === "tip"
                    ? "bg-secondary-fixed/30 border-secondary/20 text-on-surface"
                    : section.callout.type === "stat"
                    ? "bg-primary-fixed/20 border-primary/20 text-on-surface"
                    : "bg-surface-container border-surface-dim text-on-surface"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex-shrink-0">
                    {section.callout.type === "warning" && (
                      <AlertTriangle className="w-5 h-5 text-error" />
                    )}
                    {section.callout.type === "tip" && (
                      <Lightbulb className="w-5 h-5 text-secondary" />
                    )}
                    {section.callout.type === "stat" && (
                      <TrendingUp className="w-5 h-5 text-primary" />
                    )}
                    {section.callout.type === "insight" && (
                      <Info className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    {section.callout.title && (
                      <h4 className="font-bold font-display text-sm uppercase tracking-wider text-primary mb-1">
                        {section.callout.title}
                      </h4>
                    )}
                    <p className="text-sm sm:text-base leading-relaxed text-on-surface">
                      {section.callout.text}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Executive Quote Block */}
            {section.quote && (
              <div className="relative p-6 sm:p-8 my-8 rounded-2xl bg-surface-container-high/60 border-l-4 border-primary">
                <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                <blockquote className="text-lg sm:text-xl font-display italic text-primary leading-snug mb-3">
                  "{section.quote.text}"
                </blockquote>
                <div className="text-xs sm:text-sm font-bold text-on-surface">
                  — {section.quote.author}
                  {section.quote.role && (
                    <span className="font-normal text-text-muted">, {section.quote.role}</span>
                  )}
                </div>
              </div>
            )}

            {/* Responsive Table */}
            {section.table && (
              <div className="my-8 overflow-x-auto rounded-xl border border-surface-dim shadow-sm">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-primary text-white">
                      {section.table.headers.map((header, hIdx) => (
                        <th key={hIdx} className="py-3.5 px-4 font-semibold font-display">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-dim bg-surface-pure">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-surface-subtle transition-colors">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`py-3.5 px-4 ${
                              cIdx === 0 ? "font-semibold text-primary" : "text-on-surface-variant"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Interactive Checklist */}
            {section.checklist && section.checklist.length > 0 && (
              <div className="p-6 rounded-xl bg-surface-pure border border-surface-dim/80 my-6 shadow-sm">
                <h4 className="text-sm font-bold font-display uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-secondary" />
                  Implementation Action Checklist
                </h4>
                <div className="space-y-3">
                  {section.checklist.map((item, cIdx) => {
                    const id = `s${sIdx}-c${cIdx}`;
                    const isChecked = !!checkedItems[id];
                    return (
                      <button
                        key={cIdx}
                        type="button"
                        onClick={() => toggleCheck(id)}
                        className="w-full text-left flex items-start gap-3 p-2.5 rounded-lg hover:bg-surface-subtle transition-colors group cursor-pointer"
                      >
                        <span className="mt-0.5 text-primary flex-shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 text-secondary" />
                          ) : (
                            <Square className="w-5 h-5 text-text-muted group-hover:text-primary" />
                          )}
                        </span>
                        <span
                          className={`text-sm leading-relaxed transition-all ${
                            isChecked
                              ? "line-through text-text-muted opacity-70"
                              : "text-on-surface"
                          }`}
                        >
                          {item}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        ))}

        {/* Conclusion / Directive */}
        {article.conclusion && (
          <div className="pt-8 mt-12 border-t-2 border-primary/20">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-primary mb-3">
              {article.conclusion.heading}
            </h3>
            <p className="text-base sm:text-lg text-on-surface leading-relaxed mb-6">
              {article.conclusion.text}
            </p>
            {article.conclusion.actionItem && (
              <div className="p-5 rounded-xl bg-secondary-container/10 border border-secondary-container/30 flex items-center justify-between gap-4">
                <div className="text-sm font-semibold text-secondary">
                  <strong>Recommended Action:</strong> {article.conclusion.actionItem}
                </div>
                <a
                  href="#apply"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-white text-xs font-semibold hover:bg-secondary-container transition-all flex-shrink-0"
                >
                  <span>Member Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Embedded Poll */}
        {linkedPoll && (
          <div className="my-4">
            <PollCard poll={linkedPoll} variant="embedded" />
          </div>
        )}
      </div>
    </article>
  );
}
