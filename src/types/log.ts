import { IUser } from "./user";

export interface ILog {
    _id: string;
    title: string;
    description: string;
    // userEmail?: string;
    user?: IUser
    severity?: ELogSeverity
    meta?: Record<string, string | number | boolean | null> | string | unknown;
    source?: 'admin' | 'user' | 'system' | 'other';
    url?: string
    createdAt: Date;
    updatedAt?: Date;
}

export enum ELogSeverity {
    INFO = 'info',
    WARNING = 'warning',
    CRITICAL = 'critical'
}

export enum EColor {
    RED = "red"
    , TEAL = "teal"
    , YELLOW = "yellow"
    , GREEN = "green"
    , BLUE = "blue"
    , BLACK = "black"
    , GRAY = "gray"
    , WHITE = "white"
    , GOLD = "gold"
}