import {   MatchFixtureCard, PlayedMatchCard } from "./Cards";
import { IMatchProps } from ".";
import PrimLink from "@/components/Link";
import { Title } from "@/components/Elements";
import { getMatches } from "@/app/admin/matches/page";
import { IQueryResponse } from "@/types";

const LandingFixtures = async () => {
  const completedMatches: IQueryResponse<IMatchProps[]> = await getMatches(
    "?status=COMPLETED"
  );
  const upcomingMatches: IQueryResponse<IMatchProps[]> = await getMatches(
    "?status=UPCOMING"
  );

 

  return (
    <div className=" space-y-10 _page">
      <section>
        <header className="flex justify-between gap-4">
          <Title>Upcoming Fixtures</Title>
          <PrimLink
            href={"/matches#fixtures"}
            text="More"
            className="_link flex items-center"
          />
        </header>

        <div className="flex flex-wrap lg:grid-cols-2 xl:grid-cols-3 gap-[3vw] justify-center">
          {upcomingMatches?.data?.map((match, index) => (
            <MatchFixtureCard
              match={match as IMatchProps}
              className="grow sm:max-w-lg"
              key={index}
            />
          ))}
        </div>
      </section>

      <section>
        <header className="flex justify-between gap-4">
          <Title>Played Matches</Title>{" "}
          <PrimLink
            href={"/matches#matches"}
            text="More"
            className="_link flex items-center"
          />
        </header>
        <div className="flex flex-wrap lg:grid-cols-2 xl:grid-cols-3 gap-[3vw]">
          {completedMatches?.data?.map((match, index) => (
            <PlayedMatchCard
              key={index}
              match={match as IMatchProps}
              league="Circuit Galla"
              className="max-sm:grow "
            />
          ))}
        </div>
        {completedMatches?.data?.length == 0 && (
          <p className="_label ml-3">No matches played yet</p>
        )}
      </section>
    </div>
  );
};

export default LandingFixtures;
