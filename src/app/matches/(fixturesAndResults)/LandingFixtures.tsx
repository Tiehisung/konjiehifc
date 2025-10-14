import React from "react";
import { CanceledMatchCard, MatchFixtureCard, PlayedMatchCard } from "./Cards";
import { IMatchProps } from ".";
import PrimLink from "@/components/Link";
import Loader from "@/components/Loader";
import { Title } from "@/components/Elements";

const LandingFixtures = ({ matches }: { matches: IMatchProps[] }) => {
  const fixtures = matches?.filter(
    (match) =>
      match.status !== "FT" && match.status !== "HT" && match.status !== "LIVE"
  );
  const played = matches?.filter((match) => match.status == "FT"); //Full Time
  
  if (!matches) return <Loader message="Loading fixtures..." />;
  return (
    <div className=" space-y-10 ">
      <section>
        <header className="flex justify-between gap-4">
          <Title>Upcoming Fixtures</Title>
          <PrimLink
            href={"/matches#fixtures"}
            text="More"
            className="_link flex items-center"
          />
        </header>
        <div className="flex flex-wrap lg:grid-cols-2 xl:grid-cols-3 gap-[3vw] ">
          {fixtures?.map((match, index) => {
            switch (match.status) {
              case "CANCELED":
                return (
                  <CanceledMatchCard
                    match={match as IMatchProps}
                    className="grow sm:max-w-lg"
                    key={index}
                    league="Salah Games"
                  />
                );
              default:
                return (
                  <MatchFixtureCard
                    match={match as IMatchProps}
                    className="grow sm:max-w-lg"
                    key={index}
                  />
                );
            }
          })}
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {played?.map((match, index) => (
            <PlayedMatchCard
              key={index}
              match={match as IMatchProps}
              league="Circuit Galla"
              className="max-sm:grow "
            />
          ))}
        </div>
        {played?.length == 0 && (
          <p className="_label ml-3">No matches played yet</p>
        )}
      </section>
    </div>
  );
};

export default LandingFixtures;
