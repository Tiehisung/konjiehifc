import "@/models/file";
import "@/models/galleries";

import { ConnectMongoDb } from "@/lib/dbconfig";
import PlayerModel from "@/models/player";
import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage, removeEmptyKeys } from "@/lib";
import UserModel from "@/models/user";
import bcrypt from "bcryptjs";
import { EPlayerStatus,   } from "@/types/player.interface";


ConnectMongoDb();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);

  const isActive = searchParams.get("isActive") == "0" ? false : true

  const limit = Number.parseInt(searchParams.get("limit") || "30", 10);
  const skip = (page - 1) * limit;

  const search = searchParams.get("player_search") || "";

  const status = searchParams.get("status")

  const regex = new RegExp(search, "i");

  const query = {
    $or: [
      { "firstName": regex },
      { "lastName": regex },
      { "position": regex },
      { "jersey": regex },
      { "dob": regex },
      { "email": regex },
    ],
    isActive: isActive,
    status
  }
  const cleaned = removeEmptyKeys(query)

  const players = await PlayerModel.find(cleaned)
    .populate({ path: "galleries", populate: { path: 'files' } }).skip(skip)
    .limit(limit)
    .lean();

  const total = await PlayerModel.countDocuments(cleaned)
  return NextResponse.json({
    success: true,
    data: players,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request: NextRequest) {
  const formData = await request.json();
  try {
    const saved = await PlayerModel.create({ ...formData });

    // Create User
    if (formData.email) {
      const existingUser = await UserModel.findOne({ email: formData.email });

      if (!existingUser) {
        const password = await bcrypt.hash(formData.firstName.toLowerCase(), 10);

        await UserModel.create({
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          image: formData.image,
          lastLoginAccount: 'credentials',
          signupMode: 'credentials',
          password
        });
      }
    }
    if (saved) return NextResponse.json({ message: "Success", success: true });
    return NextResponse.json({ message: "Player Added", success: true });
  } catch (error) {
    return NextResponse.json({ message: getErrorMessage(error), success: false, data: error });

  }
}
