import { IPlayer } from "@/app/players/page";
import { IQueryResponse } from "@/types";
import React from "react";
import { getPlayers } from "../players/page";
import { PrimaryAccordion } from "@/components/Accordion";
import NewSquad from "./NewSquad";
import { getManagers, IManager } from "../managers/page";
import { ITeamProps } from "@/app/matches/(fixturesAndResults)";
import { getTeams } from "../features/teams/page";

const SquadPage = async () => {
    
  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  const managers: IQueryResponse<IManager[]> = await getManagers();
  const teams: IQueryResponse<ITeamProps[]> = await getTeams();

  const accordion = players?.data?.map((player) => ({
    trigger: `${player.firstName} ${player.lastName}`,
    content: (
      <div>
        <p>Position: {player.position}</p>
      </div>
    ),
    value: player._id,
  }));

  return (
    <div className="_page">
      <NewSquad players={players?.data} teams={teams?.data} managers={managers?.data}/>

      <PrimaryAccordion data={accordion ?? []} />
    </div>
  );
};

export default SquadPage;
