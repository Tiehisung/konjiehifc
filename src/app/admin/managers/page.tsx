import AdminManagers from "@/app/admin/managers/DisplayManagers";
import { apiConfig } from "@/lib/configs";
import { IQueryResponse } from "@/types";
import React from "react";
import TechnicalManagerForm from "./ManagerForm";

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
    <div className="_page">
      <TechnicalManagerForm
        availableRoles={getAvailableManagerialRoles(managers?.data ?? [])}
      />
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
    | "Technical Manager"
    | "Coach"
    | "Assistant Coach"
    | "Goalkeeper Coach"
    | "Fitness Coach"
    | "Analyst"
    | "Founder"
    | "Co-Founder";
  fullname: string;
  dateSigned: string;
  phone: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export const managerialRoles = [
  "Technical Manager",
  "Coach",
  "Assistant Coach",
  "Goalkeeper Coach",
  "Fitness Coach",
  "Analyst",
  "Founder",
  "Co-Founder",
];

export const getAvailableManagerialRoles = (managers?: IManager[]) =>
  managerialRoles.filter((mr) => !managers?.find((r) => r.role == mr));
