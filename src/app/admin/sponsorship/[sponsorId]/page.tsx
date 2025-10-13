import DonateToSponsor from "./Donation";
import DonorBadging from "./Badging";
import EditSponsor from "./Edit";
import DeleteSponsor from "./Delete";
import { ISponsorProps } from "@/app/sponsorship/page";
import AdminSponsorOverview from "./Overview";
import { getSponsors } from "../page";

interface Params {
  sponsorId: string;
}

export default async function AdminSponsor({ params }: { params: Params }) {
  const sponsor: ISponsorProps = await getSponsors(params.sponsorId);

  return (
    <div className="flex flex-col gap-16 py-10">
      <AdminSponsorOverview sponsor={sponsor} />

      <DonateToSponsor sponsor={sponsor} />

      <DonorBadging sponsor={sponsor} />
      <EditSponsor sponsor={sponsor} />
      <DeleteSponsor sponsorId={sponsor?._id as string} />
    </div>
  );
}
