import Link from "next/link";
import FilterPlayers from "./FilterPlayers";
import { IPlayer } from "@/app/players/page";
import { apiConfig } from "@/lib/configs";
import CaptaincyAdm from "./captaincy/Captaincy";
import { getCaptains } from "./captaincy/page";
import { MdAdd } from "react-icons/md";
import { PlayerCard } from "./PlayerCard";
import { IQueryResponse } from "@/types";
import PlayerProfileForm from "./NewSigningForms";
import BackToTopButton from "@/components/scroll/ToTop";
import { ScrollToPointBtn } from "@/components/scroll/ScrollToPoint";
import { PrimaryAccordion } from "@/components/Accordion";
import { PrimarySearch } from "@/components/Search";

export const getPlayers = async (playerId?: string) => {
  try {
    if (playerId) {
      const response = await fetch(`${apiConfig.players}/${playerId}`, {
        cache: "no-store",
      });

      if (!response.ok) return null;
      const player = await response.json();
      return player;
    } else {
      //Return all players
      const response = await fetch(apiConfig.players, {
        cache: "no-cache",
      });

      if (!response.ok) return null;
      const players = await response.json();

      return players;
    }
  } catch (error) {
    console.log({ error });
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

  const players: IQueryResponse<IPlayer[]> = await getPlayers();

  const captains = await getCaptains(qs);

  return (
    <div className="py-12 px-6 space-y-8">
      <header className="mb-6 mx-auto">
        <div className="text-center mb-10 ">
          <h1 className="text-3xl font-bold">KFC PLAYERS</h1>
          <ScrollToPointBtn
            label=" NEW SIGNING"
            sectionId="new-signing"
            className="flex items-center gap-2 _primaryBtn px-3 py-2 grow justify-center font-semibold "
          >
            <MdAdd size={20} />
          </ScrollToPointBtn>
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

      <section className=" min-h-screen bg-linear-to-br from-blue-400 via-purple-400 to-green-400 md:p-6 rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mx-auto">
          {players?.data?.map((player, i) => (
            <Link href={`/admin/players/${player?._id}`} key={i}>
              <PlayerCard key={i} player={player} />
            </Link>
          ))}
        </div>
      </section>

      <section id="new-signing">
        <PrimaryAccordion
          data={[
            {
              content: <PlayerProfileForm />,
              trigger: (
                <span className=" grow justify-center no-underline">
                  Toggle Signup Form
                </span>
              ),
              value: "add-new",
              isDefault: true,
            },
          ]}
        />
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
