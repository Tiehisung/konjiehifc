import { ConnectMongoDb } from "@/lib/dbconfig";
import MatchModel from "@/models/match";
import { NextRequest, NextResponse } from "next/server";
import "@/models/teams";

ConnectMongoDb();

// export const revalidate = 0;
// export const dynamic = "force-dynamic";

//Post new fixture
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
