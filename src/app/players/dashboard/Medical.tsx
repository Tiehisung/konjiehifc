"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Activity, Heart, Shield } from "lucide-react";
import { IPlayer } from "@/types/player.interface";

interface MedicalInfoProps {
  player?: IPlayer;
}

export function MedicalInfo({ player }: MedicalInfoProps) {
  const recentInjuries = player?.injuries?.slice(0, 5) ?? [];
  const currentIssues = player?.issues ?? [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Current Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Current Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentIssues.length > 0 ? (
            <div className="space-y-3">
              {currentIssues.map((issue, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-amber-50 rounded-lg"
                >
                  <span className="text-sm">{issue}</span>
                  <Badge variant="destructive">Active</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>No current issues reported</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Injury History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-red-500" />
            Injury History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentInjuries.length > 0 ? (
            <div className="space-y-3">
              {recentInjuries.map((injury, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                >
                  <span className="text-sm">{injury}</span>
                  <Badge variant="destructive">Recovered</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Heart className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>No injury history</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
