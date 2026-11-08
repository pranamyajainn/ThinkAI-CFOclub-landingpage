import "server-only";
import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

/**
 * Server-only Firestore access with full read rights, used by /dashboard.
 *
 * The public site writes with the browser SDK, and firestore.rules block
 * every read of `waitlist` and `newsletterSubscribers` (on purpose: the
 * Firebase web config is public, so open reads would leak every email).
 * The Admin SDK ignores those rules, so it can read the lists — which is
 * why this file must never be imported into a client component.
 *
 * Needs one env var, FIREBASE_SERVICE_ACCOUNT_KEY: the full JSON of a
 * service account key (Firebase console → Project settings → Service
 * accounts → Generate new private key). Raw JSON or base64 both work.
 */
export class MissingAdminCredentialsError extends Error {}

function readServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.trim();
  if (!raw) {
    throw new MissingAdminCredentialsError(
      "FIREBASE_SERVICE_ACCOUNT_KEY is not set."
    );
  }
  const json = raw.startsWith("{")
    ? raw
    : Buffer.from(raw, "base64").toString("utf8");
  const parsed = JSON.parse(json) as {
    project_id: string;
    client_email: string;
    private_key: string;
  };
  return {
    projectId: parsed.project_id,
    clientEmail: parsed.client_email,
    // Env stores often keep "\n" as two literal characters.
    privateKey: parsed.private_key.replace(/\\n/g, "\n"),
  };
}

export function getAdminDb(): Firestore {
  const app = getApps().length
    ? getApp()
    : initializeApp({ credential: cert(readServiceAccount()) });
  return getFirestore(app);
}
