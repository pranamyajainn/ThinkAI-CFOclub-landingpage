import "server-only";
import { createHash } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Passcode check for /dashboard.
 *
 * The passcode is "CFO-AI-Hub". It is deliberately easy to remember for
 * the few people who use the dashboard, so the check is forgiving: case,
 * spaces and dashes are ignored ("cfo-ai-hub", "CFO AI Hub", "cfoaihub"
 * all pass).
 *
 * After a correct entry the browser gets an httpOnly cookie holding a
 * hash of the passcode, valid for 30 days. Changing PASSCODE below logs
 * everybody out, because the old cookie no longer matches.
 */
const PASSCODE = "cfoaihub";
const COOKIE_NAME = "cfo_dashboard";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

function normalize(input: string): string {
  return input.toLowerCase().replace(/[\s\-_]+/g, "");
}

function sessionToken(): string {
  return createHash("sha256").update(`cfo-dashboard:${PASSCODE}`).digest("hex");
}

export function isCorrectPasscode(input: string): boolean {
  return normalize(input) === PASSCODE;
}

export async function hasDashboardAccess(): Promise<boolean> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === sessionToken();
}

export async function grantDashboardAccess(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/dashboard",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function revokeDashboardAccess(): Promise<void> {
  const store = await cookies();
  store.delete({ name: COOKIE_NAME, path: "/dashboard" });
}
