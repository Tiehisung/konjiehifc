import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import PlayerModel from "@/models/player";
import { NextRequest, NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function GET(
  request: NextRequest,
  { params }: { params: { playerId: string } }
) {
  try {
    const fitness = request.nextUrl.searchParams.get("fitness");
    await PlayerModel.updateOne(
      { _id: params.playerId },
      {
        $push: { medicals: { fitness: fitness, date: new Date() } },
      }
    );

    return NextResponse.json({ message: "Fitness updated", success: true });
  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error, "Fitness update failed"),
      success: false,
    });
  }
}
