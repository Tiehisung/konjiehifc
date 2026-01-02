import { apiConfig } from "@/lib/configs";
import { HighlightUpload } from "./Uploader";
import { MatchHighlights } from "./Client";
import { IPageProps, IQueryResponse } from "@/types";
import { IMatch, IMatchHighlight } from "@/types/match.interface";
import { buildQueryStringServer } from "@/lib";
import { SearchHighlights } from "./Search";
import InfiniteLimitScroller from "@/components/InfiniteScroll";
import { getMatches } from "../page";
export const getHighlights = async (query?: string) => {
  try {
    const cleaned = query?.startsWith("?") ? query : "?" + query;
    const response = await fetch(`${apiConfig.highlights}${cleaned ?? ""}`, {
      cache: "no-store",
    });
    const fixtures = await response.json();
    return fixtures;
  } catch {
    return null;
  }
};

export default async function MatchHighlightsPage({
  searchParams,
}: IPageProps) {
  const qs = buildQueryStringServer(await searchParams);

  const highlights: IQueryResponse<IMatchHighlight[]> = await getHighlights(qs);
  const matches: IQueryResponse<IMatch[]> = await getMatches(qs);

  return (
    <div className="_page min-h-96">
      <HighlightUpload matches={matches?.data} />
      <SearchHighlights matches={matches?.data} />
      <MatchHighlights highlights={highlights} />
      <InfiniteLimitScroller
        pagination={highlights?.pagination}
        endDataText="The End"
      />
    </div>
  );
}
