import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import ArchivesModel from "@/models/archive";
import NewsModel from "@/models/news";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ newsId: string }> }
) {
  
  const session = await getServerSession(authOptions)

  console.log({ session })

  const news = await NewsModel.findById((await params).newsId);
  return NextResponse.json(news);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ newsId: string }> }
) {
  try {
    const newsId = (await params).newsId;
    //First retrieve item
    const foundNewsItem = await NewsModel.findById(newsId);
    //Then archive
    await ArchivesModel.updateOne(
      { category: "deleted_news" },
      { $push: { data: { ...foundNewsItem, isLatest: false } } }
    );
    //Then delete from main collection
    const deleted = await NewsModel.deleteOne({ _id: newsId });
    if (deleted.acknowledged)
      return NextResponse.json({
        message: "News deleted",
        success: true,
      });
  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error, "Failed to delete! "),
      success: false,
    });
  }
}

// Edit
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ newsId: string }> }
) {
  try {
    const newsId = (await params).newsId;
    const body = await request.json();
    console.log(body)

    //update field
    const updated = await NewsModel.updateOne(
      { _id: newsId },
      { $set: { ...body } }
    );
    if (updated.acknowledged)
      return NextResponse.json({
        message: "News updated",
        success: true,
      });
  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error, "Failed to update! "),
      success: false,
    });
  }
}
