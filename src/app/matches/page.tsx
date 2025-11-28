import { IQueryResponse } from "@/types";
import React from "react";
import { getMatches } from "../admin/matches/page";
import { IMatchProps } from "./(fixturesAndResults)";
import FixturesSection from "./Fixtures";
import { buildQueryStringServer } from "@/lib";
import HEADER from "@/components/Element";
interface IPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata = {
  title: "Matches",
  description:
    "View Konjiehi FC’s upcoming fixtures, match results, and past games.",
  keywords: ["Konjiehi FC matches", "fixtures", "results", "football schedule"],
  openGraph: {
    title: "Konjiehi FC Matches",
    description: "Upcoming fixtures and match results for Konjiehi FC.",
    images: ["/kfc.png"],
  },
};

export default async function MatchesPage({ searchParams }: IPageProps) {
  const qs = buildQueryStringServer(await searchParams);

  const fixtures: IQueryResponse<IMatchProps[]> = await getMatches(qs);
  // const teams: IQueryResponse<ITeamProps[]> = await getTeams();
  return (
    <div>
      <HEADER title="Scores & Fixtures" />
      <section className="pb-6 pt-10 px-6 _page">
        <FixturesSection fixtures={fixtures} />
      </section>
    </div>
  );
}
