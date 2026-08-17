import React from "react";
import Link from "next/link";
import { NewsletterEdition } from "@/types/newsletter";
import { getPollById } from "@/lib/polls";
import PollCard from "@/components/polls/PollCard";
import { Newspaper, Sparkles, ArrowUpRight, ArrowRight, ExternalLink } from "lucide-react";

interface NewsletterEditionBodyProps {
  edition: NewsletterEdition;
}

export default function NewsletterEditionBody({ edition }: NewsletterEditionBodyProps) {
  const poll = edition.pollId ? getPollById(edition.pollId) : undefined;

  return (
    <article className="max-w-4xl mx-auto px-6 pb-16 space-y-12">
      {/* Today in Finance AI — story roundup */}
      {edition.stories.length > 0 && (
        <section className="space-y-6">
          <h2 className="flex items-center gap-2.5 text-2xl sm:text-3xl font-bold font-display text-primary tracking-tight">
            <Newspaper className="w-6 h-6 text-secondary" />
            {edition.storiesHeading || "Today in Finance AI"}
          </h2>

          <ol className="space-y-5">
            {edition.stories.map((story, idx) => (
              <li
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-surface-subtle border border-surface-dim/60"
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="flex-grow">
                    {story.headlineUrl ? (
                      <a
                        href={story.headlineUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-base sm:text-lg text-on-surface hover:text-primary transition-colors inline-flex items-start gap-1.5"
                      >
                        <span>{story.headline}</span>
                        <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 mt-1 opacity-60" />
                      </a>
                    ) : (
                      <span className="font-bold text-base sm:text-lg text-on-surface">
                        {story.headline}
                      </span>
                    )}
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mt-2">
                      {story.body}
                    </p>
                    {story.sourceLabel && (
                      <div className="mt-2.5 text-xs font-semibold text-text-muted">
                        {story.sourceUrl ? (
                          <a
                            href={story.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary hover:underline"
                          >
                            [{story.sourceLabel}]
                          </a>
                        ) : (
                          <span>[{story.sourceLabel}]</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Featured Content — teaser for a CFO AI Hub article */}
      {edition.featured && (
        <section className="p-6 sm:p-8 rounded-2xl bg-secondary-container/10 border border-secondary-container/25 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary">
            <Sparkles className="w-4 h-4" />
            <span>Featured From CFO AI Hub</span>
          </div>

          {edition.featured.articleSlug ? (
            <Link
              href={`/articles/${edition.featured.articleSlug}`}
              className="block text-xl sm:text-2xl font-bold font-display text-primary hover:text-secondary transition-colors leading-snug"
            >
              {edition.featured.heading}
            </Link>
          ) : (
            <h3 className="text-xl sm:text-2xl font-bold font-display text-primary leading-snug">
              {edition.featured.heading}
            </h3>
          )}

          <div className="space-y-3">
            {edition.featured.paragraphs.map((p, idx) => (
              <p key={idx} className="text-sm sm:text-base text-on-surface leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {edition.featured.articleSlug && (
              <Link
                href={`/articles/${edition.featured.articleSlug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-container transition-colors"
              >
                <span>Read the Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
            {edition.featured.inlineLinks?.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-secondary hover:underline inline-flex items-center gap-1"
              >
                {link.label}
                <ArrowUpRight className="w-3 h-3" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Tool / Platform Comparison */}
      {edition.comparison && (
        <section className="space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-primary tracking-tight">
            {edition.comparison.heading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {edition.comparison.entries.map((entry) => (
              <div
                key={entry.name}
                className="p-5 rounded-xl bg-surface-pure border border-surface-dim/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
              >
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-sm text-primary hover:text-secondary transition-colors inline-flex items-center gap-1.5 mb-2"
                >
                  {entry.name}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      {edition.ctaLabel && edition.ctaHref && (
        <div className="flex justify-center">
          <Link
            href={edition.ctaHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary-container text-on-secondary font-semibold text-sm hover:bg-secondary hover:shadow-lg transition-all"
          >
            <span>{edition.ctaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Embedded Poll */}
      {poll && (
        <section>
          <PollCard poll={poll} variant="embedded" />
        </section>
      )}

      {/* Closing */}
      {(edition.closingHeading || edition.closingText) && (
        <section className="p-6 sm:p-8 rounded-2xl bg-primary text-on-primary text-center space-y-2">
          {edition.closingHeading && (
            <h3 className="text-xl sm:text-2xl font-bold font-display">{edition.closingHeading}</h3>
          )}
          {edition.closingText && (
            <p className="text-sm sm:text-base text-on-primary/85 leading-relaxed">
              {edition.closingText}
            </p>
          )}
          {edition.signOff && (
            <p className="text-sm font-bold pt-1">{edition.signOff}</p>
          )}
        </section>
      )}
    </article>
  );
}
