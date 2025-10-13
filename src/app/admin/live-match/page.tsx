import { Suspense } from "react";
import { MatchEvents,  } from "./(components)/Events";
import MatchForm from "./(components)/MatchForm";
import { apiConfig } from "@/lib/configs";
import { IMatchProps } from "@/app/matches/(fixturesAndResults)";
import { AddLiveMatchEvent } from "./(components)/AddMatchEvent";

export const getLiveMatch = async () => {
  try {
    const response = await fetch(apiConfig.matches + "/live", {
      cache: "no-cache",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export default async function LiveMatchPage() {
  const match: IMatchProps = await getLiveMatch();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-primaryRed">Live Football Match Update</h1>
      <div className="form-control lg:grid lg:grid-cols-2 items-start gap-8">
        <Suspense fallback={<div>Loading match form...</div>}>
          <MatchForm match={match} />
        </Suspense>

        <Suspense fallback={<div>Loading match events...</div>}>
          <div className=" w-full">
            <AddLiveMatchEvent match={match} />
          </div>
          <MatchEvents match={match} />
        </Suspense>
      </div>
    </div>
  );
}
