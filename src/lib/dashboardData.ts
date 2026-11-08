import "server-only";
import type { QuerySnapshot, Timestamp } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { formatDateTime, humanize } from "@/components/dashboard/dashboardUtils";
import { getAllPolls } from "@/lib/polls";
import { WAITLIST_REGIONS } from "@/lib/waitlist";

/**
 * Everything /dashboard shows, read live from Firestore on each page load.
 * Dates are sent to the browser as ISO strings (or null when a record has
 * no timestamp yet).
 */

export interface DashboardSubscriber {
  id: string;
  email: string;
  role: string | null;
  source: string;
  createdAt: string | null;
}

export interface DashboardWaitlistMember {
  id: string;
  name: string;
  email: string;
  role: string;
  region: string;
  companyName: string | null;
  phone: string | null;
  createdAt: string | null;
}

export interface DashboardPollOption {
  id: string;
  label: string;
  votes: number;
}

export interface DashboardPoll {
  id: string;
  question: string;
  category: string;
  status: "active" | "closed";
  publishedAt: string;
  closingDate: string | null;
  totalVotes: number;
  /** Votes already in the poll file before it went live (e.g. event votes). */
  baselineVotes: number;
  /** Votes cast on the website = totalVotes - baselineVotes. */
  siteVotes: number;
  lastVoteAt: string | null;
  options: DashboardPollOption[];
}

/** One Firestore document with every field turned into display text. */
export interface DashboardRecord {
  id: string;
  /** From the `timestamp` (or `createdAt`) field; used for sorting and the period filter. */
  createdAt: string | null;
  values: Record<string, string>;
}

/** A whole top-level Firestore collection, every field included. */
export interface DashboardCollection {
  name: string;
  label: string;
  /** Every field name found in any document, in display order. */
  fields: string[];
  records: DashboardRecord[];
}

export interface DashboardData {
  subscribers: DashboardSubscriber[];
  waitlist: DashboardWaitlistMember[];
  polls: DashboardPoll[];
  collections: DashboardCollection[];
  loadedAt: string;
}

function toIso(value: unknown): string | null {
  const ts = value as Timestamp | undefined;
  return ts && typeof ts.toDate === "function" ? ts.toDate().toISOString() : null;
}

/* ---------------- Raw collections (every field) ---------------- */

const COLLECTION_LABELS: Record<string, string> = {
  newsletterSubscribers: "Subscribers",
  waitlist: "Waitlist",
  pollVotes: "Poll votes",
};
const COLLECTION_ORDER = ["newsletterSubscribers", "waitlist"];
// Fields shown first, in this order; any other field follows A–Z.
const FIELD_ORDER = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "role",
  "companyName",
  "region",
  "source",
  "timestamp",
  "createdAt",
];

/** Any Firestore value → the text you would read in the Firebase console. */
function toText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  const iso = toIso(value);
  if (iso) return formatDateTime(iso);
  if (Array.isArray(value)) return value.map(toText).join(", ");
  if (typeof value === "object") {
    const v = value as Record<string, unknown>;
    if (typeof v.path === "string" && "firestore" in v) return v.path; // document reference
    if (typeof v.latitude === "number" && typeof v.longitude === "number") {
      return `${v.latitude}, ${v.longitude}`; // geo point
    }
    if (typeof v.toBase64 === "function") return "(binary data)";
    return Object.entries(v)
      .map(([k, inner]) => `${k}: ${toText(inner)}`)
      .join("; ");
  }
  return String(value);
}

function toCollection(name: string, snap: QuerySnapshot): DashboardCollection {
  const fieldSet = new Set<string>();
  const records: DashboardRecord[] = snap.docs.map((d) => {
    const data = d.data();
    const values: Record<string, string> = {};
    for (const [key, value] of Object.entries(data)) {
      fieldSet.add(key);
      values[key] = toText(value);
    }
    return { id: d.id, createdAt: toIso(data.timestamp ?? data.createdAt), values };
  });
  records.sort(byNewest);

  const fields = [
    ...FIELD_ORDER.filter((f) => fieldSet.has(f)),
    ...[...fieldSet].filter((f) => !FIELD_ORDER.includes(f)).sort(),
  ];
  return { name, label: COLLECTION_LABELS[name] ?? humanize(name), fields, records };
}

