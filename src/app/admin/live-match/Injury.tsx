"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { IPlayer } from "@/app/players/page";
import { toast } from "sonner";
import { apiConfig } from "@/lib/configs";
import { IMatchProps } from "@/app/matches/(fixturesAndResults)";
import { getErrorMessage } from "@/lib";
import { Button } from "@/components/buttons/Button";

export interface IInjury {
  _id?: string;
  player: {
    name: string;
    _id: string;
    avatar: string;
    number: string | number;
  };
  minute: number;
  description?: string;
  severity: "minor" | "moderate" | "severe";
  match: string;
}

interface InjuryEventsTabProps {
  
  players: IPlayer[];
  match: IMatchProps;
}

export function InjuryEventsTab({
 
  players,
  match,
}: InjuryEventsTabProps) {
  const [form, setForm] = useState({
    player: "",
    minute: "",
    description: "",
    severity: "moderate" as "minor" | "moderate" | "severe",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleAddInjury = async () => {
    try {
      setIsLoading(true);

      if (!form.player || !form.minute || !form.description) {
        toast.warning("Please fill in player, minute, and description");
        return;
      }

      const player = players.find((p) => p._id === form.player);
      if (!player) return;

      const newInjury: IInjury = {
        player: {
          _id: player?._id,
          name: player?.firstName + " " + player?.lastName,
          avatar: player?.avatar?.secure_url,
          number: player?.number,
        },
        minute: Number.parseInt(form.minute),
        description: form.description,
        severity: form.severity,
        match: match?._id,
      };

      setForm({
        player: "",
        minute: "",
        description: "",
        severity: "moderate",
      });

      const response = await fetch(apiConfig.injuries, {
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newInjury),
        method: "POST",
      });

      const results = await response.json();
      toast.success(results.message);

      setForm({ minute: "", description: "", player: "", severity: "minor" });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 rounded-none">
        <form onSubmit={handleAddInjury}>
          <h2 className="mb-6 text-2xl font-bold">Add Injury</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Player</label>
                <Select
                  value={form.player}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, player: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select player" />
                  </SelectTrigger>
                  <SelectContent>
                    {players?.map((player) => (
                      <SelectItem key={player._id} value={player._id}>
                        {player.number} -{" "}
                        {player.lastName + " " + player?.firstName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Minute</label>
                <Input
                  type="number"
                  min="0"
                  max="120"
                  placeholder="e.g., 25"
                  value={form.minute}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, minute: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Severity
                </label>
                <Select
                  value={form.severity}
                  onValueChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      severity: value as "minor" | "moderate" | "severe",
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minor">Minor</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="severe">Severe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>
                <Input
                  placeholder="e.g., VAR Review, Penalty Decision, etc."
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  name={"goalDescription"}
                />
              </div>
            </div>

            <Button
              onClick={handleAddInjury}
              className="w-full justify-center _primaryBtn"
              waiting={isLoading}
              primaryText=" Add Injury"
              waitingText="Adding Injury"
              type="submit"
            >
              <Plus className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>

      {/* {injuries.length > 0 && (
        <Card className="p-6">
          <h3 className="mb-4 text-xl font-bold">Injuries</h3>
          <div className="space-y-2">
            {injuries.map((injury) => (
              <div
                key={injury._id}
                className="flex items-center justify-between rounded-lg bg-muted p-4"
              >
                <div>
                  <p className="font-semibold">
                    {injury.minute}' - {injury.player.number}{" "}
                    {`${injury.player.name} `}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Severity:{" "}
                    <span className="capitalize">{injury.severity}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {injury.description}
                  </p>
                </div>
                <Button onClick={() => console.log(injury._id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )} */}
    </div>
  );
}
