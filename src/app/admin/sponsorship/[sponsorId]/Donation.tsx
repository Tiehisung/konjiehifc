"use client";

import { ISponsorProps } from "@/app/sponsorship/page";
import { IGalleryProps } from "@/types";
import GalleryGrid from "@/components/Gallery/GallaryGrid";
import DonationForm from "./DonationForm";
import { StackModal } from "@/components/modals/StackModal";
import { Button } from "@/components/ui/button";

export function DisplayDonations({ sponsor }: { sponsor?: ISponsorProps }) {
  const galleries: IGalleryProps[] =
    sponsor?.donations?.map((d) => ({ ...d, tags: [], title: d.item })) ?? [];
  return (
    <div id="support">
      <StackModal
        id="donate"
        trigger={<Button variant={"default"}>Donator Now</Button>}
        className="bg-card px-6 max-w-4xl rounded-2xl"
        closeOnEsc
      >
        <DonationForm sponsor={sponsor} />
      </StackModal>
      <GalleryGrid galleries={galleries} />
    </div>
  );
}
