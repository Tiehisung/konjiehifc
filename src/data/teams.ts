import { ITeamProps } from "@/app/matches/(fixturesAndResults)";
import _players from "./players";
import { kfc } from "./kfc";

export const teamKFC: ITeamProps = {
    _id: kfc.alias,
    name: kfc.name,
    alias: kfc.alias,
    logo: kfc.logo,
    createdAt: "2023-11-28T10:30:00Z",
    updatedAt: "2023-11-28T10:30:00Z",
    community: "Konjiehi",
    currentPlayers: []
};

