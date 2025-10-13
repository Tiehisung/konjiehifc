import { IPlayer } from "@/app/players/page";
import { IPlayerStatsProps } from "@/app/statistics/Statistics";
import { IFileProps } from "@/types";

export type TMatchType = "home" | "away";
export type MatchStatus =
  | "FT" // Full Time
  | "HT" // Half Time
  | "LIVE" // Live Match
  | "SCHEDULED" //  The match is scheduled to take place in the future.
  | "POSTPONED" //  The match has been postponed to a later date.
  | "CANCELED"; //  The match has been canceled.

export interface IMatchProps {
  challenge?: { reason: "Weather issues" | string; details?: string };
  _id: string;
  title: string;
  date: string;
  time: string;
  opponent: ITeamProps;
  broadcaster?: IFileProps;
  status: MatchStatus;
  score: { kfc: number; opponent: number };
  isHome: boolean;
  venue?: { name: string; files: IFileProps[] };
  goals: Array<IGoal>;
  events: Array<{ description: string; time: string }>;
}

export interface ITeamProps {
  _id: string;
  name: string;
  community: string;
  alias: string;
  logo: IFileProps;
  currentPlayers: IPlayerStatsProps[];
  createdAt: string;
  updatedAt: string;
}

export interface IGoal {
  _id: string;
  team: string;
  time: string;
  timestamp: number;
  player: IPlayer | string;
  type:
  | "Open Play Goal"
  | "Set Piece Goal"
  | "Penalty Goal"
  | "Own Goal"
  | "Counter-Attack Goal"
  | "Header Goal"
  | "Volley Goal"
  | "Tap-In Goal"
  | "Long-Range Goal";
}

export interface IPostGoal {
  team: string;
  time: string;
  timestamp: number;
  player?: string;
  type: IGoal["type"];
}
