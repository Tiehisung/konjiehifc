import { IQueryResponse } from "@/types";
import { getSponsors } from "../admin/sponsorship/page";
import { ICldFileUploadResult } from "@/components/cloudinary/FileUploadWidget";
 
export const metadata = {
  title: "Sponsors",
  description: "Konjiehi FC official sponsors and partnership opportunities.",
  keywords: ["Konjiehi FC sponsors", "football sponsors", "partnership",'donations'],
  openGraph: {
    title: "Konjiehi FC Sponsors",
    description: "Meet the official sponsors and partners of Konjiehi FC.",
    images: ["/kfc.png"],
  },
};

export default async function SponsorsPage({}) {
  const sponsors:IQueryResponse<ISponsorProps[]> = await getSponsors();
  console.log({sponsors})
  return (
    <main className="bg-sponsorsLite">
      <br />

      <h2 className=" _title text-orange-400 px-2 text-center ">
        Your support is our backbone
      </h2>

      <br />
      <h1 className="bg-[#272626b5] text-white px-2">
        Sponsors {new Date().getFullYear()}
      </h1>
      <hr />
      <hr />
      {/* <AllSponsors sponsors={sponsors?.data??[]} /> */}
      <br />
    </main>
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
  donations?:IDonation[]
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