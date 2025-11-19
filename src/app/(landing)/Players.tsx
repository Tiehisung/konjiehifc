import React from "react";
import Image from "next/image";
import PrimLink from "@/components/Link";
import { IPlayer } from "../players/page";
import { getPlayers } from "../admin/players/page";
import {  IQueryResponse } from "@/types";
import { ResponsiveSwiper } from "@/components/carousel/ResponsiveSwiper";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { generatePlayerAbout } from "@/data/about";
// import { HomePlayersGallery } from "./PlayersGallery";
import { getGalleries } from "../players/details/page";
import { TbPlayFootball } from "react-icons/tb";
import { TITLE } from "@/components/Element";

const LandingPlayers = async () => {
  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  // const galleries: IQueryResponse<IGalleryProps[]> = await getGalleries();
  return (
    <div className="_page px-4">
      <TITLE text={`Players`} icon={<TbPlayFootball />} />
      <br />
      <ResponsiveSwiper
        swiperStyles={{ width: "100%", height: "fit-content" }}
        slideStyles={{ borderRadius: "0" }}
        // noSpacing
        slides={
          players?.data?.map((player, index: number) => (
            <div key={index}>
              <Image
                src={player?.avatar}
                width={800}
                height={800}
                alt="player"
                className=" min-w-full grow object-cover border aspect-video"
              />
              <div className="bg-secondary text-secondary-foreground space-y-2 p-4 pb-8">
                <Badge
                  className="capitalize min-h-6 min-w-10"
                  variant={"secondary"}
                >
                  {player?.position}
                </Badge>
                <div
                  className="_p line-clamp-4 mb-5 font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: generatePlayerAbout(player),
                  }}
                />

                <br />
                <Link href={`/players/details?playerId=${player?._id}`}>
                  <span className="bg-Red p-2 px-4 ">DISCOVER</span>
                </Link>
              </div>
            </div>
          )) ?? []
        }
      />

      <PrimLink href={"/players"} text="See more" className="ml-auto" />

      {/* <HomePlayersGallery galleries={galleries} /> */}
    </div>
  );
};

export default LandingPlayers;
