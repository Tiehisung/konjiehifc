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
import SELECT, { PrimarySelect } from "@/components/select/Select";
import {   TextArea } from "@/components/input/Inputs";
import { EPlayerPosition, IPlayer } from "@/types/player.interface";
import { IMatch } from "@/types/match.interface";
import { z } from "zod";
import { fireEscape } from "@/hooks/Esc";
import { useFetch } from "@/hooks/fetch";
import { IMvp } from "@/types/mvp.interface";
import { enumToOptions } from "@/lib/select";

const mvpSchema = z.object({
  player: z.string().min(1, "Player is required"),
  description: z.string().optional(),
  positionPlayed: z.enum(EPlayerPosition),
  match: z.string().optional(),
});

type MvpFormValues = z.infer<typeof mvpSchema>;

interface IProps {
  player?: IPlayer;
  match?: IMatch;
  mvp?: IMvp;
}

export function MVPForm({
  match: defaultMatch,
  mvp: defaultMVP,
  player: defaultPlayer,
}: IProps) {
  const router = useRouter();
  // Fetch players
  const { results: players, loading: isLoadingPlayers } = useFetch<IPlayer[]>({
    uri: "/players",
  });
  const { results: matches, loading: isLoadingMatches } = useFetch<IMatch[]>({
    uri: "/matches",
    filters: { status: "UPCOMING" },
  });

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<MvpFormValues>({
    resolver: zodResolver(mvpSchema),
    defaultValues: defaultMVP
      ? ({
          ...defaultMVP,
          player: defaultMVP?.player?._id,
          match: defaultMVP.match?._id,
        } as MvpFormValues)
      : {
          player: defaultPlayer?._id,
          match: defaultMatch?._id,

          description: "",
          positionPlayed: defaultPlayer?.position,
        },
  });

  const selectedPlayerId = watch("player");
  const selectedPlayer = players?.data?.find((p) => p._id === selectedPlayerId);

  const onSubmit = async (data: MvpFormValues) => {
    try {
      const player = players?.data?.find((p) => p._id === data.player);
      if (!player) return;

      const _match =
        defaultMatch ?? matches?.data?.find((m) => m._id == data?.match);

      const payload = {
        ...data,
        player: {
          _id: player._id,
          name: `${player.firstName} ${player.lastName}`,
          avatar: player.avatar,
          number: player.number,
        },
        description: `${data.description}`,
        positionPlayed: data.positionPlayed,

        match: _match,

        date: _match?.date,
      };

      const res = await fetch(
        apiConfig.mvps + (defaultMVP ? `/${defaultMVP?._id}` : ""),
        {
          method: defaultMVP ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      toast(result.message, { position: "bottom-center" });
      if (result.success) {
        reset({
          player: "",
          description: "",
          positionPlayed: defaultPlayer?.position,
          match: defaultMatch?._id,
        });

        fireEscape();
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
          {defaultMVP ? `Edit - ${defaultMVP?.player?.name}` : "Add MoTM"}:
          <AVATAR
            alt="mvp player"
            src={selectedPlayer?.avatar as string}
            fallbackText="IP"
          />
        </h2>

        <div className="space-y-4">
          {/* Player */}
          {!(defaultPlayer || defaultMVP) && (
            <Controller
              control={control}
              name="player"
              render={({ field, fieldState }) => (
                <SELECT
                  {...field}
                  options={
                    players?.data?.map((p) => ({
                      label: `${p.number} - ${p.lastName} ${p.firstName}`,
                      value: p._id,
                    })) ?? []
                  }
                  label="Player"
                  placeholder="Select"
                  selectStyles="w-full "
                  error={fieldState?.error?.message}
                  className="grid"
                  loading={isLoadingPlayers}
                />
              )}
            />
          )}
          {!(defaultMatch || defaultMVP) && (
            <Controller
              control={control}
              name="match"
              render={({ field, fieldState }) => (
                <SELECT
                  {...field}
                  options={
                    matches?.data?.map((m) => ({
                      label: m.title,
                      value: m._id,
                    })) ?? []
                  }
                  label="Match"
                  placeholder="Select"
                  selectStyles="w-full "
                  error={fieldState?.error?.message}
                  className="grid"
                  loading={isLoadingMatches}
                />
              )}
            />
          )}

          {/* Severity */}
          <Controller
            control={control}
            name="positionPlayed"
            render={({ field, fieldState }) => (
              <PrimarySelect
                {...field}
                options={enumToOptions(EPlayerPosition)}
                label="Position Played"
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
                placeholder="e.g., Wrong celebration, fight..."
                error={fieldState?.error?.message}
              />
            )}
          />

          <Button
            type="submit"
            waiting={isSubmitting}
            className="w-full _primaryBtn"
            primaryText={defaultMVP ? "Edit MoTM" : "Add MoTM"}
            waitingText={defaultMVP ? "Editing MoTM" : "Adding MoTM"}
          >
            <Plus className="mr-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
}
