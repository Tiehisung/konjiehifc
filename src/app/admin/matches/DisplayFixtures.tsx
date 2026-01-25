"use client";

import { Button } from "@/components/buttons/Button";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { isToday } from "@/lib/timeAndDate";
import { IMatchProps } from "@/app/matches/(fixturesAndResults)";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/pagination/Pagination";
import { IQueryResponse } from "@/types";
import { AdminMatchCard } from "./MatchCard";
import { IPlayer } from "@/types/player.interface";
import { IManager } from "../managers/page";
import { IMatch, ITeam } from "@/types/match.interface";

interface DisplayFixturesProps {
  fixtures: IQueryResponse<IMatch[]>;
  teams?: ITeam[];
  players?: IPlayer[];
  managers?: IManager[];
}
// Fixture is  match that is not yet played successfully

export function DisplayFixtures({
  fixtures,
  teams,
  managers,
  players,
}: DisplayFixturesProps) {
  return (
    <div>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {fixtures?.data?.map((fx) => (
          <AdminMatchCard
            key={fx?._id}
            match={fx}
            teams={teams}
            managers={managers}
            matches={fixtures?.data}
            players={players}
          />
        ))}
      </div>

      <div className="p-2 flex items-center text-sm gap-3 text-muted-foreground py-4">
        <div>
          Home fixtures: {fixtures?.data?.filter((f) => f.isHome)?.length}
        </div>
        <div>
          Away fixtures: {fixtures?.data?.filter((f) => !f.isHome)?.length}
        </div>
        <div>Total fixtures: {fixtures?.data?.length}</div>
      </div>
      <Pagination pagination={fixtures?.pagination} />
    </div>
  );
}

export function ToggleMatchStatus({
  fixtureId,
  status,
  matchDate,
}: {
  fixtureId: string;
  status: IMatchProps["status"];
  matchDate: string;
}) {
  const router = useRouter();

  const [waiting, setWaiting] = useState(false);

  const handleToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setWaiting(true);
    const response = await fetch(`${apiConfig.matches}/live`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: fixtureId,
        status: status == "LIVE" ? "FT" : "LIVE",
      }),
      cache: "no-cache",
    });
    const results = await response.json();
    if (results.success) toast.success(results.message);
    setWaiting(false);

    router.refresh();
  };

  if (status == "FT")
    return (
      <Badge className="w-20 py-2 font-black" variant={"outline"}>
        FT
      </Badge>
    );

  if (isToday(matchDate))
    return (
      <Button
        waiting={waiting}
        disabled={waiting}
        primaryText={status == "LIVE" ? "Mark FT" : "Go Live"}
        waitingText="Updating..."
        onClick={handleToggle}
        className=" px-2 "
        variant='delete'
      />
    );
  return null;
}
