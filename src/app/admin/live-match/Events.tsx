"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardEventsTab } from "./Card";
import { GeneralEventsTab } from "./General";
import { ScoreEventsTab } from "./Goals";
import { InjuryEventsTab } from "./Injury";
import { SubstitutionEventsTab } from "./Substitution";
import { IPlayer } from "@/app/players/page";
import { IMatchProps, ITeamProps } from "@/app/matches/(fixturesAndResults)";
import { Button } from "@/components/buttons/Button";
import { Trash2 } from "lucide-react";

interface Player {
  id: string;
  name: string;
  number: number;
}

interface Goal {
  id: string;
  scorer: Player;
  assist?: Player;
  minute: number;
}

interface CardEvent {
  id: string;
  player: Player;
  type: "yellow" | "red";
  minute: number;
  description?: string;
}

interface Injury {
  id: string;
  player: Player;
  minute: number;

  severity: "minor" | "moderate" | "severe";
}

interface Substitution {
  id: string;
  playerOut: Player;
  playerIn: Player;
  minute: number;
}

interface GeneralEvent {
  id: string;
  minute: number;

  description: string;
}

interface MatchEvent {
  goals: Goal[];
  cards: CardEvent[];
  injuries: Injury[];
  substitutions: Substitution[];
  generalEvents: GeneralEvent[];
}

interface IProps {
  players?: IPlayer[];
  opponent?: ITeamProps;
  match: IMatchProps;
}
export function MatchEventsAdmin({ players, opponent, match }: IProps) {
  console.log({match})
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
          <TabsTrigger value="substitutions" className="whitespace-nowrap">
            Substitutions
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

        <TabsContent value="substitutions">
          <SubstitutionEventsTab players={players as IPlayer[]} />
        </TabsContent>

        <TabsContent value="general">
          <GeneralEventsTab match={match} />
        </TabsContent>
      </Tabs>

      {match?.events?.map((event) => {
        // const type = event.type;

        return (
          <div
            key={event?.description}
            className="flex items-center justify-between rounded-lg bg-muted p-4"
          >
            <div>
              <p className="font-semibold">{event.title}</p>

              <p className="text-xs text-muted-foreground">
                {event.description}
              </p>
            </div>
            <Button onClick={() => console.log(event.description)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
