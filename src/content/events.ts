import { CFOEvent } from "@/types/event";

/**
 * UPCOMING CFO AI HUB EVENTS
 *
 * Shown in the "Upcoming Events" section on the landing page. Each links
 * out to its Eventbrite page for registration — there's no in-app detail
 * page or checkout flow.
 *
 * To add a new event: add an entry below (chronological order), and to
 * retire one, just remove it — nothing else needs to change.
 */
export const events: CFOEvent[] = [
  {
    slug: "beyond-ai-pilots-embedding-ai-core-finance-operations",
    title: "Beyond AI Pilots: Embedding AI in Core Finance Operations",
    description:
      "An exclusive executive breakfast seminar on moving past AI experimentation to embed AI into core finance processes — confidence thresholds, exception handling, escalation, and governance across AP, AR, and month-end close.",
    format: "In-Person",
    date: "2026-09-24",
    displayDate: "Sep 24, 2026",
    time: "8:30 – 10:00 AM BST",
    location: "London, UK",
    venue: "AAB, 1 Leadenhall Street, 23rd Floor, London EC3V 1AB",
    hosts: ["AAB", "Neoflo", "Selona AI"],
    eventbriteUrl:
      "https://www.eventbrite.com/e/beyond-ai-pilots-embedding-ai-in-core-finance-operations-tickets-1997832346328?aff=oddtdtcreator",
    featured: true,
  },
  {
    slug: "ai-curiosity-to-operational-ai-mastery",
    title: "From AI Curiosity to Operational AI Mastery",
    description:
      "A practitioner-led webinar on moving from AI experimentation to embedded operational use — cash flow and forecasting, month-end close and reporting, and tax compliance reconciliation.",
    format: "Online",
    date: "2026-09-29",
    displayDate: "Sep 29, 2026",
    time: "11:30 AM – 12:30 PM BST (4:00 – 5:00 PM IST)",
    location: "Online",
    eventbriteUrl:
      "https://www.eventbrite.com/e/from-ai-curiosity-to-operational-ai-mastery-tickets-2000435237646?aff=oddtdtcreator",
  },
  {
    slug: "scale-your-finance-function-ai-playbook",
    title: "Scale Your Finance Function: AI Playbook for Faster, Accountable Operations",
    description:
      "A one-hour webinar on building an operating layer on top of finance operations — automating routine work, routing exceptions to the right owner, and driving 90-day improvements across Procure-to-Pay, Order-to-Cash, and Record-to-Report.",
    format: "Online",
    date: "2026-10-07",
    displayDate: "Oct 7, 2026",
    time: "3:00 – 4:00 PM UTC (11:00 AM – 12:00 PM EDT)",
    location: "Online",
    eventbriteUrl:
      "https://www.eventbrite.com/e/scale-your-finance-function-ai-playbook-for-faster-accountable-operations-tickets-1998123304592?aff=oddtdtcreator",
  },
];

/** Events with a date today or later, soonest first. */
export function getUpcomingEvents(): CFOEvent[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return [...events]
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
