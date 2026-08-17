import { NewsletterEdition } from "@/types/newsletter";
import { allEditions } from "@/content/newsletter";

/**
 * Returns all newsletter editions sorted by edition number (most recent first)
 */
export function getAllEditions(): NewsletterEdition[] {
  return [...allEditions].sort((a, b) => b.editionNumber - a.editionNumber);
}

/**
 * Retrieves the most recent newsletter edition
 */
export function getLatestEdition(): NewsletterEdition | undefined {
  return getAllEditions()[0];
}

/**
 * Retrieves a newsletter edition by its unique slug
 */
export function getEditionBySlug(slug: string): NewsletterEdition | undefined {
  return allEditions.find((e) => e.slug === slug);
}

/**
 * Retrieves a newsletter edition by its edition number
 */
export function getEditionByNumber(editionNumber: number): NewsletterEdition | undefined {
  return allEditions.find((e) => e.editionNumber === editionNumber);
}
