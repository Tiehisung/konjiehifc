import { ConnectMongoDb } from "@/lib/dbconfig";
import ArchivesModel from "@/models/archive";
import NewsModel from "@/models/news";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();

export async function POST(request, { params }) {
  try {
    const newsToArchive = await request.json();

    //Then archive
    await ArchivesModel.updateOne(
      { category: "archived_news" },
      {
        $push: {
          data: {
            ...newsToArchive,
            stats: { isLatest: false, isArchived: true },
          },
        },
      }
    );
    //Then delete from main collection
    const deleted = await NewsModel.deleteOne({ _id: params.newsId });
    if (deleted.acknowledged)
      return NextResponse.json({
        message: "News archived",
        success: true,
      });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to archive! " + error.message,
      success: false,
    });
  }
}
