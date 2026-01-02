import { IPlayer } from "@/types/player.interface";
import { IQueryResponse } from "@/types";
import React from "react";
import { getPlayers } from "../players/page";
import { PrimaryAccordion } from "@/components/Accordion";
import SquadForm from "./SquadForm";
import { getManagers, IManager } from "../managers/page";
import { apiConfig } from "@/lib/configs";
import SquadCard from "./SquadCard";
import { formatDate } from "@/lib/timeAndDate";
import { PrimarySearch } from "@/components/Search";
import { getMatches } from "../matches/page";
import HEADER from "@/components/Element";
import { PrimaryTabs } from "@/components/Tabs";

export interface ISquad {
  _id?: string;
  description?: string;
  title?: string;
  players: { _id?: string; name: string; position: string; avatar?: string }[];
  coach?: { _id?: string; name: string; avatar?: string };
  assistant?: { _id?: string; name: string; avatar?: string };
  match: IMatch;
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
    matchId?: string;
  }>;
}
const SquadPage = async ({ searchParams }: PageProps) => {
  const qs = new URLSearchParams(await searchParams).toString();

  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  const managers: IQueryResponse<IManager[]> = await getManagers();
  const matches: IQueryResponse<IMatch[]> = await getMatches(
    "?status=UPCOMING"
  );

  const targetMatchId = (await searchParams).matchId;
  const targetMatch = matches?.data?.find((m) => m._id == targetMatchId); //In case to choose from matches page

  const squads: IQueryResponse<ISquad[]> | null = await getSquads(qs);
  const accordion = squads?.data?.map((squad) => ({
    trigger: (
      <div className="flex items-center gap-1 justify-between">
        <span>{squad?.title}</span>
        <span className="_label">
          {squad.match?.isHome ? " Home" : " Away"}
        </span>
        {" - "}
        <span>
          {formatDate(squad.match?.date, "March 2, 2025")}, {squad.match?.time}
        </span>
      </div>
    ),
    content: <SquadCard squad={squad} />,
    value: squad._id ?? "",
  }));

  return (
    <div className=" px-4">
      <HEADER title="SQUAD " />
      <main className="_page px-3 mt-6">
        <PrimaryTabs
          tabs={[
            { label: "New Squad", value: "new-squad" },
            { label: "All Squads", value: "all-squads" },
          ]}
          defaultValue="new-squad"
          className=""
        >
          <section>
            <SquadForm
              players={players?.data}
              managers={managers?.data}
              matches={matches?.data}
              defaultMatch={targetMatch}
            />
          </section>

          <section className="mt-12 space-y-6">
            <PrimarySearch
              className="bg-popover"
              inputStyles="h-9"
              placeholder="Search Squad"
              searchKey="squad_search"
            />
            <PrimaryAccordion
              data={accordion ?? []}
              className=""
              triggerStyles="cursor-pointer _card"
            />
          </section>
        </PrimaryTabs>
      </main>
    </div>
  );
};

export default SquadPage;
