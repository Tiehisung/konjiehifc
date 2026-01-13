"use client";

import { CountupMetricCard } from "@/components/MetricsCards";
import { AVATAR } from "@/components/ui/avatar";
import { IQueryResponse } from "@/types";
import { IMvp } from "@/types/mvp.interface";
import { AlertCircle } from "lucide-react";
import { computeMVPs } from ".";
import { Button } from "@/components/buttons/Button";
import { DIALOG } from "@/components/Dialog";
import { StackModal } from "@/components/modals/StackModal";
import { useState } from "react";
import MvpCard from "./MvpCard";
import { toggleClick } from "@/lib/DOM";

interface IProps {
  mvps?: IQueryResponse<IMvp[]> | null;
  loading?: boolean;
}
export function MVPsStats({ loading, mvps }: IProps) {
  // Get mvps statistics

  const { total, leaderboard, playersWithMost, playersWithLeast } = computeMVPs(
    mvps?.data ?? []
  );

  const [targetPlayer, setTargetPlayer] = useState<{
    player: IMvp["player"];
    total: number;
    mvps: IMvp[];
  } | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 items-center justify-center">
      <CountupMetricCard
        icon={<AlertCircle className="h-9 w-9" />}
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

      <StackModal
        trigger={"LEADERBOARD"}
        variant={"outline"}
        triggerStyles="h-32"
        header="MoTM Rankings"
        className="min-w-[80vw]"
        id={"leaderboard"}
      >
        <div className="flex items-center ">
          {leaderboard.map((pl, i) => (
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
              color={i < 3 ? "green" : "yellow"}
              onClick={() => {
                toggleClick("mvps-details-modal");
              }}
            />
          ))}
        </div>

        <DIALOG
          variant={"secondary"}
          trigger={undefined}
          id="mvps-details-modal"
          title={
            <div className="flex items-center gap-6">
              <AVATAR
                alt="mvp player"
                src={targetPlayer?.player?.avatar as string}
                fallbackText="IP"
              />
              <p className="text-xl font-semibold">
                {targetPlayer?.player?.name}
              </p>
            </div>
          }
        >
          <div className="flex items-center gap-6">
            {targetPlayer?.mvps?.map((tm, i) => (
              <MvpCard mvp={tm} key={i} />
            ))}
          </div>
        </DIALOG>
      </StackModal>
    </div>
  );
}
