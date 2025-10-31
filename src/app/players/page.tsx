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
import Image from "next/image";

export type TPlayerGallery = {
  _id: string;
  date: string;
  timestamp: number;
  description: string;
  files: Array<IFileProps>;
};

export type TPlayerPosition =
  | "goalkeeper"
  | "defender"
  | "midfielder"
  | "forward"
  | "striker"
  | "wingBack"
  | "centerBack"
  | "attackingMidfielder"
  | "defensiveMidfielder"
  | "winger"
  | "sweeper";

// export interface IPlayerStats {
//   goals: IGoal[] | string[];
//   matches: IMatchProps[] | string[];
//   assists: IGoal[] | string[];
//   passAcc: string;
//   trophies: number;
//   cards: IMatchCard[] | string[];
// }
export interface IPlayer {
  _id: string;
  number: number | string;
  about?: string;
  description?: string;
  training: { team: string };
  medicals: { fitness: string }[];
  galleries: TPlayerGallery[];
  isFit: boolean;
  issues:string[]
  captaincy: string;
  firstName: string;
  lastName: string;
  dateSigned: string;
  phone: string;
  email: string;
  dob: string;
  height: number;
  avatar: string;
  jersey: string | number;
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

  console.log({players})
 
  return (
    <div className="">
      <h1 className="_heading mt-3 text-center">Players</h1>

      <div className="bg-popover">
        <div className="mx-auto max-w-2xl lg:max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h2 className="sr-only">Players</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {players?.data?.map((player) => (
              <Link
                key={player?._id}
                href={`/players/details?playerId=${player?._id}`}
                className="group after:h-1 after:w-full after:bg-primary after:mt-2 after:block"
              >
                <Image
                  alt={player?.lastName}
                  src={player?.avatar}
                  width={400}
                  height={400}
                  className="aspect-square w-full rounded-lg bg-secondary object-cover group-hover:opacity-85 xl:aspect-7/8"
                />
                <h3 className="mt-4 text-sm text-muted-foreground">
                  {`${player?.firstName} ${player?.lastName}`}
                </h3>
                <p className="mt-1 text-lg font-medium text-muted-foreground">
                  {player?.jersey}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayersPage;
