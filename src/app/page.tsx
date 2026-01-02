import React, { Suspense } from "react";
import PlayerStatistics from "./statistics/Statistics";
import LandingPlayers from "./(landing)/Players";
import { TechnicalManagement } from "./(landing)/Management";
import LandingNewsHeadlines from "./news/LandingNews";
import LandingFixtures from "./matches/(fixturesAndResults)/LandingFixtures";
import Hero from "./(landing)/HeroLegacy";
import Loader from "@/components/loaders/Loader";
import { LiveMatchCard } from "./matches/live/Live";
import LandingSquad from "./(landing)/Squad";
import { PitchGallery } from "./(landing)/Pitch";
import LoadingSkeleton from "react-loading-skeleton";
import CardLoader from "@/components/loaders/CardLoader";
import HERO from "./(landing)/HeroSection";

export const metadata = {
  title: "Konjiehi FC – Official Website",
  description: "Latest news, fixtures, player stats and match highlights.",
  keywords: [
    "Konjiehi FC",
    "football",
    "fixtures",
    "news",
    "players",
    "Wa",
    "Konjiehi",
    "konfc",
  ],
  openGraph: {
    title: "Konjiehi FC",
    description: "Official football club website.",
    url: "https://konjiehifc.vercel.app",
    images: [
      {
        url: "https://konjiehifc.vercel.app/favicon.ico",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function Home() {
  return (
    <main className=" relative md:block space-y-10">
      <HERO/>

      <Suspense fallback={<CardLoader className="h-36 w-40" />}>
        <LandingPlayers />
      </Suspense>

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

      <PitchGallery />

      <Suspense fallback={<CardLoader className="h-36 w-40" />}>
        <PlayerStatistics />
      </Suspense>

      <Suspense fallback={<CardLoader className="h-36 w-40" />}>
        <TechnicalManagement />
      </Suspense>
    </main>
  );
}
