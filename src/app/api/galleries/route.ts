import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import GalleryModel from "@/models/galleries";
import { IGalleryProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";
// import "@/models/file";
import FileModel from "@/models/file";

ConnectMongoDb();
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);
  const limit = Number.parseInt(searchParams.get("limit") || "10", 10);

  const search = searchParams.get("gallery_search") || "";
  const tags = (searchParams.get("tags") || "")?.split(',');

  const skip = (page - 1) * limit;

  const regex = new RegExp(search, "i"); // case-insensitive partial match

  const query: Record<string, unknown> = {};

  if (tags && tags.length) {
    query.tags = { $in: tags };
  }

  if (search) {
    query.$or = [
      { description: regex },
      { tags: regex },
      { title: regex },
    ];
  }

  const galleries = await GalleryModel.find(query).populate('files').sort({ 'updatedAt': -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await GalleryModel.countDocuments(query);

  return NextResponse.json({
    success: true,
    data: galleries,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const { files, tags, title, description, } = (await request.json()) as IGalleryProps;

    //Save files to File collection
    const savedFiles = await FileModel.insertMany(files);
    const fileIds = savedFiles.map(file => file._id);

    //Create gallery with saved file IDs
    const savedGallery = await GalleryModel.create({
      files: fileIds, tags, title, description,
      timestamp: Date.now(),
    });

    if (!savedGallery)
      return NextResponse.json({
        message: "Failed to create gallery",
        success: false,
        data: savedGallery,
      });


    return NextResponse.json({
      message: "Gallery created",
      success: true,
      data: savedGallery,
    });
  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error, "Failed to save gallery"),
      success: false,
    });
  }
}


