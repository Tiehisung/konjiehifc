"use client";

import { FormEvent, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Minus } from "lucide-react";
import { Input } from "@/components/input/Inputs";
import {
  IGoal,
  IMatchProps,
  ITeamProps,
} from "@/app/matches/(fixturesAndResults)";
import { apiConfig } from "@/lib/configs";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib";
import { IPlayer } from "@/types/player.interface";
import { Button } from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { PrimaryAccordion } from "@/components/Accordion";

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
  const [isLoadingOG, setIsLoadingOG] = useState(false);

  const handleAddGoal = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (!form.scorer || !form.minute || !form.description) {
        toast.warning("Please fill in scorer, minute, and description");
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
            avatar: assistBy?.avatar,
            number: assistBy?.number,
          }
        : undefined;

      if (!scorer || !opponent) return;

      const newGoal: IGoal = {
        opponent: opponent?._id,
        scorer: {
          _id: scorer._id,
          name: `${scorer.lastName} ${scorer.firstName}`,
          avatar: scorer?.avatar,
          number: scorer?.number,
        },
        assist,
        minute: Number.parseInt(form.minute),
        description: `⚽ ${form.description}`,
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

  //Increment Opponent goals
  const handleRemoveGoal = async () => {
    try {
      setIsLoadingOG(true);

      const response = await fetch(apiConfig.matches, {
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          _id: match?._id,
          goals: [...match?.goals].slice(0, -1),
        }),
        method: "PUT",
      });

      const results = await response.json();
      toast.success(results.message);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoadingOG(false);
      router.refresh();
    }
  };

  return (
    <div className="space-y-8">
      <Card
        className={`p-6 rounded-none ${
          isLoadingOG || isLoading ? "pointer-events-none" : ""
        }`}
      >
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
                        {`${player?.number ?? player?.number} - ${
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
                        {`${player?.number ?? player?.number} - ${
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

            <div className="gap-6 flex items-center mt-8">
              <Button
                className="  justify-center _primaryBtn grow"
                waiting={isLoading}
                primaryText=" Add Goal"
                waitingText="Adding Goal"
                type="submit"
              >
                <Plus className="mr-2 h-4 w-4" />
              </Button>
              <Button
                onClick={handleRemoveGoal}
                className=" justify-center _deleteBtn"
                waiting={isLoadingOG}
                primaryText=" Remove Goal"
                waitingText="Removing..."
              >
                <Plus className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>

        <OppoentGoalsUpdate match={match} />
      </Card>
    </div>
  );
}

function OppoentGoalsUpdate({ match }: { match: IMatchProps }) {
  const router = useRouter();
  const [isLoadingOG, setIsLoadingOG] = useState(false);
  const [type, setType] = useState("");

  //Increment Opponent goals
  const handleAddOpponentGoal = async (type: "inc" | "dec") => {
    try {
      setIsLoadingOG(true);
      setType(type);

      const response = await fetch(apiConfig.matches, {
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          _id: match?._id,
          opponentGoals:
            type == "inc" ? match.opponentGoals + 1 : match.opponentGoals - 1,
        }),
        method: "PUT",
      });

      const results = await response.json();
      toast.success(results.message);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoadingOG(false);
      router.refresh();
      setType("");
    }
  };
  return (
    <PrimaryAccordion
      data={[
        {
          content: (
            <div className="flex items-center gap-10 ">
              <Button
                onClick={() => handleAddOpponentGoal("dec")}
                className=" justify-center _deleteBtn"
                waiting={isLoadingOG && type == "dec"}
                primaryText="Remove Opponent Goal"
                waitingText="Removing..."
              >
                <Minus className="mr-2 h-4 w-4" />
              </Button>

              <Button
                onClick={() => handleAddOpponentGoal("inc")}
                className=" justify-center _deleteBtn"
                waiting={isLoadingOG && type == "inc"}
                primaryText="Add Opponent Goal"
                waitingText="Adding..."
              >
                <Plus className="mr-2 h-4 w-4" />
              </Button>
            </div>
          ),
          value: "opponent",
          trigger: <div className="_label ml-autot">Update Opponent</div>,
        },
      ]}
    />
  );
}
