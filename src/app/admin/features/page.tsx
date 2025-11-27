import { apiConfig } from "@/lib/configs";
import { IQueryResponse, ISelectOptionLV } from "@/types";
import React from "react";
import { FeatureForm, IFeature } from "./OptionsFeature";
import { PrimaryCollapsible } from "@/components/Collapsible";
import { GrAdd } from "react-icons/gr";

export type TFeatures = "manager_roles";

export const getFeatures = async (query?: string) => {
  try {
    const formatted = query ? (query?.includes("?") ? query : "?" + query) : "";
    const response = await fetch(apiConfig.features + formatted, {
      cache: "no-cache",
    });

    if (!response.ok) return null;

    return await response.json();
  } catch {
    return null;
  }
};

export const getFeatureByName = async (id: string) => {
  try {
    const response = await fetch(`${apiConfig.features}${id ? `/${id}` : ""}`, {
      cache: "no-cache",
    });

    if (!response.ok) return null;

    return await response.json();
  } catch {
    return null;
  }
};
const FeaturesPage = async () => {
  const features: IQueryResponse<IFeature<ISelectOptionLV[]>[]> =
    await getFeatures();

  return (
    <div className="px-4 _page">
      <ul className="grid gap-5">
        {features?.data?.map((feature, i) => (
          <li key={`new-feat-${i}`}>
            <PrimaryCollapsible
              key={feature?._id}
              header={{
                label: (
                  <span className="uppercase">
                    {feature?.name?.replaceAll("_", " ")}
                  </span>
                ),
                className: "ring",
              }}
            >
              <FeatureForm feature={feature} />
            </PrimaryCollapsible>
          </li>
        ))}
      </ul>
      <br />

      <div className=" ">
        <PrimaryCollapsible
          header={{
            icon: <GrAdd />,
            label: "Add Feature",
            className: "text-primaryGreen text-lg font-medium ",
          }} 
        >
          <FeatureForm />
        </PrimaryCollapsible>
      </div>
      <br />
    </div>
  );
};

export default FeaturesPage;
