"use client";

import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import { getUpcomingEvents } from "@/content/events";

/**
 * Full-width attention banner shown at the very top of the Hero — the
 * first thing a visitor sees. Surfaces the soonest upcoming event and
 * jumps to the full Upcoming Events section on click. Hides itself once
 * there are no more upcoming events, rather than showing stale content.
 */
export default function EventsAnnouncementBar() {
  const nextEvent = getUpcomingEvents()[0];
  if (!nextEvent) return null;

  return (
    <motion.a
      href="#events"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-wrap sm:flex-nowrap items-center gap-x-3 gap-y-1.5 w-full mb-8 px-4 sm:px-5 py-3 rounded-xl bg-gradient-to-r from-secondary-container to-secondary text-on-secondary shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
      </span>

      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider flex-shrink-0">
        <CalendarDays className="w-3.5 h-3.5" />
        Next Live Event · {nextEvent.displayDate}
      </span>

      <span className="text-sm font-semibold flex-1 min-w-0 truncate">
        {nextEvent.title}
        <span className="hidden sm:inline font-normal opacity-90">
          {" "}— {nextEvent.format === "In-Person" ? nextEvent.location : "Online Webinar"}
        </span>
      </span>

      <span className="inline-flex items-center gap-1 text-xs font-bold whitespace-nowrap flex-shrink-0 group-hover:gap-2 transition-all">
        Details
        <ArrowRight className="w-3.5 h-3.5" />
      </span>
    </motion.a>
  );
}
