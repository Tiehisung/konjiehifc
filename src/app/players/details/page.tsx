import { getPlayers } from "@/app/admin/players/page";
import { IPlayer } from "../page";
import PlayerProfile from "./Profile";
import { IQueryResponse } from "@/types";
import { PlayerProfile2 } from "./Profile2";
import { PlayerHeadList } from "./PlayerHeadList";

interface PageProps {
  params: Promise<{ playerId: string }>;
}

export default async function PlayerProfilePage({}: PageProps) {
  const players: IQueryResponse<IPlayer[]> = await getPlayers();

  return (
    <main className="relative">
      <PlayerProfile players={players?.data as IPlayer[]} />

      <PlayerProfile2 />
      <PlayerHeadList players={players?.data as IPlayer[]} />
    </main>
  );
}
