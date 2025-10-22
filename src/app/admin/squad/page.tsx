import { IPlayer } from "@/app/players/page";
import { IQueryResponse } from "@/types";
import React from "react";
import { getPlayers } from "../players/page";
import { PrimaryAccordion } from "@/components/Accordion";
import NewSquad from "./NewSquad";
import { getManagers, IManager } from "../managers/page";
import { ITeamProps } from "@/app/matches/(fixturesAndResults)";
import { apiConfig } from "@/lib/configs";
import { getTeams } from "../features/teams/page";
import SquadCard from "./SquadCard";
import { getFormattedDate } from "@/lib/timeAndDate";

export interface ISquad {
  _id?: string;
  opponent: ITeamProps;
  venue: "Home" | "Away";
  description?: string;
  players: { _id?: string; name: string; position: string; avatar?: string }[];
  coach?: { _id?: string; name: string; avatar?: string };
  assistant?: { _id?: string; name: string; avatar?: string };
  date: string;
  time: string;
  createdAt?: string;
  updatedAt?: string;
}

export const getSquads = async (squadId?: string) => {
  try {
    const uri = squadId
      ? `${apiConfig.squad}?squadId=${squadId}`
      : apiConfig.squad;
    const response = await fetch(uri, {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch {
    return [];
  }
};
const SquadPage = async () => {
  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  const managers: IQueryResponse<IManager[]> = await getManagers();
  const teams: IQueryResponse<ITeamProps[]> = await getTeams();
  const squads: IQueryResponse<ISquad[]> = await getSquads();

  console.log({ squads });

  const accordion = squads?.data?.map((squad) => ({
    trigger: `${squad.opponent?.name} ${squad.venue} - ${getFormattedDate(
      squad.date,
      "March 2, 2025"
    )} ${squad.time}`,
    content: <SquadCard squad={squad} />,
    value: squad._id ?? "",
  }));

  return (
    <div className="_page">
      <NewSquad
        players={players?.data}
        teams={teams?.data}
        managers={managers?.data}
      />

      <PrimaryAccordion
        data={accordion ?? []}
        className="mt-12"
        triggerStyles="cursor-pointer" 
      />
    </div>
  );
};

export default SquadPage;
