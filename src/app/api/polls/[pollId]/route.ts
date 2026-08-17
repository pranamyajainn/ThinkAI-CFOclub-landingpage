import { NextRequest, NextResponse } from "next/server";
import { getPollById } from "@/lib/polls";
import { getLivePoll } from "@/lib/pollVotes";

interface RouteParams {
  params: Promise<{ pollId: string }>;
}

/**
 * Returns a poll's current live vote counts (Firestore-backed), merged
 * onto its static question/option definitions. Used by the poll widgets
 * to show the true, shared tally on load instead of a frozen baseline.
 */
export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { pollId } = await params;
  const poll = getPollById(pollId);

  if (!poll) {
    return NextResponse.json({ error: "Poll not found." }, { status: 404 });
  }

  const livePoll = await getLivePoll(poll);
  return NextResponse.json({ poll: livePoll });
}
