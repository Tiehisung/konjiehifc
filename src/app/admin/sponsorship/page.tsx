import { apiConfig } from "@/lib/configs";
import React from "react";
import AdminSponsors from "./Sponsors";

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

const AdminSponsorshipPage = () => {
  return (
    <div>
      <AdminSponsors />
    </div>
  );
};

export default AdminSponsorshipPage;
