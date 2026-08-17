import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NewsletterEdition } from "@/types/newsletter";
import { ChevronRight, Calendar, Clock, Sparkles } from "lucide-react";

interface NewsletterEditionHeaderProps {
  edition: NewsletterEdition;
}

export default function NewsletterEditionHeader({ edition }: NewsletterEditionHeaderProps) {
  const formattedDate = new Date(edition.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="pt-32 pb-8 px-6 max-w-4xl mx-auto">
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
          Edition #{edition.editionNumber}
        </span>
      </nav>

      {/* Badges & Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondary-container/15 text-secondary text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Edition #{edition.editionNumber}
        </span>
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formattedDate}</span>
        </div>
        {edition.readTime && (
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Clock className="w-3.5 h-3.5" />
            <span>{edition.readTime}</span>
          </div>
        )}
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-on-surface tracking-tight leading-[1.18] mb-6">
        {edition.title}
      </h1>

      {/* Subtitle */}
      <p className="text-lg sm:text-xl text-on-surface-variant leading-relaxed mb-8 font-normal">
        {edition.subtitle}
      </p>

      {/* Author Bar */}
      <div className="flex items-center justify-between py-5 border-y border-surface-dim/60 mb-8">
        <div className="flex items-center gap-3.5">
          {edition.author.avatar ? (
            <Image
              src={edition.author.avatar}
              alt={edition.author.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover border border-surface-dim"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-sm">
              {edition.author.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="text-sm font-bold text-on-surface">{edition.author.name}</div>
            <div className="text-xs text-text-muted">
              {edition.author.role} {edition.author.company && `• ${edition.author.company}`}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Cover Graphic */}
      {edition.coverImage && (
        <div className="my-8 rounded-2xl overflow-hidden bg-surface-pure border border-surface-dim/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={edition.coverImage}
              alt={edition.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      )}
    </header>
  );
}
