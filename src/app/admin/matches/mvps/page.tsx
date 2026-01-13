import HEADER from "@/components/Element";
import { buildQueryStringServer } from "@/lib";
import { apiConfig } from "@/lib/configs";
import BackToTopButton from "@/components/scroll/ToTop";
import { IPageProps, IQueryResponse } from "@/types";
import { MVPsManager } from "./MVPsManager";
import { IMvp } from "@/types/mvp.interface";

export const getMVPs = async (queryString?: string) => {
  try {
    const url = `${apiConfig.mvps}${queryString || ""}`;

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



export default async function MVPsPage({ searchParams }: IPageProps) {
  const qs = buildQueryStringServer(await searchParams);

  const mvps: IQueryResponse<IMvp[]> = await getMVPs(qs);

 

  return (
    <div>
      <HEADER
        title="MVPs Management"
        subtitle="Track and manage player MVPs"
      />

      <div className="_page ">
        <MVPsManager mvpsData={mvps} />
      </div>

      <BackToTopButton />
    </div>
  );
}
