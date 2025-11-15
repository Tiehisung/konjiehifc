"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/buttons/Button";
import { Input } from "@/components/input/Inputs";
import SingleFilePicker from "@/components/files/SingleFilePicker";
import { TConvertedFile, IResultProps } from "@/types";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { PrimarySelect } from "@/components/select/Select";
import { CgRemove } from "react-icons/cg";

type Player = {
  fullName: string;
  position: string;
  nationality: string;
  jerseyNumber: number;
  role: "Player" | "Captain" | "Vice Captain" | "Coach" | "Goalkeeper";
  photo?: TConvertedFile | null;
};

type SquadForm = {
  teamName: string;
  season: string;
  players: Player[];
};

const positions = ["Goalkeeper", "Defender", "Midfielder", "Forward", "Coach"];

const roles = ["Player", "Captain", "Vice Captain", "Coach", "Goalkeeper"];

export default function CreateSquad() {
  const [waiting, setWaiting] = useState(false);

  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const res = await fetch("/api/players");
        const data = await res.json();
        setPlayers(data.players);
      } catch (err) {
        console.error("Failed to fetch players", err);
      }
    };

    getPlayers();
  }, []);

  const { control, handleSubmit, reset } = useForm<SquadForm>({
    defaultValues: {
      teamName: "Konjieh FC",
      season: "",
      players: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "players",
  });

  const onSubmit = async (data: SquadForm) => {
    try {
      setWaiting(true);
      const res = await fetch(apiConfig.base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: IResultProps = await res.json();
      if (result.success) {
        toast(result.message);
        reset();
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "Squad creation failed"));
    } finally {
      setWaiting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-5">
      <h1 className="_title mb-4">Create Konjieh FC Squad</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4">
        <Controller
          control={control}
          name="teamName"
          render={({ field }) => (
            <Input {...field} label="Team Name" placeholder="Konjieh FC" />
          )}
        />

        <Controller
          control={control}
          name="season"
          render={({ field }) => (
            <Input {...field} label="Season" placeholder="2025/26" />
          )}
        />
      </div>

      <section className="space-y-8">
        {fields.map((player, index) => (
          <div
            key={player.id}
            className="relative border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="absolute top-2 right-2">
              <Button
                primaryText="Remove"
                onClick={async () => remove(index)}
                className="text-red-400 text-xs _deleteBtn"
              >
                <CgRemove />
              </Button>
            </div>

            <h3 className="font-semibold text-sky-700 mb-3">
              Player {index + 1}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Controller
                control={control}
                name={`players.${index}.fullName`}
                render={({ field }) => (
                  <Input {...field} label="Full Name" placeholder="John Doe" />
                )}
              />

              <div>
                <p>Position</p>
                <Controller
                  control={control}
                  name={`players.${index}.position`}
                  render={({ field }) => (
                    <PrimarySelect
                      {...field}
                      options={positions.map((p) => ({ label: p, value: p }))}
                    />
                  )}
                />
              </div>

              <Controller
                control={control}
                name={`players.${index}.nationality`}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Nationality"
                    placeholder="Sierra Leone"
                  />
                )}
              />

              <Controller
                control={control}
                name={`players.${index}.jerseyNumber`}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label="Jersey Number"
                    placeholder="10"
                  />
                )}
              />

              <div>
                <p>Role</p>
                <Controller
                  control={control}
                  name={`players.${index}.role`}
                  render={({ field }) => (
                    <PrimarySelect
                      {...field}
                      options={roles.map((r) => ({ label: r, value: r }))}
                    />
                  )}
                />
              </div>

              <Controller
                control={control}
                name={`players.${index}.photo`}
                render={({ field }) => (
                  <div>
                    <p className="_label">Player Photo</p>
                    <SingleFilePicker
                      exportFile={(file) => field.onChange(file)}
                      pickerId={`player-photo-${index}`}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <Button
            onClick={() =>
              append({
                fullName: "",
                position: "",
                nationality: "",
                jerseyNumber: 0,
                role: "Player",
                photo: null,
              })
            }
            className="_primaryBtn"
          >
            + Add Player
          </Button>
        </div>
      </section>

      <div className="pt-4 border-t">
        <Button
          type="submit"
          primaryText="Save Squad"
          waiting={waiting}
          waitingText="Saving..."
          className="_primaryBtn p-3 ml-auto"
        />
      </div>
    </form>
  );
}
