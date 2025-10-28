import { apiConfig } from "@/lib/configs";
import { DisplayFixtures } from "./DisplayFixtures";
import CreateMatch from "./CreateFixture";
import { getTeams } from "../features/teams/page";
import {
  IMatchProps,
  ITeamProps,
  MatchStatus,
} from "@/app/matches/(fixturesAndResults)";
import { IQueryResponse } from "@/types";
import { buildQueryString } from "@/lib";

export interface IGetMatchesProps {
  status?: MatchStatus;
  isHome?: boolean;
  sort?: "desc" | "asc";
}
export const getMatches = async (query?: string) => {
  try {
    const response = await fetch(`${apiConfig.matches}${query ?? ""}`, {
      cache: "no-store",
    });
    const fixtures = await response.json();
    return fixtures;
  } catch {
    return null;
  }
};

export const getMatchById = async (id: string) => {
  try {
    const response = await fetch(`${apiConfig.matches}/${id}`, {
      cache: "no-store",
    });
    const match = await response.json();
    return match;
  } catch {
    return null;
  }
};

export default async function AdminFixtures() {
  const qs = buildQueryString();

  const fixtures: IQueryResponse<IMatchProps[]> = await getMatches(qs);
  const teams: IQueryResponse<ITeamProps[]> = await getTeams();
  return (
    <section className="pb-6 pt-10 px-3 _page">
      <DisplayFixtures
        fixtures={fixtures?.data as IMatchProps[]}
        teams={teams?.data}
      />
      <div className="flex items-center py-14 gap-9">
        <CreateMatch teams={teams?.data} />
      </div>
    </section>
  );
}
