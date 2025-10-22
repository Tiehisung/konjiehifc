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
import { PrimarySearch } from "@/components/Search";
import Image from "next/image";

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

export const getSquadById = async (squadId: string) => {
  try {
    const uri = `${apiConfig.squad}/${squadId}`;

    const response = await fetch(uri, {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch {
    return null;
  }
};

export const getSquads = async (query?: string) => {
  const formatted = query ? (query?.includes("?") ? query : "?" + query) : "";
  try {
    const response = await fetch(apiConfig.squad + formatted, {
      cache: "no-cache",
    });
    const results: IQueryResponse<ISquad[]> = await response.json();
    return results;
  } catch {
    return null;
  }
};
interface PageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}
const SquadPage = async ({ searchParams }: PageProps) => {
  const qs = new URLSearchParams(await searchParams).toString();

  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  const managers: IQueryResponse<IManager[]> = await getManagers();
  const teams: IQueryResponse<ITeamProps[]> = await getTeams();

  const squads: IQueryResponse<ISquad[]> | null = await getSquads(qs);

  const accordion = squads?.data?.map((squad) => ({
    trigger: (
      <div className="flex items-center gap-1 justify-between">
        <span>{squad.opponent?.name}</span> <span>{squad.venue}</span> -{" "}
        <span>
          {getFormattedDate(squad.date, "March 2, 2025")}, {squad.time}
        </span>
      </div>
    ),
    content: <SquadCard squad={squad} />,
    value: squad._id ?? "",
  }));

  return (
    <div className="_page px-4">
      <NewSquad
        players={players?.data}
        teams={teams?.data}
        managers={managers?.data}
      />

      <div className="mt-12 space-y-6">
        <PrimarySearch
          className="bg-popover"
          inputStyles="h-9"
          placeholder="Search Squad"
        />
        <PrimaryAccordion
          data={accordion ?? []}
          className=""
          triggerStyles="cursor-pointer _card"
        />
      </div>
    </div>
  );
};

export default SquadPage;
