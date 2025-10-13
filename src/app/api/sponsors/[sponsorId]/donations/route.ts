import { ConnectMongoDb } from "@/lib/dbconfig";
import DonationModel from "@/models/donation";
import SponsorModel from "@/models/sponsor";
import { NextRequest, NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function POST(
  request: NextRequest,
  { params }: { params: { sponsorId: string } }
) {
  const sponsorId = params.sponsorId;
  const { item, description, files, date } = await request.json();

  const donated = await DonationModel.create({
    item,
    description,
    files,
    date,
    sponsor: sponsorId,
  });

  await SponsorModel.findByIdAndUpdate(sponsorId, {
    $push: { donations: donated._id },
  });

  return NextResponse.json({
    message: "Donated successfully",
    success: true,
    data: donated,
  });
}

//Revoke donation
export async function DELETE(
  request: NextRequest,
  { params }: { params: { sponsorId: string } }
) {
  const sponsorId = params.sponsorId;
  const donationId = await request.json();
  await DonationModel.findByIdAndDelete(donationId);
  await SponsorModel.findByIdAndUpdate(sponsorId, {
    $pull: { donations: donationId },
  });

  return NextResponse.json({ message: "Donation revoked.", success: true });
}
