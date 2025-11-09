import { IPlayer } from "@/app/players/page";
import { GalleryUpload } from "@/components/Gallery/GalleryUpload";
import { StackModal } from "@/components/modals/StackModal";
import { IGalleryProps, IQueryResponse, IRecord } from "@/types";
import { getPlayers } from "../players/page";
import { GalleryDisplay } from "./Display";
import { Pagination } from "@/components/Pagination";
import { apiConfig } from "@/lib/configs";
import { buildQueryStringServer } from "@/lib";
import { SearchGallery } from "./Search";

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
  const qs = buildQueryStringServer(await searchParams)
  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  const galleries: IQueryResponse<IGalleryProps[]> = await getGallery(qs);
 
  return (
    <div className="pt-16"> 
      <StackModal
        id="new-gallery" 
        trigger={
          <span className="_primaryBtn w-44 justify-center">
            Create Gallery
          </span>
        }
        className="bg-popover"
      >
        <GalleryUpload players={players?.data} />
      </StackModal>

      <br />
      <SearchGallery players={players?.data}/>
      <GalleryDisplay galleries={galleries?.data ?? []} />
      <Pagination pagination={galleries?.pagination} />
    </div>
  );
}
