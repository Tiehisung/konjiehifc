import { MatchFixtureCard, PlayedMatchCard } from "./Cards";
import { IMatchProps } from ".";
import PrimLink from "@/components/Link";
import { getMatches } from "@/app/admin/matches/page";
import { IQueryResponse } from "@/types";
import { TITLE } from "@/components/Element";

const LandingFixtures = async () => {
  const completedMatches: IQueryResponse<IMatchProps[]> = await getMatches(
    "?status=COMPLETED"
  );
  const upcomingMatches: IQueryResponse<IMatchProps[]> = await getMatches(
    "?status=UPCOMING"
  );

  return (
    <div className="px-4 space-y-10 _page">
      <section>
        <TITLE text="UPCOMING FIXTURES" />

        <div className="flex flex-wrap lg:grid lg:grid-cols-3 gap-[3vw] justify-center px-2 mt-5">
          {upcomingMatches?.data?.slice(0, 3)?.map((match, index) => (
            <MatchFixtureCard
              match={match as IMatchProps}
              className="grow sm:max-w-lg"
              key={index}
            />
          ))}
          <PrimLink
            href={"/matches#fixtures"}
            text="More"
            className="_link flex items-center"
          />
        </div>
      </section>

      <section>
        <TITLE text="PLAYED FIXTURES" />

        <div className="flex flex-wrap lg:grid-cols-2 xl:grid-cols-3 gap-[3vw]">
          {completedMatches?.data?.slice(0, 3)?.map((match, index) => (
            <PlayedMatchCard
              key={index}
              match={match as IMatchProps}
              league="Circuit Galla"
              className="max-sm:grow "
            />
          ))}
        </div>
        <PrimLink
          href={"/matches#matches"}
          text="More"
          className="_link flex items-center"
        />
        {completedMatches?.data?.length == 0 && (
          <p className="_label ml-3">No matches played yet</p>
        )}
      </section>
    </div>
  );
};

export default LandingFixtures;
