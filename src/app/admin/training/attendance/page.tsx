import { IPlayer, IPlayerMini } from "@/app/players/page";
import { IQueryResponse } from "@/types";
import React from "react";
import { getPlayers } from "../../players/page";
import { AttendanceTable } from "./AttendanceTable";
import { IUser } from "@/types/user";
import { apiConfig } from "@/lib/configs";
import { PrimaryAccordion } from "@/components/Accordion";
import { formatDate } from "@/lib/timeAndDate";
import TrainingSessionCard from "./SessionCard";
import { PrimarySearch } from "@/components/Search";
import { AttendanceStandingsTable } from "./AttendanceStandings";
import TabbedComponents, { PrimaryTabs } from "@/components/Tabs";
import HEADER from "@/components/Element";
export interface ITrainingSession {
  date: string;
  location: string;
  _id: string;
  note: string;
  recordedBy: IUser;
  attendance: {
    allPlayers: Array<IPlayerMini>;
    attendedBy: Array<IPlayerMini>;
  };
  updateCount: number; //Limit at 3
  createdAt?: string;
  updatedAt?: string;
}

export const getTrainingSessions = async (query?: string) => {
  try {
    const cleaned = query?.startsWith("?") ? query : "?" + query;

    const response = await fetch(apiConfig.trainingSession + cleaned, {
      cache: "no-cache",
    });

    if (!response.ok) return null;
    const trainingSession = await response.json();

    return trainingSession;
  } catch {
    return null;
  }
};

export const getTrainingSessionById = async (sessionId?: string) => {
  try {
    const response = await fetch(`${apiConfig.trainingSession}/${sessionId}`, {
      cache: "no-store",
    });

    if (!response.ok) return null;
    const player = await response.json();
    return player;
  } catch {
    return null;
  }
};
const AttendancePage = async () => {
  const players: IQueryResponse<IPlayer[]> = await getPlayers();

  const trainingSessions: IQueryResponse<ITrainingSession[]> =
    await getTrainingSessions();
  const accordion = trainingSessions?.data?.map((tSession) => ({
    trigger: (
      <div className="grid items-center gap-1">
        <p>
          <span>{tSession?.location}</span> -
          <span>
            {formatDate(tSession.createdAt, "March 2, 2025")},{" "}
            {tSession?.createdAt?.split("T")?.[1]?.substring(0, 5)}
          </span>
        </p>
        <p className="font-extralight ">~~ {tSession?.recordedBy?.name}</p>
      </div>
    ),
    content: <TrainingSessionCard trainingSession={tSession} />,
    value: tSession._id ?? "",
  }));
  return (
    <div>
      <HEADER title=" Training Attendance " />
      <main className="_page px-3 mt-6">
        <PrimaryTabs
          tabs={[
            { label: "Standings", value: "standings" },
            { label: "Record Attendance", value: "table" },
            { label: "View Passed", value: "passed" },
          ]}
          defaultValue="standings"
          className=""
        >
          <AttendanceStandingsTable trainingSessions={trainingSessions?.data} />
          <AttendanceTable
            players={players?.data}
            trainingSessions={trainingSessions?.data}
          />

          <div className="mt-12 space-y-6">
            <PrimarySearch
              className="bg-popover"
              inputStyles="h-9"
              placeholder="Search Session"
              searchKey="training_search"
            />
            <PrimaryAccordion
              data={accordion}
              className=""
              triggerStyles="cursor-pointer border-b"
            />
          </div>
        </PrimaryTabs>
      </main>
    </div>
  );
};

export default AttendancePage;
