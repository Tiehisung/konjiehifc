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
