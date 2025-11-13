import { IMatchProps, ITeamProps } from "@/app/matches/(fixturesAndResults)";
import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { AVATAR } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { checkGoals, checkTeams, shortText } from "@/lib";
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

export function AdminMatchCard({
  match,
  teams,
}: {
  match?: IMatchProps;
  teams?: ITeamProps[];
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
        <div className="flex items-center gap-5">
          <UpdateFixtureMatch teams={teams} fixture={match} />
          <ConfirmActionButton
            primaryText="Delete Match"
            triggerStyles="  px-2 flex items-center text-red-600 _deleteBtn h-9"
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
            status={match?.status as IMatchProps["status"]}
          />

          {match?.squad ? (
            <DIALOG trigger={<Eye />} title="" className="min-w-[80vw]">
              <SquadCard squad={match?.squad} match={match} />
            </DIALOG>
          ) : (
            <span className="text-muted-foreground">N/A</span>
          )}
        </div>
      </div>
    </div>
  );
}
