import React from "react";
import { getUpcomingEvents } from "@/content/events";
import { CFOEvent } from "@/types/event";
import { CalendarDays, Clock, MapPin, Radio, ArrowUpRight } from "lucide-react";

export default function EventsSection() {
  const upcomingEvents = getUpcomingEvents();

  if (upcomingEvents.length === 0) return null;

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
              Upcoming Events
            </h2>
            <p className="text-base text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
              Join finance leaders and practitioners in person or online — no vendor pitch decks, just working sessions.
            </p>
          </div>
        </div>

        {/* Event Cards */}
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
      </div>
    </section>
  );
}
