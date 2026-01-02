import { ISquad } from "@/app/admin/squad/page";
import { IFileProps } from "@/types/file.interface";
import { IPlayerMini } from "./player.interface";
import { IPlayerStatsProps } from "@/app/statistics/Statistics";

export enum EMatchStatus {
  FT = 'FT',
  LIVE = 'LIVE',
  UPCOMING = 'UPCOMING'
}

export type TMatchType = "home" | "away";

export interface IMatch {
  _id: string;
  comment?: string;
  title: string;
  date: string;
  time: string;
  opponent: ITeam;
  broadcaster?: IFileProps;
  status: EMatchStatus;
  score: { kfc: number; opponent: number };
  isHome: boolean;
  venue?: { name: string; files: IFileProps[] };
  goals: Array<IGoal>
  opponentGoals: number
  events: Array<IMatchEvent>;
  cards: Array<IMatchCard>;
  squad?: ISquad
}
export interface IMatchMetrics {
  goals: {
    home: number;
    away: number;
    kfc: IGoal[];
    opponent: IGoal[];
  };
  winStatus: string;
  teams: {
    home: ITeam | undefined;
    away: ITeam;
  }
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


export interface ITeam {
  _id: string;
  name: string;
  community: string;
  alias: string;
  contact: string;
  contactName: string;
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
  forKFC: boolean
}


export interface IMatchHighlight extends IFileProps {
  title: string
  match: IMatch
}