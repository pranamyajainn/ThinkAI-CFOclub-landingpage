export type EventFormat = "In-Person" | "Online";

/**
 * A CFO AI Hub live event (webinar or in-person session) promoted on the
 * landing page and linked out to its Eventbrite registration page.
 */
export interface CFOEvent {
  slug: string;
  title: string;
  description: string;
  format: EventFormat;
  date: string; // YYYY-MM-DD, used for sorting/filtering
  displayDate: string; // e.g. "Sep 24, 2026"
  time: string; // e.g. "8:30 – 10:00 AM BST"
  location: string; // "London, UK" | "Online"
  venue?: string; // full venue name/address, in-person only
  hosts?: string[];
  eventbriteUrl: string;
  featured?: boolean;
}
