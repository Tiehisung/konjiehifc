import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Share2,
  Printer,
  Edit,
  Mail,
  Phone,
  Trophy,
  Award,
  Target,
} from "lucide-react";
import { IPlayer } from "@/types/player.interface";
import { EPlayerPosition } from "@/types/player.interface";

interface PlayerHeaderProps {
  player: IPlayer;
}

export function PlayerHeader({ player }: PlayerHeaderProps) {
  const fullName = `${player.firstName} ${player.lastName}`;
  const initials = `${player.firstName[0]}${player.lastName[0]}`;
  const colorClass = player.favColor
    ? getPositionColor(player.position)
    : "bg-gray-500";

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
            <AvatarImage src={player.avatar} alt={fullName} />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="absolute -top-2 -right-2">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${colorClass}`}
            >
              {player.number}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{fullName}</h1>
            <Badge variant={player.isActive ? "default" : "destructive"}>
              {player.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <Badge variant="secondary" className="text-sm">
              {getPositionAbbreviation(player.position)}
            </Badge>
            <Badge variant={player.isFit ? "default" : "destructive"}>
              {player.isFit ? "Fit" : "Injured"}
            </Badge>
            {player.captaincy && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                {player.captaincy}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{player.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{player.phone}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Printer className="h-4 w-4" />
          Print
        </Button>
        <Button className="gap-2">
          <Edit className="h-4 w-4" />
          Edit Player
        </Button>
      </div>
    </div>
  );
}

export function getPositionAbbreviation(position: EPlayerPosition): string {
  const abbreviationMap: Record<EPlayerPosition, string> = {
    [EPlayerPosition.KEEPER]: "GK",
    [EPlayerPosition.DEFENDER]: "DEF",
    [EPlayerPosition.MIDFILDER]: "MID",
    [EPlayerPosition.FORWARD]: "FWD",
    [EPlayerPosition.STRIKER]: "ST",
    [EPlayerPosition.WING_BACK]: "WB",
    [EPlayerPosition.CENTER_BACK]: "CB",
    [EPlayerPosition.ATTACKING_MIDFIELDER]: "AM",
    [EPlayerPosition.DEFENSIVE_MIDFIELDER]: "DM",
    [EPlayerPosition.WINGER]: "WG",
    [EPlayerPosition.SWEEPER]: "SW",
  };

  return abbreviationMap[position] || position;
}

export function getPositionColor(position: EPlayerPosition): string {
  const colorMap: Record<EPlayerPosition, string> = {
    [EPlayerPosition.KEEPER]: "bg-yellow-100 text-yellow-800 border-yellow-200",
    [EPlayerPosition.DEFENDER]: "bg-blue-100 text-blue-800 border-blue-200",
    [EPlayerPosition.MIDFILDER]: "bg-green-100 text-green-800 border-green-200",
    [EPlayerPosition.FORWARD]: "bg-red-100 text-red-800 border-red-200",
    [EPlayerPosition.STRIKER]:
      "bg-purple-100 text-purple-800 border-purple-200",
    [EPlayerPosition.WING_BACK]:
      "bg-indigo-100 text-indigo-800 border-indigo-200",
    [EPlayerPosition.CENTER_BACK]: "bg-cyan-100 text-cyan-800 border-cyan-200",
    [EPlayerPosition.ATTACKING_MIDFIELDER]:
      "bg-pink-100 text-pink-800 border-pink-200",
    [EPlayerPosition.DEFENSIVE_MIDFIELDER]:
      "bg-emerald-100 text-emerald-800 border-emerald-200",
    [EPlayerPosition.WINGER]: "bg-orange-100 text-orange-800 border-orange-200",
    [EPlayerPosition.SWEEPER]: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return colorMap[position] || "bg-gray-100 text-gray-800 border-gray-200";
}
