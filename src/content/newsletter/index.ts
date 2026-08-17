import { NewsletterEdition } from "@/types/newsletter";
import { edition1 } from "./edition-1";

/**
 * MASTER LIST OF ALL COMPLETE NEWSLETTER EDITIONS
 *
 * (Latest edition first). Each edition is a full, multi-story periodic
 * issue — see src/content/newsletter/README.md before adding a new one,
 * and src/content/articles/ instead if what you're adding is a single
 * standalone piece rather than a full edition.
 */
export const allEditions: NewsletterEdition[] = [edition1];
