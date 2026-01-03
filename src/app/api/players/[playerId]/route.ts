import "@/models/file";
import "@/models/galleries";
import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import PlayerModel from "@/models/player";
import { NextRequest, NextResponse } from "next/server";
import { logAction } from "../../logs/helper";
import ArchiveModel from "@/models/Archives";
import { ELogSeverity } from "@/types/log";
import { auth } from "@/auth";
import { EUserRole, ISession } from "@/types/user";

ConnectMongoDb();
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ playerId: string }> }
) {
  const player = await PlayerModel.findById((await params).playerId)
    .populate({ path: "galleries", populate: { path: 'files' } });
  return NextResponse.json(player);
}

//patch
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ playerId: string }> }
) {
  const { fieldKey, fieldValue } = await request.json();

  try {
    const saved = await PlayerModel.updateOne(
      { _id: (await params).playerId },
      { $set: { [fieldKey]: fieldValue } }
    );
    if (saved) return NextResponse.json({ message: "Updated", success: true });
  } catch (error) {
    return NextResponse.json({
      message: `Update failed. ${getErrorMessage(error)}`,
      success: false,
    });
  }
}

//put Only relevant fields at a time
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ playerId: string }> }
) {
  const playerId = (await params).playerId;
  const formData = await request.json();

  const updates = { ...formData };

  try {
    const updatedPlayer = await PlayerModel.findByIdAndUpdate(playerId, {
      $set: { ...updates },
    });

    return NextResponse.json({
      message: "Update success",
      success: true,
      data: updatedPlayer,
    });
  } catch (error) {
    return NextResponse.json({
      message: `Update failed. ${getErrorMessage(error)}`,
      success: false,
    });
  }
}

//delete
export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ playerId: string }> }
) {
  try {
    const playerId = (await params).playerId

    const session = await auth() as ISession

    if (session?.user?.role !== EUserRole.SUPER_ADMIN) {
      return NextResponse.json({
        message: `You are not authorized to perform this action`,
        success: false,
      });
    }

    //Update issues
    const player = await PlayerModel.findById(playerId);

    await ArchiveModel.updateOne(
      { sourceCollection: "players" },
      { $push: { data: player } }
    );

    //Now remove player
    const deleted = await PlayerModel.deleteOne({ _id: playerId });
    // log
    await logAction({
      title: "Player Deleted",
      description: `Player with id [${playerId}] deleted on ${new Date().toLocaleString()}`,
      severity: ELogSeverity.CRITICAL,
      meta: deleted?.toString(),
    });
    return NextResponse.json({
      message: "Deleted successful",
      success: true,
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: `Delete failed. ${getErrorMessage(error)}`,
      success: false,
    });
  }
}
