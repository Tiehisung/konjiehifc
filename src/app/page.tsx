import React, { Suspense } from "react";
import PlayerStatistics from "./statistics/Statistics";
import LandingPlayers from "./(landing)/Players";
import { CaptaincySlides, TechnicalManagement } from "./(landing)/Management";
import LandingNewsHeadlines from "./news/LandingNews";
import LandingFixtures from "./matches/(fixturesAndResults)/LandingFixtures";
import Hero from "./(landing)/Hero";
import Loader from "@/components/Loader";
import { LiveMatchCard } from "./live-match/Live";
import LandingSquad from "./(landing)/Squad";

export default async function Home() {
  return (
    <main className=" relative md:block space-y-10">
       <Suspense fallback={<Loader message="Loading players.." />}>
        <Hero />
      </Suspense>  

       <Suspense fallback={<Loader message="Loading players.." />}>
        <LandingPlayers />
      </Suspense>

      <Suspense fallback={<Loader message="Checking for LIVE match.." />}>
        <LandingSquad />
      </Suspense>
      <Suspense fallback={<Loader message="Checking for LIVE match.." />}>
        <div>
          <h1 className="_title">Live Match Update</h1>
          <LiveMatchCard />
        </div>
      </Suspense>

      <Suspense fallback={<Loader message="Loading fixtures.." />}>
        <LandingFixtures />
      </Suspense>

      <Suspense fallback={<Loader message="Loading news.." />}>
        <LandingNewsHeadlines />
      </Suspense>  

      <Suspense fallback={<Loader message="Loading statistics.." />}>
        <PlayerStatistics />
      </Suspense>

      <Suspense fallback={<Loader message="Loading captains.." />}>
        <CaptaincySlides />
      </Suspense>

      <Suspense fallback={<Loader message="Loading Managers.." />}>
        <TechnicalManagement />
      </Suspense>
    </main>
  );
}
