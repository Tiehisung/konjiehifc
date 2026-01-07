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
import { Plus } from "lucide-react";
import { IPlayer } from "@/types/player.interface";
import { toast } from "sonner";
import { apiConfig } from "@/lib/configs";
import { getErrorMessage } from "@/lib";
import { Button } from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { IMatch } from "@/types/match.interface";
import { symbols } from "@/data";
import { EInjurySeverity, IInjury } from "@/types/injury.interface";
import { IPostInjury } from "@/models/injury";
import SELECT, { PrimarySelect } from "@/components/select/Select";
import { enumToOptions } from "@/lib/select";
import { Input, TextArea } from "@/components/input/Inputs";
import { AVATAR } from "@/components/ui/avatar";

interface InjuryEventsTabProps {
  players: IPlayer[];
  match?: IMatch;
}

export function InjuryForm({ players, match }: InjuryEventsTabProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    player: "",
    minute: "",
    description: "",
    severity: EInjurySeverity.MINOR,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleAddInjury = async () => {
    try {
      setIsLoading(true);

      if (!form.player || !form.description) {
        toast.warning("Please fill in player, minute, and description");
        return;
      }

      const player = players.find((p) => p._id === form.player);
      if (!player) return;

      const newInjury: IInjury = {
        player: {
          _id: player?._id,
          name: `${player?.firstName} ${player?.lastName}`,
          avatar: player?.avatar,
          number: Number(player?.number),
        },
        description: `🤕 ${form.description}`,
        severity: form.severity,
        title: `${match?.title} ${symbols.longDash} ${match?.date}`,
        match,
        minute: form.minute,
      };

      setForm({
        player: "",
        minute: "",
        description: "",
        severity: EInjurySeverity.MINOR,
      });

      const response = await fetch(apiConfig.injuries, {
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newInjury),
        method: "POST",
      });

      const results = await response.json();
      toast.success(results.message);

      setForm({
        minute: "",
        description: "",
        player: "",
        severity: EInjurySeverity.MINOR,
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <Card className="p-6 rounded-none">
      <form onSubmit={handleAddInjury}>
        <h2 className="mb-6 text-2xl font-bold flex items-center justify-between gap-6">
          Add Injury{" "}
          <AVATAR
            alt="injured player"
            src={players?.find((p) => p._id == form.player)?.avatar as string}
            fallbackText={"IP"}
           
          />
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 ">
            <SELECT
              options={
                players?.map((p) => ({
                  label: `${p.number} - ${p.lastName} ${p?.firstName}`,
                  value: p._id,
                })) ?? []
              }
              label=" Player"
              placeholder="Select"
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  player: value,
                }))
              }
              selectStyles="grow w-full"
              required
              className="grid"
            />

            {match && (
              <Input
                label="Minute"
                type="number"
                others={{ min: 0, max: 120 }}
                placeholder="e.g., 25"
                value={form.minute}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, minute: e.target.value }))
                }
                name={"minute"}
              />
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 ">
            <PrimarySelect
              options={enumToOptions(EInjurySeverity)}
              label="Severity"
              placeholder="Select"
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  severity: value as EInjurySeverity,
                }))
              }
              triggerStyles="grow w-full"
            />
            <TextArea
              label="Description"
              placeholder="e.g., Head injury..., Hamstring ..., etc."
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              name={"goalDescription"}
              required
            />
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
  );
}
