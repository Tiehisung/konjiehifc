"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/loaders/Loader";
import { ISponsorProps } from "./page";
import { getSponsors } from "../admin/sponsorship/page";
import Link from "next/link";
import { staticImages } from "@/assets/images";

export function AllSponsors({ sponsors = [] }: { sponsors?: ISponsorProps[] }) {
  return (
    <ul className="grid grid-cols-3 sm:flex flex-wrap max-full  my-8">
      {sponsors?.map((sponsor, index) => (
        <li key={index} className="flex">
          <Link
            href={`/sponsorship/${sponsor._id}`}
            className=" p-4 w-fit h-fit rounded-2xl hover:bg-slate-400/30 _slowTrans"
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
          </Link>
        </li>
      ))}
    </ul>
  );
}

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
      <h1 className="bg-[#272626b5] text-white px-2">
        Mega sponsors {new Date().getFullYear()}
      </h1>
      <hr />
      <br />
      <ul className="grid grid-cols-3 sm:flex flex-wrap max-full  my-8">
        {sponsors?.map((sponsor, index) => (
          <li key={index} className="flex">
            <div className=" p-4 w-fit h-fit rounded-2xl hover:bg-slate-400/30 _slowTrans">
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
          </li>
        ))}
      </ul>
    </div>
  );
}
