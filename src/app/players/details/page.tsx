import { getPlayers } from "@/app/admin/players/page";
import { IPlayer } from "../page";
import PlayerProfile from "./Profile";
import { IGalleryProps, IQueryResponse } from "@/types";
import { PlayerHeadList } from "./PlayerHeadList";
import { PlayerGalleryUpload } from "./GalleryUpload";
import { apiConfig } from "@/lib/configs";
import GalleryGrid from "./GallaryGrid";

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

  return (
    <main className="">
      <PlayerProfile
        players={players?.data as IPlayer[]}
        galleries={galleries?.data}
      />
      <PlayerHeadList players={players?.data as IPlayer[]} />

      <PlayerGalleryUpload />
      <GalleryGrid galleries={galleries?.data as IGalleryProps[]} />
    </main>
  );
}
