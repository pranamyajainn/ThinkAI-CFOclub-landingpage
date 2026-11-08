"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BarChart3,
  CalendarDays,
  Clock,
  LogOut,
  Mail,
  RefreshCw,
  Search,
  Sparkles,
  Users,
  Vote,
} from "lucide-react";
import type {
  DashboardData,
  DashboardPoll,
  DashboardSubscriber,
  DashboardWaitlistMember,
} from "@/lib/dashboardData";
import { signOut } from "@/app/dashboard/actions";
import {
  chartBuckets,
  dayKey,
  formatDate,
  formatDateTime,
  inPeriod,
  isRecent,
  monthKey,
  monthLabel,
  percent,
  periodLabel,
  timeAgo,
  type Period,
} from "./dashboardUtils";

// Brand palette (see DESIGN.md): navy, burnt orange, medium blue.
const NAVY = "#001356";
const ORANGE = "#fc853a";
const BLUE = "#4b5a9c";

const AUTO_REFRESH_MS = 60_000;
const PAGE_SIZE = 25;

const cardClass =
  "bg-white rounded-xl shadow-[0_4px_20px_rgba(26,26,46,0.04)] border border-surface-container";

export default function Dashboard({ data }: { data: DashboardData }) {
  const router = useRouter();
  const [refreshing, startRefresh] = useTransition();
  const [period, setPeriod] = useState<Period>("all");
  const nowMs = Date.parse(data.loadedAt);

  // Pull fresh numbers every minute while the tab is open and visible.
  useEffect(() => {
    const id = setInterval(() => {
      if (document.visibilityState === "visible") startRefresh(() => router.refresh());
    }, AUTO_REFRESH_MS);
    return () => clearInterval(id);
  }, [router]);

  const monthOptions = useMemo(() => {
    const keys = new Set<string>();
    for (const r of [...data.subscribers, ...data.waitlist]) {
      if (r.createdAt) keys.add(monthKey(r.createdAt));
    }
    keys.add(monthKey(data.loadedAt));
    return [...keys].sort().reverse();
  }, [data]);

  const subscribers = useMemo(
    () => data.subscribers.filter((s) => inPeriod(s.createdAt, period, nowMs)),
    [data.subscribers, period, nowMs]
  );
  const waitlist = useMemo(
    () => data.waitlist.filter((w) => inPeriod(w.createdAt, period, nowMs)),
    [data.waitlist, period, nowMs]
  );

  const latestPoll = data.polls[0];
  const totalPollVotes = data.polls.reduce((sum, p) => sum + p.totalVotes, 0);

  return (
    <div className="min-h-screen bg-surface-subtle">
      <Header
        loadedAt={data.loadedAt}
        refreshing={refreshing}
        onRefresh={() => startRefresh(() => router.refresh())}
      />

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Period filter */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-[28px] font-semibold text-primary tracking-tight">
              Community overview
            </h1>
            <p className="text-sm text-text-muted mt-1">
              Live from the database. Times are India time (IST).
            </p>
          </div>
          <PeriodFilter period={period} onChange={setPeriod} months={monthOptions} />
        </div>

        {/* KPI cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" aria-label="Key numbers">
          <KpiCard
            icon={<Mail className="w-4 h-4" />}
            label="Newsletter subscribers"
            value={subscribers.length}
            hint={period === "all" ? "All time" : `${periodLabel(period)} · ${data.subscribers.length} all time`}
            accent={NAVY}
          />
          <KpiCard
            icon={<Users className="w-4 h-4" />}
            label="Waitlist members"
            value={waitlist.length}
            hint={period === "all" ? "All time" : `${periodLabel(period)} · ${data.waitlist.length} all time`}
            accent={ORANGE}
          />
          <KpiCard
            icon={<Vote className="w-4 h-4" />}
            label="Votes on latest poll"
            value={latestPoll?.totalVotes ?? 0}
            hint={latestPoll ? `Since ${formatDate(latestPoll.publishedAt)}` : "No polls yet"}
            accent={BLUE}
          />
          <KpiCard
            icon={<BarChart3 className="w-4 h-4" />}
            label="Votes across all polls"
            value={totalPollVotes}
            hint={`${data.polls.length} polls`}
            accent={NAVY}
          />
        </section>

        {/* Latest activity */}
        <LatestStrip data={data} nowMs={nowMs} />

        {/* Sign-ups chart + sources */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <SignupsChart
            className="lg:col-span-2"
            subscribers={subscribers}
            waitlist={waitlist}
            period={period}
            nowMs={nowMs}
            earliest={
              [...data.subscribers, ...data.waitlist]
                .map((r) => r.createdAt)
                .filter((d): d is string => !!d)
                .sort()[0] ?? null
            }
          />
          <Breakdown subscribers={subscribers} waitlist={waitlist} />
        </section>

        {/* Polls */}
        <PollsSection polls={data.polls} nowMs={nowMs} />

        {/* People tables */}
        <PeopleTables subscribers={subscribers} waitlist={waitlist} nowMs={nowMs} period={period} />

        <p className="text-xs text-text-muted text-center pb-4">
          Refreshes by itself every minute while this tab is open.
        </p>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Header({
  loadedAt,
  refreshing,
  onRefresh,
}: {
  loadedAt: string;
  refreshing: boolean;
  onRefresh: () => void;
}) {
  const router = useRouter();
  const [signingOut, startSignOut] = useTransition();
  return (
    <header className="bg-primary text-white sticky top-0 z-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="bg-white rounded-md px-2 py-1 shrink-0">
            <Image src="/cfo-ai-hub-logo.png" alt="CFO AI Hub" width={96} height={28} className="h-6 w-auto" />
          </div>
          <span className="hidden sm:inline text-sm font-semibold text-white/80 truncate">Team dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-white/70" aria-live="polite">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-60 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-secondary-container" />
            </span>
            Updated {formatDateTime(loadedAt)}
          </span>
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="h-10 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-semibold inline-flex items-center gap-2 cursor-pointer transition disabled:cursor-wait"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} aria-hidden />
            <span className="hidden sm:inline">{refreshing ? "Refreshing" : "Refresh"}</span>
            <span className="sr-only sm:hidden">Refresh</span>
          </button>
          <button
            type="button"
            onClick={() =>
              startSignOut(async () => {
                await signOut();
                router.refresh();
              })
            }
            disabled={signingOut}
            className="h-10 px-3 rounded-lg hover:bg-white/10 text-sm font-semibold inline-flex items-center gap-2 cursor-pointer transition"
          >
            <LogOut className="w-4 h-4" aria-hidden />
            <span className="hidden sm:inline">Sign out</span>
            <span className="sr-only sm:hidden">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function PeriodFilter({
  period,
  onChange,
  months,
}: {
  period: Period;
  onChange: (p: Period) => void;
  months: string[];
}) {
  const quick: Period[] = ["all", "7d", "30d"];
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Time period">
      {quick.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-pressed={period === p}
          className={`h-10 px-3.5 rounded-lg text-sm font-semibold cursor-pointer transition border ${
            period === p
              ? "bg-primary text-white border-primary"
              : "bg-white text-primary border-outline-variant hover:border-primary"
          }`}
        >
          {periodLabel(p)}
        </button>
      ))}
      <label className="relative">
        <span className="sr-only">Pick a month</span>
        <CalendarDays className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" aria-hidden />
        <select
          value={quick.includes(period) ? "" : period}
          onChange={(e) => onChange(e.target.value || "all")}
          className={`h-10 pl-9 pr-8 rounded-lg text-sm font-semibold cursor-pointer border appearance-none bg-no-repeat bg-[right_0.6rem_center] bg-[length:12px] ${
            quick.includes(period)
              ? "bg-white text-primary border-outline-variant"
              : "bg-primary text-white border-primary"
          }`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' fill='none' stroke='${
              quick.includes(period) ? "%23001356" : "%23ffffff"
            }' stroke-width='1.5'/%3E%3C/svg%3E")`,
          }}
        >
          <option value="">By month</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {monthLabel(m)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

function KpiCard({
  icon,
  label,
  value,
  hint,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  hint: string;
  accent: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${cardClass} p-4 sm:p-5`}
    >
      <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-on-surface-variant">
        <span
          className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${accent}14`, color: accent === ORANGE ? "#9c4500" : accent }}
          aria-hidden
        >
          {icon}
        </span>
        <span className="leading-tight">{label}</span>
      </div>
      <div className="mt-3 font-display text-3xl sm:text-4xl font-bold text-primary tabular-nums tracking-tight">
        {value.toLocaleString("en-IN")}
      </div>
      <div className="mt-1 text-xs text-text-muted">{hint}</div>
    </motion.div>
  );
}

function LatestBadge({ children = "Latest" }: { children?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary-container/15 text-secondary text-[11px] font-bold uppercase tracking-wider shrink-0">
      <Sparkles className="w-3 h-3" aria-hidden />
      {children}
    </span>
  );
}

function LatestStrip({ data, nowMs }: { data: DashboardData; nowMs: number }) {
  const sub = data.subscribers[0];
  const wl = data.waitlist[0];
  const poll = data.polls[0];
  const items = [
    {
      title: "Newest subscriber",
      main: sub?.email ?? "No subscribers yet",
      sub: sub ? `${sub.role ?? "No role given"} · ${timeAgo(sub.createdAt, nowMs)}` : "",
    },
    {
      title: "Newest waitlist member",
      main: wl ? wl.name || wl.email : "No members yet",
      sub: wl ? `${[wl.role, wl.companyName].filter(Boolean).join(", ")} · ${timeAgo(wl.createdAt, nowMs)}` : "",
    },
    {
      title: "Latest poll",
      main: poll?.question ?? "No polls yet",
      sub: poll
        ? `${poll.totalVotes} votes · ${poll.lastVoteAt ? `last vote ${timeAgo(poll.lastVoteAt, nowMs)}` : "no votes yet"}`
        : "",
    },
  ];
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4" aria-label="Latest activity">
      {items.map((it) => (
        <div key={it.title} className={`${cardClass} p-4 border-l-4`} style={{ borderLeftColor: ORANGE }}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">{it.title}</span>
            <LatestBadge />
          </div>
          <p className="mt-2 font-semibold text-on-surface truncate" title={it.main}>
            {it.main}
          </p>
          {it.sub && <p className="text-xs text-text-muted mt-0.5 truncate">{it.sub}</p>}
        </div>
      ))}
    </section>
  );
}

