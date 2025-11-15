import { ConnectMongoDb } from "@/lib/dbconfig";
import UserModel from "@/models/user";
 
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { IAdminSession } from "@/app/admin/authorization/Actions";

export const revalidate = 0;
export const dynamic = "force-dynamic";

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
  { params }: { params: { userId: string } }
) {
  try {
 
    // if (session?.user?.role !== "super_admin")
    //   return NextResponse.json({
    //     success: false,
    //     message: "You are not authorized to perform this action.",
    //   });

    const data = await req.json();
   

    const updated = await UserModel.findByIdAndUpdate(params.userId, {
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
  { params }: { params: { userId: string } }
) {
  try {
    const admin = await UserModel.findById(params.userId);
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
  { params }: { params: { userId: string } }
) {
  try {
 

    // if (session?.user?.role !== "super_admin")
    //   return NextResponse.json({
    //     success: false,
    //     message: "You are not authorized to perform this action.",
    //   });
    const deleted = await UserModel.findByIdAndDelete(params.userId);

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
