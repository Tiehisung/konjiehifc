import AdminManagers from "@/app/admin/managers/(components)/Managers";
import { apiConfig } from "@/lib/configs";
import { IFileProps } from "@/types";
import React from "react";

export const getManagers = async () => {
  try {
    const response = await fetch(apiConfig.managers, { cache: "no-cache" });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const TechnicalManagersPage = async () => {
  const managers: IManager[] = await getManagers();

  return (
    <div>
      <AdminManagers managers={managers} />
    </div>
  );
};

export default TechnicalManagersPage;

export interface IManager {
  email: string;
  dob: string;
  _id: string;
  avatar: IFileProps;
  role:
    | "Technical manager"
    | "Coach"
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
