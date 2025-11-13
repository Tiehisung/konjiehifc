import { apiConfig } from "@/lib/configs";
import React from "react";
import AdminSponsors from "./Sponsors";
import { buildQueryStringServer } from "@/lib";
import { ISponsorProps } from "@/app/sponsorship/page";
import { IQueryResponse } from "@/types";

export const getSponsors = async (query?: string) => {
  try {
    const cleaned = query?.startsWith("?") ? query : "?" + query;
    const response = await fetch(`${apiConfig.sponsors}${cleaned ?? ""}`, {
      cache: "no-store",
    });
    const sponsors = await response.json();
    return sponsors;
  } catch {
    return null;
  }
};

export const getDonations = async (sponsorId?: string, query?: string) => {
  try {
    let cleaned = query?.startsWith("?") ? query : `?${query}`;
    if (sponsorId) cleaned = `${cleaned}&sponsorId=${sponsorId}`;
    const response = await fetch(
      `${apiConfig.sponsors}/donations${cleaned ?? ""}`,
      {
        cache: "no-store",
      }
    );
    return await response.json();
  } catch {
    return null;
  }
};
export const getDonationsBySponsor = async (sponsorId: string) => {
  try {
    const response = await fetch(`${apiConfig.sponsors}/${`${sponsorId}/donations`}`, {
      cache: "no-store",
    });
    return await response.json();
  } catch {
    return null;
  }
};

export const getSponsorById = async (id?: string) => {
  try {
    if (id) {
      const response = await fetch(`${apiConfig.sponsors}/${id}`, {
        cache: "no-store",
      });
      const sponsor = await response.json();
      return sponsor;
    }
  } catch {
    return null;
  }
};

interface IPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const AdminSponsorshipPage = async ({ searchParams }: IPageProps) => {
  const qs = buildQueryStringServer(await searchParams);
  const sponsors: IQueryResponse<ISponsorProps[]> = await getSponsors(qs);
  return (
    <div className="_page">
      <AdminSponsors sponsors={sponsors} />
    </div>
  );
};

export default AdminSponsorshipPage;
