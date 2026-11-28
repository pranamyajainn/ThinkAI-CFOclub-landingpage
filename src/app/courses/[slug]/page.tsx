import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight, Clock, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoursePlayer from "@/components/courses/CoursePlayer";
import ShareButtons from "@/components/courses/ShareButtons";
import TaskResources from "@/components/courses/TaskResources";
import { ModuleList } from "@/components/courses/CourseOutline";
import {
  INTRO_VIDEO,
  SITE_URL,
  courseName,
  getLiveLessonBySlug,
  getLiveLessons,
  getNextLesson,
  getPreviousLiveLesson,
  lessonHref,
} from "@/content/courses";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Only released videos have a page. Any other address shows the 404 page.
export const dynamicParams = false;

export function generateStaticParams() {
  return getLiveLessons().map(({ lesson }) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const found = getLiveLessonBySlug(slug);
  if (!found) return { title: "Video not found — CFO AI Hub" };

  const { lesson, mod } = found;
  const title = `${lesson.title} | ${courseName}, Module ${mod.number} — CFO AI Hub`;
  const description = `${courseName}, Module ${mod.number}, Video ${lesson.number}. In this video: ${lesson.topics.join("; ")}.`;
  const path = lessonHref(lesson);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: lesson.title,
      description,
      type: "video.episode",
      url: path,
      siteName: "CFO AI Hub",
      images: lesson.poster ? [{ url: lesson.poster, width: 1280, height: 720 }] : undefined,
      videos: lesson.videoUrl ? [{ url: lesson.videoUrl, type: "video/mp4", width: 1920, height: 1080 }] : undefined,
    },
    twitter: { card: "summary_large_image", title: lesson.title, description },
  };
}

export default async function CourseVideoPage({ params }: PageProps) {
  const { slug } = await params;
  const found = getLiveLessonBySlug(slug);
  if (!found || !found.lesson.videoUrl) notFound();

  const { lesson, mod } = found;
  const next = getNextLesson(lesson.id);
  const prev = getPreviousLiveLesson(lesson.id);
  const nextLive = next?.lesson.status === "live";

  const endNote = !next
    ? `You have finished ${courseName}.`
    : nextLive
      ? `Next: ${next.lesson.title}`
      : `Module ${next.mod.number}, Video ${next.lesson.number} is coming soon.`;

  return (
    <div className="min-h-screen flex flex-col bg-white text-on-surface">
      <Navbar />

      {/* The "Task & resources" panel sets data-task-panel on <html>; on desktop the page makes room so the video is never covered. */}
      <main className="flex-grow px-4 sm:px-6 pt-24 sm:pt-28 pb-24 lg:transition-[padding] lg:duration-300 lg:in-data-[task-panel=open]:pr-[444px]">
        <div className="max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-text-muted mb-5">
            <Link href="/courses" className="font-semibold text-on-surface hover:text-secondary transition-colors">
              {courseName}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span>Module {mod.number}</span>
            <ChevronRight className="w-4 h-4" />
            <span>Video {lesson.number}</span>
          </nav>

          <div data-course-player>
            <CoursePlayer
              src={lesson.videoUrl!}
              poster={lesson.poster}
              intro={INTRO_VIDEO}
              title={lesson.title}
              eyebrow={`Module ${mod.number} · Video ${lesson.number}`}
              duration={lesson.duration}
              endNote={endNote}
              autoPlay
            />
          </div>

          <div className="mt-10 sm:mt-12 grid gap-12 lg:gap-16 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* About this video */}
            <article>
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold uppercase tracking-[0.14em] text-secondary">
                <span>
                  Module {mod.number} · {mod.title}
                </span>
                {lesson.duration && (
                  <span className="inline-flex items-center gap-1 text-text-muted normal-case tracking-normal font-semibold text-sm">
                    <Clock className="w-3.5 h-3.5" />
                    {lesson.duration}
                  </span>
                )}
              </p>
              <h1 className="mt-3 font-display font-bold text-3xl sm:text-4xl md:text-[2.75rem] tracking-tight leading-[1.1] text-on-surface">
                {lesson.title}
              </h1>

              {lesson.summary && <p className="mt-3 text-base leading-relaxed text-text-muted">{lesson.summary}</p>}

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <TaskResources
                  task={lesson.task}
                  taskTip={lesson.taskTip}
                  sampleData={lesson.sampleData}
                  sampleDataNote={lesson.sampleDataNote}
                  sampleFile={lesson.sampleFile}
                  readMore={lesson.readMore}
                />
                <ShareButtons path={lessonHref(lesson)} title={lesson.title} />
              </div>

              <h2 className="mt-12 text-xs font-bold uppercase tracking-[0.16em] text-text-muted">In this video</h2>
              <ol className="mt-4 border-t border-primary/[0.08]">
                {lesson.topics.map((topic, i) => (
                  <li key={topic} className="flex gap-5 py-4 border-b border-primary/[0.08]">
                    <span className="font-display font-bold text-secondary tabular-nums w-6 flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-[17px] leading-relaxed text-on-surface">{topic}</span>
                  </li>
                ))}
              </ol>

              {/* Previous / next */}
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {prev ? (
                  <Link
                    href={lessonHref(prev.lesson)}
                    className="group rounded-2xl p-5 ring-1 ring-primary/[0.08] hover:ring-primary/20 transition-colors"
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
                      <ArrowLeft className="w-3.5 h-3.5" /> Previous
                    </span>
                    <span className="mt-1 block font-semibold text-on-surface">{prev.lesson.title}</span>
                  </Link>
                ) : (
                  <span className="hidden sm:block" />
                )}
                {next &&
                  (nextLive ? (
                    <Link
                      href={lessonHref(next.lesson)}
                      className="group rounded-2xl p-5 ring-1 ring-primary/[0.08] hover:ring-primary/20 transition-colors sm:text-right"
                    >
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-secondary">
                        Up next <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <span className="mt-1 block font-semibold text-on-surface">{next.lesson.title}</span>
                    </Link>
                  ) : (
                    <div className="rounded-2xl p-5 bg-surface-container-low/60 sm:text-right">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
                        <Lock className="w-3.5 h-3.5" /> Up next · coming soon
                      </span>
                      <span className="mt-1 block font-semibold text-on-surface blur-[5px] select-none" aria-hidden="true">
                        {next.lesson.title}
                      </span>
                    </div>
                  ))}
              </div>
            </article>

            {/* This module */}
            <aside className="lg:sticky lg:top-24 self-start">
              <div className="rounded-3xl p-5 sm:p-6 bg-surface-container-low/60 ring-1 ring-primary/[0.05]">
                <ModuleList mod={mod} currentId={lesson.id} />
                <Link
                  href="/courses#outline"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-secondary transition-colors"
                >
                  See the full course
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
