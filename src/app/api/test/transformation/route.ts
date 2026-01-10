import "@/models/file";
import "@/models/galleries";

import { ConnectMongoDb } from "@/lib/dbconfig";
import PlayerModel from "@/models/player";
import { NextRequest, NextResponse } from "next/server";

ConnectMongoDb();

export async function GET(request: NextRequest) {

    const players = await PlayerModel.updateMany({}, { $set: { isCurrentPlayer: true } }).lean();
        

    return NextResponse.json({
        success: true,
        data: players,
    });
}