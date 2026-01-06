"use client";

import { IDonation, ISponsorProps } from "@/app/sponsorship/page";
import { IQueryResponse } from "@/types";
import { IGallery } from "@/types/file.interface";
import GalleryGrid from "@/components/Gallery/GallaryGrid";
import DonationForm from "./DonationForm";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/pagination/Pagination";
import { PrimaryAccordion } from "@/components/Accordion";

export function DisplayDonations({
  sponsor,
  donations,
}: {
  sponsor?: ISponsorProps;
  donations?: IQueryResponse<IDonation[]>;
}) {
  const galleries: IGalleryProps[] =
    donations?.data?.map((d) => ({ ...d, tags: [], title: d.item })) ?? [];

  return (
    <div id="support" className="space-y-6">
      <PrimaryAccordion
        data={[
          {
            trigger: (
              <Button variant={"default"} className="cursor-pointer">
                Donator Now
              </Button>
            ),
            value: "donate",
            content: (
              <div className="bg-card p-4 rounded-2xl">
                <DonationForm sponsor={sponsor} />
              </div>
            ),
          },
        ]}
      />
      <div />
      <GalleryGrid galleries={galleries} />
      <Pagination pagination={donations?.pagination} />
    </div>
  );
}
