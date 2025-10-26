import { getPlayers } from "@/app/admin/players/page";
import { IPlayer } from "../page";
import PlayerProfile from "./Profile";
import { IQueryResponse } from "@/types";
import { PlayerHeadList } from "./PlayerHeadList";
import { PlayerGalleryUpload } from "./GalleryUpload";

interface PageProps {
  params: Promise<{ playerId: string }>;
}

export default async function PlayerProfilePage({}: PageProps) {
  const players: IQueryResponse<IPlayer[]> = await getPlayers();

  return (
    <main className="">
      <PlayerProfile players={players?.data as IPlayer[]} />

      <PlayerGalleryUpload  />
      <PlayerHeadList players={players?.data as IPlayer[]} />
    </main>
  );
}
