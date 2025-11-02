import { getPlayers } from "@/app/admin/players/page";
import { IPlayer } from "../page";
import PlayerProfile from "./Profile";
import { IGalleryProps, IQueryResponse } from "@/types";
import { PlayerHeadList } from "./PlayerHeadList";
import { PlayerGalleryUpload } from "./GalleryUpload";
import { apiConfig } from "@/lib/configs";

interface PageProps {
  searchParams: Promise<{ playerId: string }>;
}

export const getGalleries = async (tagNames?: string[]) => {
  const formatted =
    tagNames && tagNames.length ? `?tags=${tagNames.join(",")}` : "";

  const response = await fetch(apiConfig.galleries + formatted, {
    cache: "no-cache",
  });
  return await response.json();
};

export default async function PlayerProfilePage({ searchParams }: PageProps) {
  const playerId = (await searchParams).playerId;
  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  const galleries: IQueryResponse<IGalleryProps[]> = await getGalleries(
    [playerId].filter(Boolean)
  );

  const player = players?.data?.find((p) => p._id == playerId);

  return (
    <main className="_page">
      <div
        className="h-screen w-full rounded-t-md z-[-1] fixed inset-0 bottom-0 bg-no-repeat bg-cover "
        style={{ backgroundImage: `url(${player?.avatar})` }}
      />
      <PlayerProfile
        players={players?.data as IPlayer[]}
        galleries={galleries?.data}
      />
      <PlayerHeadList players={players?.data as IPlayer[]} />
    </main>
  );
}
