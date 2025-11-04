import React from "react";

import { Title } from "@/components/Elements";
import { IMatchProps } from "../matches/(fixturesAndResults)";
import { getLiveMatch } from "../admin/live-match/page";
import { IQueryResponse } from "@/types";
import { LiveMatchEvents } from "./LiveEventsDisplay";

export default async function LiveMatchPage() {
  const match: IQueryResponse<IMatchProps> = await getLiveMatch();

  return (
    <div className="pt-4 container">
      <Title>Live Match Page</Title>
      <div className="grid gap-6">
        {match?.data?.status == "LIVE" && (
          <LiveMatchEvents match={match?.data} />
        )}
      </div>
    </div>
  );
}
