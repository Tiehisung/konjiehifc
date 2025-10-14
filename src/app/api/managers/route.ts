import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import ManagerModel from "@/models/manager";
import { NextRequest, NextResponse } from "next/server";
// export const revalidate = 0;
// export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function GET() {
  const managers = await ManagerModel.find();
  return NextResponse.json(managers);
}

export async function POST(request: NextRequest) {
  try {
    const { fullname, phone, email, dob, dateSigned, role, avatar } =
      await request.json();

    const exists = await ManagerModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (exists)
      return NextResponse.json({
        message: "Staff with " + email + " already exists",
        success: false,
      });

    //Disable previous role staff
    await ManagerModel.updateOne(
      { role: role, isActive: true },
      { $set: { isActive: false } }
    );

    //Save new staff
    const saved = await ManagerModel.create({
      fullname,
      phone,
      email,
      dob,
      dateSigned,
      role,
      avatar,
      isActive: true,
    });
    if (saved)
      return NextResponse.json({ message: "Staff created", success: true });
    return NextResponse.json({
      message: "Failed to create staff",
      success: false,
    });
  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error),
      success: false,
    });
  }
}
