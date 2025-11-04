"use client";

import { IPlayer } from "@/app/players/page";
import Link from "next/link";
import { PlayerCard } from "./PlayerCard";

export function DisplayAdminPlayers({ players }: { players?: IPlayer[] }) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mx-auto">
        {players?.map((player, i) => (
          <Link href={`/admin/players/${player?._id}`} key={i}>
            <PlayerCard key={i} player={player} />
          </Link>
        ))}
      </div>
    </div>
  );
}
