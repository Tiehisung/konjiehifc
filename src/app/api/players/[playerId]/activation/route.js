import { ConnectMongoDb } from "@/lib/dbconfig";
import PlayerModel from "@/models/player";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";
ConnectMongoDb()

export async function POST(request, { params }) {
  const { reason } = await request.json();
  try {
    const player = await PlayerModel.findById(params.playerId);
    //Update issues
    const toggledActive = await PlayerModel.findOneAndUpdate(
      { _id: params.playerId },
      {
        $push: { issues: { reason, date:new Date() } },
        $set: { isActive: !player.isActive },
      },{returnDocument:'after'}
    );

    return NextResponse.json({
      message: toggledActive.isActive
        ? "Activation successful"
        : "Deactivation successful",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Mute failed. " + error.message,
      success: false,
    });
  }
}
