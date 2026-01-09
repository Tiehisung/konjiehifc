import { IPlayer } from "@/types/player.interface";
import { GalleryUpload } from "@/components/Gallery/GalleryUpload";
import { StackModal } from "@/components/modals/StackModal";
import { IQueryResponse, IRecord } from "@/types";
import { IGallery } from "@/types/file.interface";
import { getPlayers } from "../players/page";
import { GalleryDisplay } from "./Display";
import { apiConfig } from "@/lib/configs";
import { buildQueryStringServer } from "@/lib";
import { SearchGallery } from "./Search";
import InfiniteLimitScroller from "@/components/InfiniteScroll";

interface IProps {
  searchParams: Promise<IRecord>;
}
export const getGallery = async (query?: string) => {
  const cleaned = query?.startsWith("?") ? query : `?${query}`;

  const response = await fetch(apiConfig.galleries + cleaned, {
    cache: "no-cache",
  });
  return await response.json();
};

export default async function GalleriesAdmin({ searchParams }: IProps) {
  const qs = buildQueryStringServer(await searchParams);
  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  const galleries: IQueryResponse<IGallery[]> = await getGallery(qs);

  return (
    <div className="pt-16 _page">
      <StackModal
        id="new-gallery"
        trigger={"Create Gallery"}
        variant={'default'}
        className="p-4 "
      >
        <GalleryUpload players={players?.data} />
      </StackModal>
      <br />
      <SearchGallery players={players?.data} />
      <GalleryDisplay galleries={galleries?.data ?? []} />
      <InfiniteLimitScroller pagination={galleries?.pagination} />
    </div>
  );
}
