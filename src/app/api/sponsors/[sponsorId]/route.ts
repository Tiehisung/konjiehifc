import { ConnectMongoDb } from "@/lib/dbconfig";
import SponsorModel from "@/models/sponsor";
import { NextRequest, NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";
import "@/models/file";
import "@/models/donation";

ConnectMongoDb();
export async function GET(
  req: NextRequest,
  { params }: { params: { sponsorId: string } }
) {
  const sponsor = await SponsorModel.findById(params.sponsorId)
    .populate("logo")
    .populate({ path: "donations", populate: { path: "files" } });
  return NextResponse.json(sponsor);
}
