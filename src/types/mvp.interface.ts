import { IMatch } from "./match.interface";
import { EPlayerPosition, IPlayer } from "./player.interface";

export interface IMvp {
    _id: string;
    player: IPlayer,
    match: IMatch,
    description?: string,
    date?: string
    positionPlayed?: EPlayerPosition

    createdAt?: string;
    updatedAt?: string;
}