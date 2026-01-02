import { IPageProps, IQueryResponse } from "@/types";
import { IMatch, IMatchHighlight } from "@/types/match.interface";
import { buildQueryStringServer } from "@/lib";
import InfiniteLimitScroller from "@/components/InfiniteScroll";
import { SearchHighlights } from "../admin/matches/highlights/Search";
import { getMatches } from "../admin/matches/page";
import { getHighlights } from "../admin/matches/highlights/page";
import { MatchHighlights } from "../admin/matches/highlights/Client";

export default async function MatchHighlightsPage({
  searchParams,
}: IPageProps) {
  const qs = buildQueryStringServer(await searchParams);

  const highlights: IQueryResponse<IMatchHighlight[]> = await getHighlights(qs);
  const matches: IQueryResponse<IMatch[]> = await getMatches(qs);

  return (
    <div className="_page min-h-96 pt-12">
      
      <h1 className="_label">Match Highlights</h1>
      <SearchHighlights matches={matches?.data} />
      <MatchHighlights highlights={highlights} />
      <InfiniteLimitScroller
        pagination={highlights?.pagination}
        endDataText="The End"
      />
    </div> 
  );
}
