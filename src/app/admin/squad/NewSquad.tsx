"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import { IPlayer } from "../../players/page";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PrimarySelect } from "@/components/select/Select";
import { Button } from "@/components/buttons/Button";
import { ITeamProps } from "@/app/matches/(fixturesAndResults)";
import { IManager } from "../managers/page";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { TextArea } from "@/components/input/Inputs";
import { playPositions } from "@/data";
import { toast } from "sonner";
import { DATEPICKER } from "@/components/input/DatePicker";
import { INPUT } from "@/components/input/input";
import { Label } from "@/components/ui/label";
import { getErrorMessage } from "@/lib";
import { useRouter } from "next/navigation";
import { ISquad } from "./page";

interface IProps {
  players?: IPlayer[];
  teams?: ITeamProps[];
  managers?: IManager[];
 
}

interface SquadFormValues {
  opponent: string;
  venue: "Home" | "Away";
  description?: string;
  selectedPlayers: Record<string, boolean>;
  positions: Record<string, string>;
  coach?: string;
  assistant?: string;
  date: string;
  time: string;
}



// 🧩 Joi Validation Schema
const squadSchema = Joi.object<SquadFormValues>({
  opponent: Joi.string().required().label("Opponent"),

  venue: Joi.string().valid("Home", "Away").required().label("Venue"),

  description: Joi.string().allow("").max(500).label("Description"),

  selectedPlayers: Joi.object().required(),

  positions: Joi.object().required(),

  date: Joi.string().required().label("Match Date"),
  time: Joi.string().required().label("Match Time"),

  coach: Joi.string().required().label("Coach"),
  assistant: Joi.string().required().label("Assistant"),
});

