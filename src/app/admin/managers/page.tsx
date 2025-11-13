import AdminManagers from "@/app/admin/managers/DisplayManagers";
import { apiConfig } from "@/lib/configs";
import { IQueryResponse } from "@/types";
import React from "react";
import TechnicalManagerForm from "./ManagerForm";
import { PrimaryCollapsible } from "@/components/Collapsible";
import { Plus } from "lucide-react";
import Header from "../Header";

export const getManagers = async (query?: string) => {
  try {
    const formatted = query ? (query?.includes("?") ? query : "?" + query) : "";
    const response = await fetch(apiConfig.managers + formatted, {
      cache: "no-cache",
    });
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
      <Header
        title="Technical Management"
        subtitle="Staff and Managing Personnel"
      />
      <AdminManagers managers={managers?.data} />
      <PrimaryCollapsible
        header={{
          label: (
            <span
              className="rounded p-2 flex items-center hover:opacity-90 justify-center"
              title="Add Manager"
            >
              <Plus size={40} /> Add Manager
            </span>
          ),
          className: "border",
        }}
      >
        <TechnicalManagerForm
          availableRoles={getAvailableManagerialRoles(managers?.data ?? [])}
        />
      </PrimaryCollapsible>
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
