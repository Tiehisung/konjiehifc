import { ITeamProps } from "@/app/matches/(fixturesAndResults)";
import _players from "./players";
import { IFileProps } from "@/types";

export const teamKFC = {
  _id: "1",
  name: "KonjiehiFC",
  alias: "KFC",
  logo: {
    _id: "1",
    secure_url:
      "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    resource_type: "image",
    public_id: "kfc_logo",
  },
  createdAt: "2023-11-28T10:30:00Z",
  updatedAt: "2023-11-28T10:30:00Z",
};

const teams: ITeamProps[] = [
  {
    _id: "2",
    name: "Barcelona",
    alias: "FCB",
    logo: _players[0].avatar as IFileProps,
    createdAt: "2023-11-28T10:30:00Z",
    updatedAt: "2023-11-28T10:30:00Z",
    community: "",
    currentPlayers: []
  },
  {
    _id: "3",
    name: "Manchester United",
    alias: "MU",
    logo: _players[1].avatar as IFileProps,
    createdAt: "2023-11-28T10:30:00Z",
    updatedAt: "2023-11-28T10:30:00Z",
    community: "",
    currentPlayers: []
  },
  {
    _id: "4",
    name: "Liverpool",
    alias: "LFC",
    logo: _players[2].avatar as IFileProps,
    createdAt: "2023-11-28T10:30:00Z",
    updatedAt: "2023-11-28T10:30:00Z",
    community: "",
    currentPlayers: []
  },
  {
    _id: "5",
    name: "Bayern Munich",
    alias: "FCB",
    logo: _players[3].avatar as IFileProps,
    createdAt: "2023-11-28T10:30:00Z",
    updatedAt: "2023-11-28T10:30:00Z",
    community: "",
    currentPlayers: []
  },
  {
    _id: "6",
    name: "Borussia Dortmund",
    alias: "BVB",
    logo: _players[4].avatar as IFileProps,
    createdAt: "2023-11-28T10:30:00Z",
    updatedAt: "2023-11-28T10:30:00Z",
    community: "",
    currentPlayers: []
  },
  {
    _id: "7",
    name: "Juventus",
    alias: "JUVE",
    logo: _players[5].avatar as IFileProps,
    createdAt: "2023-11-28T10:30:00Z",
    updatedAt: "2023-11-28T10:30:00Z",
    community: "",
    currentPlayers: []
  },
  {
    _id: "8",
    name: "Inter Milan",
    alias: "INT",
    logo: _players[6].avatar as IFileProps,
    createdAt: "2023-11-28T10:30:00Z",
    updatedAt: "2023-11-28T10:30:00Z",
    community: "",
    currentPlayers: []
  },
  {
    _id: "9",
    name: "Paris Saint-Germain",
    alias: "PSG",
    logo: _players[0].avatar as IFileProps,
    createdAt: "2023-11-28T10:30:00Z",
    updatedAt: "2023-11-28T10:30:00Z",
    community: "",
    currentPlayers: []
  },
  {
    _id: "10",
    name: "Marseille",
    alias: "OM",
    logo: _players[1].avatar as IFileProps,
    createdAt: "2023-11-28T10:30:00Z",
    updatedAt: "2023-11-28T10:30:00Z",
    community: "",
    currentPlayers: []
  },
];

export default teams;
