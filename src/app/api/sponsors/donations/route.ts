import { ConnectMongoDb } from "@/lib/dbconfig";
import DonationModel from "@/models/donation";
import { NextResponse } from "next/server";
import "@/models/file";
import "@/models/sponsor";

ConnectMongoDb();
export async function GET() {
  const donations = await DonationModel.find()
    .populate({ path: "sponsor" });
  return NextResponse.json(donations);
}
