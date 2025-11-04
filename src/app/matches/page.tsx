import { buildQueryString } from "@/lib";
import { IQueryResponse } from "@/types";
import React from "react";
import { getMatches } from "../admin/matches/page";
import { IMatchProps,  } from "./(fixturesAndResults)";
import FixturesSection from "./Fixtures";

export default async function MatchesPage() {
  const qs = buildQueryString();

  const fixtures: IQueryResponse<IMatchProps[]> = await getMatches(qs);
  // const teams: IQueryResponse<ITeamProps[]> = await getTeams();
  return (
    <section className="pb-6 pt-10 px-3 _page">
      

      <FixturesSection fixtures={fixtures   } />
    </section>
  );
}
