import "@/models/file";
import "@/models/galleries";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { ConnectMongoDb } from "@/lib/dbconfig";
import ArchivesModel from "@/models/archive";
import PlayerModel from "@/models/player";
import { IResultProps, IFileProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

// export const revalidate = 0;
// export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ playerId: string }> }
) {
  const player = await PlayerModel.findById((await params).playerId)
    .populate("galleries");
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
  request: NextRequest,
  { params }: { params: Promise<{ playerId: string }> }
) {
  const playerId = (await params).playerId
  const { reason, detail } = await request.json();
  try {
    //Update issues
    const updatedWithIssue = await PlayerModel.findOneAndUpdate(
      { _id: playerId },
      { $push: { issues: { reason, date: new Date(), detail } } },
      { returnDocument: "after" }
    );
    // const player = await PlayerModel.findById(playerId);

    await ArchivesModel.updateOne(
      { category: "deleted_players" },
      { $push: { data: updatedWithIssue } }
    );

    //Now remove player
    const deleted = await PlayerModel.deleteOne({ _id: playerId });
    if (deleted.acknowledged)
      return NextResponse.json({
        message: "Deleted successful",
        success: true,
      });
  } catch (error) {
    return NextResponse.json({
      message: `Delete failed. ${getErrorMessage(error)}`,
      success: false,
    });
  }
}
