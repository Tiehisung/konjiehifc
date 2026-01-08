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
import { Input, TextArea } from "@/components/input/Inputs";
import { IPlayer } from "@/types/player.interface";
import { IMatch } from "@/types/match.interface";
import { z } from "zod";
import { fireEscape } from "@/hooks/Esc";
import { useFetch } from "@/hooks/fetch";
import { ECardType, ICard } from "@/types/card.interface";

const cardSchema = z.object({
  player: z.string().min(1, "Player is required"),
  minute: z.string().optional(),
  description: z.string().optional(),
  type: z.nativeEnum(ECardType),
  match: z.string().optional(),
});

type CardFormValues = z.infer<typeof cardSchema>;

interface IProps {
  player?: IPlayer;
  match?: IMatch;
  card?: ICard;
}

export function CardForm({ match, card, player: defaultPlayer }: IProps) {
  const router = useRouter();
  // Fetch players
  const { results: players, loading: isLoadingPlayers } = useFetch<IPlayer[]>({
    uri: "/players",
  });
  const { results: matches, loading: isLoadingMatches } = useFetch<IMatch[]>({
    uri: "/matches?status=UPCOMING",
  });
  console.log({ matches });

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: card
      ? ({ ...card, player: card?.player?._id } as CardFormValues)
      : {
          player: defaultPlayer?._id,
          match: match?._id,
          minute: "",
          description: "",
          type: ECardType.YELLOW,
        },
  });

  const selectedPlayerId = watch("player");
  const selectedPlayer = players?.data?.find((p) => p._id === selectedPlayerId);

  const onSubmit = async (data: CardFormValues) => {
    try {
      const player = players?.data?.find((p) => p._id === data.player);
      if (!player) return;

      const payload = {
        player: {
          _id: player._id,
          name: `${player.firstName} ${player.lastName}`,
          avatar: player.avatar,
          number: player.number,
        },
        description: `🤕 ${data.description}`,
        type: data.type,

        match: match ?? matches?.data?.find((m) => m._id == data?.match),
        minute: data.minute,
      } as ICard;

      const res = await fetch(apiConfig.cards + (card ? `/${card?._id}` : ""), {
        method: card ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      toast(result.message, { position: "bottom-center" });
      if (result.success) {
        reset({
          player: "",
          description: "",
          type: ECardType.YELLOW,
          match: match?._id,
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
          {card ? `Edit - ${card?.player?.name}` : "Add card"}:
          <AVATAR
            alt="injured player"
            src={selectedPlayer?.avatar as string}
            fallbackText="IP"
          />
        </h2>

        <div className="space-y-4">
          {/* Player */}
          {!(defaultPlayer || card) && (
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
                />
              )}
            />
          )}
          {!match && (
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
                />
              )}
            />
          )}

          <Controller
            control={control}
            name="minute"
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
            name="type"
            render={({ field, fieldState }) => (
              <PrimarySelect
                {...field}
                options={[
                  { label: "🟨 Yellow ", value: ECardType.YELLOW },
                  { label: "🟥 Red ", value: ECardType.RED },
                ]}
                label="Card type"
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
                placeholder="e.g., Hamstring, head card?..."
                error={fieldState?.error?.message}
              />
            )}
          />

          <Button
            type="submit"
            waiting={isSubmitting}
            className="w-full _primaryBtn"
            primaryText={card ? "Edit card" : "Add card"}
            waitingText={card ? "Editing card" : "Adding card"}
          >
            <Plus className="mr-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
}
