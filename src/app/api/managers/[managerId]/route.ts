import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import ManagerModel from "@/models/manager";
import { NextRequest, NextResponse } from "next/server";

// export const revalidate = 0;
// export const dynamic = "force-dynamic";

ConnectMongoDb();

// GET
export async function GET(
  request: NextRequest,
  { params }: { params:Promise< { managerId: string }> }
) {
  const manager = await ManagerModel.findById((await params).managerId);
  return NextResponse.json(manager);
}

// PUT
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ managerId: string }> }
) {
  try {
    const formData = await request.json();
    const updated = await ManagerModel.updateOne(
      {
        _id: (await params).managerId,
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
  request: Request,
  { params }: { params: Promise<{ managerId: string }> }
) {
  try {
    await ManagerModel.findByIdAndDelete((await params).managerId);
    return NextResponse.json({ message: "Staff deleted", success: true });
  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error),
      success: false,
    });
  }
}
