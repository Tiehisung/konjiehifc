
import { ConnectMongoDb } from "@/lib/dbconfig";
import PlayerModel from "@/models/player";
import { NextRequest, NextResponse } from "next/server";


ConnectMongoDb();

export async function GET(request: NextRequest) {
  

 

  const total = await PlayerModel.countDocuments({ isActive: true })
  
  return NextResponse.json({
    success: true,
    data: { players: total },

  });
}