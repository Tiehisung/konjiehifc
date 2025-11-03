import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import TrainingSessionModel from "@/models/training";
import { NextRequest, NextResponse } from "next/server";
import { logAction } from "../../logs/helper";
import { formatDate } from "@/lib/timeAndDate";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { IUser } from "@/types/user";

// export const revalidate = 0;
// export const dynamic = "force-dynamic";

ConnectMongoDb();

// GET
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const trainingSession = await TrainingSessionModel.findById((await params).sessionId);
  if (!trainingSession) {
    return NextResponse.json({ message: "Session not found.", success: false });
  }
  return NextResponse.json({ success: true, data: trainingSession });
}

// PUT
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const formData = await request.json();
    if (formData.updateCount >= 3) return NextResponse.json({ message: "Session update expired", success: false });
    const updated = await TrainingSessionModel.updateOne(
      {
        _id: (await params).sessionId,
      },
      { $set: { ...formData }, $inc: { updateCount: 1 } }
    );
    if (updated.acknowledged) {
      const session = await getServerSession(authOptions)
      await logAction({
        title: "Training session updated",
        description: `A training session was updated on ${formatDate(new Date().toISOString()) ?? ''}.`,
        severity: "info",
        user: session?.user as IUser,
        meta: { ...formData }
      });
      return NextResponse.json({ message: "Updated", success: true });
    }
  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error),
      success: false,
    });
  }
}

// Delete manager
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    await TrainingSessionModel.findByIdAndDelete((await params).sessionId);
    // log
    const session = await getServerSession(authOptions)
    await logAction({
      title: "Training session deleted",
      description: `A training session was deleted on ${formatDate(new Date().toISOString()) ?? ''}.`,
      severity: "info",
      user: session?.user as IUser,

    });
    return NextResponse.json({ message: "Session deleted", success: true });
  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error),
      success: false,
    });
  }
}
