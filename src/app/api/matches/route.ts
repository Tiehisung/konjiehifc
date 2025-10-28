import { IPostMatch } from "@/app/admin/matches/CreateFixture";
import { ConnectMongoDb } from "@/lib/dbconfig";
import MatchModel from "@/models/matches";
import { NextRequest, NextResponse } from "next/server";
import "@/models/teams";
import "@/models/file";
import "@/models/goals";
import "@/models/player";

ConnectMongoDb();

// export const revalidate = 0;
// export const dynamic = "force-dynamic";

//Post new fixture

export async function GET() {
  const fixtures = await MatchModel.find().populate({ path: "opponent", populate: { path: "logo" } })
    .populate({ path: "goals", populate: { path: "players" } })
    .sort({
      createdAt: 'desc',
    });;
  return NextResponse.json({ data: fixtures, success: true });
}
export async function POST(request: NextRequest) {
  const formdata: IPostMatch = await request.json();

  const saved = await MatchModel.create({ ...formdata });

  if (saved) return NextResponse.json({ message: "Success", success: true });
  return NextResponse.json({ message: "Not saved", success: false });
}

export async function PUT(request: NextRequest) {

  const {_id,...others} = await request.json();
  console.log(others)

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
