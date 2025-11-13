import { ConnectMongoDb } from "@/lib/dbconfig";
import MatchModel from "@/models/match";
import { NextRequest, NextResponse } from "next/server";
import "@/models/teams";

ConnectMongoDb();

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ matchId: string }> }
) {
  const matchId = (await params).matchId;

  const fixtures = await MatchModel.findById(matchId)
    .populate({ path: "opponent", populate: { path: "logo" } })
    .populate({ path: "goals", })
    .populate({ path: "squad", })
    .lean()

  return NextResponse.json(fixtures);
}
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ matchId: string }> }) {
  const { matchId } = await params;
  const deleted = await MatchModel.deleteOne({ _id: matchId });
  if (deleted.acknowledged)
    return NextResponse.json({ message: "Deleted", success: true });
  return NextResponse.json({ message: "Delete failed", success: false });
}