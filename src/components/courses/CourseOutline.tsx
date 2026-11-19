import React from "react";
import Link from "next/link";
import { Lock, Play } from "lucide-react";
import type { CourseLesson, CourseModule } from "@/content/courses";
import { isModuleLive, lessonHref } from "@/content/courses";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

/** One video row. Live videos link to their page; others are blurred and locked. */
function LessonRow({
  lesson,
  mod,
  currentId,
  compact,
}: {
  lesson: CourseLesson;
  mod: CourseModule;
  currentId?: string;
  compact?: boolean;
}) {
  const code = `${mod.number}.${lesson.number}`;
  const pad_y = compact ? "py-2.5" : "py-3.5";

  if (lesson.status !== "live") {
    return (
      <li className={`flex items-center gap-4 ${pad_y} px-3`}>
        <span className="w-8 flex-shrink-0 text-xs font-semibold tabular-nums text-text-muted/70">{code}</span>
        <span className="flex-grow min-w-0 text-[15px] text-on-surface-variant blur-[5px] select-none" aria-hidden="true">
          {lesson.title}
        </span>
        <span className="sr-only">
          Video {code}, coming soon
        </span>
        <Lock className="w-4 h-4 flex-shrink-0 text-text-muted/60" aria-hidden="true" />
      </li>
    );
  }

  const current = lesson.id === currentId;
  return (
    <li>
      <Link
        href={lessonHref(lesson)}
        aria-current={current ? "page" : undefined}
        className={`group flex items-center gap-4 ${pad_y} px-3 rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container ${
          current ? "bg-primary text-white" : "hover:bg-surface-container-low"
        }`}
      >
        <span
          className={`w-8 flex-shrink-0 text-xs font-semibold tabular-nums ${current ? "text-white/60" : "text-secondary"}`}
        >
          {code}
        </span>
        <span className="flex-grow min-w-0 text-[15px] font-semibold leading-snug">{lesson.title}</span>
        {lesson.duration && (
          <span className={`text-xs tabular-nums flex-shrink-0 ${current ? "text-white/70" : "text-text-muted"}`}>
            {lesson.duration}
          </span>
        )}
        <span
          className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
            current
              ? "bg-secondary-container text-white"
              : "bg-secondary-container/12 text-secondary group-hover:bg-secondary-container group-hover:text-white"
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current translate-x-px" />
        </span>
      </Link>
    </li>
  );
}

/** Full outline for /courses: one block per module. */
export function CourseOutline({ modules }: { modules: CourseModule[] }) {
  return (
    <div className="divide-y divide-primary/[0.08] border-y border-primary/[0.08]">
      {modules.map((mod) => {
        const live = isModuleLive(mod);
        return (
          <section key={mod.id} className="grid gap-4 md:gap-10 md:grid-cols-[240px_minmax(0,1fr)] py-8 md:py-10">
            <div>
              <p className="font-display font-bold text-5xl leading-none text-primary/[0.12] tabular-nums">
                {pad(mod.number)}
              </p>
              <h3 className="mt-3 font-display font-bold text-xl text-on-surface">{mod.title}</h3>
              <p className="mt-1 text-sm text-text-muted">
                {mod.lessons.length} videos
                {!live && (
                  <span className="ml-2 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-secondary">
                    · Coming soon
                  </span>
                )}
              </p>
            </div>
            <ul className={`flex flex-col ${live ? "" : "opacity-80"}`}>
              {mod.lessons.map((lesson) => (
                <LessonRow key={lesson.id} lesson={lesson} mod={mod} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

/** Compact list of one module, for the side of a video page. */
export function ModuleList({ mod, currentId }: { mod: CourseModule; currentId: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-secondary">Module {mod.number}</p>
      <h2 className="mt-1 font-display font-bold text-lg text-on-surface">{mod.title}</h2>
      <ul className="mt-3 flex flex-col -mx-3">
        {mod.lessons.map((lesson) => (
          <LessonRow key={lesson.id} lesson={lesson} mod={mod} currentId={currentId} compact />
        ))}
      </ul>
    </div>
  );
}
