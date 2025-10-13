import { IFileProps } from "@/types";
import React from "react";
import { IManager } from "../admin/managers/page";
import { IGoal, IMatchProps } from "../matches/(fixturesAndResults)";

const PlayersPage = () => {
  return <div className="">PlayersPage</div>;
};

export default PlayersPage;

export type TPlayerGallery = {
  _id: string;
  date: string;
  timestamp: number;
  description: string;
  files: Array<IFileProps>;
};

export interface IPlayerStats {
  goals: IGoal[] | string[];
  matches: (IMatchProps | string)[];
  assists: (IGoal | string)[];
  passAcc: string;
  trophies: number;
}
export interface IPlayer {
  training: { team: string };
  medicals: { fitness: string }[];
  galleries: TPlayerGallery[];
  card: "yellow" | "red";
  isFit: boolean;
  captaincy: string;
  firstName: string;
  lastName: string;
  dateSigned: string;
  phone: string;
  email: string;
  dob: string;
  height: string;
  _id: string;
  avatar: IFileProps;
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
  stats?: IPlayerStats;
}

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
