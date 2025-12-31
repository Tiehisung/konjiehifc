"use client";

import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { PrimarySelect } from "@/components/select/Select";
import { Button } from "@/components/buttons/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { IPlayer } from "@/types/player.interface";

export interface IGoalEvent {
  scorer: string;
  assist?: string;
  minute: number;
}

interface IScoreEventForm {
  goals: IGoalEvent[];
}

interface IProps {
  players: IPlayer[];
  onSave?: (data: IScoreEventForm) => void;
}

export default function ScoreEventBoard({ players, onSave }: IProps) {
  const { control, handleSubmit } = useForm<IScoreEventForm>({
    defaultValues: {
      goals: [{ scorer: "", assist: "", minute: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "goals",
  });

  const onSubmit = (data: IScoreEventForm) => {
    console.log("Goal Events:", data);
    onSave?.(data);
    toast.success("Goal events saved successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-black">GOAL EVENTS</CardTitle>
        </CardHeader>

        <CardContent>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-b pb-4 mb-4"
            >
              {/* Scorer */}
              <div>
                <Label>Scorer</Label>
                <Controller
                  name={`goals.${index}.scorer`}
                  control={control}
                  render={({ field }) => (
                    <PrimarySelect
                      options={players.map((p) => ({
                        label: `${p.firstName} ${p.lastName}`,
                        value: p._id,
                      }))}
                      placeholder="Select scorer"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  )}
                />
              </div>

              {/* Assist */}
              <div>
                <Label>Assist</Label>
                <Controller
                  name={`goals.${index}.assist`}
                  control={control}
                  render={({ field }) => (
                    <PrimarySelect
                      options={[
                       
                        ...players.map((p) => ({
                          label: `${p.firstName} ${p.lastName}`,
                          value: p._id,
                        })),
                      ]}
                      placeholder="Assist giver"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  )}
                />
              </div>

              {/* Minute */}
              <div>
                <Label>Minute</Label>
                <Controller
                  name={`goals.${index}.minute`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      max={120}
                      placeholder="e.g. 45"
                    />
                  )}
                />
              </div>

              {/* Remove */}
              <div className="flex items-end">
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-2 rounded-md"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          <Button
            type="button"
            onClick={() => append({ scorer: "", assist: "", minute: 0 })}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg"
          >
            + Add Goal Event
          </Button>

          <div className="text-right mt-8">
            <Button
              type="submit"
              primaryText="Save Goal Events"
              className="_primaryBtn p-3"
            />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
