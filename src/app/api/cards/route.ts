import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { logAction } from "../logs/helper";
import { IMatchCard } from "@/app/matches/(fixturesAndResults)";
import CardModel from "@/models/card";
import { updateMatchEvent } from "../matches/live/events/route";
import PlayerModel from "@/models/player";
import { IUser } from "@/types/user";
import { auth } from "@/auth";


ConnectMongoDb();
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);

  // const isPlayed = searchParams.get("isPlayed") == "0" ? false : true

  const limit = Number.parseInt(searchParams.get("limit") || "30", 10);
  const skip = (page - 1) * limit;

  const search = searchParams.get("card_search") || "";

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
    const session = await auth()
    const { match, minute, player, type, description, } = await request.json() as IMatchCard;

    const savedCard = await CardModel.create({
      match, minute, player, type
    });

    if (!savedCard) {
      return NextResponse.json({ message: "Failed to create card.", success: false });
    }

    //Update Player
    await PlayerModel.findByIdAndUpdate(player?._id, { $push: { cards: savedCard._id } })

    //Update events
    await updateMatchEvent(match._id, {
      type: 'card',
      minute: minute,
      title: `${type == 'red' ? '🟥' : '🟨'} ${minute}' - ${player.number}  ${player.name} `,
      description
    })

    // log
    await logAction({
      title: "Card Created",
      description: `${type == 'red' ? '🟥' : '🟨'} ${type} card recorded. ${description || ''}`,
    });

    return NextResponse.json({ message: "Card created successfully!", success: true, data: savedCard });

  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error),
      success: false,
    });
  }
}
