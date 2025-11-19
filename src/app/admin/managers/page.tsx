import AdminManagers from "@/app/admin/managers/DisplayManagers";
import { apiConfig } from "@/lib/configs";
import { IQueryResponse, ISelectOptionLV } from "@/types";
import React from "react";
import TechnicalManagerForm from "./ManagerForm";
import { PrimaryCollapsible } from "@/components/Collapsible";
import { Plus } from "lucide-react";
import Header from "../../../components/Element";
import { getFeatureByName } from "../features/page";
import { IFeature } from "../features/OptionsFeature";

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
  const roles: IFeature<ISelectOptionLV[]> = await getFeatureByName(
    "manager_roles"
  );

  console.log({ roles });
  return (
    <div className="_page pb-32">
      <Header
        title="Technical Management"
        subtitle="Staff and Managing Personnel"
      />
      <AdminManagers managers={managers?.data} roles={roles} />
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
        <TechnicalManagerForm availableRoles={roles?.data} />
      </PrimaryCollapsible>

      <br />
    </div>
  );
};

export default TechnicalManagersPage;

export interface IManager {
  email: string;
  dob: string;
  _id: string;
  avatar: string;
  role: string;
  fullname: string;
  dateSigned: string;
  phone: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}
