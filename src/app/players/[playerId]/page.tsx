"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const statsData = [
  { stat: "PAS", value: 82 },
  { stat: "SHT", value: 90 },
  { stat: "PHY", value: 83 },
  { stat: "DEF", value: 54 },
  { stat: "SPD", value: 88 },
  { stat: "DRI", value: 87 },
];

export default function PlayerProfile() {
  return (
    <main className="min-h-screen bg-[#0E0E10] text-white flex flex-col items-center p-10">
      {/* Header */}
      <div className="flex justify-between w-full max-w-6xl items-center mb-10">
        <h1 className="text-2xl font-semibold">⚽ Real Madrid</h1>
        <nav className="flex gap-6 text-gray-400 text-sm">
          <a className="hover:text-white" href="#">
            Overview
          </a>
          <a className="hover:text-white" href="#">
            Schedule
          </a>
          <a className="hover:text-white" href="#">
            News
          </a>
          <a
            className="text-purple-400 border-b-2 border-purple-400 pb-1"
            href="#"
          >
            Squad
          </a>
          <a className="hover:text-white" href="#">
            Shop
          </a>
        </nav>
      </div>

      <section className="flex flex-col lg:flex-row gap-10 w-full max-w-6xl">
        {/* Left Section */}
        <div className="flex-1">
          <div className="text-left mb-4">
            <p className="bg-gray-800 px-3 py-1 rounded-md text-xs w-fit">
              LWF
            </p>
            <h2 className="text-5xl font-bold mt-2">
              Marco <span className="text-white/80">Asensio</span>
            </h2>
          </div>

          {/* Player video/image */}
          <div className="rounded-xl overflow-hidden mb-6">
            <img
              src="/asensio-left.jpg"
              alt="Marco Asensio"
              className="w-full object-cover"
            />
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Marco Asensio Willemsen is a Spanish professional footballer who
            plays as a winger and attacking midfielder for Real Madrid and the
            Spain national team.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            After starting out at Mallorca, he signed with Real Madrid in
            November 2014, being consecutively loaned to his former club as well
            as Espanyol.
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mt-6 text-gray-400">
            <a href="#" className="hover:text-white">
              🐦
            </a>
            <a href="#" className="hover:text-white">
              📷
            </a>
            <a href="#" className="hover:text-white">
              👍
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 relative">
          <div className="absolute -top-10 right-0">
            <img
              src="/asensio-main.png"
              alt="Asensio"
              className="w-72 drop-shadow-2xl"
            />
          </div>

          {/* Trophies */}
          <div className="flex gap-6 justify-end mb-10">
            {["🏆", "🥈", "🥇", "🏅", "🏆"].map((t, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-2xl">{t}</span>
                <span className="text-xs mt-1 text-gray-400">{i + 1}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 text-center mb-8">
            <div>
              <p className="text-xl font-semibold">8.2</p>
              <p className="text-xs text-gray-400">Avg Rating</p>
            </div>
            <div>
              <p className="text-xl font-semibold">7</p>
              <p className="text-xs text-gray-400">Assists</p>
            </div>
            <div>
              <p className="text-xl font-semibold">2</p>
              <p className="text-xs text-gray-400">Goals</p>
            </div>
            <div>
              <p className="text-xl font-semibold">26</p>
              <p className="text-xs text-gray-400">Matches</p>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="h-64 w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={statsData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis
                  dataKey="stat"
                  tick={{ fill: "#ccc", fontSize: 12 }}
                />
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

          {/* Product / Shirt */}
          <div className="mt-8 flex justify-end">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-500 rounded-xl p-4 flex items-center gap-4 shadow-lg">
              <img src="/shirt.png" alt="Real Madrid Shirt" className="w-20" />
              <div>
                <p className="text-sm font-semibold">Buy Shirt</p>
                <p className="text-xs text-gray-200">$89.50</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
