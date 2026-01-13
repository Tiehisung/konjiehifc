"use client";

import { CountupMetricCard } from "@/components/MetricsCards";
import { AVATAR } from "@/components/ui/avatar";
import { IQueryResponse } from "@/types";
import { IMvp } from "@/types/mvp.interface";
import { AlertCircle } from "lucide-react";
import { computeMVPs } from ".";
import { Button } from "@/components/buttons/Button";
import { DIALOG } from "@/components/Dialog";

interface IProps {
  mvps?: IQueryResponse<IMvp[]> | null;
  loading?: boolean;
}
export function MVPsStats({ loading, mvps }: IProps) {
  // Get mvps statistics

  const { total, leaderboard, playersWithMost, playersWithLeast } = computeMVPs(
    mvps?.data ?? []
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <CountupMetricCard
        icon={<AlertCircle className="h-6 w-6" />}
        value={total}
        isLoading={loading}
        isCountUp
        description="Total MVPs"
        color="gray"
      />

      {leaderboard?.slice(0, 2)?.map((dt, i) => (
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

      <DIALOG
        trigger={"LEADERBOARD"}
        variant={"outline"}
        triggerStyles="h-32"

      >
        <div>
          {leaderboard.map((pl,i) => (
            <CountupMetricCard
              key={i}
              icon={
                <AVATAR
                  src={pl.player?.avatar as string}
                  fallbackText={pl.player.name}
                  className="h-9 w-9"
                />
              }
              value={pl?.total}
              isLoading={loading}
              isCountUp
              description={pl.player.name}
              color="yellow"
            />
          ))}
        </div>
      </DIALOG>
    </div>
  );
}
