import React, { Suspense } from "react";
import { NewTeamForm } from "./CreateOrUpdateTeam";
import DisplayTeams from "./DisplayTeams";
import { apiConfig } from "@/lib/configs";
import { ITeamProps } from "@/app/matches/(fixturesAndResults)";
import Loader from "@/components/Loader";

export const metadata = {
  title: "Teams | KFC",
  description: "KFC Teams page to manage teams",
};

export const getTeams = async (teamId?: string) => {
  try {
    const uri = teamId
      ? `${apiConfig.teams}?teamId=${teamId}`
      : apiConfig.teams;
    const response = await fetch(uri, {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch {
    return [];
  }
};

const TeamsFeature = async () => {
  const teams: ITeamProps[] = await getTeams();
  return (
    <div className="space-y-12 p-4 md:px-10">
      {/* Create */}
      <NewTeamForm />

      {/* Display */}

      <Suspense fallback={<Loader />}>
        <DisplayTeams teams={teams} />
      </Suspense>
    </div>
  );
};

export default TeamsFeature;
