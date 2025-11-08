import React from "react";

import { Title } from "@/components/Elements";
import { IMatchProps } from "../matches/(fixturesAndResults)";
import { getLiveMatch } from "../admin/live-match/page";
import { LiveMatchEvents } from "./LiveEventsDisplay";
import Image from "next/image";
import { checkTeams } from "@/lib";

export default async function LiveMatchPage() {
  const match: IMatchProps = (await getLiveMatch())?.data;

  const { home, away } = checkTeams(match);

  const goals = {
    home: home?.alias == "KFC" ? match?.goals?.length : match?.opponentGoals,
    away: away?.alias == "KFC" ? match?.goals?.length : match?.opponentGoals,
  };
  return (
    <div className="pt-4 container _page">
      <Title>Live Match Page</Title>
      <div className="container mx-auto p-4 _page">
        <h1 className="text-2xl font-bold mb-4 text-primaryRed">
          Live Match Update
        </h1>
        <div className="my-6 _card rounded-tl-3xl rounded-br-3xl flex items-center justify-between gap-6">
          <Image
            src={home?.logo as string}
            width={400}
            height={400}
            alt={home?.name ?? ""}
            className="aspect-square h-36 w-36 sm:h-44 sm:w-44 object-cover"
          />
          <div className=" flex flex-col justify-center items-center">
            <div className="text-xl md:text-2xl font-black uppercase">
              {home?.name}
            </div>
            <div className="mx-auto text-2xl text-center">
              {goals?.home ?? 0} - {goals?.away ?? 0}
            </div>
            <div className="text-xl md:text-2xl font-black uppercase">
              {away?.name}
            </div>
          </div>
          <Image
            src={away?.logo as string}
            width={400}
            height={400}
            alt={away?.name ?? ""}
            className="aspect-square h-36 w-36 sm:h-44 sm:w-44 object-cover"
          />
        </div>

        <br />
      </div>

      <section className=" ">
        <LiveMatchEvents match={match} />
      </section>
    </div>
  );
}
