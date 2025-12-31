import { IManager } from "@/app/admin/managers/page";
import { IMatchCard } from "@/app/matches/(fixturesAndResults)";
import { ICldFileUploadResult } from "@/components/cloudinary/FileUploadWidget";
import { IFileProps } from ".";
import { EColor } from "./log";
import { IGoal, IMatch } from "./match.interface";

export enum EPlayerStatus {
    PENDING = 'pending',
    APPROVED = 'approved'
}

export type TPlayerGallery = {
    _id: string;
    date: string;
    timestamp: number;
    description: string;
    files: Array<IFileProps>;
};


export enum EPlayerPosition {
    KEEPER = 'goal keeper',
    DEFENDER = 'defender',
    MIDFILDER = 'midfielder',
    FORWARD = 'forward',
    STRIKER = 'striker',
    WING_BACK = 'wing back',
    CENTER_BACK = 'center back',
    ATTACKING_MIDFIELDER = 'attacking midfielder',
    DEFENSIVE_MIDFIELDER = 'defensive midfielder',
    WINGER = 'winger',
    SWEEPER = 'sweeper'
}

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
    position: EPlayerPosition;
    favColor?: EColor
    //Stats
    goals: IGoal[];
    matches: IMatch[];
    ratings: { rating: number; match: string }[];
    assists: IGoal[];
    mvp: { _id: string; match: IMatch }[];
    passAcc: string;
    trophies: number;
    cards: IMatchCard[];
    training: { team?: "A" | "B" };
    status: EPlayerStatus
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
    position: EPlayerPosition;
    favColor?: EColor
    goals: string[];
    matches: string[];
    assists: string[];
    mvp: string[];
    passAcc: string;
    trophies: number;
    cards: string[];
}