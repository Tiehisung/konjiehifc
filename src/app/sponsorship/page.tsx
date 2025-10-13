import { getSponsors } from "../admin/sponsorship/page";
import  { AllSponsors } from "./Sponsors";

export default async function SponsorsPage({}) {
  const sponsors = await getSponsors();
  return (
    <main className="bg-sponsorsLite">
      <br />
     
      <h2 className=" _title text-orange-400 px-2 text-center ">Your support is our backbone</h2>
    
    
 
      <br />
      <h1 className="bg-[#272626b5] text-white px-2">
       Sponsors {new Date().getFullYear()}
      </h1>
      <hr />
      <hr />
      <AllSponsors sponsors={sponsors} />
      <br />
    </main>
  );
}


export interface ISponsorProps {
  _id: string;
  badges: number;
  logo: { secure_url: string };
  businessName: string;
  businessDescription: string;
  ownerName: string;
  phone:string
}