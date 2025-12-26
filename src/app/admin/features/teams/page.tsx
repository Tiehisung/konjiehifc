import { Suspense } from "react";
import { TeamForm } from "./TeamForm";
import DisplayTeams from "./DisplayTeams";
import { apiConfig } from "@/lib/configs";
import { ITeamProps } from "@/app/matches/(fixturesAndResults)";
import Loader from "@/components/loaders/Loader";
import { IQueryResponse } from "@/types";
import { buildQueryStringServer } from "@/lib";
 

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

interface IPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const TeamsFeature = async ({ searchParams }: IPageProps) => {
  const qs = buildQueryStringServer(searchParams);

  const teams: IQueryResponse<ITeamProps[]> = await getTeams(qs);
  return (
    <div className="space-y-12 p-4 md:px-10">
      {/* Display */}
      <Suspense fallback={<Loader />}>
        <DisplayTeams teams={teams} />
      </Suspense>

      {/* Create */}
      <TeamForm />
    </div>
  );
};

export default TeamsFeature;
