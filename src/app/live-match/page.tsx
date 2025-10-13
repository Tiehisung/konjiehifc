import React from "react";
import { getLiveMatch } from "../admin/live-match/page";
import { MatchEvents } from "../admin/live-match/(components)/Events";
import { Title } from "@/components/Elements";
import { LiveMatchCard } from "./Live";

const LiveMatchPage = async () => {
  const match = await getLiveMatch();
  return (
    <div className="pt-4 container">
      <Title>Live Match Page</Title>
      <div className="grid gap-6">
        <LiveMatchCard match={match} />

        <MatchEvents match={match} className="max-h-fit" />
      </div>
    </div>
  );
};

export default LiveMatchPage;
