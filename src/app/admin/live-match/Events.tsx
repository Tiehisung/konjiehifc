"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardEventsTab } from "./Card";
import { GeneralEventsTab } from "./General";
import { ScoreEventsTab } from "./Goals";
import { InjuryEventsTab } from "./Injury";
import { IPlayer } from "@/app/players/page";
import {
  IMatchEvent,
  IMatchProps,
  ITeamProps,
} from "@/app/matches/(fixturesAndResults)";
import { Button } from "@/components/buttons/Button";
import { Trash2 } from "lucide-react";
import { apiConfig } from "@/lib/configs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getErrorMessage } from "@/lib";

interface IProps {
  players?: IPlayer[];
  opponent?: ITeamProps;
  match: IMatchProps;
}
export function MatchEventsAdmin({ players, opponent, match }: IProps) {
  return (
    <div>
      <Tabs defaultValue="scores" className="w-full gap-0">
        <TabsList className="flex w-full overflow-x-auto h-14 rounded-none">
          <TabsTrigger value="scores" className="whitespace-nowrap">
            Score Events
          </TabsTrigger>

          <TabsTrigger value="cards" className="whitespace-nowrap">
            Card Events
          </TabsTrigger>

          <TabsTrigger value="injuries" className="whitespace-nowrap">
            Injuries
          </TabsTrigger>

          <TabsTrigger value="general" className="whitespace-nowrap">
            General
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scores" className="rounded-none">
          <ScoreEventsTab
            players={players as IPlayer[]}
            opponent={opponent}
            match={match}
          />
        </TabsContent>

        <TabsContent value="cards">
          <CardEventsTab players={players as IPlayer[]} />
        </TabsContent>

        <TabsContent value="injuries">
          <InjuryEventsTab players={players as IPlayer[]} match={match} />
        </TabsContent>

        <TabsContent value="general">
          <GeneralEventsTab match={match} />
        </TabsContent>
      </Tabs>

      {match?.events?.map((event, index) => (
        <MatchEventCard event={event} key={index} match={match} />
      ))}
    </div>
  );
}

function MatchEventCard({
  match,
  event,
}: {
  match: IMatchProps;
  event: IMatchEvent;
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const onDelete = async () => {
    try {
      const response = await fetch(apiConfig.matches, {
        body: JSON.stringify({
          _id: match?._id,
          events: match?.events?.filter(
            (e) => e.description !== event.description
          ),
        }),
        headers: { "content-type": "application/json" },
        method: "PUT",
      });
      const result = await response.json();
      if (result.success) return toast.success(result.message);
      else toast.error(result.message);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };
  return (
    <div className="flex items-start gap-4 rounded-lg bg-muted p-4">
      <span className="text-xl font-semibold p-1 ">{event?.minute}</span>
      <div className="grow pb-4 border-b border-border/70">
        <p className="font-semibold">{event?.title}</p>

        <p className="text-xs text-muted-foreground ">{event?.description}</p>
      </div>

      <Button
        waiting={isLoading}
        waitingText=""
        onClick={onDelete}
        className="ml-auto"
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}
