import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PollVotingCard from "@/components/polls/PollVotingCard";
import NewsletterSubscribe from "@/components/newsletter/NewsletterSubscribe";
import { getAllPolls, getPollById } from "@/lib/polls";
import { ChevronRight, ArrowLeft, BookOpen, ArrowRight } from "lucide-react";

interface PageProps {
  params: Promise<{ pollId: string }>;
}

export async function generateStaticParams() {
  const polls = getAllPolls();
  return polls.map((poll) => ({
    pollId: poll.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pollId } = await params;
  const poll = getPollById(pollId);

  if (!poll) {
    return {
      title: "Poll Not Found — CFO AI Hub",
    };
  }

  return {
    title: `Poll: ${poll.question} — CFO AI Hub`,
    description: poll.context,
    openGraph: {
      title: `Executive Poll: ${poll.question}`,
      description: poll.context,
      type: "website",
    },
  };
}

export default async function SinglePollPage({ params }: PageProps) {
  const { pollId } = await params;
  const poll = getPollById(pollId);

  if (!poll) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-on-surface">
      <Navbar />

      <main className="flex-grow pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto mb-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-text-muted mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/polls" className="hover:text-primary transition-colors">
              Polls
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-on-surface font-medium truncate max-w-[200px] sm:max-w-xs">
              Edition #{poll.editionNumber}
            </span>
          </nav>

          <Link
            href="/polls"
            className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary-container transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Executive Community Polls</span>
          </Link>
        </div>

        {/* Voting Card */}
        <div className="max-w-3xl mx-auto mb-12">
          <PollVotingCard poll={poll} isStandalone={true} />
        </div>

        {/* Related Newsletter Edition Card if present */}
        {poll.relatedArticleSlug && (
          <div className="max-w-3xl mx-auto mb-16 p-6 rounded-2xl bg-surface-subtle border border-surface-dim flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-primary text-white flex-shrink-0 mt-0.5">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                  Accompanying Executive Intelligence Briefing
                </span>
                <h4 className="text-sm sm:text-base font-bold font-display text-on-surface mt-0.5">
                  {poll.relatedArticleTitle || "Read the Full Weekly Briefing"}
                </h4>
              </div>
            </div>

            <Link
              href={`/newsletter/${poll.relatedArticleSlug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-all flex-shrink-0 whitespace-nowrap"
            >
              <span>Read Briefing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        <NewsletterSubscribe />
      </main>

      <Footer />
    </div>
  );
}
