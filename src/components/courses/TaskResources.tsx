"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ClipboardList, Copy, Download, X } from "lucide-react";
import type { CourseLesson } from "@/content/courses";

type Props = Pick<
  CourseLesson,
  "task" | "taskTip" | "sampleData" | "sampleDataNote" | "sampleFile" | "readMore"
>;

const heading = "text-xs font-bold uppercase tracking-[0.16em] text-secondary";
const smallBtn =
  "inline-flex items-center gap-2 h-9 px-3.5 rounded-full border border-primary/10 bg-white text-sm font-semibold text-on-surface hover:border-primary/25 hover:bg-surface-container-low transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container";

export default function TaskResources({ task, taskTip, sampleData, sampleDataNote, sampleFile, readMore }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    // Desktop: the lesson page pads itself by the panel width so the video is never covered.
    root.dataset.taskPanel = "open";
    // Phone: the sheet covers the page, so stop it scrolling underneath.
    const lockScroll = window.matchMedia("(max-width: 1023px)").matches;
    if (lockScroll) document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Element;
      // The video player stays usable while the panel is open on desktop.
      if (panelRef.current?.contains(t) || triggerRef.current?.contains(t) || t.closest("[data-course-player]")) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    const trigger = triggerRef.current;
    return () => {
      delete root.dataset.taskPanel;
      if (lockScroll) document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  if (!task && !readMore?.length) return null;

  const copy = async () => {
    const text = sampleData!.map((row) => row.join(", ")).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this data:", text);
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="task-resources-panel"
        className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-secondary-container text-on-secondary text-sm font-semibold hover:bg-secondary transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
      >
        <ClipboardList className="w-4 h-4" />
        Task &amp; resources
      </button>

      {/* Phone backdrop */}
      <div
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 z-[60] bg-primary/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        ref={panelRef}
        id="task-resources-panel"
        role="dialog"
        aria-labelledby="task-resources-title"
        className={`fixed z-[70] bg-white flex flex-col shadow-[0_-12px_40px_rgba(0,0,0,0.18)] lg:shadow-[-12px_0_40px_rgba(0,0,0,0.10)]
          inset-x-0 bottom-0 max-h-[85dvh] rounded-t-3xl
          lg:inset-x-auto lg:right-0 lg:top-0 lg:bottom-0 lg:max-h-none lg:w-[420px] lg:rounded-none lg:border-l lg:border-primary/[0.08]
          transition-[transform,visibility] duration-300 ease-out
          ${open ? "translate-y-0 lg:translate-x-0 visible" : "translate-y-full lg:translate-y-0 lg:translate-x-full invisible"}`}
      >
        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-primary/[0.08]">
          <h2 id="task-resources-title" className="font-display font-bold text-lg text-on-surface">
            Task &amp; resources
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-surface-container-low transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 py-6 space-y-9">
          {task && (
            <section>
              <h3 className={heading}>Your 5-minute task</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-on-surface">{task}</p>
              {taskTip && (
                <p className="mt-4 rounded-xl bg-surface-container-low/70 px-4 py-3 text-sm leading-relaxed text-text-muted">
                  {taskTip}
                </p>
              )}
            </section>
          )}

          {sampleData && sampleData.length > 0 && (
            <section>
              <h3 className={heading}>
                Sample data
                {sampleDataNote && (
                  <span className="ml-2 normal-case tracking-normal font-semibold text-text-muted">({sampleDataNote})</span>
                )}
              </h3>
              <div className="mt-3 overflow-x-auto rounded-xl ring-1 ring-primary/[0.08]">
                <table className="w-full text-sm tabular-nums">
                  <thead className="bg-surface-container-low/70">
                    <tr>
                      {sampleData[0].map((h, i) => (
                        <th key={h} className={`px-4 py-2.5 font-semibold text-on-surface ${i ? "text-right" : "text-left"}`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.slice(1).map((row) => (
                      <tr key={row[0]} className="border-t border-primary/[0.06]">
                        {row.map((cell, i) => (
                          <td key={i} className={`px-4 py-2.5 text-on-surface ${i ? "text-right" : "text-left"}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" onClick={copy} className={smallBtn} aria-live="polite">
                  {copied ? <Check className="w-4 h-4 text-secondary" /> : <Copy className="w-4 h-4 text-secondary" />}
                  {copied ? "Copied" : "Copy"}
                </button>
                {sampleFile && (
                  <a href={`/course-files/${sampleFile}`} download className={smallBtn}>
                    <Download className="w-4 h-4 text-secondary" />
                    Download Excel
                  </a>
                )}
              </div>
            </section>
          )}

          {readMore && readMore.length > 0 && (
            <section>
              <h3 className={heading}>Read more</h3>
              <ul className="mt-3 border-t border-primary/[0.08]">
                {readMore.map((r) => (
                  <li key={r.url} className="border-b border-primary/[0.08]">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-3 py-3.5"
                    >
                      <span>
                        <span className="block font-semibold text-[15px] text-on-surface group-hover:text-secondary transition-colors">
                          {r.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-text-muted">Anthropic Help Center</span>
                      </span>
                      <ArrowUpRight className="w-4 h-4 mt-1 flex-shrink-0 text-text-muted group-hover:text-secondary transition-colors" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-secondary transition-colors"
          >
            See the full course
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
