import { IManager } from "@/app/admin/managers/page";
import { IMatchCard } from "@/app/matches/(fixturesAndResults)";
import { IFileProps, IGallery } from "@/types/file.interface";
import { EColor } from "./log";
import { IGoal, IMatch } from "./match.interface";
import { ICldFileUploadResult } from "./file.interface";

export enum EPlayerStatus {
    // Match Availability
    AVAILABLE = 'AVAILABLE',           // Fully fit and available
    DOUBTFUL = 'DOUBTFUL',             // 50/50 chance to play
    UNAVAILABLE = 'UNAVAILABLE',       // Not available for selection

    // Injury Status
    INJURED = 'INJURED',               // Currently injured
    RECOVERING = 'RECOVERING',         // Returning from injury
    MINOR_INJURY = 'MINOR_INJURY',     // Small injury, light training

    // Administrative Status
    SUSPENDED = 'SUSPENDED',           // Disciplinary suspension
    LOANED = 'LOANED',                 // Playing for another club
    TRANSFER_LISTED = 'TRANSFER_LISTED', // Available for transfer

    // Squad Status
    ACTIVE = 'ACTIVE',                 // Part of main squad
    RESERVE = 'RESERVE',               // Reserve team player
    YOUTH = 'YOUTH',                   // Youth/academy player

    // Career Status
    RETIRED = 'RETIRED',               // Ended playing career
    INACTIVE = 'INACTIVE',             // Not currently playing
}


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
    slug: string
    number: string;
    about?: string;
    description?: string;
    medicals: { fitness: string }[];
    galleries: IGallery[];
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
    status: EPlayerStatus,
    
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
    status: EPlayerStatus
    slug: string
}

