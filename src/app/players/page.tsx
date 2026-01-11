import { IQueryResponse } from "@/types";
import { getPlayers } from "../admin/players/page";
import Link from "next/link";
import PlayerFeatureStatsCard from "./PlayerStatsCard";
import { AnimateOnView } from "@/components/Animate/AnimateOnView";
import { kfc } from "@/data/kfc";
import HEADER from "@/components/Element";
import { MotionWrapper } from "@/components/Animate/MotionWrapper";
import { IPlayer } from "@/types/player.interface";
import OurPlayers from "./Display";

export const metadata = {
  title: "Konjiehi FC Players",
  description:
    "Meet the Konjiehi FC squad, including stats, bios, and profiles.",
  keywords: ["Konjiehi FC players", "squad", "football team", "player stats"],
  openGraph: {
    title: "Konjiehi FC Squad",
    description: "View all Konjiehi FC players and their profiles.",
    images: [kfc.logo],
  },
};

const PlayersPage = async () => {
  const players: IQueryResponse<IPlayer[]> = await getPlayers();

  return (
    <div className="">
      <HEADER title="Players" subtitle="Meet Our Gallant Players " />
      <OurPlayers players={players} />
      {/* <div className="bg-popover px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-7xl py-16 sm:py-24">
          <h2 className="sr-only">Players</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
            {players?.data?.map((player, index) => (
              <Link
                key={player?._id}
                href={`/players/details?playerId=${player?._id}`}
              >
                <MotionWrapper>
                  <AnimateOnView
                    index={index}
                    x={index % 2 == 0 ? -10 : 10}
                    once={false}
                  >
                    <PlayerFeatureStatsCard
                      name={`${player?.firstName} ${player?.lastName}`}
                      position={player.position}
                      avatar={player.avatar}
                      playerImage={player.avatar}
                      goals={player.goals?.length}
                      matches={player.matches?.length}
                      assists={player.assists?.length}
                      passAccuracy={player.passAcc?.length}
                      trophies={player.trophies}
                      className="grow w-full"
                    />
                  </AnimateOnView>
                </MotionWrapper>
              </Link>
            ))}
          </div>
        </div>
      </div> */}

      {/* <FeaturedPlayers /> */}
    </div>
  );
};

export default PlayersPage;
