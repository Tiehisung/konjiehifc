import HEADER from "@/components/Element";
import React from "react";
import GalleryClient from "./Client";
import { getPlayers } from "../admin/players/page";
import { IQueryResponse } from "@/types";
import { IPlayer } from "../players/page";

const GalleryPage = async () => {
  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  const images =
    players.data?.map((player) => ({
      src: player.avatar,
      width: 600,
      description: player.lastName,
      title: player.firstName,
    })) || [];
  return (
    <div>
      <HEADER title="Gallery" subtitle="Gallery " isPage={false} />
      <GalleryClient images={images ?? []} />
    </div>
  );
};

export default GalleryPage;
