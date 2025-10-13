import { IMatchProps } from "@/components/fixturesAndResults";
import teams from "./teams";
import _players from "./players";

const matches: Partial<IMatchProps>[] = [
  {
    _id: "1",
    title: "KonjiehiFC vs. Barcelona",
    date: "2024-12-29",
    time: "15:00",
    oponent: teams.find((t) => t._id == "2"),
    broadcaster: "ESPN",
    status: "FT",
    scores: {
      kfc: [
        {
          _id: "1",
          team: "homeTeam",
          time: "20",
          timestamp: 1672332800,
          player: _players[0],
        },
        {
          _id: "2",
          team: "homeTeam",
          time: "75",
          timestamp: 1672334500,
          player: _players[1],
        },
      ],
      oponent: [
        {
          _id: "3",
          team: "awayTeam",
          time: "35",
          timestamp: 1672333300,
          player: _players[4],
        },
      ],
    },
    isHome: false,
  },
  {
    _id: "2",
    title: "Manchester United vs. Liverpool",
    date: "2024-12-28",
    time: "12:30",
    oponent: teams.find((t) => t._id == "3"),
    status: "HT",
    scores: {
      kfc: [
        {
          _id: "4",
          team: "homeTeam",
          time: "15",
          timestamp: 1672332100,
          player: _players[1],
        },
      ],
      oponent: [
        {
          _id: "5",
          team: "awayTeam",
          time: "42",
          timestamp: 1672333720,
          player: _players[7],
        },
      ],
    },
    isHome: false,
  },
  {
    _id: "3",
    title: "Bayern Munich vs. Borussia Dortmund",
    date: "2024-12-29",
    time: "18:00",
    oponent: teams.find((t) => t._id == "5"),
    status: "LIVE",
    scores: {
      kfc: [],
      oponent: [
        {
          _id: "6",
          team: "homeTeam",
          time: "10",
          timestamp: 1672332400,
          player: _players[5],
        },
      ],
    },
    isHome: false,
  },
  {
    _id: "4",
    title: "Juventus vs. Inter Milan",
    date: "2024-12-30",
    time: "20:45",
    oponent: teams.find((t) => t._id == "8"),
    status: "SCHEDULED",
    scores: {
      kfc: [],
      oponent: [],
    },
    isHome: true,
  },
  {
    _id: "5",
    title: "Paris Saint-Germain vs. Marseille",
    date: "2024-12-31",
    time: "17:00",
    oponent: teams.find((t) => t._id == "9"),
    status: "SCHEDULED",
    scores: {
      kfc: [],
      oponent: [],
    },
    isHome: false,
  },
  {
    _id: "6",
    title: "K-Uptown vs. K-City",
    date: "2024-12-31",
    time: "17:00",
    oponent: teams.find((t) => t._id == "3"),
    status: "CANCELED",
    challenge: { tag: "Emergency ...", reason: "" },
    scores: {
      kfc: [],
      oponent: [],
    },
    isHome: false,
  },
  {
    _id: "7",
    title: "K-Uptown vs. K-City",
    date: "2024-12-31",
    time: "17:00",
    oponent: teams.find((t) => t._id == "3"),
    status: "FT",
    challenge: { tag: "Emergency ...", reason: "" },
    scores: {
      kfc: [],
      oponent: [],
    },
    isHome: true,
  },
  {
    _id: "8",
    title: "Bayern Munich vs. KonjiehiFC",
    date: "2024-12-29",
    time: "18:00",
    oponent: teams.find((t) => t._id == "5"),
    status: "FT",
    scores: {
      kfc: [
        {
          _id: "6",
          team: "homeTeam",
          time: "10",
          timestamp: 1672332400,
          player: _players[5],
        },
      ],
      oponent: [
        {
          _id: "5",
          team: "homeTeam",
          time: "10",
          timestamp: 1672332400,
          player: _players[5],
        },
        {
          _id: "8",
          team: "homeTeam",
          time: "17",
          timestamp: 1672332400,
          player: _players[5],
        },
      ],
    },
    isHome: true,
  },
];

export default matches;
