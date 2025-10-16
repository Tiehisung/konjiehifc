import React, { Suspense } from "react";
import PlayerStatistics from "./statistics/Statistics";
import LandingPlayers from "./(landing)/Players";
import { CaptaincySlides, TechnicalManagement } from "./(landing)/Management";
import LandingNewsHeadlines from "./news/LandingNews";
import LandingFixtures from "./matches/(fixturesAndResults)/LandingFixtures";
import Hero from "./(landing)/Hero";
import Loader from "@/components/Loader";
import { IManager, getManagers } from "./admin/managers/page";
import { getMatches } from "./admin/matches/page";
import { ICaptainProps } from "./admin/players/captaincy/Captaincy";
import { getCaptains } from "./admin/players/captaincy/page";
import { getPlayers } from "./admin/players/page";
import { IMatchProps } from "./matches/(fixturesAndResults)";
import { IPlayer } from "./players/page";
import { LiveMatchCard } from "./live-match/Live";
import { getLiveMatch } from "./admin/live-match/page";
import { INewsProps } from "./news/page";
import { getNews } from "./admin/news/page";

export default async function Home() {
  const players: IPlayer[] = await getPlayers();
  const matches: IMatchProps[] = await getMatches({});
  const captains = (await getCaptains())?.data as ICaptainProps[];
  const managers: IManager[] = await getManagers();
  const liveMatch: IMatchProps = await getLiveMatch();
  const news: INewsProps[] = await getNews();

  return (
    <main className=" relative md:block space-y-10">
      <Suspense fallback={<Loader message="Loading players.." />}>
        <Hero players={players} />
      </Suspense>

      <Suspense fallback={<Loader message="Loading players.." />}>
        <LandingPlayers />
      </Suspense>

      <Suspense fallback={<Loader message="Checking for LIVE match.." />}>
        <div>
          <h1 className="_title">Live Match Update</h1>
          <LiveMatchCard match={liveMatch} />
        </div>
      </Suspense>

      <Suspense fallback={<Loader message="Loading fixtures.." />}>
        <LandingFixtures matches={matches} />
      </Suspense>

      <Suspense fallback={<Loader message="Loading news.." />}>
        <LandingNewsHeadlines news={news} />
      </Suspense>

      <PlayerStatistics />

      <TechnicalManagement managers={managers} />
      <CaptaincySlides captains={captains} />
    </main>
  );
}
