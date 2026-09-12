"use client";

import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Radio, ArrowUpRight } from "lucide-react";
import { getUpcomingEvents } from "@/content/events";

/**
 * Full-width attention banner shown at the very top of the Hero — the
 * first thing a visitor sees. Surfaces the next 2 upcoming events (soonest
 * first), each linking straight to its own Eventbrite registration page,
 * clearly tagged In-Person vs Online. Always reflects whichever events are
 * actually next — see the revalidate config in src/app/page.tsx for how
 * that stays current without a redeploy. Hides itself once there are no
 * more upcoming events, rather than showing stale content.
 */
export default function EventsAnnouncementBar() {
  const nextEvents = getUpcomingEvents().slice(0, 2);
  if (nextEvents.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full mb-8 rounded-2xl border border-secondary-container/40 bg-surface-pure shadow-[0_8px_28px_rgba(0,0,0,0.08)] overflow-hidden"
    >
      <div className="flex items-center gap-2 px-4 sm:px-5 pt-3.5 pb-2.5">
        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary-container" />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
          Upcoming Live Events
        </span>
      </div>

      <div
        className={`grid ${
          nextEvents.length > 1 ? "sm:grid-cols-2 sm:divide-x" : ""
        } divide-y sm:divide-y-0 divide-surface-dim/60 border-t border-surface-dim/60`}
      >
        {nextEvents.map((event) => (
          <a
            key={event.slug}
            href={event.eventbriteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-4 sm:px-5 py-3.5 hover:bg-surface-subtle transition-colors"
          >
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold flex-shrink-0 ${
                event.format === "In-Person" ? "bg-primary text-white" : "bg-secondary text-white"
              }`}
            >
              {event.format === "Online" ? (
                <Radio className="w-3 h-3" />
              ) : (
                <MapPin className="w-3 h-3" />
              )}
              {event.format === "In-Person" ? "In-Person" : "Online"}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1 text-[10px] font-semibold text-text-muted mb-0.5">
                <CalendarDays className="w-3 h-3 flex-shrink-0" />
                <span className="whitespace-nowrap">{event.displayDate}</span>
                <span>•</span>
                <span className="truncate">{event.location}</span>
              </div>
              <p className="text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                {event.title}
              </p>
            </div>

            <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors flex-shrink-0" />
          </a>
        ))}
      </div>
    </motion.div>
  );
}
