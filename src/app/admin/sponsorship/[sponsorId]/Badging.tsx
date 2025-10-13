"use client";

import { CgArrowUp } from "react-icons/cg";
import { ISponsorProps } from "@/app/sponsorship/page";

export default function DonorBadging({ sponsor }: { sponsor: ISponsorProps }) {
  return (
    <div className="p-2" id="badging">
      <h1 className="_title ">Donor badges</h1>
      <div className="_secondaryBg p-5 ">
        <p>Badging is simply tracking the donations by instance.</p>
        <br />
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="font-semibold text-teal-700 text-2xl">
            {sponsor?.businessName}
          </p>
          <span className="__waving text-5xl text-yellow-100 italic border rounded-full py-4 px-4 bg-cyan-600 text-center">
            {sponsor?.badges ? sponsor?.badges : "no"}
          </span>
          badges.
        </div>
        <CgArrowUp className="text-blue-400 __waving mx-1" />
      </div>
    </div>
  );
}
