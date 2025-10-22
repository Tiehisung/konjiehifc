import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import SquadModel from "@/models/squad";
import { NextRequest, NextResponse } from "next/server";

// export const revalidate = 0;
// export const dynamic = "force-dynamic";

ConnectMongoDb();

// GET
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ squadId: string }> }
) {
  const squad = await SquadModel.findById((await params).squadId);
  if (!squad) {
    return NextResponse.json({ message: "Squad not found.", success: false });
  }
  return NextResponse.json({ success: true, data: squad });
}

// PUT
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ squadId: string }> }
) {
  try {
    const formData = await request.json();
    const updated = await SquadModel.updateOne(
      {
        _id: (await params).squadId,
      },
      { $set: { ...formData } }
    );
    if (updated.acknowledged)
      return NextResponse.json({ message: "Updated", success: true });
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
  { params }: { params: Promise<{ squadId: string }> }
) {
  try {
    await SquadModel.findByIdAndDelete((await params).squadId);
    return NextResponse.json({ message: "Squad deleted", success: true });
  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error),
      success: false,
    });
  }
}
