import { ConnectMongoDb } from "@/lib/dbconfig";
import { NextResponse } from "next/server";
import ArchivesModel from "@/models/archive";
export const dynamic = "force-dynamic";
export const revalidate = 0;
ConnectMongoDb();
export async function GET(request) {
  const category = request.nextUrl.searchParams.get("category");
  const archives = await ArchivesModel.findOne({ category: category });
  return NextResponse.json(archives?.data);
}

export async function POST(request) {
  try {
    const { category, doc } = await request.json();
    //Save to archivedmessages
    const archived = await ArchivesModel.updateOne(
      { category: category },
      { $push: { data: doc } }
    );
    if (archived.acknowledged)
      return NextResponse.json({
        message: "Archived successfully.",
        success: true,
      });
  } catch (error) {
    return NextResponse.json({
      message: "Archiving failed. " + error.message,
      success: false,
    });
  }
}
