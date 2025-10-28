import { getErrorMessage } from "@/lib";
import { ConnectMongoDb } from "@/lib/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { logAction } from "../logs/helper";
import { IGoal } from "@/app/matches/(fixturesAndResults)";
import GoalModel from "@/models/goals";
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
      { "scorer._id": regex },
      { "scorer.name": regex },
      { "assist.name": regex },
      { "assist._id": regex },
      { "description": regex },
      { "opponent.name": regex },
      { "opponent._id": regex },
    ],
    // isPlayed: true,
  }

  const managers = await GoalModel.find(query)
    .limit(limit).skip(skip)
    .lean().sort({ createdAt: "desc" });

  const total = await GoalModel.countDocuments(query)
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
    const body = await request.json() as IGoal;

    const saved = await GoalModel.create({
      ...body,
    });

    if (!saved) {
      return NextResponse.json({ message: "Failed to create goal.", success: false });
    }

    //Update events
    const assistance = body.assist ? `Assist: ${body.assist.number ?? ''} ${body.assist.name} ` : ''

    const event = await updateMatchEvent(body.match, {
      type: 'goal',
      minute: body.minute,
      title: `${body.minute}' - ${body.scorer.number ?? ''}  ${body.scorer.name} `,
      description: `${assistance} ${body.description} Mode of Score: ${body.modeOfScore ?? ''}`

    })

    console.log({ event })

    // log
    await logAction({
      title: "Goal Created",
      description: body.description as string,
      category: "db",
      severity: "info",
      userEmail: session?.user?.email as string,

    });

    return NextResponse.json({ message: "Goal created successfully!", success: true, data: saved });

  } catch (error) {
    return NextResponse.json({
      message: getErrorMessage(error),
      success: false,
    });
  }
}
