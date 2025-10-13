"use client";

import { ISponsorProps } from "@/app/sponsorship/page";
import { staticImages } from "@/assets/images";
import Image from "next/image";
import React from "react";

const AdminSponsorOverview = ({ sponsor }: { sponsor: ISponsorProps }) => {
  return (
    <div id="sponsor-info">
      <h1 className="_title">Overview</h1>
      <div className="_secondaryBg p-5 ">
        <p className="">
          Name : <span className="_label ">{sponsor?.ownerName}</span>
        </p>
        <p className="">
          Business : <span className="_label ">{sponsor?.businessName}</span>
        </p>
        <p className="">
          Contact : <span className="_label ">{sponsor?.phone}</span>
        </p>
        <br />
        <Image
          src={sponsor?.logo?.secure_url || staticImages.manager}
          width={600}
          height={600}
          alt={sponsor.ownerName ?? "sponsor"}
          className="w-80 h-auto m-1"
        />
      </div>
    </div>
  );
};

export default AdminSponsorOverview;
