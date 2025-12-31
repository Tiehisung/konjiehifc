import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { _playerStats } from "@/data/statistics";
import { FC } from "react";
 import { EPlayerPosition, IPlayer } from "@/types/player.interface";
import { getPlayers } from "../admin/players/page";
import { IQueryResponse } from "@/types";
import { computePlayerStandings } from "@/lib/compute/player/standings";
import HEADER from "@/components/Element";
import { AVATAR } from "@/components/ui/avatar";

const PlayerStatistics = async () => {
  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  const standings = computePlayerStandings(players?.data || []);
  return (
    <div className="_page px-5">
      <HEADER title="Player Statistics" subtitle="Top performers this season" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <PlayerStatsCard
          title="Goals"
          alias="Goals"
          featuredPlayer={{
            ...standings.topScorers[0],
            statsValue: standings.topScorers[0]?.goals.toString(),
          }}
          otherPlayers={standings.topScorers?.slice(1, 6).map((p) => ({
            ...p,
            statsValue: p?.goals?.toString(),
          }))}
        />
        <PlayerStatsCard
          title="Assists"
          alias="Assists"
          featuredPlayer={{
            ...standings.topAssists[0],
            statsValue: standings.topAssists?.[0]?.goals?.toString(),
          }}
          otherPlayers={standings.topAssists?.slice(1, 6)?.map((p) => ({
            ...p,
            statsValue: p?.goals?.toString(),
          }))}
        />
        <PlayerStatsCard
          title="Appearances"
          alias="Appearances"
          featuredPlayer={{
            ...standings.topAppearances[0],
            statsValue: standings.topAppearances?.[0]?.goals?.toString(),
          }}
          otherPlayers={standings.topAppearances?.slice(1, 6)?.map((p) => ({
            ...p,
            statsValue: p?.goals?.toString(),
          }))}
        />
      </div>
    </div>
  );
};

export default PlayerStatistics;

export interface IPlayerStatsProps {
  title: string;
  alias: string;
  featuredPlayer: {
    _id: string;
    name: string;
    avatar: string;
    position: EPlayerPosition;
    goals: number;
    assists: number;
    appearances: number;
    number: string;
    statsValue: string;
  };
  otherPlayers: {
    _id: string;
    name: string;
    avatar: string;
    position: EPlayerPosition;
    goals: number;
    assists: number;
    appearances: number;
    number: string;
    statsValue: string;
  }[];
}

export const PlayerStatsCard: FC<IPlayerStatsProps> = ({
  alias,
  featuredPlayer,
  otherPlayers,
  title,
}) => {
  return (
    <Card className="min-w-60 border _borderColor rounded-lg p-4 container">
      {/* Header */}
      <CardHeader className="text-lg font-bold mb-4 text-yellow-500 uppercase">
        {title}
      </CardHeader>

      {/* Featured Player */}
      <CardHeader className="flex items-center mb-6">
        <AVATAR
          src={featuredPlayer?.avatar as string}
          alt={featuredPlayer?.name ?? ""}
          fallbackText={featuredPlayer?.name ?? ""}
          className="w-20 h-20 rounded-full mr-4"
        />
        <div>
          <h4 className="text-lg font-bold">{featuredPlayer?.name}</h4>
          <p className="text-2xl font-semibold text-Blue">
            {`${featuredPlayer?.statsValue} ${alias}`}
          </p>
        </div>
      </CardHeader>

      {/* Other Players */}
      <CardContent className="space-y-3">
        {otherPlayers?.map((player, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-border pb-3"
          >
            <div className="flex items-center space-x-3">
              <AVATAR
                src={player?.avatar as string}
                alt={player?.name as string}
                fallbackText={player?.name as string}
                className="w-10 h-10 rounded-full"
              />
              <span className="text-sm font-medium">{player?.name}</span>
            </div>
            <span className="text-lg font-bold">{player?.statsValue}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
