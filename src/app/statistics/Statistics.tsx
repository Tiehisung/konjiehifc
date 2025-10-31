import { Title } from "@/components/Elements";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { _playerStats } from "@/data/statistics";
import Image from "next/image";
import { FC } from "react";
import { IPlayer } from "../players/page";

const PlayerStatistics = () => {
  return (
    <div>
      <Title>Statistics</Title>
      <div className=" flex items-center flex-wrap justify-center gap-6  ">
        {_playerStats.map((pstat, i) => (
          <PlayerStatsCard key={i} {...pstat} />
        ))}
      </div>
    </div>
  );
};

export default PlayerStatistics;

export interface IPlayerStatsProps {
  title: string;
  alias: string;
  featuredPlayer: Partial<IPlayer> & { statsValue: string };
  otherPlayers: Partial<IPlayer & { statsValue: string }>[];
}

export const PlayerStatsCard: FC<IPlayerStatsProps> = ({
  alias,
  featuredPlayer,
  otherPlayers,
  title,
}) => {
  return (
    <Card className="min-w-72 w-96 border _borderColor rounded-lg p-4 container">
      {/* Header */}
      <CardHeader className="text-lg font-bold mb-4 text-yellow-500 uppercase">
        {title}
      </CardHeader>

      {/* Featured Player */}
      <CardHeader className="flex items-center mb-6">
        <Image
          width={300}
          height={300}
          src={featuredPlayer?.avatar as string}
          alt={featuredPlayer?.lastName ?? ""}
          className="w-20 h-20 rounded-full mr-4"
        />
        <div>
          <h4 className="text-xl font-bold">
            {`${featuredPlayer?.lastName} ${featuredPlayer?.firstName}`}
          </h4>
          <p className="text-2xl font-semibold text-blue-600">
            {`${featuredPlayer?.statsValue} ${alias}`}
          </p>
        </div>
      </CardHeader>

      {/* Other Players */}
      <CardContent className="space-y-3">
        {otherPlayers?.map((player, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-200/70 pb-3"
          >
            <div className="flex items-center space-x-3">
              <Image
                width={300}
                height={300}
                src={player?.avatar as string}
                alt={player?.lastName as string}
                className="w-10 h-10 rounded-full"
              />
              <span className="text-sm font-medium">
                {`${player?.lastName} ${featuredPlayer?.firstName}`}
              </span>
            </div>
            <span className="text-lg font-bold">{player?.statsValue}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
