import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IPlayer } from "../page";
import { getInitials } from "@/lib";
import Link from "next/link";

export function PlayerHeadList({ players }: { players: IPlayer[] }) {
  if (!players || players.length === 0) {
    return null;
  }
  return (
    <div className="flex items-center gap-4 flex-col border rounded-full p-2 bg-secondary/20 backdrop:blur-xs max-h-[75vh] w-fit overflow-y-auto _hideScrollbar">
      {players.map((player) => (
        <Link href={'/players/details?playerId='+player?._id}>
          <Avatar className="hover:opacity-90 _slowTrans">
            <AvatarImage
              src={player?.avatar?.secure_url}
              alt={player?.lastName}
            />
            <AvatarFallback>
              {getInitials([player?.lastName, player?.firstName])}
            </AvatarFallback>
          </Avatar>
        </Link>
      ))}
    </div>
  );
}
