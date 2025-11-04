import { IQueryResponse } from "@/types";
import { getPlayers } from "../admin/players/page";
import { IPlayer } from "./page";
import PlayerFeatureStatsCard from "./PlayerStatsCard";
import { AnimateOnView } from "@/components/Animate/AnimateOnView";

export async function FeaturedPlayers() {
  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  //   Filter only players with featureImage and is of type png
  return (
    <section className="_page flex flex-wrap gap-4 items-start justify-center">
      {players?.data?.map((pl, index) => {
        const name = `${pl?.firstName} ${pl?.lastName}`;
        return (
          <AnimateOnView index={index} key={index}>
            <PlayerFeatureStatsCard
              name={name}
              position={pl.position}
              avatar={pl.avatar}
              playerImage={pl?.featureImage ?? pl.avatar}
              goals={pl.goals?.length}
              matches={pl.matches?.length}
              assists={pl.assists?.length}
              passAccuracy={pl.passAcc?.length}
              trophies={pl.trophies}
            />
          </AnimateOnView>
        );
      })}
    </section>
  );
}
