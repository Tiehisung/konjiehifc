import { ConnectMongoDb } from "@/lib/dbconfig";
import AdminModel from "@/models/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { IAdminSession } from "@/app/admin/authorization/Actions";

export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();

export async function GET(
  req: NextRequest,
  { params }: { params: { adminId: string } }
) {
  const users = await AdminModel.findById(params.adminId);
  return NextResponse.json(users);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { adminId: string } }
) {
  try {
    const session = (await getServerSession(authOptions)) as IAdminSession;
    if (session?.user?.role !== "super_admin")
      return NextResponse.json({
        success: false,
        message: "You are not authorized to perform this action.",
      });

    const data = await req.json();
    console.log({ data });

    const updated = await AdminModel.findByIdAndUpdate(params.adminId, {
      $set: { ...data },
    });
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

// Engage/Disengage manager
export async function PATCH(
  req: NextRequest,
  { params }: { params: { adminId: string } }
) {
  try {
    const admin = await AdminModel.findById(params.adminId);
    admin.isActive = !admin.isActive;
    admin.save();

    return NextResponse.json({
      message: "Admin updated",
      success: true,
      data: admin,
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({
      success: false,
      message: "Failed to update user",
      error: error,
    });
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { adminId: string } }
) {
  try {
    const session = (await getServerSession(authOptions)) as IAdminSession;

    if (session?.user?.role !== "super_admin")
      return NextResponse.json({
        success: false,
        message: "You are not authorized to perform this action.",
      });
    const deleted = await AdminModel.findByIdAndDelete(params.adminId);

    return NextResponse.json({
      message: "Admin deleted",
      success: true,
      data: deleted,
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({
      success: false,
      message: "Failed to delete admin user",
      error: error,
    });
  }
}
