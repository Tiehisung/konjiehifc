import FilterPlayers from "./FilterPlayers";
import { IPlayer } from "@/types/player.interface";
import { apiConfig } from "@/lib/configs";
import CaptaincyAdm from "./captaincy/Captaincy";
import { getCaptains } from "./captaincy/page";
import { MdAdd } from "react-icons/md";
import { IQueryResponse } from "@/types";
import PlayerProfileForm from "./new/NewSigningForms";
import { ScrollToPointBtn } from "@/components/scroll/ScrollToPoint";
import { PrimaryAccordion } from "@/components/Accordion";
import { PrimarySearch } from "@/components/Search";
import { DisplayAdminPlayers } from "./DisplayPlayers";

export const getPlayers = async (query?: string) => {
  try {
    const formatted = query ? (query?.includes("?") ? query : "?" + query) : "";
    const response = await fetch(apiConfig.players + (formatted || ""), {
      cache: "no-cache",
    });

    if (!response.ok) return null;

    return await response.json();
  } catch {
    return null;
  }
};

export const getPlayerById = async (slugOrId: string) => {
  try {
    const response = await fetch(`${apiConfig.players}/${slugOrId}`, {
      cache: "no-store",
    });

    if (!response.ok) return null;
    const player = await response.json();
    return player;
  } catch {
    return null;
  }
};

interface PlayersProps {
  searchParams: Promise<{
    p_filter?: string;
  }>;
}

export default async function AdminPlayers({ searchParams }: PlayersProps) {
  // const qs = buildQueryString(await searchParams);
  const qs = new URLSearchParams(await searchParams).toString();

  const players: IQueryResponse<IPlayer[]> = await getPlayers(qs);

  console.log(players)

  const captains = await getCaptains(qs);

  return (
    <div className="py-12 px-2.5 md:px-6 space-y-8 _page">
      <header className="mb-6 mx-auto">
        <div className="text-center mb-10 space-y-3.5 ">
          <h1 className="text-3xl font-bold">KFC PLAYERS</h1>
        </div>

        <div className="mt-4 mb-2 flex flex-wrap items-center justify-center gap-6 ">
          <FilterPlayers />

          <PrimarySearch
            className="py-1 max-w-[80vw] grow"
            placeholder={`Search Player`}
            type="search"
            name="search"
            searchKey="player_search"
          />
        </div>
      </header>

      <hr className="border-red-500" />

      <section className=" min-h-screen md:p-6 rounded-2xl">
        <DisplayAdminPlayers players={players} />
      </section>

      <section className="mt-12">
        <CaptaincyAdm
          players={players?.data as IPlayer[]}
          captains={captains}
        />
      </section>
    </div>
  );
}
