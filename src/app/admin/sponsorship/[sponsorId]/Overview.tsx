"use client";

import { ISponsorProps } from "@/app/sponsorship/page";
import { staticImages } from "@/assets/images";
import Image from "next/image";
import React from "react";

const AdminSponsorOverview = ({ sponsor }: { sponsor: ISponsorProps }) => {
  return (
    <div id="sponsor-info" className=" w-full">
      <h1 className="_title _gradient text-center">Overview</h1>
      <div className=" p-5 flex flex-col justify-center items-center gap-1.5">
        <br />
        <Image
          src={(sponsor?.logo as string) ?? staticImages.sponsor}
          width={600}
          height={600}
          alt={sponsor?.name ?? "sponsor"}
          className="w-80 h-auto m-1"
        />
        <div className="text-center">
          <p className="_heading">{sponsor?.name}</p>
          <p className="_title">{sponsor?.businessName}</p>
          <p className="_subtitle">{sponsor?.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSponsorOverview;
