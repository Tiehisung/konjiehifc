"use client";

import React, { useEffect, useState } from "react";
import { IMatchProps } from "../matches/(fixturesAndResults)";
import { checkTeams } from "@/lib";
import Image from "next/image";
import { LuDot } from "react-icons/lu";
import { teamLogos } from "@/assets/teams/logos/team-logos";
import DiveUpwards from "@/components/Animate/DiveUp";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export const LiveMatchCard = ({ match }: { match: IMatchProps }) => {
  return (
    <Card className="card ">
      <CardHeader className="flex items-center gap-1.5 mb-2 ">
        <span className="badge bg-primaryRed my-0.5 ">LIVE</span>
        <span className="_p">Konjieh JHS park</span>
        <span className="text-xl font-thin text-emerald-400">{`56'`}</span>
      </CardHeader>

      <CardContent className=" _secondaryBg">
        <div className="flex items-center justify-between gap-5 ">
          <section className="flex flex-col items-center space-y-2">
            <Image
              width={250}
              height={250}
              src={
                checkTeams(match)?.home?.logo?.secure_url ?? teamLogos[0].logo
              }
              alt={"home logo"}
              className="w-12 h-12"
            />
            <span className=" _label">{checkTeams(match)?.home?.name}</span>
          </section>
          <section className="flex items-center gap-1">
            <h2 className="text-2xl font-bold">{match?.score?.kfc}</h2>
            <LuDot size={24} />
            <h2 className="text-2xl font-bold">{match?.score?.opponent}</h2>
          </section>
          <section className="flex flex-col items-center space-y-2">
            <Image
              width={250}
              height={250}
              src={
                checkTeams(match)?.away?.logo?.secure_url ?? teamLogos[0].logo
              }
              alt={"away logo"}
              className="w-12 h-12"
            />
            <span className=" _label">{checkTeams(match)?.away?.name}</span>
          </section>
        </div>
      </CardContent>
      <CardFooter className="   px-4 h-10">
        <LiveUpdates data={updates} random />
      </CardFooter>
    </Card>
  );
};

const updates = [
  "Goal by KFC",
  "Yellow card to Opponent",
  "Red card to KFC",
  "Substitution KFC",
];

interface ILiveUpdates {
  data: string[];
  random?: boolean;
  every?: number;
}
export const LiveUpdates = ({ data, random, every = 5000 }: ILiveUpdates) => {
  const [update, setUpdate] = useState(updates[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const valueIndex = random ? Math.floor(Math.random() * data.length) : 0;
      setUpdate(updates[valueIndex]);
    }, every);
    return () => clearInterval(interval);
  }, [data]);
  return (
    <div>
      <DiveUpwards dependency={update} yLimit={5}>
        <p className="_p text-blueBlack dark:text-white line-clamp-1 max-w-40">
          {update}
        </p>
      </DiveUpwards>
    </div>
  );
};
