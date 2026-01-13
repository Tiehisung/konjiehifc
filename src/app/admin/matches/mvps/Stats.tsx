"use client";

import { CountupMetricCard } from "@/components/MetricsCards";
import { AVATAR } from "@/components/ui/avatar";
import { IQueryResponse } from "@/types";
import { IMvp } from "@/types/mvp.interface";
import { AlertCircle } from "lucide-react";

interface IProps {
  mvps?: IQueryResponse<IMvp[]> | null;
  loading?: boolean;
}
export function MVPsStats({ loading, mvps }: IProps) {
  // Get mvps statistics

  const computeMVPs = (mvps: IMvp[]) => {
    const store: Record<string, IMvp[]> = {};

    mvps.forEach((mvp) => {
      if (!store[mvp.player._id]) {
        store[mvp.player._id] = [];
      }
      store[mvp.player._id].push(mvp);
    });

    const sortedMvps = Object.values(store).sort((a, b) => a.length - b.length);

    console.log({ sortedMvps });

    return {
      total: mvps.length ?? 0,
      sortedMvps,
      first: { total: sortedMvps[0].length, player: sortedMvps[0][0].player },
      second: { total: sortedMvps[1].length, player: sortedMvps[1][0].player },
      third: { total: sortedMvps[2].length, player: sortedMvps[2][0].player },
      stats: sortedMvps.map((m) => ({ player: m[0].player, total: m.length })),
    };
  };
  const data = computeMVPs(mvps?.data as IMvp[]);

  console.log(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <CountupMetricCard
        icon={<AlertCircle className="h-6 w-6" />}
        value={data.total}
        isLoading={loading}
        isCountUp
        description="Total MVPs"
        color="gray"
      />

      {data.stats.map((dt, i) => (
        <CountupMetricCard
          key={i}
          icon={
            <AVATAR
              src={dt.player?.avatar as string}
              fallbackText={dt.player.name}
              className="h-9 w-9"
            />
          }
          value={dt?.total}
          isLoading={loading}
          isCountUp
          description={dt.player.name}
          color="yellow"
        />
      ))}
    </div>
  );
}
