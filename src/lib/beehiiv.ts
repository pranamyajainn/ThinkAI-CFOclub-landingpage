/**
 * Server-only client for the CFO AI Hub Beehiiv publication.
 *
 * Beehiiv is the source of truth for the newsletter: every signup on this
 * site is pushed there (so the person actually receives the newsletter),
 * and the /newsletter hub reads published editions from there (so a new
 * edition shows up here without anyone copying it into the codebase).
 *
 * Needs the BEEHIIV_API_KEY environment variable (Beehiiv → Settings →
 * Workspace → API). Without it, reads return null and the site falls back
 * to the hand-built editions in src/content/newsletter.
 */

const BEEHIIV_API = "https://api.beehiiv.com/v2";
export const BEEHIIV_PUBLICATION_ID = "pub_5a7753df-68ef-4fb1-84ce-791ebcf7637e";

/** How often (seconds) cached Beehiiv reads are refreshed. */
export const BEEHIIV_REVALIDATE_SECONDS = 3600;

export interface BeehiivPost {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  web_url: string;
  thumbnail_url?: string;
  authors: string[];
  publish_date?: number; // seconds since epoch
  displayed_date?: number; // seconds since epoch
  content?: { free?: { rss?: string } };
}

interface BeehiivPostList {
  data: BeehiivPost[];
  total_pages: number;
}

function apiKey(): string | undefined {
  return process.env.BEEHIIV_API_KEY;
}

async function beehiivGet<T>(path: string): Promise<T | null> {
  const key = apiKey();
  if (!key) return null;

  try {
    const res = await fetch(`${BEEHIIV_API}${path}`, {
      headers: { Authorization: `Bearer ${key}` },
      next: { revalidate: BEEHIIV_REVALIDATE_SECONDS },
    });
    // 202 means Beehiiv is still rendering expanded content — treat it as
    // "not available yet" rather than caching an empty body as real data.
    if (res.status !== 200) {
      console.error(`[beehiiv] GET ${path} returned ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`[beehiiv] GET ${path} failed:`, err);
    return null;
  }
}

/**
 * All published, web-visible posts, oldest first. Scheduled posts that
 * haven't gone out yet are excluded, as are posts hidden from the Beehiiv
 * feed — hiding a post in Beehiiv hides it here too.
 */
export async function getPublishedBeehiivPosts(): Promise<BeehiivPost[] | null> {
  const posts: BeehiivPost[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const list = await beehiivGet<BeehiivPostList>(
      `/publications/${BEEHIIV_PUBLICATION_ID}/posts` +
        `?status=confirmed&hidden_from_feed=false&order_by=publish_date&direction=asc&limit=100&page=${page}`
    );
    if (!list) return null;
    posts.push(...list.data);
    totalPages = list.total_pages;
    page += 1;
  } while (page <= totalPages);

  const nowSeconds = Date.now() / 1000;
  return posts.filter((p) => p.web_url && p.publish_date && p.publish_date <= nowSeconds);
}

/** One post by its Beehiiv slug, with its web-ready HTML body. */
export async function getBeehiivPostWithContent(slug: string): Promise<BeehiivPost | null> {
  const list = await beehiivGet<BeehiivPostList>(
    `/publications/${BEEHIIV_PUBLICATION_ID}/posts` +
      `?status=confirmed&slugs[]=${encodeURIComponent(slug)}&expand[]=free_rss_content`
  );
  return list?.data[0] ?? null;
}

interface SubscribeOptions {
  email: string;
  firstName?: string;
  lastName?: string;
  /** Which form the signup came from, e.g. "newsletter-box" or "waitlist". */
  utmMedium: string;
  /**
   * Only true when the person explicitly asked for the newsletter just now,
   * so someone who unsubscribed is re-added only by their own choice.
   */
  reactivateExisting: boolean;
}

/** Adds (or re-confirms) a subscriber on the Beehiiv publication. */
export async function subscribeToBeehiiv(opts: SubscribeOptions): Promise<void> {
  const key = apiKey();
  if (!key) {
    throw new Error("BEEHIIV_API_KEY is not set, so the signup was not sent to Beehiiv.");
  }

  const customFields = [
    opts.firstName ? { name: "first_name", value: opts.firstName } : null,
    opts.lastName ? { name: "last_name", value: opts.lastName } : null,
  ].filter(Boolean);

  const res = await fetch(`${BEEHIIV_API}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email: opts.email,
      reactivate_existing: opts.reactivateExisting,
      send_welcome_email: true,
      utm_source: "cfoaihub.com",
      utm_medium: opts.utmMedium,
      referring_site: "https://cfoaihub.com",
      ...(customFields.length > 0 ? { custom_fields: customFields } : {}),
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Beehiiv subscribe returned ${res.status}: ${await res.text()}`);
  }
}