function collectionRank(name: string): number {
  const i = COLLECTION_ORDER.indexOf(name);
  return i === -1 ? COLLECTION_ORDER.length : i;
}

function byNewest<T extends { createdAt: string | null }>(a: T, b: T): number {
  return (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
}

const regionLabel = new Map(WAITLIST_REGIONS.map((r) => [r.code, r.label]));

export async function loadDashboardData(): Promise<DashboardData> {
  const db = getAdminDb();
  const polls = getAllPolls(); // newest first, by publishedAt

  // Read every top-level collection in the database, so a new collection
  // or field shows up in the dashboard without a code change.
  const refs = await db.listCollections();
  const snaps = new Map(
    await Promise.all(refs.map(async (ref) => [ref.id, await ref.get()] as const))
  );
  const empty = { docs: [] } as unknown as QuerySnapshot;
  const subscriberSnap = snaps.get("newsletterSubscribers") ?? empty;
  const waitlistSnap = snaps.get("waitlist") ?? empty;
  const voteDocs = new Map((snaps.get("pollVotes") ?? empty).docs.map((d) => [d.id, d]));
  const voteSnaps = polls.map((p) => voteDocs.get(p.id));

  const collections = [...snaps.entries()]
    .map(([name, snap]) => toCollection(name, snap))
    .sort((a, b) => collectionRank(a.name) - collectionRank(b.name) || a.label.localeCompare(b.label));

  const subscribers: DashboardSubscriber[] = subscriberSnap.docs
    .map((d) => {
      const data = d.data();
      return {
        id: d.id,
        email: String(data.email ?? ""),
        role: data.role ? String(data.role) : null,
        source: String(data.source ?? "unknown"),
        createdAt: toIso(data.timestamp),
      };
    })
    .sort(byNewest);

  const waitlist: DashboardWaitlistMember[] = waitlistSnap.docs
    .map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim(),
        email: String(data.email ?? ""),
        role: String(data.role ?? ""),
        region: regionLabel.get(data.region) ?? String(data.region ?? "—"),
        companyName: data.companyName ? String(data.companyName) : null,
        phone: data.phone ? String(data.phone) : null,
        createdAt: toIso(data.timestamp),
      };
    })
    .sort(byNewest);

  const dashboardPolls: DashboardPoll[] = polls.map((poll, i) => {
    const snap = voteSnaps[i];
    const live = snap?.data() ?? {};
    const optionVotes = (live.optionVotes ?? {}) as Record<string, number>;
    const hasLive = !!snap;
    const totalVotes = hasLive ? Number(live.totalVotes ?? 0) : poll.totalVotes;
    // The vote doc is created (with updatedAt === seededAt) the first time
    // anyone opens the poll page, so that alone is not a vote.
    const updatedAt = toIso(live.updatedAt);
    const lastVoteAt = updatedAt && updatedAt !== toIso(live.seededAt) ? updatedAt : null;
    return {
      id: poll.id,
      question: poll.question,
      category: poll.category,
      status: poll.status,
      publishedAt: poll.publishedAt,
      closingDate: poll.closingDate ?? null,
      totalVotes,
      baselineVotes: poll.totalVotes,
      siteVotes: Math.max(0, totalVotes - poll.totalVotes),
      lastVoteAt,
      options: poll.options.map((o) => ({
        id: o.id,
        label: o.label,
        votes: hasLive ? Number(optionVotes[o.id] ?? 0) : o.votes,
      })),
    };
  });

  return {
    subscribers,
    waitlist,
    polls: dashboardPolls,
    collections,
    loadedAt: new Date().toISOString(),
  };
}
