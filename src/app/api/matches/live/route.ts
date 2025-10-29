import "@/models/teams";
import "@/models/file";
import "@/models/player";
import "@/models/goals";
import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import MatchModel from "@/models/matches";
import { NextRequest, NextResponse } from "next/server";
// export const revalidate = 0;

ConnectMongoDb();

//Post new fixture

export async function PUT(request: NextRequest) {
  try {
    const { _id, ...others } = await request.json();

    await MatchModel.findByIdAndUpdate(_id, {
      $set: { ...others },
    });
    return NextResponse.json({ message: "Match updated", success: true });
  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error, "Scores update failed"),
      success: false,
    });
  }
}

export async function GET() {
  const fixture = await MatchModel.findOne({ status: "LIVE" })
    .populate({ path: "opponent", populate: { path: "logo" } })
    .populate({ path: "goals",  });
  return NextResponse.json({ data: fixture });
}
