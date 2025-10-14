import { ConnectMongoDb } from "@/lib/dbconfig";
import SponsorModel from "@/models/sponsor";
import { NextRequest, NextResponse } from "next/server";
import "@/models/file";
import "@/models/donation";

// export const revalidate = 0;
// export const dynamic = "force-dynamic";
ConnectMongoDb();
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sponsorId: string }> }
) {
  const sponsor = await SponsorModel.findById((await params).sponsorId)
    .populate("logo")
    .populate({ path: "donations", populate: { path: "files" } });
  return NextResponse.json(sponsor);
}
