"use client";

import { teamLogos } from "@/assets/teams/logos/team-logos";
import { ITeamProps } from "@/app/matches/(fixturesAndResults)";
import { formatDate } from "@/lib/timeAndDate";
import { Pagination } from "@/components/pagination/Pagination";
import { IQueryResponse } from "@/types";
import { PrimaryDropdown } from "@/components/Dropdown";
import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { AiTwotoneDelete } from "react-icons/ai";
import { apiConfig } from "@/lib/configs";
import Image from "next/image";
import { DIALOG } from "@/components/Dialog";
import { TeamForm } from "./TeamForm";
import { LVOutPutTable } from "@/components/tables/VerticalTable";

const DisplayTeams = ({ teams }: { teams?: IQueryResponse<ITeamProps[]> }) => {
  if (!teams) return <div className="_label p-6 "> No teams available</div>;
  return (
    <div className=" bg-card mx-auto ">
      <h1 className="_heading">Teams</h1>

      <ul className="divide-y-8 divide-border space-y-14">
        {teams?.data?.map((team) => (
          <li
            key={team?._id}
            className="grid md:grid-cols-2 gap-3.5 relative pb-6 px-4"
          >
            <Image
              src={team?.logo ?? teamLogos?.[0]?.logo.src}
              alt={team?.name ?? "logo"}
              width={400}
              height={400}
              className="object-cover bg-accent  "
            />

            <div>
              <p className="_heading">{team?.name}</p>
              <p className="_title">{team?.alias}</p>

              <LVOutPutTable
                body={[
                  { label: "Alias", value: team?.alias },
                  {
                    label: "Last Match",
                    value: formatDate(team?.updatedAt, "March 2, 2025"),
                  },
                  { label: "Encounters", value: "0" },
                  { label: "Wins", value: "0" },
                  { label: "Losses", value: "0" },
                  { label: "Draws", value: "0" },
                ]}
                //  className="ring"
                trStyles="grow w-full"
                labelTDStyles="grow"
                className="rounded-xl overflow-hidden w-fit border shadow-2xs"
              />
            </div>
            <PrimaryDropdown triggerStyles="absolute right-4 top-1 bg-accent/40 rounded-full p-1 h-10 w-10 _hover flex items-center justify-center">
              <TeamActians team={team} />
            </PrimaryDropdown>
          </li>
        ))}

        {teams?.data?.length === 0 && <li>No teams available.</li>}
      </ul>

      <Pagination pagination={teams?.pagination} />
    </div>
  );
};

export default DisplayTeams;

export const TeamActians = ({ team }: { team: ITeamProps }) => {
  
  return (
    <ul>
      <li className=" mb-1.5">
        <DIALOG trigger={"Update"}>
          <TeamForm team={team} />
        </DIALOG>
      </li>
      <li>
        <ConfirmActionButton
          method={"DELETE"}
          trigger={"Delete Feature"}
          primaryText=""
          loadingText="Deleting..."
          uri={`${apiConfig.teams}`}
          body={team}
          variant="destructive"
          title={`Delete ${team?.name}`}
          confirmText={`Are you sure you want to delete "${team?.name}"?`}
          escapeOnEnd
        >
          <AiTwotoneDelete />
        </ConfirmActionButton>
      </li>
    </ul>
  );
};

