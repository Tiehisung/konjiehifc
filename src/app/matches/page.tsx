import { IQueryResponse } from "@/types";
import React from "react";
import { getMatches } from "../admin/matches/page";
import { IMatchProps } from "./(fixturesAndResults)";
import FixturesSection from "./Fixtures";
import { buildQueryStringServer } from "@/lib";
interface IPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function MatchesPage({ searchParams }: IPageProps) {
  const qs = buildQueryStringServer(searchParams);

  const fixtures: IQueryResponse<IMatchProps[]> = await getMatches(qs);
  // const teams: IQueryResponse<ITeamProps[]> = await getTeams();
  return (
    <section className="pb-6 pt-10 px-3 _page">
      <FixturesSection fixtures={fixtures} />
    </section>
  );
}
