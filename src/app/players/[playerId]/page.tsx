import { getPlayers } from "@/app/admin/players/page";
import { IPlayer } from "../page";
import PlayerProfile from "./Profile";
 
interface PageProps {
  params: Promise<{ playerId: string }>;
}

export default async function PlayerProfilePage({ params }: PageProps) {
  const playerId = (await params)?.playerId;
  

  const player: IPlayer = await getPlayers(playerId);

  return (
    <main className="">
      <PlayerProfile player={player} />
    </main>
  );
}
