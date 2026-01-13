import HEADER from "@/components/Element";
import { buildQueryStringServer } from "@/lib";
import { apiConfig } from "@/lib/configs";
import BackToTopButton from "@/components/scroll/ToTop";
import { InjuriesManager } from "./InjuresManager";
import { IPageProps } from "@/types";

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

export default async function InjuryPage({ searchParams }: IPageProps) {
  const qs = buildQueryStringServer(await searchParams);

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