const NewSquad = ({ players = [], teams = [], managers = [],  }: IProps) => {
  const [waiting, setWaiting] = useState(false);

  const router = useRouter();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SquadFormValues>({
    resolver: joiResolver(squadSchema),
    defaultValues: {
      selectedPlayers: {},
      positions: {},
    },
  });

 
  const selectedPlayers = watch("selectedPlayers");
  const positions = watch("positions");

  const onSubmit = async (data: SquadFormValues) => {
    try {
      const selected = Object.values(data.selectedPlayers || {}).filter(
        Boolean
      );
      if (selected.length < 5) {
        toast.error("Please select at least 11 players for the squad.", {
          position: "bottom-center",
        });

        return;
      }

      const coachObj = managers.find((m) => m._id === data.coach);
      const assistantObj = managers.find((m) => m._id === data.assistant);

      const payload: ISquad = {
        opponent: teams.find((t) => t._id === data.opponent)!,
        venue: data.venue,
        description: data.description,
        coach: coachObj
          ? {
              name: coachObj.fullname,
              _id: coachObj._id,
              avatar: coachObj.avatar?.secure_url,
            }
          : undefined,
        assistant: assistantObj
          ? {
              name: assistantObj.fullname,
              _id: assistantObj._id,
              avatar: assistantObj.avatar?.secure_url,
            }
          : undefined,
        players: players
          .filter((p) => data.selectedPlayers[p._id])
          .map((p) => ({
            _id: p._id,
            name: `${p.firstName} ${p.lastName}`,
            position: data.positions[p._id] || p.position,
            avatar: p.avatar?.secure_url,
          })),
        date: data.date,
        time: data.time,
      };

      setWaiting(true);
      const res = await fetch("/api/squad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success("Squad created successfully!");
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setWaiting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grow space-y-4">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-black">NEW MATCH SQUAD</CardTitle>
          <CardDescription className="flex gap-4 justify-between items-center flex-wrap">
            {/* Opponent Select */}
            <div className="w-full sm:w-auto ">
              <Label className="mb-2">Oponent</Label>
              <Controller
                name="opponent"
                control={control}
                render={({ field, fieldState }) => (
                  <PrimarySelect
                    options={teams.map((t) => ({
                      label: `${t.name} (${t.alias})`,
                      value: t._id,
                    }))}
                    placeholder="Opponent"
                    onChange={field.onChange}
                    error={fieldState?.error?.message}
                  />
                )}
              />
            </div>

            {/* Venue Select */}
            <div className="w-full sm:w-auto">
              <Label className="mb-2">Venue</Label>
              <Controller
                name="venue"
                control={control}
                render={({ field, fieldState }) => (
                  <PrimarySelect
                    options={[
                      { label: "Home", value: "Home" },
                      { label: "Away", value: "Away" },
                    ]}
                    placeholder="Venue"
                    onChange={field.onChange}
                    error={fieldState?.error?.message}
                  />
                )}
              />
            </div>

            <Controller
              name="date"
              control={control}
              render={({ field, fieldState }) => (
                <DATEPICKER
                  {...field}
                  onChange={(date) => field.onChange(date)}
                  value={field.value as string}
                  error={fieldState?.error?.message}
                  placeholder="Match Date"
                  label="Match Date"
                />
              )}
            />

            <Controller
              name="time"
              control={control}
              render={({ field, fieldState }) => (
                <INPUT
                  {...field}
                  value={field.value as string}
                  error={fieldState?.error?.message}
                  placeholder="Description"
                  type="time"
                  label="Match Time"
                />
              )}
            />

            {/* Match Description */}
            <div className="w-full">
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => (
                  <TextArea
                    {...field}
                    error={fieldState?.error?.message}
                    placeholder="Description"
                    dataTip="Description of this match event"
                  />
                )}
              />
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Players Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-black">Player</th>
                  <th className="text-left py-3 px-4 font-black">Position</th>
                  <th className="text-center py-3 px-4 font-black">Jersey</th>
                </tr>
              </thead>

              <tbody>
                {players.map((player) => {
                  const isSelected = selectedPlayers[player._id];

                  return (
                    <tr
                      key={player._id}
                      className={`border-b border-border transition-colors ${
                        isSelected ? "bg-green-50 dark:bg-green-950/20" : ""
                      }`}
                    >
                      <td className="py-3 px-4 font-semibold uppercase">
                        <Button
                          type="button"
                          onClick={() =>
                            setValue(
                              `selectedPlayers.${player._id}`,
                              !isSelected
                            )
                          }
                          className="bg-transparent hover:opacity-90"
                        >
                          {isSelected ? (
                            <MdCheckBox
                              size={24}
                              className="text-primaryGreen min-h-5 min-w-5"
                            />
                          ) : (
                            <MdCheckBoxOutlineBlank
                              size={24}
                              className="text-muted-foreground min-h-5 min-w-5"
                            />
                          )}
                          {`${player.lastName} ${player.firstName}`}
                        </Button>
                      </td>

                      <td className="text-center py-3 px-4">
                        <PrimarySelect
                          options={playPositions.map((pos) => ({
                            label: pos,
                            value: pos,
                          }))}
                          placeholder="Position"
                          triggerStyles="border-none text-primary font-bold"
                          onChange={(val) =>
                            setValue(`positions.${player._id}`, val)
                          }
                          disabled={!selectedPlayers[player._id]}
                          value={positions[player._id] || player?.position}
                          required={selectedPlayers[player._id]}
                          name={`pos-${player._id}`}
                          error={
                            isSelected && !positions[player._id]
                              ? "Required"
                              : ""
                          }
                        />
                      </td>

                      <td className="text-center py-3 px-4">
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full font-bold">
                          {player.jersey}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Coach Selection */}
          <div className="mt-10">
            <h1 className="font-semibold mb-2">Technical Leadership</h1>

            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-b border-border">
                  <TableHead>Coach</TableHead>
                  <TableHead>Assistant</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell>
                    <Controller
                      name="coach"
                      control={control}
                      render={({ field, fieldState }) => (
                        <PrimarySelect
                          options={managers.map((m) => ({
                            label: m.fullname,
                            value: m._id,
                          }))}
                          placeholder="Coach"
                          onChange={field.onChange}
                          error={fieldState?.error?.message}
                          name={"coach"}
                        />
                      )}
                    />
                  </TableCell>

                  <TableCell>
                    <Controller
                      name="assistant"
                      control={control}
                      render={({ field, fieldState }) => (
                        <PrimarySelect
                          options={managers.map((m) => ({
                            label: m.fullname,
                            value: m._id,
                          }))}
                          placeholder="Assistant"
                          onChange={field.onChange}
                          error={fieldState?.error?.message}
                          name="assistant-coach"
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="mt-6 text-right">
            <Button
              type="submit"
              primaryText="Save Squad"
              waiting={waiting}
              className="_primaryBtn p-3"
            />
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default NewSquad;
