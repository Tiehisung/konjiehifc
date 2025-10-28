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
import {
  IGoal,
  IMatchEvent,
  IMatchProps,
  ITeamProps,
} from "@/app/matches/(fixturesAndResults)";
import { apiConfig } from "@/lib/configs";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib";
import { IPlayer } from "@/app/players/page";
import { Button } from "@/components/buttons/Button";
import { useRouter } from "next/navigation";

interface ScoreEventsTabProps {
  players: IPlayer[];
  opponent?: ITeamProps;
  match: IMatchProps;
}

export function ScoreEventsTab({
  players,
  opponent,
  match,
}: ScoreEventsTabProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    scorer: "",
    assist: "",
    minute: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleAddGoal = async () => {
    try {
      setIsLoading(true);
      if (!form.scorer || !form.minute || !form.description) {
        alert("Please fill in scorer, minute, and team");
        return;
      }

      const scorer = players.find((p) => p._id === form.scorer);
      const assistBy = form.assist
        ? players.find((p) => p._id === form.assist)
        : undefined;

      const assist = assistBy
        ? {
            _id: assistBy?._id,
            name: [assistBy?.lastName, assistBy?.firstName]
              .filter(Boolean)
              .join(" "),
            avatar: assistBy?.avatar?.secure_url,
            number: assistBy?.number,
          }
        : undefined;

      if (!scorer || !opponent) return;

      const newGoal: IGoal = {
        opponent: opponent?._id,

        scorer: {
          _id: scorer._id,
          name: `${scorer.lastName} ${scorer.firstName}`,
          avatar: scorer?.avatar?.secure_url,
          number: scorer?.number,
        },
        assist,
        minute: Number.parseInt(form.minute),
        description: form.description,
        modeOfScore: "Open Play Goal",
        match: match?._id,
      };

      const response = await fetch(apiConfig.goals, {
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newGoal),
        method: "POST",
      });

      const results = await response.json();
      toast.success(results.message);

      // onAddGoal(newGoal);
      setForm({ scorer: "", assist: "", minute: "", description: "" });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 rounded-none">
        <form onSubmit={handleAddGoal}>
          <h2 className="mb-6 text-2xl font-bold">Add Goal</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Scorer</label>
                <Select
                  value={form.scorer}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, scorer: value }))
                  }
                >
                  <SelectTrigger className="grow w-full ">
                    <SelectValue placeholder="Select scorer" />
                  </SelectTrigger>
                  <SelectContent>
                    {players?.map((player) => (
                      <SelectItem key={player._id} value={player._id}>
                        {`${player?.number ?? player?.jersey} - ${
                          player.lastName
                        } ${player?.firstName}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Assist (Optional)
                </label>
                <Select
                  value={form.assist}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, assist: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select assist player" />
                  </SelectTrigger>
                  <SelectContent>
                    {players?.map((player) => (
                      <SelectItem key={player._id} value={player._id}>
                        {`${player?.number ?? player?.jersey} - ${
                          player.lastName
                        } ${player?.firstName}`}
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
                  others={{ min: "0", max: "120" }}
                  placeholder="e.g., 45"
                  value={form.minute}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, minute: e.target.value }))
                  }
                  name={"goalMinute"}
                />
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
              onClick={handleAddGoal}
              className="w-full justify-center _primaryBtn"
              waiting={isLoading}
              primaryText=" Add Goal"
              waitingText="Adding Goal"
              type="submit"
            >
              <Plus className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export function MatchEventCard({ event }: { event: IMatchEvent }) {
  return (
    <div
      key={event?.description}
      className="flex items-center justify-between rounded-lg bg-muted p-4"
    >
      <div>
        <p className="font-semibold">{event.title}</p>

        <p className="text-xs text-muted-foreground">{event.description}</p>
      </div>
      <Button onClick={() => console.log(event.description)}>
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}
