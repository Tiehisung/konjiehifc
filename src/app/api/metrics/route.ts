
import { checkMatchMetrics } from "@/lib/compute/match";
import { ConnectMongoDb } from "@/lib/dbconfig";
import MatchModel from "@/models/match";
import PlayerModel from "@/models/player";
import { IGoal, IMatch, IMatchMetrics, ITeam } from "@/types/match.interface";
import { NextRequest, NextResponse } from "next/server";


ConnectMongoDb();

export async function GET(request: NextRequest) {

  const matches = await MatchModel.find({ status: 'FT' }).populate('opponent') as IMatch[];

  const matchMetrics = matches?.map(m => checkMatchMetrics(m));

  const matchStats = {
    wins: matchMetrics?.filter(m => m?.winStatus == 'win'),
    draws: matchMetrics?.filter(m => m?.winStatus == 'draw'),
    losses: matchMetrics?.filter(m => m?.winStatus == 'loss'),
  }
  const winRate = ((matchStats?.wins?.length / matchMetrics?.length) * 100)?.toFixed(1)

  const total = await PlayerModel.countDocuments({ isActive: true })

  return NextResponse.json({
    success: true,
    data: {
      activePlayers: total,
      matchStats: {
        ...matchStats,
        metrics: matchMetrics,
        winRate 
      },
    },

  });
}
