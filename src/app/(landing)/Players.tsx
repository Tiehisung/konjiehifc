import React from "react";
// import { getPlayers } from "../admin/players/page";
import Image from "next/image";
import PrimLink from "@/components/Link";
import DiveUpwards from "@/components/Animate/DiveUp";
import { IPlayer } from "../players/page";
import Loader from "@/components/Loader";
import SimpleCarousel from "@/components/carousel/SimpleCarousel";

const LandingPlayers = ({ players }: { players: IPlayer[] }) => {
  if (!players) return <Loader message="Loading players..." />;
  return (
    <div>
      <h1 className="_title">Players</h1>
      <SimpleCarousel className="" scrollButtonStyles="top-1/3">
        {players?.map((player, index: number) => (
          <DiveUpwards key={index}>
            <Image
              src={player?.avatar?.secure_url}
              width={800}
              height={800}
              alt="player"
              className="rounded-xl w-auto min-w-60 h-72 grow object-cover"
            />
            <div className="flex items-center justify-center gap-2">
              <p className="text-3xl font-semibold">{player?.jersey}</p>
              <p className="_p">
                {`${player?.firstName} ${player?.lastName?.substring(0, 1)}.`}
              </p>
            </div>
          </DiveUpwards>
        ))}
      </SimpleCarousel>

      <PrimLink href={"/players"} text="See more" className="ml-auto" />
    </div>
  );
};

export default LandingPlayers;
