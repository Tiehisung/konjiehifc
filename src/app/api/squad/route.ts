import { ISquad } from "@/app/admin/squad/page";
import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import SquadModel from "@/models/squad";
import { NextRequest, NextResponse } from "next/server";
// export const revalidate = 0;
// export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);

  // const isPlayed = searchParams.get("isPlayed") == "0" ? false : true

  const limit = Number.parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  const search = searchParams.get("search") || "";

  const regex = new RegExp(search, "i");

  const query = {
    // $or: [
    //   { "description": regex },
    //   { "date": regex },
    //   { "time": regex },
    // ],
    // isPlayed: true,
  }

  const managers = await SquadModel.find(query)
    .limit(limit).skip(skip)
    .lean();;

  const total = await SquadModel.countDocuments(query)
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
    const body = await request.json() as ISquad;

    console.log({ body });

    const saved = await SquadModel.create({
      ...body,
    });
    console.log({ saved });
    if (!saved) {
      return NextResponse.json({ message: "Failed to create squad.", success: false });
    }

    return NextResponse.json({ message: "Squad created successfully!", success: true, data: saved });

  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error),
      success: false,
    });
  }
}
