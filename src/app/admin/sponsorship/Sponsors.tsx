import { ISponsorProps } from "@/app/sponsorship/page";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AddNewSponsor } from "./AddSponsor";
import { staticImages } from "@/assets/images";
import { Title } from "@/components/Elements";
import { IQueryResponse } from "@/types";
import { shortText } from "@/lib";

const AdminSponsors = ({
  sponsors,
}: {
  sponsors: IQueryResponse<ISponsorProps[]>;
}) => {
  return (
    <div>
      <header className="flex items-center gap-6 pr-3">
        <Title className="">Sponsorship</Title>
        <AddNewSponsor sponsors={sponsors?.data} />
      </header>
      <ul className="grid grid-cols-3 sm:flex flex-wrap max-full  my-8">
        {sponsors?.data?.map((sponsor, index) => (
          <li key={index} className="flex">
            <Link
              href={`/admin/sponsorship/${sponsor._id}`}
              className=" p-4 w-fit h-fit rounded-2xl hover:bg-slate-400/30 _slowTrans"
            >
              <Image
                src={sponsor?.logo ?? staticImages.sponsor}
                width={300}
                height={300}
                alt={shortText(sponsor?.name,10)}
                className="h-20 w-24 min-w-20 rounded-2xl object-cover bg-secondary"
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
