import { apiConfig } from "@/lib/configs";
import { IQueryResponse } from "@/types";
import React from "react";
import { ICaptainProps } from "./Captaincy";

export const getCaptains = async (query?: string) => {
  const formatted = query ? (query?.includes("?") ? query : "?" + query) : "";
  try {
    const response = await fetch(apiConfig.captains + (formatted || ""), {
      cache: "no-cache",
    });
    const results: IQueryResponse<ICaptainProps[]> = await response.json();
    return results;
  } catch (error) {
    return null;
  }
};

/**
 *
 * @returns Captains in active service
 */
export const getCurrentCaptains = async () => {
  const response = await fetch(apiConfig.currentCaptains, {
    cache: "no-cache",
  });
  const captains = await response.json();

  return captains;
};

const CaptaincyPage = () => {
  return <div>Captaincy Page</div>;
};

export default CaptaincyPage;
