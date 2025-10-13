import { ConnectMongoDb } from "@/lib/dbconfig";
import AdminModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getErrorMessage } from "@/lib";

export const dynamic = "force-dynamic";

ConnectMongoDb();

export async function POST(req: NextRequest) {
  try {
    const salt = await bcrypt.genSalt(10);

    const { email, password, image, name } = await req.json();
    const hashedPass = await bcrypt.hash(password, salt);

    const alreadyExists = await AdminModel.findOne({ email: email });
    if (alreadyExists)
      return NextResponse.json({
        success: false,
        message: `User with email ${email} already exists`,
      });

    const user = await AdminModel.create({
      email,
      password: hashedPass,
      image,
      name,
    });
    return NextResponse.json({
      success: true,
      message: "New user created",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: getErrorMessage(error, "Failed to create user"),
    });
  }
}

export async function GET() {
  const users = await AdminModel.find().select("-password");
  return NextResponse.json(users);
}
