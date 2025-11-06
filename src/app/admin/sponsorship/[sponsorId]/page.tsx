import { DisplayDonations } from "./Donation";
import DonorBadging from "./Badging";
import { IDonation, ISponsorProps } from "@/app/sponsorship/page";
import AdminSponsorOverview from "./Overview";
import { getDonations, getSponsorById } from "../page";
import { EditSponsor } from "./Edit";
import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { apiConfig } from "@/lib/configs";
import { IQueryResponse, IRecord } from "@/types";
import { buildQueryStringServer } from "@/lib";

interface IProps {
  params: Promise<{ sponsorId: string }>;
  searchParams: Promise<IRecord>;
}

export default async function AdminSponsor({ params, searchParams }: IProps) {
  const sponsorId = (await params).sponsorId;
  const query = buildQueryStringServer(await searchParams);

  const sponsor: ISponsorProps = await getSponsorById(sponsorId);
  const donations: IQueryResponse<IDonation[]> = await getDonations(
    sponsorId,
    query
  );

  return (
    <div className="_page flex flex-col items-center justify-center gap-16 py-10 w-full ">
      <div
        className="h-screen w-full rounded-t-md z-[-1] fixed inset-0 bottom-0 bg-no-repeat bg-cover opacity-30"
        style={{ backgroundImage: `url(${sponsor?.logo})` }}
      />
      <AdminSponsorOverview sponsor={sponsor} />

      <DisplayDonations sponsor={sponsor} donations={donations} />

      <DonorBadging sponsor={sponsor} />

      <div className="flex items-center justify-center rounded-2xl gap-8 ring ring-primaryRed w-full">
        <EditSponsor sponsor={sponsor} />

        {/* Delete */}
        <ConfirmActionButton
          primaryText="Delete Sponsor"
          uri={`${apiConfig.sponsors}/${sponsor?._id}`}
          method={"DELETE"}
          escapeOnEnd
          variant="destructive"
          title="Delete sponsor"
          confirmText={`Are you sure you want to delete ${sponsor?.name}?`}
          gobackAfter
        />
      </div>
    </div>
  );
}
