import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { subscribeToBeehiiv } from "@/lib/beehiiv";

/**
 * Handles the lightweight email-only "Subscribe" box (appears on the
 * homepage, /newsletter, /articles, article/edition pages) — distinct from
 * the full /api/waitlist signup, which collects a real name.
 *
 * The email goes to two places:
 * - Beehiiv, which actually sends the newsletter. This is what matters.
 * - Our own `newsletterSubscribers` Firestore collection, as a backup copy
 *   (with the role picked on the form), so no signup is lost if Beehiiv is
 *   briefly unreachable — those can be re-imported into Beehiiv later.
 *
 * The visitor sees success if either write worked.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, role, source } = body;

    if (!email || typeof email !== "string" || !email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: "A valid email address is required." }, { status: 400 });
    }

    const cleanedEmail = email.trim();
    const cleanedSource = typeof source === "string" && source.trim() ? source.trim() : "unknown";

    const [beehiivResult, firestoreResult] = await Promise.allSettled([
      subscribeToBeehiiv({
        email: cleanedEmail,
        utmMedium: cleanedSource,
        reactivateExisting: true,
      }),
      addDoc(collection(db, "newsletterSubscribers"), {
        email: cleanedEmail,
        role: typeof role === "string" && role.trim() ? role.trim() : null,
        source: cleanedSource,
        timestamp: serverTimestamp(),
      }),
    ]);

    if (beehiivResult.status === "rejected") {
      console.error("[Newsletter Subscribe] Beehiiv signup failed:", beehiivResult.reason);
    }
    if (firestoreResult.status === "rejected") {
      console.error("[Newsletter Subscribe] Firestore backup failed:", firestoreResult.reason);
    }

    if (beehiivResult.status === "rejected" && firestoreResult.status === "rejected") {
      return NextResponse.json(
        { message: "Server error processing subscription. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Successfully subscribed." }, { status: 200 });
  } catch (error) {
    console.error("Newsletter subscribe API error:", error);
    return NextResponse.json(
      { message: "Server error processing subscription. Please try again." },
      { status: 500 }
    );
  }
}
