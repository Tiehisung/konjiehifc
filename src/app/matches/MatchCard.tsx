import { IMatchProps, ITeamProps } from "@/app/matches/(fixturesAndResults)";
import { AVATAR } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { checkGoals, checkTeams } from "@/lib";
import {
  formatDate,
  formatTimeToAmPm,
  getTimeLeftOrAgo,
} from "@/lib/timeAndDate";

import { DIALOG } from "@/components/Dialog";
import { Eye, View } from "lucide-react";

import { IPlayer } from "@/app/players/page";

import { Button } from "@/components/buttons/Button";
import { IManager } from "../admin/managers/page";
import NewSquad from "../admin/squad/NewSquad";
import SquadCard from "../admin/squad/SquadCard";

export function MatchFixtureCard({
  match,
  managers,
  matches,
  players,
}: {
  match?: IMatchProps;
  teams?: ITeamProps[];
  players?: IPlayer[];
  managers?: IManager[];
  matches?: IMatchProps[];
}) {
  const { away, home } = checkTeams(match);
  const scores = checkGoals(match);
  const status = match?.status;
  return (
    <div className="bg-card border p-4 space-y-2.5">
      <div className="flex justify-between gap-5">
        <Badge
          variant={
            status == "LIVE"
              ? "destructive"
              : status == "COMPLETED"
              ? "secondary"
              : "outline"
          }
        >
          {status}
        </Badge>
        <span>
          {formatDate(match?.date, "March 2, 2025")}(
          {getTimeLeftOrAgo(match?.date).formatted})
        </span>
      </div>
      <div className=" flex items-center justify-between">
        <ul>
          <li className="flex items-center gap-1.5 mb-2">
            <AVATAR
              src={home?.logo as string}
              alt={home?.name as string}
              className="h-7 w-7 aspect-square rounded-none"
            />
            <span className="w-36 line-clamp-1">{home?.name}</span>
          </li>
          <li className="flex items-center gap-1.5">
            <AVATAR
              src={away?.logo as string}
              alt={away?.name as string}
              className="h-7 w-7 aspect-square rounded-none"
            />
            <span className="w-36 line-clamp-1">{away?.name}</span>
          </li>
        </ul>

        <div className="font-semibold">
          {status == "COMPLETED" ? (
            <div className="grid">
              <span className="px-3 text-lg">{scores?.home}</span>
              <span className="px-3 text-lg">{scores?.away}</span>
            </div>
          ) : status == "LIVE" ? (
            <span className="text-destructive "> Live</span>
          ) : (
            <span>{formatTimeToAmPm(match?.time as string)}</span>
          )}
        </div>
      </div>
      <hr />
      <div>
        <div className="flex items-center text-sm gap-5">
          <span className="w-20 py-2 font-semibold">
            {match?.status == "COMPLETED" ? "FT" : match?.status}
          </span>
          {match?.squad ? (
            <DIALOG
              trigger={
                <span className="flex items-center gap-1 font-light _hover _shrink">
                  <View size={16} />
                  Squad
                </span>
              }
              title=""
              className="min-w-[80vw]"
            >
              <SquadCard squad={match?.squad} match={match} />
            </DIALOG>
          ) : (
            <DIALOG
              trigger={
                <Button
                  primaryText="Choose Squad"
                  className="text-xs font-thin _secondaryBtn "
                />
              }
              title={`Select Squad for ${match?.title}`}
              className="min-w-[80vw]"
            >
              <NewSquad
                players={players}
                managers={managers}
                matches={matches}
                defaultMatch={match}
              />
            </DIALOG>
          )}
        </div>
      </div>
    </div>
  );
}
