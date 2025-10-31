"use client";

import { IPlayer } from "@/app/players/page";
import Image from "next/image";

export function PlayerCard({ player }: { player: IPlayer }) {
  const className = `from-${player?.favColor}-500 to-${player?.favColor}-700`;
  return (
    <div
      className={`relative rounded-2xl overflow-hidden bg-linear-to-b ${className} from-red-500 to-red-700 shadow-lg p-6 flex flex-col justify-between`}
    >
      <div className="z-10">
        <h2 className="text-xl font-bold backdrop-blur-xs w-fit p-0">{`${player?.lastName} ${player?.firstName}`}</h2>
        <p className="text-sm text-gray-300">{player?.position}</p>
        <h3 className="text-3xl font-extrabold mt-4">
          {player?.goals?.length} Goals
        </h3>
      </div>

      <div className="absolute right-0 bottom-0 top-0 opacity-90">
        <Image
          width={500}
          height={500}
          src={player?.avatar}
          alt={player?.avatar}
          className="w-40 object-cover  min-h-full"
        />
      </div>

      <div className="mt-16 grid grid-cols-2 gap-y-1 text-sm text-gray-200 z-10">
        <p>
          Matches:{" "}
          <span className="font-semibold text-white">
            {player?.matches?.length ?? 0}
          </span>
        </p>
        <p>
          Assists:{" "}
          <span className="font-semibold text-white">
            {player?.assists?.length ?? 0}
          </span>
        </p>
        <p>
          Pass Acc.:{" "}
          <span className="font-semibold text-white">
            {player?.passAcc ?? "34%"}
          </span>
        </p>
        <p>
          Trophies:{" "}
          <span className="font-semibold text-white">
            {player?.trophies ?? 0}
          </span>
        </p>
      </div>
    </div>
  );
}
