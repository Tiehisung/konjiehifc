import { apiConfig } from "@/lib/configs";
import React from "react";
import AdminSponsors from "./Sponsors";
import { buildQueryStringServer } from "@/lib";
import { ISponsorProps } from "@/app/sponsorship/page";
import { IQueryResponse } from "@/types";

export const getSponsors = async (id?: string) => {
  if (id) {
    const response = await fetch(`${apiConfig.sponsors}/${id}`, {
      cache: "no-store",
    });
    const sponsor = await response.json();
    return sponsor;
  }

  const response = await fetch(apiConfig.sponsors, {
    cache: "no-store",
  });
  const sponsors = await response.json();
  return sponsors;
};
interface IPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const AdminSponsorshipPage = async ({searchParams}:IPageProps) => {
  const qs = buildQueryStringServer(searchParams);
  const sponsors: IQueryResponse<ISponsorProps[]> = await getSponsors();
  return (
    <div>
      <AdminSponsors sponsors={sponsors}/>
    </div>
  );
};

export default AdminSponsorshipPage;
