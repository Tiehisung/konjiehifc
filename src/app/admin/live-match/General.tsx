"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { Input } from "@/components/input/Inputs";
import { Button } from "@/components/buttons/Button";
import { toast } from "sonner";
import { getErrorMessage, shortText } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { IMatchEvent, IMatchProps } from "@/app/matches/(fixturesAndResults)";

interface GeneralEventsTabProps {
  match: IMatchProps;
}

export function GeneralEventsTab({ match }: GeneralEventsTabProps) {
  const [form, setForm] = useState({ minute: "", description: "" });

  const [isLoading, setIsLoading] = useState(false);

  const handleAddEvent = async () => {
    try {
      setIsLoading(true);
      if (!form.minute || !form.description) {
        toast("Please fill in all fields");
        return;
      }

      const newEvent: IMatchEvent = {
        minute: Number.parseInt(form.minute),
        description: form.description,
        title: shortText(form.description),
        type: "general",
      };

      const response = await fetch(`${apiConfig.matches}/live/events`, {
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ matchId: match?._id, event: newEvent }),
        method: "PUT",
      });

      const results = await response.json();
      toast.success(results.message);

      setForm({ minute: "", description: "" });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 rounded-none">
        <form onSubmit={handleAddEvent}>
          <h2 className="mb-6 text-2xl font-bold">Add General Event</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Minute</label>
                <Input
                  type="number"
                  others={{ min: "0", max: "120" }}
                  placeholder="e.g., 35"
                  value={form.minute}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, minute: e.target.value }))
                  }
                  name={"generalMinutes"}
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
                  name={"generalDescription"}
                />
              </div>
            </div>

            <Button
              onClick={handleAddEvent}
              className="w-full justify-center _primaryBtn"
              waiting={isLoading}
              primaryText=" Add Event"
              waitingText="Adding Event"
              type="submit"
            >
              <Plus className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>

      {/* {events.length > 0 && (
        <Card className="p-6">
          <h3 className="mb-4 text-xl font-bold">General Events</h3>
          <div className="space-y-2">
            {events.map((event) => (
              <div
                key={event.description}
                className="flex items-center justify-between rounded-lg bg-muted p-4"
              >
                <div>
                  <p className="font-semibold">
                    {event.minute}' - {event.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {event.description}
                  </p>
                </div>
                <Button onClick={() => console.log(event.description)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )} */}
    </div>
  );
}
