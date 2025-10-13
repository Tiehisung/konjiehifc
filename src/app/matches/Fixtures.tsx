"use client";

import React from "react";
import { SearchQueryUpdator } from "./Headers";
import { _pagination, Pagination } from "@/components/Pagination";
import {
  CanceledMatchCard,
  MatchFixtureCard,
  PlayedMatchCard,
} from "./(fixturesAndResults)/Cards";
import { IMatchProps } from "./(fixturesAndResults)";

const FixturesSection = ({ fixtures }: { fixtures: IMatchProps[] }) => {
  const filters = ["all", "home", "away", "canceled"];
  return (
    <section id="fixtures">
      <header className="flex justify-between items-center gap-4">
        <h2 className="font-bold my-3">Fixtures</h2>{" "}
        <Pagination pagination={_pagination} />
      </header>
      <SearchQueryUpdator query="fixture" values={filters} />
      <div className="flex flex-wrap lg:grid-cols-2 xl:grid-cols-3 gap-[3vw] mt-2 ">
        {fixtures.map((match, index) => {
          if (match.status == "LIVE" || match.status == "HT")
            return (
              <PlayedMatchCard
                key={index}
                match={match as IMatchProps}
                league="Circuit Galla"
                className="grow sm:max-w-lg"
              />
            );
          if (match.status == "CANCELED")
            return (
              <CanceledMatchCard
                match={match as IMatchProps}
                className="grow sm:max-w-lg"
                key={index}
                league="Salah Games"
              />
            );
          return (
            <MatchFixtureCard
              match={match as IMatchProps}
              className="grow sm:max-w-lg"
              key={index}
            />
          );
        })}
      </div>
    </section>
  );
};

export default FixturesSection;
