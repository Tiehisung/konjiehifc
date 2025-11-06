import { ConnectMongoDb } from "@/lib/dbconfig";
import SponsorModel from "@/models/sponsor";
import { NextRequest, NextResponse } from "next/server";
import "@/models/file";
import "@/models/donation";

// export const revalidate = 0;
// export const dynamic = "force-dynamic";
ConnectMongoDb();
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ sponsorId: string }> }
) {
  const sponsor = await SponsorModel.findById((await params).sponsorId)

    .populate({ path: "donations", });
  return NextResponse.json(sponsor);
}
export async function DELETE(_: NextRequest,
  { params }: { params: Promise<{ sponsorId: string }> }) {
  try {
    const deleted = await SponsorModel.findByIdAndDelete((await params).sponsorId);
    if (deleted)
      return NextResponse.json({ message: "Deleted", success: true });

  } catch (error) {
    return NextResponse.json({ message: "Delete failed", success: false, data: error });

  }
}
