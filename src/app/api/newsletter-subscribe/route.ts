import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Handles the lightweight email-only "Subscribe" box (appears on
 * /newsletter, /articles, article/edition pages) — distinct from the full
 * /api/waitlist signup, which collects a real name. Writes to its own
 * `newsletterSubscribers` Firestore collection so subscriber records never
 * mix placeholder names into the real waitlist applicant list.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, role, source } = body;

    if (!email || typeof email !== "string" || !email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: "A valid email address is required." }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "newsletterSubscribers"), {
      email: email.trim(),
      role: typeof role === "string" && role.trim() ? role.trim() : null,
      source: typeof source === "string" && source.trim() ? source.trim() : "unknown",
      timestamp: serverTimestamp(),
    });

    console.log(`[Newsletter Subscribe] Saved to Firebase with ID: ${docRef.id}`);

    return NextResponse.json(
      { message: "Successfully subscribed.", id: docRef.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscribe API error:", error);
    return NextResponse.json(
      { message: "Server error processing subscription. Please try again." },
      { status: 500 }
    );
  }
}
