import { ConnectMongoDb } from "@/lib/dbconfig";
import SponsorModel from "@/models/sponsor";
import { NextRequest, NextResponse } from "next/server";
import "@/models/file";
import "@/models/donation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

ConnectMongoDb();
export async function POST(request: NextRequest) {
  const formdata = await request.json();
  if (!formdata.logo) delete formdata.logo;
  const created = await SponsorModel.create({ ...formdata });
  if (created)
    return NextResponse.json({ message: "Sponsor created", success: true });
  return NextResponse.json({
    message: "Create Sponsor failed",
    success: false,
  });
}

export async function PUT(request: NextRequest) {
  const formData = await request.json();
  // console.log("formData", formData);
  const updated = await SponsorModel.updateOne(
    { _id: formData._id },
    {
      $set: {
        ownerName: formData.ownerName,
        businessName: formData.businessName,
        businessDescription: formData.businessDescription,
        phone: formData.phone,
        logo: formData.logo,
        badges: formData.badges,
        donations: formData.donations,
      },
    }
  );
  if (updated.acknowledged)
    return NextResponse.json({ message: "Updated", success: true });
  return NextResponse.json({ message: "Update failed", success: false });
}

export async function DELETE(request: NextRequest) {
  const { sponsorId } = await request.json();
  const deleted = await SponsorModel.deleteOne({ _id: sponsorId });
  if (deleted.acknowledged)
    return NextResponse.json({ message: "Deleted", success: true });
  return NextResponse.json({ message: "Delete failed", success: false });
}

export async function GET() {
  const sponsors = await SponsorModel.find()
    .populate("logo")
    .populate({ path: "donations", populate: { path: "files" } });
  return NextResponse.json(sponsors);
}
