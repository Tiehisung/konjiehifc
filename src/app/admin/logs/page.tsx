import HEADER from "@/components/Element";
import React from "react";
import { buildQueryStringServer } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { ILog,   } from "@/types/log";
import { LogsClient } from "./Client";
import BackToTopButton from "@/components/scroll/ToTop";
import { IQueryResponse } from "@/types";

export const getLogs = async (queryString?: string) => {
  try {
    const url = `${apiConfig.base}/logs${queryString || ""}`;

    const response = await fetch(url, {
      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
};

interface IPageProps {
  searchParams: Promise<{
    displayType: "box" | "list";
    page?: string;
    limit?: string;
    search?: string;
    type?: string;
  }>;
}

export default async function LogsPage({ searchParams }: IPageProps) {
  const qs = buildQueryStringServer(await searchParams);
  const logs = (await getLogs(qs)) as IQueryResponse<ILog[]>;

  return (
    <div className="_page ">
      <HEADER title="LOGS" subtitle="Activity Tracking Logs" />

      <LogsClient logs={logs} />

      <BackToTopButton />
    </div>
  );
}
