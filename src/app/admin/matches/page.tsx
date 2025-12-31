import { apiConfig } from "@/lib/configs";
import { DisplayFixtures } from "./DisplayFixtures";
import { getTeams } from "../features/teams/page";
import {
  IMatchProps,
  ITeamProps,
  MatchStatus,
} from "@/app/matches/(fixturesAndResults)";
import { IQueryResponse } from "@/types";
import { buildQueryStringServer } from "@/lib";
import Header from "../../../components/Element";
import { getPlayers } from "../players/page";
import { getManagers, IManager } from "../managers/page";
import { IPlayer } from "@/types/player.interface";
import { QuickLinks } from "@/components/QuickLinks/LinkOrSectionId";
import { Separator } from "@/components/ui/separator";

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
    <section className="">
      <Header title="FIXTURES & SCORES" subtitle="Manage Fixtures" />
      <main className="_page pb-6 pt-10 ">
        <DisplayFixtures
          fixtures={fixtures}
          teams={teams?.data}
          managers={managers?.data}
          players={players?.data}
        />

        <Separator />
        
        <h2 className="mt-8 mb-4">Quick Links</h2>

        <QuickLinks
          links={[
            {
              title: "Match Request ",
              href: "/admin/matches/request",
              description: "Generate match request letter",
            },
            {
              title: "Create Fixture ",
              href: "/admin/matches/create-fixture",
              description: "Add new match fixture",
            },
            
          ]}
          className="my-5"
        />

       
      </main>
    </section>
  );
}
