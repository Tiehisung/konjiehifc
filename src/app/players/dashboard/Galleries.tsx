"use client";

import GalleryGrid from "@/components/Gallery/GallaryGrid";
import Loader from "@/components/loaders/Loader";
import TableLoader from "@/components/loaders/Table";
import { StackModal } from "@/components/modals/StackModal";
import { SlicePagination } from "@/components/pagination/SlicePagination";
import { SearchWithSubmit } from "@/components/Search";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/fetch";
import useGetParam from "@/hooks/params";
import { toggleClick } from "@/lib/DOM";
import { IGallery } from "@/types/file.interface";
import { IPlayer } from "@/types/player.interface";
import { Search } from "lucide-react";
import { useState } from "react";

export function PlayerGalleries({
  player,
  initialGalleries,
}: {
  player?: IPlayer;
  initialGalleries?: IGallery[];
}) {
  const stackModal = useGetParam("stackModal");
  const [search, setSearch] = useState("");
  const { results, loading, refetch } = useFetch<IGallery[]>({
    uri: "/galleries",
    filters: {
      gallery_search: search ?? "",
      tags: [player?._id, `${player?.lastName} ${player?.firstName}`]
        .filter(Boolean)
        .join(","),
    },
    // skip: !stackModal,
  });

  console.log({ results });

  const [data, setData] = useState<IGallery[]>([]);

  return (
    <div className="grid gap-2">
      <h3 className="text-lg font-semibold mb-4">Related Galleries</h3>
      <div>
        <Button
          onClick={() => toggleClick("modal-trigger")}
          variant="outline"
          className="grow mx-4"
        >
          <Search />
          Search your galleries
        </Button>
      </div>
      {loading ? (
        <Loader className="h-24" />
      ) : (
        <GalleryGrid galleries={initialGalleries ?? []} />
      )}

      {/* MORE */}
      <StackModal
        trigger={"View More"}
        id="modal-trigger"
        className="space-y-5 max-h-[80vh]"
        triggerStyles="w-fit px-20 ml-5 my-4"
        variant={"outline"}
        header={
          <SearchWithSubmit
            onChange={(v) => {
              setSearch(v);
              refetch();
            }}
            placeholder={`Search your galleries`}
            className="mx-4 "
          />
        }
      >
        {loading ? (
          <TableLoader cols={3} rows={3} className="h-24" />
        ) : (
          <div className="pb-4 space-y-3">
            <GalleryGrid galleries={data ?? results?.data ?? []} />
            <div className="pl-4">
              <SlicePagination onPageChange={setData} data={results?.data} />
            </div>
          </div>
        )}
      </StackModal>
    </div>
  );
}
