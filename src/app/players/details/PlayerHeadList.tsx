import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IPlayer } from "../page";
import { getInitials } from "@/lib";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function PlayerHeadList({ players }: { players: IPlayer[] }) {
  const searchParams =useSearchParams()
  
  if (!players || players.length === 0) {
    return null;
  }
  return (
    <div className="fixed top-40 z-10 flex items-center gap-4 flex-col border rounded-full p-2 bg-secondary/20 backdrop:blur-xs max-h-[75vh] w-fit overflow-y-auto _hideScrollbar">
      {players.map((player) => {
        const isSelected=searchParams.get('playerId')==player?._id
        return (
          <Link
            href={"/players/details?playerId=" + player?._id}
            key={player?._id}
            title={player?.lastName?.[0] + player?.firstName}
            className={isSelected?'ring-2':''}
          >
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
        );
      })}
    </div>
  );
}
