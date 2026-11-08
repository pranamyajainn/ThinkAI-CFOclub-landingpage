import "server-only";
import type { Timestamp } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";
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

export interface DashboardData {
  subscribers: DashboardSubscriber[];
  waitlist: DashboardWaitlistMember[];
  polls: DashboardPoll[];
  loadedAt: string;
}

function toIso(value: unknown): string | null {
  const ts = value as Timestamp | undefined;
  return ts && typeof ts.toDate === "function" ? ts.toDate().toISOString() : null;
}

function byNewest<T extends { createdAt: string | null }>(a: T, b: T): number {
  return (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
}

const regionLabel = new Map(WAITLIST_REGIONS.map((r) => [r.code, r.label]));

export async function loadDashboardData(): Promise<DashboardData> {
  const db = getAdminDb();
  const polls = getAllPolls(); // newest first, by publishedAt

  const [subscriberSnap, waitlistSnap, voteSnaps] = await Promise.all([
    db.collection("newsletterSubscribers").get(),
    db.collection("waitlist").get(),
    db.getAll(...polls.map((p) => db.collection("pollVotes").doc(p.id))),
  ]);

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
    const live = snap.exists ? snap.data() ?? {} : {};
    const optionVotes = (live.optionVotes ?? {}) as Record<string, number>;
    const hasLive = snap.exists;
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
    loadedAt: new Date().toISOString(),
  };
}
