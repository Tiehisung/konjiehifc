"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Users, Trophy, Calendar, TrendingUp } from "lucide-react";
import CreateSquad from "./CreateSquad";

const matchesData = [
  { date: "Jan 15", wins: 2, draws: 1, losses: 0 },
  { date: "Jan 22", wins: 3, draws: 0, losses: 1 },
  { date: "Jan 29", wins: 2, draws: 1, losses: 1 },
  { date: "Feb 5", wins: 3, draws: 1, losses: 0 },
  { date: "Feb 12", wins: 2, draws: 2, losses: 0 },
];

const matchStats = [
  { name: "Goals", value: 45, color: "#ef4444" },
  { name: "Matches", value: 28, color: "#3b82f6" },
  { name: "Clean Sheets", value: 12, color: "#10b981" },
];

const topPlayers = [
  { name: "Marcus Sterling", goals: 12, assists: 5, matches: 15 },
  { name: "James Wilson", goals: 10, assists: 7, matches: 14 },
  { name: "David Chen", goals: 8, assists: 6, matches: 15 },
  { name: "Alex Rodriguez", goals: 7, assists: 8, matches: 13 },
];

export default function AdminDashboard() {
  return (
    <div className="  ">
      {/* Main Content */}
      <main className="flex-1 _page">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground p-8 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-black mb-2">
              CHAMPIONSHIP CONTROL CENTER
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Manage your squad, track performance, dominate the league
            </p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8 max-w-7xl mx-auto">
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Total Players",
                value: "28",
                icon: Users,
                color: "from-blue-500 to-blue-600",
              },
              {
                label: "Matches Played",
                value: "18",
                icon: Calendar,
                color: "from-red-500 to-red-600",
              },
              {
                label: "Win Rate",
                value: "72%",
                icon: Trophy,
                color: "from-green-500 to-green-600",
              },
              {
                label: "Goals This Season",
                value: "45",
                icon: TrendingUp,
                color: "from-yellow-500 to-yellow-600",
              },
            ].map((stat, i) => (
              <Card key={i} className="border-0 shadow-lg overflow-hidden">
                <div className={`bg-gradient-to-br ${stat.color} h-2`} />
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm font-medium">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-black text-foreground mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <stat.icon className="text-muted-foreground/30" size={40} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Match Performance */}
            <Card className="lg:col-span-2 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-black">
                  SEASON PERFORMANCE
                </CardTitle>
                <CardDescription>
                  Wins, Draws, and Losses over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={matchesData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--color-border)"
                    />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="wins" fill="#10b981" name="Wins" />
                    <Bar dataKey="draws" fill="#f59e0b" name="Draws" />
                    <Bar dataKey="losses" fill="#ef4444" name="Losses" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Stats Distribution */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-black">
                  STATS BREAKDOWN
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={matchStats}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {matchStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Players */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-black">
                TOP PERFORMERS
              </CardTitle>
              <CardDescription>
                Leading scorers and playmakers this season
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-black text-foreground">
                        Player
                      </th>
                      <th className="text-center py-3 px-4 font-black text-foreground">
                        Goals
                      </th>
                      <th className="text-center py-3 px-4 font-black text-foreground">
                        Assists
                      </th>
                      <th className="text-center py-3 px-4 font-black text-foreground">
                        Matches
                      </th>
                      <th className="text-center py-3 px-4 font-black text-foreground">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPlayers.map((player, i) => (
                      <tr
                        key={i}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-4 px-4 font-semibold">
                          {player.name}
                        </td>
                        <td className="text-center py-4 px-4">
                          <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1 rounded-full font-bold">
                            {player.goals}
                          </span>
                        </td>
                        <td className="text-center py-4 px-4">
                          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full font-bold">
                            {player.assists}
                          </span>
                        </td>
                        <td className="text-center py-4 px-4 text-muted-foreground">
                          {player.matches}
                        </td>
                        <td className="text-center py-4 px-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="font-semibold bg-transparent"
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <CreateSquad/>
    </div>
  );
}
