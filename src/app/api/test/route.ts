
import { ConnectMongoDb } from "@/lib/dbconfig";
import PlayerModel from "@/models/player";
import { NextResponse } from "next/server";
ConnectMongoDb();
export async function GET() {
  try {
    // const mod = await PlayerModel.updateMany({}, { $unset: { status: "" } }).lean();
    const players = await PlayerModel.find()

    players.forEach(async (p) => {
      p.set('status', undefined)
      await p.save();
    })
    return NextResponse.json({
      ok: true,
      message: 'Test complete!',
      data: players

    })
  } catch (error) {

    return NextResponse.json({ ok: false, error }, { status: 500 })
  }
}
