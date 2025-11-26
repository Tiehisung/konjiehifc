import { MatchFixtureCard, PlayedMatchCard } from "./Cards";
import { IMatchProps } from ".";
import PrimLink from "@/components/Link";
import { Title } from "@/components/Divider";
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
    <div className="px-4 space-y-10 _page">
      <section>
        <Title className="flex justify-between gap-4 _gradient">
          UPCOMING FIXTURES
        </Title>

        <div className="flex flex-wrap lg:grid lg:grid-cols-3 gap-[3vw] justify-center px-2">
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
        <Title className="_gradient">PLAYED FIXTURES</Title>

        <div className="flex flex-wrap lg:grid-cols-2 xl:grid-cols-3 gap-[3vw]">
          {completedMatches?.data?.slice(0, 3)?.map((match, index) => (
            <PlayedMatchCard
              key={index}
              match={match as IMatchProps}
              league="Circuit Galla"
              className="max-sm:grow "
            />
          ))}
          <PrimLink
            href={"/matches#matches"}
            text="More"
            className="_link flex items-center"
          />
        </div>
        {completedMatches?.data?.length == 0 && (
          <p className="_label ml-3">No matches played yet</p>
        )}
      </section>
    </div>
  );
};

export default LandingFixtures;
