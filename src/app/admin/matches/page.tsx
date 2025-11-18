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
import Header from "../../../components/Header";
import { getPlayers } from "../players/page";
import { getManagers, IManager } from "../managers/page";
import { IPlayer } from "@/app/players/page";

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
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function AdminFixtures({ searchParams }: IPageProps) {
  const qs = buildQueryStringServer(await searchParams);

  const fixtures: IQueryResponse<IMatchProps[]> = await getMatches(qs);
  const teams: IQueryResponse<ITeamProps[]> = await getTeams();

  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  const managers: IQueryResponse<IManager[]> = await getManagers();

  return (
    <section className="pb-6 pt-10 px-3 _page">
      <Header title="FIXTURES & SCORES" subtitle="Manage Fixtures" />
      <DisplayFixtures
        fixtures={fixtures}
        teams={teams?.data}
        managers={managers?.data}
        players={players?.data}
      />

      <div className=" py-14 ">
        <h1 className="_title">Create Fixture</h1>
        <CreateMatch teams={teams?.data} />
      </div>
    </section>
  );
}
