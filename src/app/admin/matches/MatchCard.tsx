import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { AVATAR } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {    shortText } from "@/lib";
import {  checkMatchMetrics,checkTeams } from "@/lib/compute/match";
import { apiConfig } from "@/lib/configs";
import {
  formatDate,
  formatTimeToAmPm,
  getTimeLeftOrAgo,
} from "@/lib/timeAndDate";
import { ToggleMatchStatus } from "./DisplayFixtures";
import { DIALOG } from "@/components/Dialog";
import { Eye } from "lucide-react";
import SquadCard from "../squad/SquadCard";
import { UpdateFixtureMatch } from "./CreateFixture";
import NewSquad from "../squad/NewSquad";
import { IPlayer } from "@/types/player.interface";
import { IManager } from "../managers/page";
import { Button } from "@/components/buttons/Button";
import { IMatch, ITeam } from "@/types/match.interface";

export function AdminMatchCard({
  match,
  teams,
  managers,
  matches,
  players,
}: {
  match?: IMatch;
  teams?: ITeam [];
  players?: IPlayer[];
  managers?: IManager[];
  matches?: IMatch[];
}) {
  const { away, home } = checkTeams(match);
  const scores = checkMatchMetrics(match);
  const status = match?.status;
  return (
    <div className="bg-card border p-4 space-y-2.5">
      <div className="flex justify-between gap-5">
        <Badge
          variant={
            status == "LIVE"
              ? "destructive"
              : status == "FT"
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
          {status == "FT" ? (
            <div className="grid">
              <span className="px-3 text-lg">{scores?.goals?.home}</span>
              <span className="px-3 text-lg">{scores?.goals?.away}</span>
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
        <div className="flex items-center gap-5">
          <UpdateFixtureMatch teams={teams} fixture={match} />
          <ConfirmActionButton
            primaryText="Delete"
            trigger={" Delete"}
            uri={`${apiConfig.matches}/${match?._id}`}
            method={"DELETE"}
            variant="destructive"
            title={shortText(match?.title ?? "Match")}
            confirmText={`Are you sure you want to delete "<b>${shortText(
              match?.title ?? "Match",
              40
            )}</b>"?`}
            escapeOnEnd
          />

          <ToggleMatchStatus
            fixtureId={match?._id as string}
            matchDate={match?.date as string}
            status={match?.status as IMatch["status"]}
          />

          {match?.squad ? (
            <DIALOG trigger={<Eye />} title="" className="min-w-[80vw]">
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
