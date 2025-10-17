import { getPlayers } from "@/app/admin/players/page";
import { IPlayer } from "../page";
import PlayerProfile from "./Profile";

interface PageProps {
  params: Promise<{ playerId: string }>;
}

export default async function PlayerProfilePage({}: PageProps) {
  const players: IPlayer[] = await getPlayers();

  return (
    <main className="">
      <PlayerProfile players={players} />
    </main>
  );
}
