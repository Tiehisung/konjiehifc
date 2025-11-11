import { IFileProps, IQueryResponse } from "@/types";
import React from "react";
import { IManager } from "../admin/managers/page";
import {
  IGoal,
  IMatchCard,
  IMatchProps,
} from "../matches/(fixturesAndResults)";
import { getPlayers } from "../admin/players/page";
import Link from "next/link";
import PlayerFeatureStatsCard from "./PlayerStatsCard";
import { AnimateOnView } from "@/components/Animate/AnimateOnView";
import { ICldFileUploadResult } from "@/components/cloudinary/FileUploadWidget";

export type TPlayerGallery = {
  _id: string;
  date: string;
  timestamp: number;
  description: string;
  files: Array<IFileProps>;
};

export type TPlayerPosition =
  | "goal keeper"
  | "defender"
  | "midfielder"
  | "forward"
  | "striker"
  | "wing back"
  | "center back"
  | "attacking midfielder"
  | "defensive midfielder"
  | "winger"
  | "wing back"
  | "sweeper";

export interface IPlayerMini {
  _id: string;
  name: string;
  avatar?: string;
  number: string;
}

export interface IPlayer {
  _id: string;
  number: string;
  about?: string;
  description?: string;
  medicals: { fitness: string }[];
  galleries: TPlayerGallery[];
  isFit: boolean;
  isActive: boolean;
  issues: string[];
  injuries: string[];
  captaincy: string;
  firstName: string;
  lastName: string;
  dateSigned: string;
  phone: string;
  email: string;
  dob: string;
  height: number;
  avatar: string;
  featureMedia?: ICldFileUploadResult[];
  manager: IManager;
  position: TPlayerPosition;
  favColor?:
    | "red"
    | "teal"
    | "yellow"
    | "green"
    | "blue"
    | "black"
    | "gray"
    | "white"
    | "gold";
  //Stats
  goals: IGoal[];
  matches: IMatchProps[];
  ratings: { rating: number; match: string }[];
  assists: IGoal[];
  mvp: { _id: string; match: IMatchProps }[];
  passAcc: string;
  trophies: number;
  cards: IMatchCard[];
  training: { team?: "A" | "B" };
}

export interface IPostPlayer {
  number: number | string;
  about?: string;
  description?: string;
  training: { team: string };
  medicals: { fitness: string }[];
  galleries: string[];
  isFit: boolean;
  captaincy: string;
  firstName: string;
  lastName: string;
  dateSigned: string;
  phone: string;
  email: string;
  dob: string;
  height: string;
  avatar: IFileProps;
  jersey: string | number;
  manager: string;
  position: TPlayerPosition;
  favColor?:
    | "red"
    | "teal"
    | "yellow"
    | "green"
    | "blue"
    | "black"
    | "gray"
    | "white"
    | "gold";
  goals: string[];
  matches: string[];
  assists: string[];
  mvp: string[];
  passAcc: string;
  trophies: number;
  cards: string[];
}

const PlayersPage = async () => {
  const players: IQueryResponse<IPlayer[]> = await getPlayers();

  return (
    <div className="">
      <h1 className="_heading mt-3 text-center">Players</h1>

      <div className="bg-popover">
        <div className="mx-auto max-w-2xl lg:max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h2 className="sr-only">Players</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
            {players?.data?.map((player, index) => (
              <Link
                key={player?._id}
                href={`/players/details?playerId=${player?._id}`}
              >
                <AnimateOnView index={index} delay={0.5} x={-20}>
                  <PlayerFeatureStatsCard
                    name={`${player?.firstName} ${player?.lastName}`}
                    position={player.position}
                    avatar={player.avatar}
                    playerImage={player.avatar}
                    goals={player.goals?.length}
                    matches={player.matches?.length}
                    assists={player.assists?.length}
                    passAccuracy={player.passAcc?.length}
                    trophies={player.trophies}
                    className="grow ring w-full"
                  />
                </AnimateOnView>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* <FeaturedPlayers /> */}
    </div>
  );
};

export default PlayersPage;

