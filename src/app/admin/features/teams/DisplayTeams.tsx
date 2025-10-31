"use client";

import { DeleteTeam } from "./(actions)/DeleteTeam";
import Image from "next/image";
import { teamLogos } from "@/assets/teams/logos/team-logos";
import { ITeamProps } from "@/app/matches/(fixturesAndResults)";
import { getFormattedDate } from "@/lib/timeAndDate";
import { POPOVER } from "@/components/ui/popover";

const DisplayTeams = ({ teams }: { teams?: ITeamProps[] }) => {
  console.log({teams})
  if (!teams) return <div className="_label p-6 "> No teams available</div>;
  return (
    <div className=" bg-accent max-w-5xl overflow-x-auto mx-auto _card">
      <h1 className="_label">Teams</h1>
      <table className="table-auto w-full">
        <tbody>
          <tr className="text-muted-foreground text-left">
            <th>#</th>
            <th>Name</th>
            <th>Alias</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>

          {teams?.map((team: ITeamProps, index: number) => (
            <tr key={index} className="_hover border-b">
              <td className="py-3">{index + 1}</td>

              <td className="py-3 min-w-44">
                <div className="flex items-center gap-3">
                  <Image
                    src={team?.logo ?? teamLogos?.[0]?.logo.src}
                    alt="tlogo"
                    width={100}
                    height={100}
                    className=" h-12 w-12 min-w-12 rounded-full"
                  />
                  {team.name}
                </div>
              </td>

              <td className="py-3">{team.alias}</td>

              <td className="py-3">
                {getFormattedDate(team?.createdAt, "March 2, 2025")}
              </td>

              <td className="py-3">
                <POPOVER>
                  <TeamActians team={team} />
                </POPOVER>
              </td>
            </tr>
          ))}
          {teams?.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center _label">
                No teams available.
              </td>
            </tr>
          )}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={5}> {`Teams: ${teams?.length}`}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DisplayTeams;

export const TeamActians = ({ team }: { team: ITeamProps }) => {
  const className =
    "w-full py-2 px-3 _hover select-none cursor-pointer _shrink";

  return (
    <ul>
      <li className={className}>Update</li>
      <li>
        <DeleteTeam team={team} className={className} />
      </li>
    </ul>
  );
};
