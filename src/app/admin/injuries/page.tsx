import HEADER from "@/components/Element";
import { buildQueryStringServer } from "@/lib";
import { apiConfig } from "@/lib/configs";
import BackToTopButton from "@/components/scroll/ToTop";
import { IQueryResponse } from "@/types";
import { IInjury } from "@/types/injury.interface";
import { InjuriesManager } from "./InjuresManager";
import { getPlayers } from "../players/page";

export const getInjuries = async (queryString?: string) => {
  try {
    const url = `${apiConfig.base}/injuries${queryString || ""}`;

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

export default async function InjuryPage({ searchParams }: IPageProps) {
  const qs = buildQueryStringServer(await searchParams);
  const players = (await getPlayers(qs)) as IQueryResponse<IInjury[]>;

  console.log(players)

  return (
    <div className="_page ">
      <HEADER
        title="Injuries Management"
        subtitle="Track and manage player injuries"
      />

      <InjuriesManager />

      <BackToTopButton />
    </div>
  );
}
