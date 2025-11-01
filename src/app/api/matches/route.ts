import { IPostMatch } from "@/app/admin/matches/CreateFixture";
import { ConnectMongoDb } from "@/lib/dbconfig";
import MatchModel from "@/models/match";
import { NextRequest, NextResponse } from "next/server";
import "@/models/teams";
import "@/models/file";
import "@/models/goals";
import "@/models/player";
import "@/models/squad";
import { removeEmptyKeys } from "@/lib";
import { MatchStatus } from "@/app/matches/(fixturesAndResults)";

ConnectMongoDb();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);

  const status = searchParams.get('status') as MatchStatus

  const limit = Number.parseInt(searchParams.get("limit") || "30", 10);

  const skip = (page - 1) * limit;

  const search = searchParams.get("match_search") || "";

  const regex = new RegExp(search, "i");

  const cleanedFilters = removeEmptyKeys({ status })
  const query = {
    $or: [
      { "title": regex },
      { "date": regex },
    ], ...cleanedFilters
  }

  const fixtures = await MatchModel.find(query)
    .populate({ path: "opponent", populate: { path: "logo" } })
    .populate({ path: "squad", })
    .populate({ path: "goals", })
    .limit(limit)
    .skip(skip)
    .lean()
    .sort({ createdAt: "desc" });

  const total = await MatchModel.countDocuments(query)
  return NextResponse.json({
    data: fixtures, success: true, pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}

//Post new fixture

export async function POST(request: NextRequest) {
  const formdata: IPostMatch = await request.json();

  const saved = await MatchModel.create({ ...formdata });

  if (saved) return NextResponse.json({ message: "Success", success: true });
  return NextResponse.json({ message: "Not saved", success: false });
}

export async function PUT(request: NextRequest) {

  const { _id, ...others } = await request.json();

  const updated = await MatchModel.findByIdAndUpdate(_id, {
    $set: { ...others },
  });
  if (updated) return NextResponse.json({ message: "Updated", success: true });
  return NextResponse.json({ message: "Update failed", success: false });
}

export async function DELETE(request: NextRequest) {
  const { matchId } = await request.json();
  const deleted = await MatchModel.deleteOne({ _id: matchId });
  if (deleted.acknowledged)
    return NextResponse.json({ message: "Deleted", success: true });
  return NextResponse.json({ message: "Delete failed", success: false });
}
