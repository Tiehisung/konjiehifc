import { getPlayerById, getPlayers } from "@/app/admin/players/page";
import { IPlayer } from "../page";
import PlayerProfile from "./Profile";
import { IGalleryProps, IQueryResponse } from "@/types";
import { PlayerHeadList } from "./PlayerHeadList";
import { apiConfig } from "@/lib/configs";
import { getPlayersStats } from "@/app/admin/page";
import { IPlayerStats } from "@/types/stats";

interface PageProps {
  searchParams: Promise<{ playerId: string }>;
}

export const getGalleries = async (tagNames?: string[], query?: string) => {
  const formatted =
    tagNames && tagNames.length ? `?tags=${tagNames.join(",")}` : "";

  const response = await fetch(apiConfig.galleries + formatted, {
    cache: "no-cache",
  });
  return await response.json();
};

export async function generateMetadata({ searchParams }: PageProps) {
  const player: IPlayer | null = await getPlayerById(
    (
      await searchParams
    ).playerId
  );
  const name = player?.firstName + " " + player?.lastName;

  return {
    title: `${name}`,
    description: `Player profile for ${name}. Stats, appearances, goals, and performance.`,
    openGraph: {
      title: `${name} – Konjiehi FC`,
      description: `Profile, stats, and performance overview for ${name}.`,
      images: [
        ...(player?.avatar ? [player.avatar] : []),
        ...(player?.featureMedia?.map((m) => m.secure_url).filter(Boolean) ?? []),
      ],
    },
  };
}

export default async function PlayerProfilePage({ searchParams }: PageProps) {
  const playerId = (await searchParams).playerId;
  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  const galleries: IQueryResponse<IGalleryProps[]> = await getGalleries(
    [playerId].filter(Boolean)
  );

  const playerStats: IQueryResponse<IPlayerStats> = await getPlayersStats(
    playerId
  );

  const player = players?.data?.find((p) => p._id == playerId);

  return (
    <main className="_page">
      <div
        className="h-screen w-full z-[-1] fixed inset-0 bottom-0 bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${
            player?.featureMedia?.[0]?.secure_url ?? player?.avatar
          })`,
        }}
      />
      <PlayerProfile
        players={players?.data as IPlayer[]}
        galleries={galleries?.data}
        stats={playerStats?.data}
      />
      <PlayerHeadList players={players?.data as IPlayer[]} />
    </main>
  );
}
