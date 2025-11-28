import { IQueryResponse } from "@/types";
import { getSponsors } from "../admin/sponsorship/page";
import { ICldFileUploadResult } from "@/components/cloudinary/FileUploadWidget";
import Image from "next/image";
import { staticImages } from "@/assets/images";

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
    title: "Konjiehi FC Sponsors",
    description: "Meet the official sponsors and partners of Konjiehi FC.",
    images: ["/kfc.png"],
  },
};

export default async function SponsorsPage({}) {
  const sponsors: IQueryResponse<ISponsorProps[]> = await getSponsors();
  console.log({ sponsors });
  return (
    <div className="bg-sponsorsLite">
      <HEADER />
      <main className='_page'>
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
