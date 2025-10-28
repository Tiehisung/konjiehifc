"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { Input } from "@/components/input/Inputs";
import { IPlayer } from "@/app/players/page";
import { Button } from "@/components/buttons/Button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CardEvent {
  id: string;
  player: IPlayer;
  type: "yellow" | "red";
  minute: number;
  description?: string;
}

interface EventsTabProps {
  players: IPlayer[];
}

export function CardEventsTab({ players }: EventsTabProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    player: "",
    type: "yellow" as "yellow" | "red",
    minute: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleAddCard = () => {
    if (!form.player || !form.minute || !form.description) {
      toast.warning("Please fill in player, minute, and team");
      return;
    }

    const player = players.find((p) => p._id === form.player);
    if (!player) return;

    const newCard: CardEvent = {
      id: Date.now().toString(),
      player,
      type: form.type,
      minute: Number.parseInt(form.minute),
      description: form.description,
    };

    setForm({ player: "", type: "yellow", minute: "", description: "" });
    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 rounded-none">
        <form onSubmit={handleAddCard}>
          <h2 className="mb-6 text-2xl font-bold">Add Card</h2>

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
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select player" />
                  </SelectTrigger>
                  <SelectContent>
                    {players?.map((player) => (
                      <SelectItem key={player._id} value={player._id}>
                        {player.number} - {player.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Minute</label>
                <Input
                  type="number"
                  others={{ min: "0", max: "120" }}
                  placeholder="e.g., 30"
                  value={form.minute}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, minute: e.target.value }))
                  }
                  name={"cardMinutes"}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Card Type
                </label>
                <Select
                  value={form.type}
                  onValueChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      type: value as "yellow" | "red",
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select card type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yellow">Yellow Card</SelectItem>
                    <SelectItem value="red">Red Card</SelectItem>
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
              type="submit"
              className="w-full justify-center _primaryBtn"
              waiting={isLoading}
              primaryText=" Add Card"
              waitingText="Adding Card"
            >
              <Plus className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>

      {/* {cards.length > 0 && (
        <Card className="p-6">
          <h3 className="mb-4 text-xl font-bold">Cards</h3>
          <div className="space-y-2">
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex items-center justify-between rounded-lg bg-muted p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-6 rounded ${
                      card.type === "yellow" ? "bg-yellow-400" : "bg-red-600"
                    }`}
                  />
                  <div>
                    <p className="font-semibold">
                      {card.minute}' - {card.player.number}{" "}
                      {card.player.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </div>
                <Button onClick={() => console.log(card.id)}>
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
