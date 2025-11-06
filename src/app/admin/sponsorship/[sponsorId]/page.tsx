import   { DisplayDonations } from "./Donation";
import DonorBadging from "./Badging";
import DeleteSponsor from "./Delete";
import { ISponsorProps } from "@/app/sponsorship/page";
import AdminSponsorOverview from "./Overview";
import { getSponsorById } from "../page";
import { EditSponsor } from "./Edit";
import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { apiConfig } from "@/lib/configs";

interface IProps {
  params: Promise<{ sponsorId: string }>;
}

export default async function AdminSponsor({ params }: IProps) {
  const sponsor: ISponsorProps = await getSponsorById((await params).sponsorId);

  return (
    <div className="_page flex flex-col items-center justify-center gap-16 py-10 w-full">
      <AdminSponsorOverview sponsor={sponsor} />

      <DisplayDonations sponsor={sponsor} />

      <DonorBadging sponsor={sponsor} />
      <EditSponsor sponsor={sponsor} />
      <DeleteSponsor sponsorId={sponsor?._id as string} />
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
  );
}
