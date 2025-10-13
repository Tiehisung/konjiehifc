import { ConnectMongoDb } from "@/lib/dbconfig";
import PlayerModel from "@/models/player";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function POST(request, { params }) {
  try {
    const team = await request.json();
    const updated = await PlayerModel.updateOne(
      { _id: params.playerId },
      { $set: { "training.team": team } }
    );
    console.log("updated", updated);
    return NextResponse.json({ message: "Change successful", success: true });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to change team. " + error.message,
      success: false,
    });
  }
}
