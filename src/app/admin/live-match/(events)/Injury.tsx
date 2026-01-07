"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { apiConfig } from "@/lib/configs";
import { getErrorMessage } from "@/lib";
import { Button } from "@/components/buttons/Button";
import { AVATAR } from "@/components/ui/avatar";
import { enumToOptions } from "@/lib/select";
import SELECT, { PrimarySelect } from "@/components/select/Select";
import { Input, TextArea } from "@/components/input/Inputs";
import { IPlayer } from "@/types/player.interface";
import { IMatch } from "@/types/match.interface";
import { IInjury } from "@/types/injury.interface";
import { z } from "zod";
import { symbols } from "@/data";
import { EInjurySeverity } from "@/types/injury.interface";
import { fireEscape } from "@/hooks/Esc";

const injurySchema = z.object({
  player: z.string().min(1, "Player is required"),
  minute: z.string().optional(),
  title: z.string().min(5, "Title is required"),
  description: z.string().optional(),
  severity: z.enum(EInjurySeverity),
});

type InjuryFormValues = z.infer<typeof injurySchema>;

interface InjuryEventsTabProps {
  players: IPlayer[];
  match?: IMatch;
}

export function InjuryForm({ players, match }: InjuryEventsTabProps) {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<InjuryFormValues>({
    resolver: zodResolver(injurySchema),
    defaultValues: {
      player: "",
      title: match?.title,
      minute: "",
      description: "",
      severity: EInjurySeverity.MINOR,
    },
  });

  const selectedPlayerId = watch("player");
  const selectedPlayer = players.find((p) => p._id === selectedPlayerId);

  const onSubmit = async (data: InjuryFormValues) => {
    try {
      const player = players.find((p) => p._id === data.player);
      if (!player) return;

      const payload: IInjury = {
        player: {
          _id: player._id,
          name: `${player.firstName} ${player.lastName}`,
          avatar: player.avatar,
          number: Number(player.number),
        },
        description: `🤕 ${data.description}`,
        severity: data.severity,
        title: `${data?.title}`,
        match,
        minute: data.minute,
      };

      const res = await fetch(apiConfig.injuries, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      toast(result.message, { position: "bottom-center" });
      if (result.success) {
        reset({
          player: "",
          title: match?.title ?? "",
          minute: "",
          description: "",
          severity: EInjurySeverity.MINOR,
        });

        fireEscape()
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      router.refresh();
    }
  };

  return (
    <Card className="p-6 rounded-none">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-6 text-2xl font-bold flex items-center justify-between">
          Add Injury
          <AVATAR
            alt="injured player"
            src={selectedPlayer?.avatar as string}
            fallbackText="IP"
          />
        </h2>

        <div className="space-y-4">
          {/* Player */}
          <Controller
            control={control}
            name="player"
            render={({ field, fieldState }) => (
              <SELECT
                {...field}
                options={players.map((p) => ({
                  label: `${p.number} - ${p.lastName} ${p.firstName}`,
                  value: p._id,
                }))}
                label="Player"
                placeholder="Select"
                selectStyles="w-full "
                error={fieldState?.error?.message}
                className="grid"
              />
            )}
          />
          <Controller
            control={control}
            name="title"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Title "
                placeholder="e.g. Title"
                error={fieldState?.error?.message}
              />
            )}
          />
          {/* Minute */}
          {match && (
            <Controller
              control={control}
              name="minute"
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  type="number"
                  label="Minute"
                  placeholder="e.g. 25"
                  others={{ min: 0, max: 120 }}
                  error={fieldState?.error?.message}
                />
              )}
            />
          )}

          {/* Severity */}
          <Controller
            control={control}
            name="severity"
            render={({ field, fieldState }) => (
              <PrimarySelect
                {...field}
                options={enumToOptions(EInjurySeverity)}
                label="Severity"
                placeholder="Select"
                triggerStyles="w-full"
                error={fieldState?.error?.message}
              />
            )}
          />

          {/* Description */}
          <Controller
            control={control}
            name="description"
            render={({ field, fieldState }) => (
              <TextArea
                {...field}
                label="Description"
                placeholder="e.g., Hamstring, head injury..."
                error={fieldState?.error?.message}
              />
            )}
          />

          <Button
            type="submit"
            waiting={isSubmitting}
            className="w-full _primaryBtn"
            primaryText="Add Injury"
            waitingText="Adding Injury"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Injury
          </Button>
        </div>
      </form>
    </Card>
  );
}
