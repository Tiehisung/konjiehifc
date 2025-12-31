import { Card, CardContent } from "@/components/ui/card";

import { Users, Calendar, Trophy, TrendingUp } from "lucide-react";
import React from "react";
import { getMatchesStats } from "../page";
import { IQueryResponse } from "@/types";
import { IMatchStats } from "@/types/stats";
import { IPlayer } from "@/types/player.interface";
import { getPlayers } from "../players/page";

export const KeyTopStatsCards = async () => {
  const matchesStats: IQueryResponse<IMatchStats> = await getMatchesStats();
  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  console.log({ matchesStats });
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {[
        {
          label: "Total Players",
          value: players?.data?.length ?? 0,
          icon: Users,
          color: "from-blue-500 to-blue-600",
        },
        {
          label: "Matches Played",
          value: matchesStats?.data?.totalMatches,
          icon: Calendar,
          color: "from-red-500 to-red-600",
        },
        {
          label: "Win Rate",
          value: matchesStats?.data?.winRate,
          icon: Trophy,
          color: "from-green-500 to-green-600",
        },
        {
          label: "Goals",
          value: matchesStats?.data?.goalsFor,
          icon: TrendingUp,
          color: "from-yellow-500 to-yellow-600",
        },
      ].map((stat, i) => (
        <Card key={i} className="border shadow-lg overflow-hidden">
          <div className={`bg-linear-to-tr h-2 ${stat.color}`} />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  {stat.label}
                </p>
                <p className="text-3xl font-black text-foreground mt-1">
                  {stat.value}
                </p>
              </div>
              <stat.icon className="text-muted-foreground/30" size={40} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
