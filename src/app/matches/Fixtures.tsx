import React from "react";
import { SearchQueryUpdator } from "./Headers";
import { Pagination } from "@/components/Pagination";
import { IMatchProps } from "./(fixturesAndResults)";
import { IQueryResponse } from "@/types";
import { SecondaryFixtureCard } from "./FixtureCard";

interface IProps {
  fixtures: IQueryResponse<IMatchProps[]>;
}

const FixturesSection = ({ fixtures }: IProps) => {
  const filters = ["all", "home", "away"];
  if (!fixtures) return <div className="_label">No fixtures</div>;
  return (
    <section id="fixtures" className="">
      <header className="flex justify-between items-center gap-4 mb-6">
        <h2 className="font-bold _title">Scores & Fixtures</h2>{" "}
      </header>

      <SearchQueryUpdator query="fixture" values={filters} />
      <br />

      <div className=" ">
        <section className="grid md:grid-cols-2 gap-y-3.5 gap-x-5">
          {fixtures?.data?.map((f) => (
            <SecondaryFixtureCard fixture={f} key={f._id} className="w-full " />
          ))}
        </section>
        <br />
        <section>
          <div className="p-2 flex items-center text-sm gap-3 text-muted-foreground py-4">
            <div>Total fixtures: {fixtures?.pagination?.total}</div>
          </div>
          <Pagination pagination={fixtures?.pagination} />
        </section>
      </div>
    </section>
  );
};

export default FixturesSection;
