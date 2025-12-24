import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { logAction } from "../logs/helper";
import { updateMatchEvent } from "../matches/live/events/route";
import InjuryModel from "@/models/injury";
import { IInjury } from "@/app/admin/live-match/(events)/Injury";
import PlayerModel from "@/models/player";
import { IUser } from "@/types/user";

ConnectMongoDb();
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);

  const limit = Number.parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  const search = searchParams.get("injury_search") || "";

  const regex = new RegExp(search, "i");

  const query = {
    $or: [
      { "type": regex },
      { "player.name": regex },
      { "severity": regex },
      { "description": regex },
    ],
  }

  const injuries = await InjuryModel.find(query)
    .limit(limit).skip(skip)
    .lean().sort({ createdAt: "desc" });

  const total = await InjuryModel.countDocuments(query)
  return NextResponse.json({
    success: true,
    data: injuries,
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

    const { match, minute, player, description, severity } = await request.json() as IInjury

    const savedInjury = await InjuryModel.create({
      minute, description, severity, match, player
    });

    if (!savedInjury) {
      return NextResponse.json({ message: "Failed to create injury.", success: false });
    }


    //Update Player
    await PlayerModel.findByIdAndUpdate(player?._id, { $push: { injuries: savedInjury._id } })

    //Update events
    await updateMatchEvent(match, {
      type: 'injury',
      minute: minute,
      title: `🤕 ${minute}' - ${player.number ?? ''}  ${player.name} `,
      description
    })

    // log
    await logAction({
      title: "🤕 Injury Created",
      description: description as string,
  

    });
    return NextResponse.json({ message: "Injury created successfully!", success: true, data: savedInjury });

  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error),
      success: false,
    });
  }
}