function SignupsChart({
  className,
  subscribers,
  waitlist,
  period,
  nowMs,
  earliest,
}: {
  className?: string;
  subscribers: DashboardSubscriber[];
  waitlist: DashboardWaitlistMember[];
  period: Period;
  nowMs: number;
  earliest: string | null;
}) {
  const reduce = useReducedMotion();
  const { rows, byDay } = useMemo(() => {
    const { keys, byDay } = chartBuckets(period, nowMs, earliest);
    const counts = new Map(keys.map((k) => [k, { newsletter: 0, waitlist: 0 }]));
    const keyOf = (iso: string) => (byDay ? dayKey(iso) : monthKey(iso));
    for (const s of subscribers) {
      const bucket = s.createdAt ? counts.get(keyOf(s.createdAt)) : undefined;
      if (bucket) bucket.newsletter++;
    }
    for (const w of waitlist) {
      const bucket = w.createdAt ? counts.get(keyOf(w.createdAt)) : undefined;
      if (bucket) bucket.waitlist++;
    }
    return {
      byDay,
      rows: keys.map((k) => ({
        key: k,
        label: byDay ? formatDate(k).replace(/ \d{4}$/, "") : monthLabel(k, true),
        Newsletter: counts.get(k)!.newsletter,
        Waitlist: counts.get(k)!.waitlist,
      })),
    };
  }, [subscribers, waitlist, period, nowMs, earliest]);

  return (
    <div className={`${cardClass} p-4 sm:p-5 ${className ?? ""}`}>
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="font-display text-lg font-semibold text-primary">New sign-ups</h2>
        <span className="text-xs text-text-muted">{byDay ? "Per day" : "Per month"} · {periodLabel(period)}</span>
      </div>
      <div className="h-[260px] mt-4" role="img" aria-label={`Bar chart of new sign-ups, ${periodLabel(period)}`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#e8e5ff" />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#5C5C70" }} tickLine={false} axisLine={false} minTickGap={12} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#5C5C70" }} tickLine={false} axisLine={false} />
            <Tooltip
              cursor={{ fill: "rgba(0,19,86,0.04)" }}
              contentStyle={{ borderRadius: 8, border: "1px solid #e2e0fc", fontSize: 12 }}
            />
            <Legend iconType="square" wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="Newsletter" stackId="a" fill={NAVY} isAnimationActive={!reduce} maxBarSize={36} />
            <Bar dataKey="Waitlist" stackId="a" fill={ORANGE} radius={[4, 4, 0, 0]} isAnimationActive={!reduce} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Breakdown({
  subscribers,
  waitlist,
}: {
  subscribers: DashboardSubscriber[];
  waitlist: DashboardWaitlistMember[];
}) {
  const [view, setView] = useState<"source" | "role" | "region">("source");
  const rows = useMemo(() => {
    const counts = new Map<string, number>();
    const add = (k: string) => counts.set(k, (counts.get(k) ?? 0) + 1);
    if (view === "source") subscribers.forEach((s) => add(s.source));
    if (view === "role") [...subscribers.map((s) => s.role ?? "Not given"), ...waitlist.map((w) => w.role || "Not given")].forEach(add);
    if (view === "region") waitlist.forEach((w) => add(w.region));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 7);
  }, [view, subscribers, waitlist]);
  const max = rows[0]?.[1] ?? 0;
  const tabs: { id: typeof view; label: string }[] = [
    { id: "source", label: "Source" },
    { id: "role", label: "Role" },
    { id: "region", label: "Region" },
  ];
  const caption =
    view === "source" ? "Newsletter subscribers by page" : view === "role" ? "Subscribers and waitlist" : "Waitlist members";

  return (
    <div className={`${cardClass} p-4 sm:p-5`}>
      <h2 className="font-display text-lg font-semibold text-primary">Breakdown</h2>
      <div className="mt-3 flex gap-1 p-1 bg-surface-subtle rounded-lg" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={view === t.id}
            onClick={() => setView(t.id)}
            className={`flex-1 h-9 rounded-md text-xs font-semibold cursor-pointer transition ${
              view === t.id ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-primary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-text-muted mt-3">{caption}</p>
      <ul className="mt-2 space-y-2.5">
        {rows.length === 0 && <li className="text-sm text-text-muted py-6 text-center">Nothing in this period.</li>}
        {rows.map(([name, count]) => (
          <li key={name}>
            <div className="flex justify-between text-sm gap-2">
              <span className="truncate text-on-surface" title={name}>{name}</span>
              <span className="font-semibold text-primary tabular-nums">{count}</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-surface-container overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${(count / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function PollsSection({ polls, nowMs }: { polls: DashboardPoll[]; nowMs: number }) {
  const [selectedId, setSelectedId] = useState(polls[0]?.id);
  const selected = polls.find((p) => p.id === selectedId) ?? polls[0];
  if (!selected) return null;

  return (
    <section className={`${cardClass} overflow-hidden`} aria-labelledby="polls-heading">
      <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="polls-heading" className="font-display text-lg font-semibold text-primary">Polls</h2>
        <span className="text-xs text-text-muted">Newest first. Click a poll to see its results.</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 border-t border-surface-container">
        <ul className="lg:col-span-2 lg:border-r border-surface-container max-h-[460px] overflow-y-auto">
          {polls.map((p, i) => {
            const active = p.id === selected.id;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(p.id)}
                  aria-current={active}
                  className={`w-full text-left px-4 sm:px-5 py-3.5 border-b border-surface-container cursor-pointer transition border-l-4 ${
                    active ? "bg-surface-container-low border-l-secondary-container" : "border-l-transparent hover:bg-surface-subtle"
                  }`}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    {i === 0 && <LatestBadge>Latest poll</LatestBadge>}
                    <StatusChip status={p.status} />
                    <span className="text-xs text-text-muted">{formatDate(p.publishedAt)}</span>
                  </div>
                  <p className={`mt-1.5 text-sm leading-snug ${active ? "font-semibold text-primary" : "text-on-surface"}`}>
                    {p.question}
                  </p>
                  <p className="text-xs text-text-muted mt-1 tabular-nums">{p.totalVotes.toLocaleString("en-IN")} votes</p>
                </button>
              </li>
            );
          })}
        </ul>
        <PollDetail poll={selected} isLatest={selected.id === polls[0].id} nowMs={nowMs} />
      </div>
    </section>
  );
}

function StatusChip({ status }: { status: "active" | "closed" }) {
  return status === "active" ? (
    <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider">Open</span>
  ) : (
    <span className="px-2 py-0.5 rounded-md bg-surface-container text-text-muted text-[11px] font-bold uppercase tracking-wider">Closed</span>
  );
}

function PollDetail({ poll, isLatest, nowMs }: { poll: DashboardPoll; isLatest: boolean; nowMs: number }) {
  const reduce = useReducedMotion();
  const sorted = [...poll.options].sort((a, b) => b.votes - a.votes);
  const top = sorted[0];
  const stats = [
    { label: "Total votes", value: poll.totalVotes.toLocaleString("en-IN") },
    { label: "Voted on website", value: poll.siteVotes.toLocaleString("en-IN") },
    { label: "Last vote", value: poll.lastVoteAt ? timeAgo(poll.lastVoteAt, nowMs) : "No votes yet" },
  ];

  return (
    <div className="lg:col-span-3 p-4 sm:p-6">
      <div className="flex items-center gap-2 flex-wrap">
        {isLatest && <LatestBadge>Latest poll</LatestBadge>}
        <StatusChip status={poll.status} />
        <span className="text-xs text-text-muted">{poll.category}</span>
      </div>
      <h3 className="mt-2 font-display text-xl font-semibold text-primary leading-snug">{poll.question}</h3>
      <p className="mt-1 text-xs text-text-muted flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" aria-hidden />
        Published {formatDate(poll.publishedAt)}
        {poll.closingDate ? ` · closes ${formatDate(poll.closingDate)}` : ""}
      </p>

      <dl className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg bg-surface-subtle px-3 py-2.5">
            <dt className="text-[11px] sm:text-xs text-text-muted">{s.label}</dt>
            <dd className="mt-0.5 font-display text-lg sm:text-xl font-bold text-primary tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-5 space-y-3.5">
        {sorted.map((o) => {
          const pct = percent(o.votes, poll.totalVotes);
          const leading = o.id === top.id && o.votes > 0;
          return (
            <li key={o.id}>
              <div className="flex justify-between gap-3 text-sm">
                <span className={leading ? "font-semibold text-primary" : "text-on-surface"}>{o.label}</span>
                <span className="tabular-nums shrink-0 text-on-surface-variant">
                  <span className="font-semibold text-primary">{o.votes}</span> · {pct}%
                </span>
              </div>
              <div className="mt-1.5 h-2.5 rounded-full bg-surface-container overflow-hidden">
                <motion.div
                  key={`${poll.id}-${o.id}`}
                  className="h-full rounded-full"
                  style={{ backgroundColor: leading ? ORANGE : NAVY }}
                  initial={reduce ? false : { width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      {poll.baselineVotes > 0 && (
        <p className="mt-5 text-xs text-text-muted leading-5">
          {poll.baselineVotes} of these votes were collected before the poll went on the website (for example at a
          live event). The rest came from the website.
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function PeopleTables({
  subscribers,
  waitlist,
  nowMs,
  period,
}: {
  subscribers: DashboardSubscriber[];
  waitlist: DashboardWaitlistMember[];
  nowMs: number;
  period: Period;
}) {
  const [tab, setTab] = useState<"newsletter" | "waitlist">("newsletter");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const q = query.trim().toLowerCase();
  const subRows = subscribers.filter(
    (s) => !q || [s.email, s.role, s.source].some((v) => v?.toLowerCase().includes(q))
  );
  const wlRows = waitlist.filter(
    (w) => !q || [w.name, w.email, w.role, w.companyName, w.region].some((v) => v?.toLowerCase().includes(q))
  );
  const total = tab === "newsletter" ? subRows.length : wlRows.length;
  // The very newest record overall gets the "Latest" tag, but only if it is in view.
  const newestId = tab === "newsletter" ? subscribers[0]?.id : waitlist[0]?.id;

  const tabs = [
    { id: "newsletter" as const, label: "Subscribers", count: subscribers.length },
    { id: "waitlist" as const, label: "Waitlist", count: waitlist.length },
  ];

  return (
    <section className={`${cardClass} overflow-hidden`} aria-label="People">
      <div className="px-4 sm:px-5 pt-4 sm:pt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex gap-1 p-1 bg-surface-subtle rounded-lg" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => {
                setTab(t.id);
                setLimit(PAGE_SIZE);
              }}
              className={`flex-1 md:flex-none h-9 px-3 rounded-md text-sm font-semibold cursor-pointer transition whitespace-nowrap ${
                tab === t.id ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-primary"
              }`}
            >
              {t.label} <span className="tabular-nums text-text-muted font-medium">({t.count})</span>
            </button>
          ))}
        </div>
        <label className="relative md:w-72">
          <span className="sr-only">Search people</span>
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(PAGE_SIZE);
            }}
            placeholder="Search name, email, role…"
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-outline-variant text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </label>
      </div>
      <p className="px-4 sm:px-5 mt-2 text-xs text-text-muted">
        {periodLabel(period)} · newest first · rows marked New joined in the last 7 days
      </p>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left text-xs text-text-muted uppercase tracking-wider border-y border-surface-container bg-surface-subtle/60">
              {tab === "newsletter" ? (
                <>
                  <th className="font-semibold px-4 sm:px-5 py-2.5">Email</th>
                  <th className="font-semibold px-3 py-2.5">Role</th>
                  <th className="font-semibold px-3 py-2.5">Signed up from</th>
                  <th className="font-semibold px-4 sm:px-5 py-2.5 text-right">Joined</th>
                </>
              ) : (
                <>
                  <th className="font-semibold px-4 sm:px-5 py-2.5">Name</th>
                  <th className="font-semibold px-3 py-2.5">Role / company</th>
                  <th className="font-semibold px-3 py-2.5">Region</th>
                  <th className="font-semibold px-3 py-2.5">Phone</th>
                  <th className="font-semibold px-4 sm:px-5 py-2.5 text-right">Joined</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {total === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-text-muted">
                  Nobody matches this period or search.
                </td>
              </tr>
            )}
            {tab === "newsletter"
              ? subRows.slice(0, limit).map((s) => (
                  <tr key={s.id} className="border-b border-surface-container hover:bg-surface-subtle/60 transition-colors">
                    <td className="px-4 sm:px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-on-surface break-all">{s.email}</span>
                        <RowBadge isNewest={s.id === newestId} isNew={isRecent(s.createdAt, nowMs)} />
                      </div>
                    </td>
                    <td className="px-3 py-3 text-on-surface-variant">{s.role ?? "—"}</td>
                    <td className="px-3 py-3 text-on-surface-variant">{s.source}</td>
                    <td className="px-4 sm:px-5 py-3 text-right text-on-surface-variant whitespace-nowrap tabular-nums">
                      {formatDateTime(s.createdAt)}
                    </td>
                  </tr>
                ))
              : wlRows.slice(0, limit).map((w) => (
                  <tr key={w.id} className="border-b border-surface-container hover:bg-surface-subtle/60 transition-colors">
                    <td className="px-4 sm:px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="min-w-0">
                          <div className="font-semibold text-on-surface">{w.name || "—"}</div>
                          <div className="text-xs text-text-muted break-all">{w.email}</div>
                        </div>
                        <RowBadge isNewest={w.id === newestId} isNew={isRecent(w.createdAt, nowMs)} />
                      </div>
                    </td>
                    <td className="px-3 py-3 text-on-surface-variant">
                      {w.role}
                      {w.companyName && <div className="text-xs text-text-muted">{w.companyName}</div>}
                    </td>
                    <td className="px-3 py-3 text-on-surface-variant">{w.region}</td>
                    <td className="px-3 py-3 text-on-surface-variant whitespace-nowrap">{w.phone ?? "—"}</td>
                    <td className="px-4 sm:px-5 py-3 text-right text-on-surface-variant whitespace-nowrap tabular-nums">
                      {formatDateTime(w.createdAt)}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {total > limit && (
        <div className="p-4 flex justify-center">
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE_SIZE)}
            className="h-10 px-4 rounded-lg border border-primary text-primary text-sm font-semibold cursor-pointer hover:bg-primary hover:text-white transition"
          >
            Show more ({total - limit} left)
          </button>
        </div>
      )}
    </section>
  );
}

function RowBadge({ isNewest, isNew }: { isNewest: boolean; isNew: boolean }) {
  if (isNewest) return <LatestBadge />;
  if (isNew)
    return (
      <span className="px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider shrink-0">
        New
      </span>
    );
  return null;
}
