import React from "react";
import { staticImages } from "@/assets/images";
import { Button } from "@/components/buttons/Button";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import { Updator } from "@/components/Updator";

// import { IPlayer } from "../players/page";
// import { IQueryResponse } from "@/types";
// import { getPlayers } from "../admin/players/page";

const Hero = async () => {
  // const players: IQueryResponse<IPlayer[]> = await getPlayers();

  return (
    <div className="flex items-center justify-center pt-6 flex-wrap gap-10 text-center">
      <div
        className=" p-4 bg-tansparent w-full min-h-80 "
        style={{ background: `url(${staticImages.blueCurvy})` }}
      >
        <div className="space-y-3 italic">
          <p className="text-4xl md:text-6xl font-semibold text-center">
            Born to Play. Built to Win.
          </p>

          <div className="rounded-full p-2 bg-background/20 backdrop-blur-xs">
            <p className="text-4xl md:text-6xl font-semibold text-amber-600 text-center">
              YOUR PASSION
            </p>
            <p className="text-4xl md:text-6xl font-semibold text-center">
              YOUR LEGACY
            </p>
          </div>
        </div>

        <p className="my-4 mt-8 text-center">
          At Konjieh FC, we play for pride, for our people, and for the love of
          football. Together, we rise — stronger every season.
        </p>

        <div className=" flex items-center justify-center gap-6 mt-4">
          <Button className="flex items-center gap-1.5 _secondaryBtn backdrop-blur-sm w-64 justify-between h-10 shadow">
            <span> Support the Club 👉</span>
            <Updator
              data={["Jerseys", "Boots", "Balls", "First Aid", "Cash", "Any"]}
              random
              className=" text-white rounded-full px-2 border bg-primaryGreen "
            />
          </Button>
        </div>
      </div>

      {/* <div className=" max-md:w-full min-w-1/2 grow overflow-hidden">
        <Image
          className="h-[70vh] object-contain w-full hover:scale-105 _slowTrans"
          alt="hero image"
          fill
          src={anyPlayer?.avatar ?? staticImages.ronaldo}
        />
      </div> */}
    </div>
  );
};

export default Hero;
