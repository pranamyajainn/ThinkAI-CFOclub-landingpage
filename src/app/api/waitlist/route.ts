import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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

    // Save to Firestore
    const docRef = await addDoc(collection(db, "waitlist"), {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      role: role.trim(),
      timestamp: serverTimestamp()
    });

    console.log(`[Waitlist Submission] Saved to Firebase with ID: ${docRef.id}`);

    // Generate a deterministic queue number based on email hash or random for presentation
    let sum = 0;
    for (let i = 0; i < email.length; i++) {
      sum += email.charCodeAt(i);
    }
    const queueNo = 300 + (sum % 199);

    return NextResponse.json(
      {
        message: "Successfully joined the waitlist.",
        id: docRef.id,
        queueNo,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { message: "Server error processing waitlist signup. Please try again." },
      { status: 500 }
    );
  }
}

