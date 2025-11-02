import React from "react";
import Image from "next/image";
import PrimLink from "@/components/Link";
import { IPlayer } from "../players/page";
import SimpleCarousel from "@/components/carousel/SimpleCarousel";
import { getPlayers } from "../admin/players/page";
import DiveUpwards from "@/components/Animate";
import { IQueryResponse } from "@/types";
import { ResponsiveSwiper } from "@/components/carousel/ResponsiveSwiper";

const LandingPlayers = async () => {
  const players: IQueryResponse<IPlayer[]> = await getPlayers();

  return (
    <div className="_page">
      <h1 className="_title">Players</h1>
      <ResponsiveSwiper
        noSpacing
        slides={(players?.data?.map((player, index: number) => (
          <DiveUpwards key={index} layoutId={`${index}`}>
            <Image
              src={player?.avatar}
              width={800}
              height={800}
              alt="player"
              className="rounded-xl w-auto min-w-60 h-72 grow object-cover"
            />
            <div className="flex items-center justify-center gap-2">
              <p className="text-3xl font-semibold">{player?.number}</p>
              <p className="_p">
                {`${player?.firstName} ${player?.lastName?.substring(0, 1)}.`}
              </p>
            </div>
          </DiveUpwards>
        ))) ?? []}
      />

      <PrimLink href={"/players"} text="See more" className="ml-auto" />
    </div>
  );
};

export default LandingPlayers;
