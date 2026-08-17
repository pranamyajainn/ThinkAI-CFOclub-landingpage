import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterEditionsHero from "@/components/newsletter/NewsletterEditionsHero";
import NewsletterEditionCard from "@/components/newsletter/NewsletterEditionCard";
import NewsletterSubscribe from "@/components/newsletter/NewsletterSubscribe";
import { getAllEditions } from "@/lib/newsletter";

export const metadata: Metadata = {
  title: "The CFO AI Hub Newsletter — Weekly Editions",
  description: "Every complete weekly edition of the CFO AI Hub newsletter: news roundups, featured practitioner articles, tool comparisons, and community polls.",
  openGraph: {
    title: "The CFO AI Hub Newsletter",
    description: "Complete weekly newsletter editions for CFOs and senior finance leaders.",
    type: "website",
  },
};

export default function NewsletterHubPage() {
  const editions = getAllEditions();
  const latestEdition = editions.length > 0 ? editions[0].editionNumber : 1;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-on-surface">
      <Navbar />

      <main className="flex-grow">
        <NewsletterEditionsHero latestEdition={latestEdition} />

        <div className="w-full max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-xl font-bold font-display text-on-surface mb-8">
            All Newsletter Editions
          </h2>

          {editions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {editions.map((edition) => (
                <NewsletterEditionCard key={edition.slug} edition={edition} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-surface-pure rounded-2xl border border-surface-dim/70">
              <p className="text-sm text-text-muted">New editions are on their way — check back soon.</p>
            </div>
          )}
        </div>

        <NewsletterSubscribe />
      </main>

      <Footer />
    </div>
  );
}
