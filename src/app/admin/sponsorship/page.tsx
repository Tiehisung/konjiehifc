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
    <div>
      <AdminSponsors sponsors={sponsors} />
    </div>
  );
};

export default AdminSponsorshipPage;
