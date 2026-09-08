/**
 * Region codes used to segment waitlist members for geo-targeted campaigns.
 * Stored on each Firestore `waitlist/{email}` document as a short stable
 * code so the collection can be filtered by region without any text
 * normalization — see WAITLIST_REGIONS in src/lib/waitlist.ts for the
 * display labels shown on the form.
 *
 * Codes are permanent: renaming one orphans every member already tagged
 * with it. Add new codes instead.
 */
export type WaitlistRegion =
  | "NA"      // North America
  | "UK"      // United Kingdom
  | "EU"      // Europe (excl. UK)
  | "ME"      // Middle East
  | "IN"      // India
  | "APAC"    // Asia-Pacific (excl. India)
  | "OTHER";  // Anywhere else — keeps members from mis-filing themselves

export interface WaitlistEntry {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  region: WaitlistRegion;
  /** Optional — omitted from the document entirely when not supplied. */
  companyName?: string;
  /** Optional — omitted from the document entirely when not supplied. */
  phone?: string;
}
