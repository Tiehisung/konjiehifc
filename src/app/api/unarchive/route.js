import { ConnectMongoDb } from "@/lib/dbconfig";
import ArchivesModel from "@/models/archive";
import MessageModel from "@/models/messages";
import NewsModel from "@/models/news";
import PlayerModel from "@/models/player";
import SponsorModel from "@/models/sponsor";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

ConnectMongoDb();

export async function POST(request) {
  const { category, restoreCollection, targetData } = await request.json();

  try {
    //Remove from archives
    await ArchivesModel.updateOne(
      { category: category },
      { $pull: { data: targetData } }
    );

    switch (restoreCollection.toLowerCase()) {
      case "news":
        //Return item to its former collection
        let restored = await NewsModel.create(targetData);
        if (restored)
          return NextResponse.json({
            message: "News item restored",
            success: true,
          });
        break;
      case "player":
        restored = await PlayerModel.create(dataItem);
        if (restored)
          return NextResponse.json({
            message: "Player restored",
            success: true,
          });
        break;
      case "message":
        restored = await MessageModel.create(dataItem);
        if (restored)
          return NextResponse.json({
            message: "Message restored",
            success: true,
          });
        break;
      case "sponsor":
        restored = await SponsorModel.create(dataItem);
        if (restored)
          return NextResponse.json({
            message: "Sponsor restored",
            success: true,
          });
        break;
      default:
        return NextResponse.json({
          message: "Specify restore collection",
          success: false,
        });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Failed to restore! " + error.message,
      success: false,
    });
  }
}
