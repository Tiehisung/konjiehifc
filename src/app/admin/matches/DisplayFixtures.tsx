"use client";

import { Button } from "@/components/buttons/Button";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { UpdateFixtureMatch } from "./CreateFixture";
import { formatDate, isToday } from "@/lib/timeAndDate";
import { IMatchProps } from "@/app/matches/(fixturesAndResults)";
import { BsPatchCheck } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import SquadCard from "../squad/SquadCard";
import { DIALOG } from "@/components/Dialog";
import { Eye } from "lucide-react";
import Image from "next/image";
import { Pagination } from "@/components/pagination/Pagination";
import { IQueryResponse } from "@/types";
import { AdminMatchCard } from "./MatchCard";
import { DisplayType } from "@/components/DisplayStyle";
import useGetParam from "@/hooks/params";
import { IPlayer } from "@/types/player.interface";
import { IManager } from "../managers/page";
import SquadForm from "../squad/SquadForm";
import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { icons } from "@/assets/icons/icons";
import { checkTeams } from "@/lib/compute/match";
import { IMatch, ITeam } from "@/types/match.interface";
import { shortText } from "@/lib";

interface DisplayFixturesProps {
  fixtures: IQueryResponse<IMatch[]>;
  teams?: ITeam[];
  players?: IPlayer[];
  managers?: IManager[];
}
// Fixture is  match that is not yet played successfully

export function DisplayFixtures({
  fixtures,
  teams,
  managers,
  players,
}: DisplayFixturesProps) {
  const displayType = useGetParam("display");
  return (
    <div>
      <br />
      <DisplayType defaultDisplay="grid" className="w-fit ml-auto" />
      <br />

      {displayType !== "list" ? (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {fixtures?.data?.map((fx) => (
            <AdminMatchCard
              key={fx?._id}
              match={fx}
              teams={teams}
              managers={managers}
              matches={fixtures?.data}
              players={players}
            />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto ">
          <table className="table table-auto bg-popover w-full">
            <tbody>
              <tr className="border p-2 _label h-12 text-left">
                <th className="px-2">TITLE</th>
                <th className="px-2">DATE</th>
                <th className="px-2">STATUS</th>
                <th className="px-2">SQUAD</th>
                <th className="px-2">ACTION</th>
              </tr>
              {fixtures?.data?.map((fixture) => {
                const { home, away } = checkTeams(fixture);
                return (
                  <tr key={fixture._id} className={`border-b `}>
                    <td className="px-2 py-4 ">
                      <div className="grid md:flex items-center gap-2 text-nowrap uppercase text-sm ">
                        <div className="flex items-center gap-1.5">
                          <Image
                            src={home?.logo as string}
                            alt={home?.name as string}
                            className="h-7 w-7 aspect-square "
                            width={100}
                            height={100}
                          />
                          <strong className="w-36 line-clamp-1">
                            {home?.name}
                          </strong>
                        </div>
                        <span className="w-10">VS</span>

                        <div className="flex items-center gap-1.5">
                          <Image
                            src={away?.logo as string}
                            width={100}
                            height={100}
                            alt={away?.name as string}
                            className="h-7 w-7 aspect-square "
                          />
                          <strong className="w-36 line-clamp-1">
                            {away?.name}
                          </strong>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm">
                      {formatDate(fixture.date, "March 2, 2025")}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm">
                      <Badge
                        variant={
                          fixture?.status == "LIVE" ? "destructive" : "outline"
                        }
                      >
                        <span className="">
                          {fixture.status == "FT" ? (
                            <FaCheckCircle className="text-Green" size={10} />
                          ) : fixture.status == "LIVE" ? (
                            <MdLiveTv className="text-Red" size={10} />
                          ) : (
                            <BsPatchCheck size={10} />
                          )}
                        </span>
                        {fixture.status}
                      </Badge>
                    </td>
                    <td
                      className="px-2 py-2 whitespace-nowrap text-sm"
                      title="View Squad"
                    >
                      {fixture?.squad ? (
                        <DIALOG
                          trigger={
                            <Button
                              primaryText="View"
                              className="_secondaryBtn"
                            >
                              <Eye />
                            </Button>
                          }
                          title=""
                          className="min-w-[80vw]"
                        >
                          <SquadCard squad={fixture?.squad} match={fixture} />
                        </DIALOG>
                      ) : (
                        <DIALOG
                          trigger={"Choose Squad"}
                          title={`Select Squad for ${fixture?.title}`}
                          className="min-w-[80vw]"
                        >
                          <SquadForm
                            players={players}
                            managers={managers}
                            matches={fixtures?.data}
                            defaultMatch={fixture}
                          />
                        </DIALOG>
                      )}
                    </td>
                    <td className="px-2 py-2 text-sm ">
                      <div className="flex gap-5 items-center justify-between max-w-sm">
                        <ToggleMatchStatus
                          status={fixture.status}
                          fixtureId={fixture._id}
                          matchDate={fixture.date}
                        />
                        <UpdateFixtureMatch teams={teams} fixture={fixture} />
                        <ConfirmActionButton
                          primaryText="Delete"
                          trigger={" Delete"}
                          uri={`${apiConfig.matches}/${fixture?._id}`}
                          method={"DELETE"}
                          variant="destructive"
                          confirmVariant={"delete"}
                          title={`Delete ${fixture?.title}`}
                          confirmText={`Are you sure you want to delete "<b>${shortText(
                            fixture?.title ?? "Match",
                            40
                          )}</b>"?`}
                          escapeOnEnd
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}

              {fixtures?.data?.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center _label">
                    No fixtures available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <div className="p-2 flex items-center text-sm gap-3 text-muted-foreground py-4">
        <div>
          Home fixtures: {fixtures?.data?.filter((f) => f.isHome)?.length}
        </div>
        <div>
          Away fixtures: {fixtures?.data?.filter((f) => !f.isHome)?.length}
        </div>
        <div>Total fixtures: {fixtures?.data?.length}</div>
      </div>
      <Pagination pagination={fixtures?.pagination} />
    </div>
  );
}

export function ToggleMatchStatus({
  fixtureId,
  status,
  matchDate,
}: {
  fixtureId: string;
  status: IMatchProps["status"];
  matchDate: string;
}) {
  const router = useRouter();

  const [waiting, setWaiting] = useState(false);

  const handleToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setWaiting(true);
    const response = await fetch(`${apiConfig.matches}/live`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: fixtureId,
        status: status == "LIVE" ? "FT" : "LIVE",
      }),
      cache: "no-cache",
    });
    const results = await response.json();
    if (results.success) toast.success(results.message);
    setWaiting(false);

    router.refresh();
  };

  if (status == "FT")
    return (
      <Badge className="w-20 py-2 font-black" variant={"outline"}>
        FT
      </Badge>
    );

  if (isToday(matchDate))
    return (
      <Button
        waiting={waiting}
        disabled={waiting}
        primaryText={status == "LIVE" ? "Mark FT" : "Go Live"}
        waitingText="Updating..."
        onClick={handleToggle}
        className=" px-2 flex items-center text-red-600 _deleteBtn whitespace-nowrap"
      />
    );
  return null;
}
