"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/loaders/Loader";
import { ISponsorProps } from "./page";
import { getSponsors } from "../admin/sponsorship/page";
import Link from "next/link";
import { staticImages } from "@/assets/images";

interface TopSponsorsProps {
  sponsors: ISponsorProps[];
}

export default function TopSponsors({ sponsors }: TopSponsorsProps) {
  if (!sponsors)
    return (
      <Loader
        message="Loading top sponsors..."
        iconStyles={"text-3xl"}
        className="flex flex-col justify-center items-center h-40 text-teal-400"
      />
    );
  return (
    <div className="p-1 md:p-2 bg-sponsors grid md:grid-cols-2 gap-3">
      {sponsors?.slice(0, 3).map((sponsor, index) => (
        <Link
          key={index}
          href={`/sponsorship/${sponsor._id}`}
          className=" p-4 w-fit h-fit rounded-2xl hover:bg-slate-400/30 slowTrans"
        >
          <Image
            src={sponsor?.logo ?? staticImages.sponsor.src}
            width={300}
            height={300}
            alt="desc image"
            className="h-20 w-24 min-w-20 rounded-2xl object-cover bg-base-100"
          />
          <p className="max-w-24 line-clamp-1 _label text-center">
            {sponsor?.businessName}
          </p>
        </Link>
      ))}
    </div>
  );
}

export function AllSponsors({ sponsors = [] }: { sponsors?: ISponsorProps[] }) {
  return (
    <ul className="grid grid-cols-3 sm:flex flex-wrap max-full  my-8">
      {sponsors?.map((sponsor, index) => (
        <li key={index} className="flex">
          <Link
            href={`/sponsorship/${sponsor._id}`}
            className=" p-4 w-fit h-fit rounded-2xl hover:bg-slate-400/30 slowTrans"
          >
            <Image
              src={sponsor?.logo ?? staticImages.sponsor}
              width={300}
              height={300}
              alt="desc image"
              className="h-20 w-24 min-w-20 rounded-2xl object-cover bg-base-100"
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
  const [ourSponsors, setSponsors] = useState<ISponsorProps[]>([]);
  useEffect(() => {
    async function getSponsorsData() {
      const sponsors = await getSponsors();
      setSponsors(sponsors?.data??[]);
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
      <AllSponsors sponsors={ourSponsors} />
    </div>
  );
}
