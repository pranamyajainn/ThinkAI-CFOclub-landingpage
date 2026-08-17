import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterEditionHeader from "@/components/newsletter/NewsletterEditionHeader";
import NewsletterEditionBody from "@/components/newsletter/NewsletterEditionBody";
import NewsletterEditionShare from "@/components/newsletter/NewsletterEditionShare";
import NewsletterSubscribe from "@/components/newsletter/NewsletterSubscribe";
import { getAllEditions, getEditionBySlug } from "@/lib/newsletter";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const editions = getAllEditions();
  return editions.map((edition) => ({
    slug: edition.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const edition = getEditionBySlug(slug);

  if (!edition) {
    return {
      title: "Edition Not Found — CFO AI Hub",
    };
  }

  return {
    title: `Edition #${edition.editionNumber}: ${edition.title} — CFO AI Hub Newsletter`,
    description: edition.excerpt,
    openGraph: {
      title: `${edition.title} — CFO AI Hub Newsletter`,
      description: edition.excerpt,
      type: "article",
      publishedTime: edition.publishedAt,
      authors: [edition.author.name],
    },
  };
}

export default async function NewsletterEditionPage({ params }: PageProps) {
  const { slug } = await params;
  const edition = getEditionBySlug(slug);

  if (!edition) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-on-surface">
      <Navbar />

      <main className="flex-grow">
        <NewsletterEditionHeader edition={edition} />
        <NewsletterEditionBody edition={edition} />
        <NewsletterEditionShare edition={edition} />
        <NewsletterSubscribe />
      </main>

      <Footer />
    </div>
  );
}
