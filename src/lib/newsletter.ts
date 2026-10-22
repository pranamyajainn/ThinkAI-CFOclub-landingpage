import { NewsletterEdition } from "@/types/newsletter";
import { ArticleAuthor } from "@/types/article";
import { allEditions } from "@/content/newsletter";
import {
  BeehiivPost,
  getBeehiivPostWithContent,
  getPublishedBeehiivPosts,
} from "@/lib/beehiiv";

/**
 * Newsletter editions come from two places:
 *
 * 1. Hand-built editions in src/content/newsletter — richer layout and a
 *    native poll embed. Each one names its Beehiiv post via `beehiivSlug`.
 * 2. Every other edition published on Beehiiv, pulled in automatically
 *    (see src/lib/beehiiv.ts). Publishing in Beehiiv is all it takes for a
 *    new edition to appear on /newsletter, within the hour.
 *
 * Edition numbers follow Beehiiv publish order. Beehiiv lets the same post
 * be sent twice (e.g. a resend to non-openers); a later post with the same
 * title as an earlier one counts as that edition, not a new one.
 */

function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Beehiiv posts in publish order, with resends of an earlier edition dropped. */
function uniqueEditionPosts(posts: BeehiivPost[]): BeehiivPost[] {
  const seenTitles = new Set<string>();
  return posts.filter((post) => {
    const key = normalizeTitle(post.title);
    if (seenTitles.has(key)) return false;
    seenTitles.add(key);
    return true;
  });
}

function authorFor(name: string | undefined): ArticleAuthor {
  const known = allEditions.find((e) => e.author.name === name)?.author;
  return known ?? { name: name || "The CFO AI Hub Team", role: "CFO AI Hub" };
}

function syncedEdition(post: BeehiivPost, editionNumber: number): NewsletterEdition {
  const sentAt = post.displayed_date ?? post.publish_date ?? 0;
  return {
    slug: post.slug,
    editionNumber,
    title: post.title.trim(),
    subtitle: post.subtitle,
    excerpt: post.subtitle,
    publishedAt: new Date(sentAt * 1000).toISOString().slice(0, 10),
    author: authorFor(post.authors[0]),
    stories: [],
    beehiivUrl: post.web_url,
  };
}

/** Beehiiv's own <script>/<style> blocks would fight the site's code and styles. */
function stripScriptsAndStyles(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");
}

function readTimeFor(html: string): string {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

/**
 * All editions, most recent first. Falls back to the hand-built editions
 * alone if Beehiiv can't be reached (or BEEHIIV_API_KEY isn't set).
 */
export async function getAllEditions(): Promise<NewsletterEdition[]> {
  const editions = [...allEditions];
  const posts = await getPublishedBeehiivPosts();

  if (posts) {
    const nativeBeehiivSlugs = new Set(allEditions.map((e) => e.beehiivSlug));
    uniqueEditionPosts(posts).forEach((post, idx) => {
      if (!nativeBeehiivSlugs.has(post.slug)) {
        editions.push(syncedEdition(post, idx + 1));
      }
    });
  }

  return editions.sort((a, b) => b.editionNumber - a.editionNumber);
}

/**
 * One edition by its URL slug. For a Beehiiv-synced edition this also
 * loads the full post body.
 */
export async function getEditionBySlug(slug: string): Promise<NewsletterEdition | undefined> {
  const native = allEditions.find((e) => e.slug === slug);
  if (native) return native;

  const edition = (await getAllEditions()).find((e) => e.slug === slug);
  if (!edition) return undefined;

  const html = (await getBeehiivPostWithContent(slug))?.content?.free?.rss;
  if (!html) return edition;

  return { ...edition, contentHtml: stripScriptsAndStyles(html), readTime: readTimeFor(html) };
}
