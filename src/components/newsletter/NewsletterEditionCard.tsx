import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NewsletterEdition } from "@/types/newsletter";
import { ArrowUpRight, Clock, Calendar, Sparkles } from "lucide-react";

interface NewsletterEditionCardProps {
  edition: NewsletterEdition;
}

export default function NewsletterEditionCard({ edition }: NewsletterEditionCardProps) {
  const formattedDate = new Date(edition.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group flex flex-col justify-between bg-surface-pure rounded-xl border border-surface-dim/70 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-200">
      {edition.coverImage && (
        <Link
          href={`/newsletter/${edition.slug}`}
          className="relative aspect-[16/9] w-full overflow-hidden block bg-surface-container"
        >
          <Image
            src={edition.coverImage}
            alt={edition.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}

      <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-secondary-container/15 text-secondary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              Edition #{edition.editionNumber}
            </span>
          </div>

          <Link href={`/newsletter/${edition.slug}`} className="block mb-3">
            <h3 className="text-lg sm:text-xl font-bold font-display text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2">
              {edition.title}
            </h3>
          </Link>

          <p className="text-sm text-on-surface-variant line-clamp-3 leading-relaxed mb-6">
            {edition.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-surface-dim/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {edition.author.avatar ? (
              <Image
                src={edition.author.avatar}
                alt={edition.author.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover border border-surface-dim"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs">
                {edition.author.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="text-xs font-semibold text-on-surface">{edition.author.name}</div>
              <div className="flex items-center gap-2 text-[11px] text-text-muted">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formattedDate}
                </span>
                {edition.readTime && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {edition.readTime}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <Link
            href={`/newsletter/${edition.slug}`}
            className="p-2 rounded-lg text-primary hover:bg-surface-container group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            aria-label={`Read ${edition.title}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
