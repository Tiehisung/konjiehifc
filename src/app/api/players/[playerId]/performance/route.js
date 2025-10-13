import { ConnectMongoDb } from "@/lib/dbconfig";
import PlayerModel from "@/models/player";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function POST(request, { params }) {
  try {
    const {
      yellowCards,
      redCards,
      goals,
      penaltiesWon,
      penaltiesCommitted,
      motm,
      assists,
    } = await request.json();
    const performanceUpdated = await PlayerModel.updateOne(
      { _id: params.playerId },
      {
        $push: {
          performance: {
            yellowCards,
            redCards,
            goals,
            penaltiesWon,
            penaltiesCommitted,
            motm,
            assists,
            date: new Date(),
          },
        },
      }
    );
    if (performanceUpdated.acknowledged)
      return NextResponse.json({
        message: "Performance updated",
        success: true,
      });
  } catch (error) {
    return NextResponse.json({
      message: "Performance update failed. " + error.message,
      success: false,
    });
  }
}
