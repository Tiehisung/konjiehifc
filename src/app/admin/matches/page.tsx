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
import { buildQueryStringServer } from "@/lib";

export interface IGetMatchesProps {
  status?: MatchStatus;
  isHome?: boolean;
  sort?: "desc" | "asc";
}
export const getMatches = async (query?: string) => {
  try {
    const cleaned = query?.startsWith("?") ? query : "?" + query;
    const response = await fetch(`${apiConfig.matches}${cleaned ?? ""}`, {
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

interface IPageProps {
  searchParams:Promise< Record<string, string | string[] | undefined>>;
}

export default async function AdminFixtures({ searchParams }: IPageProps) {
  const qs = buildQueryStringServer(await searchParams);

  const fixtures: IQueryResponse<IMatchProps[]> = await getMatches(qs);
  const teams: IQueryResponse<ITeamProps[]> = await getTeams();
  return (
    <section className="pb-6 pt-10 px-3 _page">
      <div>
        <DisplayFixtures fixtures={fixtures} teams={teams?.data} />
      </div>
      <div className=" py-14 ">
        <h1 className="_title">Create Fixture</h1>
        <CreateMatch teams={teams?.data} />
      </div>
    </section>
  );
}
