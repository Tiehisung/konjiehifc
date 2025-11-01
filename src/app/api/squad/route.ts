import { ISquad } from "@/app/admin/squad/page";
import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import SquadModel from "@/models/squad";
import { NextRequest, NextResponse } from "next/server";
import { postNews } from "../news/post";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { logAction } from "../logs/helper";
import MatchModel from "@/models/match";


ConnectMongoDb();
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);

  // const isPlayed = searchParams.get("isPlayed") == "0" ? false : true

  const limit = Number.parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  const search = searchParams.get("squad_search") || "";

  const regex = new RegExp(search, "i");

  const query = {
    $or: [
      { "title": regex },
      { "description": regex },
      { "coach.name": regex },
      { "assistant.name": regex },
    ],
  }

  const managers = await SquadModel.find(query)
    .populate('match')
    .limit(limit).skip(skip)
    .lean().sort({ createdAt: "desc" });

  const total = await SquadModel.countDocuments(query)
  return NextResponse.json({
    success: true, data: managers, pagination: {
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
    const { match, players, assistant, coach, description, } = await request.json() as ISquad;

    const savedSquad = await SquadModel.create({
      players, assistant, coach, description, title: match.title, match: match?._id
    });

    console.log({ savedSquad })

    if (!savedSquad) {
      return NextResponse.json({ message: "Failed to create squad.", success: false });
    }

    //Update Match Squad field
    await MatchModel.findByIdAndUpdate(match._id, { $set: { squad: savedSquad._id } })

    await postNews({
      headline: { text: `New Squad Created: ${description}`, image: { secure_url: players[0].avatar }, },
      metaDetails: [{ text: `A new squad has been created for the match against ${match.opponent.name ?? ''}. Scheduled on ${match.date ?? ''} at ${match.time ?? ''}.` }],
      type: 'squad'
    });
    // log
    await logAction({
      title: "Squad Created",
      description: description || `${match.title} on ${match.date}` as string,
      category: "db",
      severity: "info",
      userEmail: session?.user?.email as string,

    });
    return NextResponse.json({ message: "Squad created successfully!", success: true, data: savedSquad });

  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error),
      success: false,
    });
  }
}
