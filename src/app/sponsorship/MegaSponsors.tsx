"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { ISponsorProps } from "./page";
import { getSponsors } from "../admin/sponsorship/page";
import { staticImages } from "@/assets/images";

export function MegaSponsors() {
  const [sponsors, setSponsors] = useState<ISponsorProps[]>([]);
  useEffect(() => {
    async function getSponsorsData() {
      const sponsors = await getSponsors();
      setSponsors(sponsors?.data ?? []);
    }
    getSponsorsData();
  }, []);
  return (
    <div>
      <h1 className="bg-modalOverlay text-white px-2">
        Mega sponsors {new Date().getFullYear()}
      </h1>
      <br />
      <div className="h-1 w-full bg-linear-to-r from-Red via-Orange to-Red/75" />
      <br />
      <div className="flex items-center _marquee">
        {
          (sponsors ?? [])?.map((sponsor, index) => (
            <div
              key={index}
              className=" p-4 w-fit h-fit rounded-2xl hover:bg-slate-400/30 "
            >
              <Image
                src={sponsor?.logo ?? staticImages.sponsor}
                width={300}
                height={300}
                alt="desc image"
                className="h-20 w-20 min-w-20 rounded-2xl object-cover bg-base-100"
              />
              <p className="max-w-24 line-clamp-1 _label text-center">
                {sponsor?.businessName}
              </p>
            </div>
          )) as ReactNode[]
        }
      </div>
    </div>
  );
}
