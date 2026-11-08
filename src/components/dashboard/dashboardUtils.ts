/**
 * Date helpers for the dashboard. Every date is shown in India time
 * (Asia/Kolkata) so the server render and the browser render always agree,
 * whatever the viewer's own time zone is.
 */
export const TIME_ZONE = "Asia/Kolkata";
const DAY_MS = 24 * 60 * 60 * 1000;

const dayKeyFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** "2026-11-07" in India time. */
export function dayKey(iso: string): string {
  return dayKeyFormat.format(new Date(iso));
}

/** "2026-11" in India time. */
export function monthKey(iso: string): string {
  return dayKey(iso).slice(0, 7);
}

export function monthLabel(key: string, short = false): string {
  const [y, m] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 15)).toLocaleDateString("en-GB", {
    month: short ? "short" : "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateTime(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-GB", {
    timeZone: TIME_ZONE,
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(isoOrDay: string): string {
  const d = isoOrDay.length === 10 ? new Date(`${isoOrDay}T12:00:00Z`) : new Date(isoOrDay);
  return d.toLocaleDateString("en-GB", {
    timeZone: isoOrDay.length === 10 ? "UTC" : TIME_ZONE,
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function timeAgo(iso: string | null, nowMs: number): string {
  if (!iso) return "—";
  const diff = Math.max(0, nowMs - new Date(iso).getTime());
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  const days = Math.floor(hr / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  return formatDate(iso);
}

/** "all", "7d", "30d", or a month key like "2026-11". */
export type Period = string;

export function inPeriod(iso: string | null, period: Period, nowMs: number): boolean {
  if (period === "all") return true;
  if (!iso) return false;
  if (period === "7d") return nowMs - new Date(iso).getTime() <= 7 * DAY_MS;
  if (period === "30d") return nowMs - new Date(iso).getTime() <= 30 * DAY_MS;
  return monthKey(iso) === period;
}

export function periodLabel(period: Period): string {
  if (period === "all") return "All time";
  if (period === "7d") return "Last 7 days";
  if (period === "30d") return "Last 30 days";
  return monthLabel(period);
}

/** Buckets (x-axis keys) for the sign-ups chart in the chosen period. */
export function chartBuckets(
  period: Period,
  nowMs: number,
  earliestIso: string | null
): { keys: string[]; byDay: boolean } {
  const today = dayKey(new Date(nowMs).toISOString());

  if (period === "7d" || period === "30d") {
    const n = period === "7d" ? 7 : 30;
    const keys = Array.from({ length: n }, (_, i) =>
      dayKey(new Date(nowMs - (n - 1 - i) * DAY_MS).toISOString())
    );
    return { keys, byDay: true };
  }

  if (period !== "all") {
    const [y, m] = period.split("-").map(Number);
    const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
    const keys: string[] = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${period}-${String(d).padStart(2, "0")}`;
      if (key > today) break;
      keys.push(key);
    }
    return { keys, byDay: true };
  }

  // All time: one bar per month from the first sign-up to this month.
  const end = today.slice(0, 7);
  let cursor = earliestIso ? monthKey(earliestIso) : end;
  const keys: string[] = [];
  while (cursor <= end && keys.length < 120) {
    keys.push(cursor);
    const [y, m] = cursor.split("-").map(Number);
    cursor = m === 12 ? `${y + 1}-01` : `${y}-${String(m + 1).padStart(2, "0")}`;
  }
  return { keys, byDay: false };
}

export function percent(part: number, total: number): number {
  return total > 0 ? Math.round((part / total) * 1000) / 10 : 0;
}

export function isRecent(iso: string | null, nowMs: number, days = 7): boolean {
  return !!iso && nowMs - new Date(iso).getTime() <= days * DAY_MS;
}
