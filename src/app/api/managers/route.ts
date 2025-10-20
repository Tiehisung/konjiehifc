import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import ManagerModel from "@/models/manager";
import { NextRequest, NextResponse } from "next/server";
// export const revalidate = 0;
// export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);

  const isActive = searchParams.get("isActive") == "0" ? false : true

  const limit = Number.parseInt(searchParams.get("limit") || "30", 10);
  const skip = (page - 1) * limit;

  const search = searchParams.get("search") || "";

  const regex = new RegExp(search, "i");

  const query = {
    $or: [
      { "fullname": regex },
      { "dob": regex },
      { "email": regex },
    ],
    isActive: isActive,
  }

  const managers = await ManagerModel.find(query)
    .limit(limit).skip(skip)
    .lean();;

  const total = await ManagerModel.countDocuments(query)
  return NextResponse.json({
    success: true, data: managers, pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });




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
