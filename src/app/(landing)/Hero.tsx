import React from "react";
import { IPlayer } from "../players/page";
// import { getPlayers } from "../admin/players/page";
import Image from "next/image";
import Loader from "@/components/Loader";
import { staticImages } from "@/assets/images";
import { Button } from "@/components/buttons/Button";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";

const Hero = async ({ players }: { players: IPlayer[] }) => {
  // const players: IPlayer[] = await getPlayers();
  if (!players) return <Loader message="Fetching players..." />;
  return (
    <div className="">
      <div
        className="flex items-center max-md:flex-col gap-10 overflow-x-auto _hideScrollbar bg-cover bg-fixed h-[80vh] "
        style={{
          background: `url(${staticImages.ronaldo})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      >
        <Card className="max-w-2xl bg-blue-200/20 backdrop-blur-md p-4">
          <CardContent>
            <div className="space-y-3 italic">
              <p className="text-4xl md:text-6xl font-semibold">YOUR GAME</p>
              <p className="text-4xl md:text-6xl font-semibold text-amber-600">
                YOUR PASSION
              </p>
              <p className="text-4xl md:text-6xl font-semibold">YOUR LEGACY</p>
            </div>

            <p className="my-4">
              Stay ahead with the latest konjiehi football and sporting news.
              From fixtures, signings, through to news. All in one place,
              konjiehi-fc.vercel.app
            </p>

            <div className=" flex items-center gap-6">
              <Button className="flex items-center gap-1.5 _primaryBtn backdrop-blur-sm">
                Explore Matches <FaAngleRight />
              </Button>
              <Link
                href={"/player-application"}
                className="_secondaryBtn backdrop-blur-sm"
              >
                Apply as player
                <FaAngleRight />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Hero;
