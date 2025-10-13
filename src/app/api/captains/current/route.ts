import { ConnectMongoDb } from "@/lib/dbconfig";
import CaptaincyModel from "@/models/captain";
import { NextResponse } from "next/server";
import "@/models/player";
import "@/models/file";
import { getErrorMessage } from "@/lib";

export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();

//Get current captains

export async function GET() {
  try {
    const captains = await CaptaincyModel.find({ isActive: true }).populate({
      path: "player",
      populate: { path: "avatar" },
    });

    return NextResponse.json(captains);
  } catch (error) {
    getErrorMessage(error);

    return NextResponse.json(null);
  }
}
