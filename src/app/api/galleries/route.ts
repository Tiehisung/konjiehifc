import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import GalleryModel from "@/models/galleries";
import { IGalleryProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import "@/models/file";

export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();

export async function POST(request: NextRequest) {
  try {
    const newGallery = (await request.json()) as IGalleryProps;
    const saved = await GalleryModel.create({
      ...newGallery,
      timestamp: Date.now(),
    });
 
    if (saved)
      return NextResponse.json({
        message: "Gallery created",
        success: true,
        data: saved,
      });
  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error, "Failed to save gallery"),
      success: false,
    });
  }
}

export async function GET( ) {
  const galleries = await GalleryModel.find({}).sort({ createdAt: "desc" });
  return NextResponse.json(galleries);
}
