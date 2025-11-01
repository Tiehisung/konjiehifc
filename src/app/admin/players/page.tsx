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
      <header className="mb-6 max-w-6xl  mx-auto">
        <div className="text-center mb-10 ">
          <h1 className="text-3xl font-bold">KFC PLAYERS</h1>
          <p className="text-lg">Player Stats Card</p>
        </div>

        <div className="mt-4 mb-2 flex items-center justify-center gap-6 ">
          <FilterPlayers />

          <ScrollToPointBtn
            label=" NEW SIGNING"
            sectionId="new-signing"
            className="flex items-center gap-2 _primaryBtn px-3 py-2 grow justify-center font-semibold "
          >
            <MdAdd size={20} />
          </ScrollToPointBtn>
        </div>
      </header>
      <hr className="border-red-500" />
      <section className=" min-h-screen bg-linear-to-br from-blue-400 via-purple-400 to-green-400 p-6 rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
