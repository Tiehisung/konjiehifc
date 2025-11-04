import { ISquad } from "@/app/admin/squad/page";
import { IPlayerMini } from "@/app/players/page";
import { IPlayerStatsProps } from "@/app/statistics/Statistics";
import { IFileProps } from "@/types";

export type TMatchType = "home" | "away";
export type MatchStatus =
  | "LIVE" // Live Match
  | "UPCOMING" //  The match is scheduled to take place in the future.
  | "COMPLETED" //  The match has been completed.

export interface IMatchProps {
  _id: string;
  comment?: string;
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
  opponentGoals: number
  events: Array<IMatchEvent>;
  cards: Array<IMatchCard>;
  squad?: ISquad
}

export interface IMatchCard {
  type: 'red' | 'yellow';
  minute: string | number
  match: { name: string, _id: string }
  player: IPlayerMini
  description?: string
}
export interface IMatchEvent {
  title: string,
  description?: string;
  minute: string | number,
  type: 'goal' | 'card' | 'injury' | 'general'

}


export interface ITeamProps {
  _id: string;
  name: string;
  community: string;
  alias: string;
  logo: string;
  currentPlayers: IPlayerStatsProps[];
  createdAt: string;
  updatedAt: string;
}

export interface IGoal {
  _id?: string;
  opponent: string; //ObjectId of team
  minute: string | number;
  scorer: IPlayerMini;
  assist?: IPlayerMini;
  modeOfScore?:
  | "Open Play Goal"
  | "Set Piece Goal"
  | "Penalty Goal"
  | "Own Goal"
  | "Counter-Attack Goal"
  | "Header Goal"
  | "Volley Goal"
  | "Tap-In Goal"
  | "Long-Range Goal"
  description?: string
  match: string
}


