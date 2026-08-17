import { NextRequest, NextResponse } from "next/server";
import { castVote, InvalidVoteError } from "@/lib/pollVotes";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pollId, optionId, voterRole, voterCompanySize } = body;

    if (!pollId || typeof pollId !== "string" || !optionId || typeof optionId !== "string") {
      return NextResponse.json(
        { error: "Poll ID and option ID are required." },
        { status: 400 }
      );
    }

    // Atomically increments the real vote count in Firestore and returns
    // the authoritative, live result — no random or optimistic numbers.
    const poll = await castVote(pollId, optionId);

    return NextResponse.json({
      success: true,
      message: "Vote recorded successfully.",
      poll,
      voterRole: voterRole || "Finance Executive",
      voterCompanySize: voterCompanySize || "100-300 employees",
      recordedAt: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof InvalidVoteError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Error recording poll vote:", error);
    return NextResponse.json(
      { error: "Internal server error while recording vote." },
      { status: 500 }
    );
  }
}
