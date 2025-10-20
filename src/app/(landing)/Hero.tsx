import React from "react";
import { IPlayer } from "../players/page";
import { staticImages } from "@/assets/images";
import { Button } from "@/components/buttons/Button";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

import Image from "next/image";
import { getPlayers } from "../admin/players/page";
import { IQueryResponse } from "@/types";

const Hero = async () => {
  const players: IQueryResponse<IPlayer[]>  = await getPlayers();
  const anyPlayer = players?.data?.[players?.data?.length - 1];

  return (
    <div className="flex items-center flex-wrap gap-10 _card">
      <div className="max-w-2xl p-4 bg-tansparent">
        <div className="space-y-3 italic">
          <p className="text-4xl md:text-6xl font-semibold">
            Born to Play. Built to Win.
          </p>
          <p className="text-4xl md:text-6xl font-semibold text-amber-600">
            YOUR PASSION
          </p>
          <p className="text-4xl md:text-6xl font-semibold">YOUR LEGACY</p>
        </div>

        <p className="my-4 mt-8">
          At Konjieh FC, we play for pride, for our people, and for the love of
          football. Together, we rise — stronger every season.
        </p>

        <div className=" flex items-center gap-6 mt-4">
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
      </div>

      <div className=" max-md:w-full min-w-1/2 grow rounded-xl overflow-hidden">
        <Image
          className="h-[70vh] object-cover w-full hover:scale-105 _slowTrans"
          alt="hero image"
          width={500}
          height={500}
          src={anyPlayer?.avatar?.secure_url || staticImages.ronaldo}
        />
      </div>
    </div>
  );
};

export default Hero;
