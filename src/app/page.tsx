import React, { Suspense } from "react";
import PlayerStatistics from "./statistics/Statistics";
import LandingPlayers from "./(landing)/Players";
import { TechnicalManagement } from "./(landing)/Management";
import LandingNewsHeadlines from "./news/LandingNews";
import LandingFixtures from "./matches/(fixturesAndResults)/LandingFixtures";
import Hero from "./(landing)/Hero";
import Loader from "@/components/loaders/Loader";
import { LiveMatchCard } from "./live-match/Live";
import LandingSquad from "./(landing)/Squad";
import { PitchGallery } from "./(landing)/Pitch";
import LoadingSkeleton from "react-loading-skeleton";
import TableLoader from "@/components/loaders/Table";

export default async function Home() {
  return (
    <main className=" relative md:block space-y-10">
      <Suspense fallback={<Loader message="Loading players.." />}>
        <Hero />
      </Suspense>

     
      <Suspense
        fallback={<TableLoader className="h-36 w-40" wrapperClassName="" />}
      >
        <LandingPlayers />
      </Suspense>

      <PitchGallery />

      <Suspense fallback={<LoadingSkeleton width={200} height={120} />}>
        <LandingSquad />
      </Suspense>

      <Suspense
        fallback={<TableLoader className="h-36 w-40" wrapperClassName="" />}
      >
        <LiveMatchCard />
      </Suspense>

      <Suspense
        fallback={<TableLoader className="h-36 w-40" wrapperClassName="" />}
      >
        <LandingFixtures />
      </Suspense>

      <Suspense
        fallback={<TableLoader className="h-36 w-40" wrapperClassName="" />}
      >
        <LandingNewsHeadlines />
      </Suspense>

      <Suspense
        fallback={<TableLoader className="h-36 w-40" wrapperClassName="" />}
      >
        <PlayerStatistics />
      </Suspense>

      <Suspense
        fallback={<TableLoader className="h-36 w-40" wrapperClassName="" />}
      >
        <TechnicalManagement />
      </Suspense>
    </main>
  );
}
