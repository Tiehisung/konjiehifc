import React, {  } from "react";
import { IMatchProps } from "../matches/(fixturesAndResults)";
import { checkTeams } from "@/lib";
import Image from "next/image";
import { LuDot } from "react-icons/lu";
import { teamLogos } from "@/assets/teams/logos/team-logos";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { getLiveMatch } from "../admin/live-match/page";
import { MatchUpdator } from "./Updator";

export const LiveMatchCard = async () => {
  const match: IMatchProps = await getLiveMatch();
  return (
    <Card className=" ">
      <CardHeader className="flex items-center gap-1.5 mb-2 ">
        <span className=" bg-primaryRed my-0.5 ">LIVE</span>
        <span className="_p">Konjieh JHS park</span>
        <span className="text-xl font-thin text-emerald-400">{`56'`}</span>
      </CardHeader>

      <CardContent className="">
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
        <MatchUpdator random />
      </CardFooter>
    </Card>
  );
};
