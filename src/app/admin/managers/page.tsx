import AdminManagers from "@/app/admin/managers/(components)/Managers";
import { apiConfig } from "@/lib/configs";
import { IFileProps, IQueryResponse } from "@/types";
import React from "react";

export const getManagers = async () => {
  try {
    const response = await fetch(apiConfig.managers, { cache: "no-cache" });
    const result = await response.json();
    return result;
  } catch {
    return null;
  }
};
const TechnicalManagersPage = async () => {
  const managers: IQueryResponse<IManager[]> = await getManagers();

  return (
    <div>
      <AdminManagers managers={managers?.data} />
    </div>
  );
};

export default TechnicalManagersPage;

export interface IManager {
  email: string;
  dob: string;
  _id: string;
  avatar: string;
  role:
    | "Coach"
    | "Technical manager"
    | "Assistant coach"
    | "Goalkeeper coach"
    | "Fitness coach"
    | "Analyst";
  fullname: string;
  dateSigned: string;
  phone: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}
