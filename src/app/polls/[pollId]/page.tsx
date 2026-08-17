import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PollCard from "@/components/polls/PollCard";
import NewsletterSubscribe from "@/components/newsletter/NewsletterSubscribe";
import { getAllPolls, getPollById } from "@/lib/polls";
import { ChevronRight, ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen flex flex-col justify-between bg-[#F8F9FD] text-on-surface">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto mb-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center justify-between text-xs text-text-muted mb-4" aria-label="Breadcrumb">
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/polls" className="hover:text-primary transition-colors">
                Polls
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-on-surface font-semibold truncate max-w-[140px]">
                Poll #{poll.id}
              </span>
            </div>

            <Link
              href="/polls"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-secondary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Polls</span>
            </Link>
          </nav>
        </div>

        {/* Executive Poll Card matching exact user screenshot UI */}
        <div className="mb-16">
          <div className="max-w-2xl mx-auto"><PollCard poll={poll} /></div>
        </div>

        {/* Newsletter Subscription Footer Bar */}
        <NewsletterSubscribe />
      </main>

      <Footer />
    </div>
  );
}
