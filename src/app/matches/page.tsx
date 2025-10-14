import React from "react";
// import FixturesSection from "./Fixtures";
// import MatchesSection from "./Matches";

// import { getMatches } from "../admin/matches/page";
// import { IMatchProps } from "./(fixturesAndResults)";

export default async function MatchesPage() {
  // const allMatches: IMatchProps[] = await getMatches();

  // console.log({ allMatches });
  // const playedMatches = allMatches?.filter((match) => match.status == "FT");
  // const fixtures = allMatches?.filter((match) => match.status !== "FT");
  return (
    <div className="space-y-8">
      {/* <FixturesSection fixtures={fixtures} />
      <MatchesSection matches={playedMatches} /> */}
    </div>
  );
}
