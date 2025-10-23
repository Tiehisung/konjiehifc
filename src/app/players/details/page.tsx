import { getPlayers } from "@/app/admin/players/page";
import { IPlayer } from "../page";
import PlayerProfile from "./Profile";
import { IQueryResponse } from "@/types";
import { PlayerProfile2 } from "./Profile2";

interface PageProps {
  params: Promise<{ playerId: string }>;
}

export default async function PlayerProfilePage({}: PageProps) {
  const players: IQueryResponse<IPlayer[]> = await getPlayers();

  return (
    <main className="">
      <PlayerProfile players={players?.data as IPlayer[]} />

      <PlayerProfile2/>
    </main>
  );
}
