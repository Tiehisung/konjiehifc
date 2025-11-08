import { ConnectMongoDb } from "@/lib/dbconfig";
import GalleryModel from "@/models/galleries";
import { NextRequest, NextResponse } from "next/server";
import '@/models/file'

// export const revalidate = 0;
// export const dynamic = "force-dynamic";

ConnectMongoDb();

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ galleryId: string }> }
) {
  const gallery = await GalleryModel.findById((await params).galleryId)
    .sort({ createdAt: "desc" });
  return NextResponse.json(gallery);
}


export async function DELETE(_: NextRequest, { params }: { params: Promise<{ galleryId: string }> }) {
  try {
    const galleryId = (await params).galleryId;
    const deleted = await GalleryModel.findByIdAndDelete(galleryId);

    return NextResponse.json({ message: "Deleted", success: true, data: deleted });
  } catch {

    return NextResponse.json({ message: "Delete failed", success: false });
  }
}
