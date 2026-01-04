import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPlayer } from "@/types/player.interface";
 
import {
  Target,
  Crosshair,
  Trophy,
  Star,
  Zap,
  Activity,
  Award,
  Shield,
} from "lucide-react";

interface StatsCardsProps {
  player: IPlayer;
}

export function StatsCards({ player }: StatsCardsProps) {
  const stats = [
    {
      title: "Goals",
      value: player.goals.length.toString(),
      icon: Target,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      title: "Assists",
      value: player.assists.length.toString(),
      icon: Crosshair,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Trophies",
      value: player.trophies.toString(),
      icon: Trophy,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      title: "MVP Awards",
      value: player.mvp.length.toString(),
      icon: Award,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Pass Accuracy",
      value: player.passAcc,
      icon: Zap,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Matches",
      value: player.matches.length.toString(),
      icon: Activity,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Yellow Cards",
      value: player.cards.filter((c) => c.type === "yellow").length.toString(),
      icon: Shield,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Red Cards",
      value: player.cards.filter((c) => c.type === "red").length.toString(),
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
