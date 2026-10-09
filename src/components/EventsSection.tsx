import React from "react";
import { getUpcomingEvents, getPastEvents } from "@/content/events";
import { CFOEvent } from "@/types/event";
import { CalendarDays, Clock, MapPin, Radio, ArrowUpRight, History } from "lucide-react";

export default function EventsSection() {
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  if (upcomingEvents.length === 0 && pastEvents.length === 0) return null;

  return (
    <section className="w-full py-20 bg-surface-subtle/50 border-t border-surface-dim/50" id="events">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
              <CalendarDays className="w-3.5 h-3.5 text-secondary-container" />
              <span>Live Sessions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-on-surface tracking-tight">
              {upcomingEvents.length > 0 ? "Upcoming Events" : "Events"}
            </h2>
            <p className="text-base text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
              Join finance leaders and practitioners in person or online — no vendor pitch decks, just working sessions.
            </p>
          </div>
        </div>

        {upcomingEvents.length === 0 && (
          <p className="text-sm text-on-surface-variant mb-12">
            New sessions are being scheduled — check back soon.
          </p>
        )}

        {/* Event Cards */}
        {upcomingEvents.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {upcomingEvents.map((event: CFOEvent) => (
            <article
              key={event.slug}
              className={`group flex flex-col justify-between bg-surface-pure rounded-xl border overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${
                event.featured ? "border-primary/40 ring-1 ring-primary/10" : "border-surface-dim/70"
              }`}
            >
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                        event.format === "In-Person"
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary-container/20 text-secondary"
                      }`}
                    >
                      {event.format === "Online" && <Radio className="w-3 h-3" />}
                      {event.format === "In-Person" ? "In-Person" : "Online Webinar"}
                    </span>
                    <span className="text-[11px] font-semibold text-text-muted">
                      {event.displayDate}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-display text-on-surface leading-snug mb-2.5">
                    {event.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                    {event.description}
                  </p>

                  <div className="space-y-1.5 mb-5">
                    <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span>{event.venue ?? event.location}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={event.eventbriteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary text-white font-semibold text-xs hover:bg-primary-container transition-all"
                >
                  <span>Register on Eventbrite</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <div className={upcomingEvents.length > 0 ? "mt-14" : ""}>
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-text-muted mb-4">
              <History className="w-4 h-4" />
              Past Events
            </h3>
            <ul className="divide-y divide-surface-dim/60 rounded-xl border border-surface-dim/70 bg-surface-pure/60">
              {pastEvents.map((event: CFOEvent) => (
                <li key={event.slug}>
                  <a
                    href={event.eventbriteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 px-5 py-4 hover:bg-surface-subtle transition-colors"
                  >
                    <span className="text-xs font-semibold text-text-muted sm:w-28 flex-shrink-0">
                      {event.displayDate}
                    </span>
                    <span className="flex-1 text-sm font-semibold text-on-surface-variant group-hover:text-primary transition-colors">
                      {event.title}
                    </span>
                    <span className="text-xs text-text-muted flex-shrink-0">
                      {event.format === "In-Person" ? event.location : "Online Webinar"}
                    </span>
                    <ArrowUpRight className="hidden sm:block w-3.5 h-3.5 text-text-muted group-hover:text-primary transition-colors flex-shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
