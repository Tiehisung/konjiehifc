import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { logAction } from "../logs/helper";
import { IMatchCard } from "@/app/matches/(fixturesAndResults)";
import CardModel from "@/models/card";
import { updateMatchEvent } from "../matches/live/events/route";
// export const revalidate = 0;
// export const dynamic = "force-dynamic";

ConnectMongoDb();
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);

  // const isPlayed = searchParams.get("isPlayed") == "0" ? false : true

  const limit = Number.parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  const search = searchParams.get("search") || "";

  const regex = new RegExp(search, "i");

  const query = {
    $or: [
      { "type": regex },
      { "player.name": regex },
      { "match.name": regex },
      { "description": regex },
    ],
  }

  const cards = await CardModel.find(query)
    .limit(limit).skip(skip)
    .lean().sort({ createdAt: "desc" });

  const total = await CardModel.countDocuments(query)
  return NextResponse.json({
    success: true,
    data: cards,
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
    const session = await getServerSession(authOptions)
    const { match, minute, player, type, description, } = await request.json() as IMatchCard;

    const saved = await CardModel.create({
      match, minute, player, type
    });

    if (!saved) {
      return NextResponse.json({ message: "Failed to create card.", success: false });
    }

    //Update events
    await updateMatchEvent(match._id, {
      type: 'card',
      minute: minute,
      title: `${minute}' - ${player.number}  ${player.name} `,
      description
    })

    // log
    await logAction({
      title: "Goal Created",
      description: `${type} card recorded. ${description || ''}` as string,
      category: "db",
      severity: "info",
      userEmail: session?.user?.email as string,

    });
    return NextResponse.json({ message: "Card created successfully!", success: true, data: saved });

  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error),
      success: false,
    });
  }
}
