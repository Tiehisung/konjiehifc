import { IFileProps, IQueryResponse } from "@/types";
import { getSponsors } from "../admin/sponsorship/page";
import { ICldFileUploadResult } from "@/components/cloudinary/FileUploadWidget";
import Image from "next/image";
import { staticImages } from "@/assets/images";
import HEADER from "@/components/Element";
import { kfc } from "@/data/kfc";
import SponsorUs from "./SponsorUs";
import MarqueeCarousel from "@/components/carousel/marquee";
import { ReactNode } from "react";

export const metadata = {
  title: "Sponsors",
  description: "Konjiehi FC official sponsors and partnership opportunities.",
  keywords: [
    "Konjiehi FC sponsors",
    "football sponsors",
    "partnership",
    "donations",
  ],
  openGraph: {
    title: "Konjiehi FC Support & Sponsors",
    description: "Meet the official sponsors and supporters of Konjiehi FC.",
    images: [kfc.logo],
  },
};

export default async function SponsorsPage({}) {
  const sponsors: IQueryResponse<ISponsorProps[]> = await getSponsors();

  return (
    <div className="">
      <HEADER title="SUPPORT & SPONSORS" />
      <main className="_page p-5">
        <ul className="flex flex-wrap items-center gap-5 ">
          {sponsors?.data?.map((sponsor) => {
            return (
              <li
                className="border-t-4 border-Blue rounded-t h-32 w-32 bg-card flex items-center gap-1 flex-wrap justify-center shadow-xl"
                key={sponsor?._id}
              >
                <div className="flex items-center gap-1 flex-wrap justify-center">
                  <Image
                    src={sponsor?.logo ?? staticImages.ball}
                    alt={sponsor?.name}
                    width={200}
                    height={200}
                    className="w-14 h-14"
                  />
                  <span>{sponsor?.name}</span>
                </div>
              </li>
            );
          })}
        </ul>
        <MarqueeCarousel>
          {
            sponsors?.data?.map((sponsor) => (
              <div
                className="border-t-4 border-Blue rounded-t h-32 w-fit px-5 bg-card flex items-center gap-1 flex-wrap justify-center shadow-xl"
                key={sponsor?._id}
              >
                <div className="flex items-center gap-1 flex-wrap justify-center">
                  <Image
                    src={sponsor?.logo ?? staticImages.ball}
                    alt={sponsor?.name}
                    width={200}
                    height={200}
                    className="w-14 h-14"
                  />
                  <span>{sponsor?.name}</span>
                </div>
              </div>
            )) as ReactNode[]
          }
        </MarqueeCarousel>

        <br />

        <SponsorUs />
      </main>
    </div>
  );
}

export interface ISponsorProps {
  _id: string;
  badges: number;
  logo: string;
  businessName: string;
  businessDescription: string;
  name: string;
  phone: string;
  donations?: IDonation[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IDonation {
  _id: string;
  item: string;
  description: string;
  files: ICldFileUploadResult[];
  sponsor: ISponsorProps;
  createdAt?: string;
  updatedAt?: string;
}
