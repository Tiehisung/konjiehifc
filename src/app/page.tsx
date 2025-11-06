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
import CardLoader from "@/components/loaders/CardLoader";

export default async function Home() {
  return (
    <main className=" relative md:block space-y-10">
      <Suspense fallback={<Loader message="Loading players.." />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<CardLoader className="h-36 w-40" />}>
        <LandingPlayers />
      </Suspense>

      <PitchGallery />

      <Suspense fallback={<LoadingSkeleton width={200} height={120} />}>
        <LandingSquad />
      </Suspense>

      <Suspense fallback={<CardLoader className="h-36 w-40" />}>
        <LiveMatchCard />
      </Suspense>

      <Suspense fallback={<CardLoader className="h-36 w-40" />}>
        <LandingFixtures />
      </Suspense>

      <Suspense fallback={<CardLoader className="h-36 w-40" />}>
        <LandingNewsHeadlines />
      </Suspense>

      <Suspense fallback={<CardLoader className="h-36 w-40" />}>
        <PlayerStatistics />
      </Suspense>

      <Suspense fallback={<CardLoader className="h-36 w-40" />}>
        <TechnicalManagement />
      </Suspense>
    </main>
  );
}
