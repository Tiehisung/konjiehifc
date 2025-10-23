"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { IPlayer } from "../page";
import { teamKFC } from "@/data/teams";
import { useSearchParams } from "next/navigation";
import { PrimarySelect } from "@/components/select/Select";
import CardCarousel from "@/components/carousel/cards";

const statsData = [
  { stat: "PAS", value: 82 },
  { stat: "SHT", value: 90 },
  { stat: "PHY", value: 83 },
  { stat: "DEF", value: 54 },
  { stat: "SPD", value: 88 },
  { stat: "DRI", value: 87 },
];

interface PageProps {
  players: IPlayer[];
}

export default function PlayerProfile({ players }: PageProps) {
  const sp = useSearchParams();

  const playerId = sp.get("playerId");

  const player = players.find((p) => p._id == playerId);
  return (
    <main className="min-h-screen bg-popover flex flex-col items-center p-10">
      {/* Header */}
      <div className="flex gap-4 justify-between flex-wrap w-full max-w-6xl items-center mb-10">
        <h1 className="text-2xl font-semibold">
          ⚽ KFC - Team{" "}
          <strong className="uppercase">{player?.training.team}</strong>
        </h1>

        <PrimarySelect
          options={players?.map((p) => ({
            value: p._id,
            label: `${p.lastName} ${p.firstName}`,
          }))}
          paramKey="playerId"
        />

        <nav className="flex gap-6 text-muted-foreground text-sm">
          <Link className="hover:text-popover-foreground" href="#">
            Overview
          </Link>
          <Link className="hover:text-popover-foreground" href="#">
            Schedule
          </Link>
          <Link className="hover:text-popover-foreground" href="#">
            News
          </Link>
          <Link
            className="text-purple-400 border-b-2 border-purple-400 pb-1"
            href="#"
          >
            Squad
          </Link>
          <Link className="hover:text-popover-foreground" href="#">
            Shop
          </Link>
        </nav>
      </div>

      <section className="flex flex-col lg:flex-row gap-10 w-full max-w-6xl">
        {/* Left Section */}
        <div className="flex-1">
          <div className="text-left mb-4 capitalize">
            <p className="bg-muted px-3 py-1 rounded-md text-xs w-fit">
              {player?.position}
            </p>
            <h2 className="text-5xl font-bold mt-2">
              {player?.lastName}{" "}
              <span className="text-muted-foreground">{player?.firstName}</span>
            </h2>
          </div>

          {/* Player video/image */}
          <div className="rounded-xl overflow-hidden mb-6">
            <Image
              width={300}
              height={300}
              src={player?.avatar?.secure_url as string}
              alt={player?.lastName as string}
              className="w-auto max-h-[60vh] object-cover"
            />
          </div>

          {/* Description */}
          <p className="text-secondary-foreground text-sm leading-relaxed mb-4">
            {player?.description ??
              `Marco Asensio Willemsen is a Spanish professional footballer who
            plays as a winger and attacking midfielder for Real Madrid and the
            Spain national team.`}
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {player?.about ??
              ` After starting out at Mallorca, he signed with Real Madrid in
            November 2014, being consecutively loaned to his former club as well
            as Espanyol.`}
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mt-6 text-muted-foreground">
            <Link href="#" className="hover:text-popover-foreground">
              🐦
            </Link>
            <Link href="#" className="hover:text-popover-foreground">
              📷
            </Link>
            <Link href="#" className="hover:text-popover-foreground">
              👍
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 relative">
          <CardCarousel cards={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />

          {/* Trophies */}
          <div className="flex gap-6 justify-end mb-10">
            {["🏆", "🥈", "🥇", "🏅", "🏆"].map((t, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-2xl">{t}</span>
                <span className="text-xs mt-1 text-muted-foreground">
                  {i + 1}
                </span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 text-center mb-8">
            <div>
              <p className="text-xl font-semibold">8.2</p>
              <p className="text-xs text-muted-foreground">Avg Rating</p>
            </div>
            <div>
              <p className="text-xl font-semibold">7</p>
              <p className="text-xs text-muted-foreground">Assists</p>
            </div>
            <div>
              <p className="text-xl font-semibold">2</p>
              <p className="text-xs text-muted-foreground">Goals</p>
            </div>
            <div>
              <p className="text-xl font-semibold">26</p>
              <p className="text-xs text-muted-foreground">Matches</p>
            </div>
          </div>

          {/* Product / Shirt */}
          <div className="mt-8 flex justify-end">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-500 rounded-xl p-4 flex items-center gap-4 shadow-lg">
              <Image
                width={300}
                height={300}
                src={teamKFC.logo.secure_url}
                alt={player?.training.team as string}
                className="w-20"
              />
              <div>
                <p className="text-sm font-semibold">
                  Sponsor <strong>Me</strong>
                </p>
                <p className="text-xs text-gray-200">GHS50</p>
              </div>
            </div>
          </div>
        </div>

        {/* Radar Chart */}
      </section>

      <div className="h-64 w-full flex justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={statsData}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis dataKey="stat" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
            <Radar
              dataKey="value"
              stroke="#9b5cff"
              fill="#9b5cff"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}
