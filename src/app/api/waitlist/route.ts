import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

/**
 * Deterministic queue number from an email — stable across repeat calls
 * for the same address, so a duplicate-signup response can show the same
 * number the person already has.
 */
function queueNumberFor(normalizedEmail: string): number {
  let sum = 0;
  for (let i = 0; i < normalizedEmail.length; i++) {
    sum += normalizedEmail.charCodeAt(i);
  }
  return 300 + (sum % 199);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, role } = body;

    // Server-side validation
    if (!firstName || typeof firstName !== "string" || !firstName.trim()) {
      return NextResponse.json({ message: "First name is required." }, { status: 400 });
    }

    if (!lastName || typeof lastName !== "string" || !lastName.trim()) {
      return NextResponse.json({ message: "Last name is required." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: "A valid email address is required." }, { status: 400 });
    }

    if (!role || typeof role !== "string" || !role.trim()) {
      return NextResponse.json({ message: "Role is required." }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const queueNo = queueNumberFor(normalizedEmail);

    // Duplicate protection: key the document by the normalized email
    // instead of an auto-generated ID. A first signup for that address
    // is a Firestore "create" (allowed). A repeat signup targets the same
    // document ID, which Firestore classifies as an "update" — and the
    // security rules only allow create, never update — so the write is
    // rejected server-side. This needs no read permission at all (nobody
    // can list or scan the waitlist to check who's on it), and it's race
    // -safe: Firestore evaluates the rule atomically against the write.
    const docId = encodeURIComponent(normalizedEmail);

    try {
      await setDoc(doc(db, "waitlist", docId), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: normalizedEmail,
        role: role.trim(),
        timestamp: serverTimestamp(),
      });

      console.log(`[Waitlist Submission] Saved to Firebase with ID: ${docId}`);

      return NextResponse.json(
        {
          message: "Successfully joined the waitlist.",
          id: docId,
          queueNo,
        },
        { status: 200 }
      );
    } catch (writeError) {
      const code = (writeError as { code?: string })?.code;
      if (code === "permission-denied") {
        // Already registered — treat as a friendly success, not an error.
        console.log(`[Waitlist Submission] Duplicate signup for existing entry: ${docId}`);
        return NextResponse.json(
          {
            message: "You're already on the waitlist — we'll notify you as soon as spots open.",
            id: docId,
            queueNo,
            alreadyRegistered: true,
          },
          { status: 200 }
        );
      }
      throw writeError;
    }
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { message: "Server error processing waitlist signup. Please try again." },
      { status: 500 }
    );
  }
}
