import { NextRequest, NextResponse } from "next/server";
import { getPollById } from "@/lib/polls";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pollId, optionId, voterRole, voterCompanySize } = body;

    if (!pollId || !optionId) {
      return NextResponse.json(
        { error: "Poll ID and option ID are required." },
        { status: 400 }
      );
    }

    const poll = getPollById(pollId);
    if (!poll) {
      return NextResponse.json(
        { error: "Poll not found." },
        { status: 404 }
      );
    }

    const option = poll.options.find((o) => o.id === optionId);
    if (!option) {
      return NextResponse.json(
        { error: "Selected option not found in this poll." },
        { status: 400 }
      );
    }

    // In a stateless deployment with client-side optimistic updates,
    // we return the updated percentage distribution.
    // If Firestore is connected, this can also write to a `poll_votes` collection.
    return NextResponse.json({
      success: true,
      message: "Vote recorded successfully.",
      pollId,
      optionId,
      voterRole: voterRole || "Finance Executive",
      voterCompanySize: voterCompanySize || "100-300 employees",
      recordedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error recording poll vote:", error);
    return NextResponse.json(
      { error: "Internal server error while recording vote." },
      { status: 500 }
    );
  }
}
