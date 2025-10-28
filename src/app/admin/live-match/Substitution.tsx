"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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

interface Substitution {
  id: string;
  playerOut: IPlayer;
  playerIn: IPlayer;
  minute: number;
}

interface SubstitutionEventsTabProps {
  players: IPlayer[];
}

export function SubstitutionEventsTab({ players }: SubstitutionEventsTabProps) {
  const [form, setForm] = useState({
    playerOut: "",
    playerIn: "",
    minute: "",
    team: "",
  });

  const currentTeamPlayers = players;

  const handleAddSubstitution = () => {
    if (!form.playerOut || !form.playerIn || !form.minute || !form.team) {
      toast.warning("Please fill in all fields");
      return;
    }

    const playerOut = players.find((p) => p._id === form.playerOut);
    const playerIn = players.find((p) => p._id === form.playerIn);

    if (!playerOut || !playerIn) return;

    const newSubstitution: Substitution = {
      id: Date.now().toString(),
      playerOut,
      playerIn,
      minute: Number.parseInt(form.minute),
    };

    setForm({ playerOut: "", playerIn: "", minute: "", team: "" });
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 rounded-none">
        <h2 className="mb-6 text-2xl font-bold">Add Substitution</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Player Out
              </label>
              <Select
                value={form.playerOut}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, playerOut: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select player" />
                </SelectTrigger>
                <SelectContent>
                  {currentTeamPlayers.map((player) => (
                    <SelectItem key={player._id} value={player._id}>
                      {player.number} -{" "}
                      {player.lastName + " " + player?.firstName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Player In
              </label>
              <Select
                value={form.playerIn}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, playerIn: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select player" />
                </SelectTrigger>
                <SelectContent>
                  {currentTeamPlayers.map((player) => (
                    <SelectItem key={player._id} value={player._id}>
                      {player.number} -{" "}
                      {`${player?.lastName} ${player?.firstName}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Minute</label>
              <Input
                type="number"
                min="0"
                max="120"
                placeholder="e.g., 60"
                value={form.minute}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, minute: e.target.value }))
                }
              />
            </div>
          </div>

          <Button onClick={handleAddSubstitution} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Substitution
          </Button>
        </div>
      </Card>

      {/* {substitutions.length > 0 && (
        <Card className="p-6">
          <h3 className="mb-4 text-xl font-bold">Substitutions</h3>
          <div className="space-y-2">
            {substitutions.map((sub) => (
              <div
                key={sub.id}
                className="flex items-center justify-between rounded-lg bg-muted p-4"
              >
                <div>
                  <p className="font-semibold">
                    {sub.minute}' - {sub.playerOut.number}{" "}
                    {sub.playerOut.lastName} → {sub.playerIn.number}{" "}
                    {sub.playerIn.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">cool</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => console.log(sub.id)}
                >
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
