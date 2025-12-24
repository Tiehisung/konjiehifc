import { ConnectMongoDb } from "@/lib/dbconfig";
import UserModel from "@/models/user";

import { NextRequest, NextResponse } from "next/server";
import { logAction } from "../../logs/helper";
import ArchiveModel from "@/models/Archives";
import { EArchivesCollection } from "@/types/archive.interface";
import { saveToArchive } from "../../archives/helper";
import { ELogSeverity } from "@/types/log";
import bcrypt from "bcryptjs";


ConnectMongoDb();

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const users = await UserModel.findById(params.userId);
  return NextResponse.json(users);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {


    const { password, ...data } = await req.json();

    const updated = await UserModel.findByIdAndUpdate((await params).userId, {
      $set: { ...data },
    });
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updated.password = hashedPassword;
      await updated.save();
    }
    return NextResponse.json({
      message: "User updated",
      success: true,
      data: updated,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to update user",
      error: error,
    });
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const userId = (await params).userId;

    const deleted = await UserModel.findByIdAndDelete(userId);
    //Archive
    saveToArchive({
      data: deleted,
      originalId: userId,
      sourceCollection: EArchivesCollection.USERS,
      reason: 'Sanitizing...',
    })

    // Log
    logAction({
      title: ` User [${deleted?.name}] deleted.`,
      description: deleted?.toString(),
      severity: ELogSeverity.CRITICAL,
    })
    return NextResponse.json({
      message: "User deleted",
      success: true,
      data: deleted,
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({
      success: false,
      message: "Failed to delete user",
      error: error,
    });
  }
}
