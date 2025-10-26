"use client";

import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { PrimarySelect } from "@/components/select/Select";
import { Button } from "@/components/buttons/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { INPUT } from "@/components/input/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { IPlayer } from "../players/page";

export interface IGoalEvent {
  scorer: string;
  assist?: string;
  minute: number;
  card?: "yellow" | "red";
}

interface IScoreboardForm {
  events: IGoalEvent[];
}

interface IProps {
  players: IPlayer[];
  onSave?: (data: IScoreboardForm) => void;
}

const ScoreboardManager = ({ players, onSave }: IProps) => {
  const { control, handleSubmit } = useForm<IScoreboardForm>({
    defaultValues: {
      events: [{ scorer: "", assist: "", minute: 0, card: undefined }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "events",
  });

  const handleFormSubmit = (data: IScoreboardForm) => {
    console.log("Scoreboard Data:", data);
    onSave?.(data);
    toast.success("Scoreboard updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-black">MATCH SCOREBOARD</CardTitle>
        </CardHeader>
        <CardContent>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 sm:grid-cols-5 gap-4 border-b pb-4 mb-4"
            >
              {/* Goal Scorer */}
              <div>
                <Label>Scorer</Label>
                <Controller
                  name={`events.${index}.scorer`}
                  control={control}
                  render={({ field }) => (
                    <PrimarySelect
                      options={players.map((p) => ({
                        label: `${p.firstName} ${p.lastName}`,
                        value: p._id,
                      }))}
                      placeholder="Select Scorer"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  )}
                />
              </div>

              {/* Assist Giver */}
              <div>
                <Label>Assist</Label>
                <Controller
                  name={`events.${index}.assist`}
                  control={control}
                  render={({ field }) => (
                    <PrimarySelect
                      options={[
                        { label: "None", value: "" },
                        ...players.map((p) => ({
                          label: `${p.firstName} ${p.lastName}`,
                          value: p._id,
                        })),
                      ]}
                      placeholder="Assist Giver"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  )}
                />
              </div>

              {/* Goal Minute */}
              <div>
                <Label>Minute</Label>
                <Controller
                  name={`events.${index}.minute`}
                  control={control}
                  render={({ field }) => (
                    <INPUT
                      {...field}
                      placeholder="e.g. 45"
                      type="number"
                    //   min={1}
                    //   max={120}
                      others={{ min: 1, max: 120, }}
                    />
                  )}
                />
              </div>

              {/* Card Assignment */}
              <div>
                <Label>Card</Label>
                <Controller
                  name={`events.${index}.card`}
                  control={control}
                  render={({ field }) => (
                    <PrimarySelect
                      options={[
                        { label: "None", value: "" },
                        { label: "Yellow", value: "yellow" },
                        { label: "Red", value: "red" },
                      ]}
                      placeholder="Card"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  )}
                />
              </div>

              {/* Remove Button */}
              <div className="flex items-end">
                <Button
                  type="button"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-2 rounded-md"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          {/* Add Another Event */}
          <Button
            type="button"
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg"
            onClick={() =>
              append({ scorer: "", assist: "", minute: 0, card: undefined })
            }
          >
            + Add Event
          </Button>

          {/* Save */}
          <div className="text-right mt-8">
            <Button
              type="submit"
              primaryText="Save Scoreboard"
              className="_primaryBtn p-3"
            />
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default ScoreboardManager;
