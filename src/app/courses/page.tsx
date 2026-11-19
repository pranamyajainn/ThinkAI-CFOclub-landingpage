import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Clock, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CourseOutline } from "@/components/courses/CourseOutline";
import { SITE_URL, courseModules, courseName, getLiveLessons, lessonHref } from "@/content/courses";

const description =
  "Claude 101 from CFO AI Hub: short videos that show finance leaders how to use Claude for real finance work, from the first conversation to checking the numbers.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${courseName}: Claude for finance leaders — CFO AI Hub`,
  description,
  alternates: { canonical: "/courses" },
  openGraph: {
    title: `${courseName}: Claude for finance leaders`,
    description,
    type: "website",
    url: "/courses",
    images: [{ url: "/course-videos/claude-101-m1-v1-poster.jpg", width: 1280, height: 720 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function CoursesPage() {
  const totalVideos = courseModules.reduce((n, m) => n + m.lessons.length, 0);
  const live = getLiveLessons();
  const featured = live[live.length - 1]; // newest released video

  return (
    <div className="min-h-screen flex flex-col bg-white text-on-surface">
      <Navbar />

      <main className="flex-grow">
        {/* Intro */}
        <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">
              {courseName} · A CFO AI Hub course
            </p>
            <h1 className="mt-4 max-w-3xl text-[2.6rem] sm:text-6xl md:text-7xl font-bold font-display tracking-tight leading-[1.02] text-on-surface">
              Claude for <span className="text-gradient-primary">finance leaders</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-on-surface-variant leading-relaxed">
              Short videos that show you how to use Claude for real finance work, from your first conversation to
              checking the numbers.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              {live[0] && (
                <Link
                  href={lessonHref(live[0].lesson)}
                  className="inline-flex items-center gap-2.5 h-12 pl-5 pr-6 rounded-full bg-primary text-white font-semibold hover:bg-primary-container transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-container/40"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Start watching
                </Link>
              )}
              <p className="text-sm text-text-muted">
                {courseModules.length} modules · {totalVideos} short videos · new videos added one at a time
              </p>
            </div>
          </div>
        </section>

        {/* Newest video */}
        {featured && (
          <section className="px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <Link
                href={lessonHref(featured.lesson)}
                className="group grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] rounded-[28px] overflow-hidden bg-surface-container-low/60 ring-1 ring-primary/[0.06] hover:ring-primary/15 transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(0,19,86,0.35)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-container/40"
              >
                <div className="relative aspect-video overflow-hidden bg-primary">
                  {featured.lesson.poster && (
                    <Image
                      src={featured.lesson.poster}
                      alt=""
                      fill
                      preload
                      sizes="(min-width: 1152px) 640px, (min-width: 1024px) 56vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  )}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center justify-center w-[72px] h-[72px] rounded-full bg-secondary-container text-white ring-8 ring-white/40 shadow-[0_12px_32px_-6px_rgba(252,133,58,0.6)] transition-transform duration-200 group-hover:scale-105">
                      <Play className="w-7 h-7 fill-white translate-x-0.5" />
                    </span>
                  </span>
                </div>

                <div className="p-6 sm:p-9 flex flex-col">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em]">
                    <span className="inline-flex items-center gap-1.5 text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-container" />
                      Out now
                    </span>
                    <span className="text-text-muted">
                      Module {featured.mod.number} · Video {featured.lesson.number}
                    </span>
                  </div>
                  <h2 className="mt-3 font-display font-bold text-2xl sm:text-3xl leading-tight text-on-surface">
                    {featured.lesson.title}
                  </h2>
                  {featured.lesson.duration && (
                    <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-text-muted">
                      <Clock className="w-4 h-4" />
                      {featured.lesson.duration}
                    </p>
                  )}
                  <ul className="mt-6 space-y-3">
                    {featured.lesson.topics.map((t) => (
                      <li key={t} className="flex gap-3 text-[15px] leading-snug text-on-surface-variant">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 lg:mt-auto lg:pt-8 inline-flex items-center gap-2 font-semibold text-primary">
                    Watch the video
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Outline */}
        <section id="outline" className="px-4 sm:px-6 pt-20 sm:pt-28 pb-24 sm:pb-32">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-on-surface">
                Course outline
              </h2>
              <p className="text-sm text-text-muted">
                {live.length} of {totalVideos} videos out now
              </p>
            </div>
            <CourseOutline modules={courseModules} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
