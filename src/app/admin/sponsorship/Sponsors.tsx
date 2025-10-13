import { ISponsorProps } from "@/app/sponsorship/page";
import React from "react";
import { getSponsors } from "./page";
import Image from "next/image";
import Link from "next/link";
import { AddNewSponsor } from "./AddSponsor";
import { staticImages } from "@/assets/images";
import { Title } from "@/components/Elements";

const AdminSponsors = async () => {
  const sponsors: ISponsorProps[] = await getSponsors();
  return (
    <div>
      <header className="flex items-center gap-6 pr-3">
        <Title className="">Sponsorship</Title>
        <AddNewSponsor sponsors={sponsors} />
      </header>
      <ul className="grid grid-cols-3 sm:flex flex-wrap max-full  my-8">
        {sponsors?.map((sponsor, index) => (
          <li key={index} className="flex">
            <Link
              href={`/admin/sponsorship/${sponsor._id}`}
              className=" p-4 w-fit h-fit rounded-2xl hover:bg-slate-400/30 slowTrans"
            >
              <Image
                src={sponsor?.logo?.secure_url ?? staticImages.sponsor}
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
    </div>
  );
};

export default AdminSponsors;
