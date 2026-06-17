import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email } = body;

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

    // Simulate backend network latency (500ms)
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Generate a deterministic queue number based on email hash or random
    let sum = 0;
    for (let i = 0; i < email.length; i++) {
      sum += email.charCodeAt(i);
    }
    const queueNo = 300 + (sum % 199);

    console.log(`[Waitlist Submission] Name: ${firstName} ${lastName}, Email: ${email}, Assigned Queue: #${queueNo}`);

    /*
     * PROD DB BINDING TEMPLATE:
     * If you want to connect a database in the future, you can use the code below:
     *
     * Example: Vercel KV / Redis
     * import { kv } from '@vercel/kv';
     * await kv.hset(`waitlist:${email}`, { firstName, lastName, email, queueNo, appliedAt: new Date() });
     *
     * Example: Firestore
     * import { db } from '@/lib/firebase';
     * import { collection, addDoc } from 'firebase/firestore';
     * await addDoc(collection(db, "applicants"), { firstName, lastName, email, queueNo, timestamp: new Date() });
     */

    return NextResponse.json(
      {
        message: "Application submitted successfully.",
        queueNo,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { message: "Server error processing application. Please try again." },
      { status: 500 }
    );
  }
}
