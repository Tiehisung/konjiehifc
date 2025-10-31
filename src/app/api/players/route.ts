import "@/models/file";
import "@/models/galleries";

import { ConnectMongoDb } from "@/lib/dbconfig";
import PlayerModel from "@/models/player";
import { NextRequest, NextResponse } from "next/server";
import { IFileProps, IResultProps } from "@/types";
import { apiConfig } from "@/lib/configs";
import { getErrorMessage } from "@/lib";
export const revalidate = 0;
export const dynamic = "force-dynamic";

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
      { "firstName": regex },
      { "lastName": regex },
      { "position": regex },
      { "jersey": regex },
      { "dob": regex },
      { "email": regex },
    ],
    isActive: isActive,
  }

  const players = await PlayerModel.find(query)
    .populate("galleries").skip(skip)
    .limit(limit)
    .lean();

  const total = await PlayerModel.countDocuments(query)
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
    if (saved) return NextResponse.json({ message: "Success", success: true });
    return NextResponse.json({ message: "Player Added", success: true });
  } catch (error) {
    return NextResponse.json({ message: getErrorMessage(error), success: false, data: error });

  }
}
