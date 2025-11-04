import { IPlayer, IPlayerMini } from "@/app/players/page";
import { IQueryResponse } from "@/types";
import React from "react";
import { getPlayers } from "../../players/page";
import { AttendanceTable } from "./Table";
import { IUser } from "@/types/user";
import { apiConfig } from "@/lib/configs";
import { PrimaryAccordion } from "@/components/Accordion";
import { formatDate } from "@/lib/timeAndDate";
import TrainingSessionCard from "./SessionCard";
import { PrimarySearch } from "@/components/Search";
import { AttendanceStandingsTable } from "./AttendanceStandings";

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
      <div className="flex items-center gap-1 justify-between">
        <span>{tSession?.location}</span>

        {" - "}
        <span>
          {formatDate(tSession.createdAt, "March 2, 2025")},{" "}
          {tSession?.createdAt?.split("T")?.[1]?.substring(0, 5)}
        </span>
      </div>
    ),
    content: <TrainingSessionCard trainingSession={tSession} />,
    value: tSession._id ?? "",
  }));
  console.log({ trainingSessions });
  return (
    <div className="_page px-6 space-y-12">
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

      <hr className="h-8 my-16 _gradient" />

      <AttendanceStandingsTable trainingSessions={trainingSessions?.data} />
    </div>
  );
};

export default AttendancePage;
