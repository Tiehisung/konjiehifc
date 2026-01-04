import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Ruler,
  Cake,
  Heart,
  Shield,
  Users,
  AlertTriangle,
  Thermometer,
} from "lucide-react";
 
import { IPlayer } from "@/types/player.interface";
import { formatDate } from "@/lib/timeAndDate";
import { Progress } from "@/components/ui/progress";

interface PlayerSidebarProps {
  player: IPlayer;
}

export function PlayerSidebar({ player }: PlayerSidebarProps) {
  const managerName = `${player.manager.fullname}`;
  const managerInitials = player.manager.fullname
    .split(" ")
    .map((n) => n[0])
    .join("");

  const averageRating =
    player.ratings.length > 0
      ? player.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
        player.ratings.length
      : 0;

  return (
    <div className="space-y-6">
      {/* Personal Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            Personal Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Date of Birth
              </span>
              <div className="flex items-center gap-2">
                <Cake className="h-4 w-4" />
                <span className="font-medium">{formatDate(player.dob)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Height</span>
              <span className="font-medium">{player.height} cm</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Date Signed</span>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">
                  {formatDate(player.dateSigned)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fitness & Health */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Fitness Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Current Fitness
              </span>
              <Badge variant={player.isFit ? "default" : "destructive"}>
                {player.isFit ? "Fit to Play" : "Injured"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Training Team
              </span>
              <Badge variant="secondary">
                Team {player.training.team || "A"}
              </Badge>
            </div>
          </div>

          {player.medicals.length > 0 && (
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="h-4 w-4" />
                <span className="text-sm font-medium">Medical History</span>
              </div>
              <div className="space-y-2">
                {player.medicals.slice(0, 3).map((medical, index) => (
                  <div key={index} className="text-sm">
                    <span className="text-muted-foreground">
                      {medical.fitness}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {player.injuries.length > 0 && (
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Recent Injuries</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {player.injuries.slice(0, 3).map((injury, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {injury}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Manager Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            Assigned Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={player.manager.avatar} />
              <AvatarFallback>{managerInitials}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{player.manager.fullname}</h4>
              <p className="text-sm text-muted-foreground">
                {player.manager.email}
              </p>
              <p className="text-sm text-muted-foreground">
                {player.manager.phone}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Rating */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Average Rating
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="mb-4">
              <Progress value={averageRating * 10} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">
              Based on {player.ratings.length} matches
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
