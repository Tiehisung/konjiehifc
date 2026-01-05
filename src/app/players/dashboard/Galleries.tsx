"use client";

import GalleryGrid from "@/components/Gallery/GallaryGrid";
import TableLoader from "@/components/loaders/Table";
import { PrimarySearch, SearchWithSubmit } from "@/components/Search";
import { SideDrawer } from "@/components/ShadSideDrawer";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/fetch";
import { toggleClick } from "@/lib/DOM";
import { IGallery } from "@/types/file.interface";
import { IPlayer } from "@/types/player.interface";
import { Search } from "lucide-react";
import { useState } from "react";

export function PlayerGalleries({ player }: { player?: IPlayer }) {
  const [search, setSearch] = useState("");
  const { results, loading, refetch } = useFetch<IGallery[]>({
    uri: "/galleries",
    filters: {
      gallery_search: search ?? "",
      tags: [player?._id].filter(Boolean).join(","),
    },
  });

  console.log({ results });

  return (
    <div className="grid gap-2">
      <div>
        <Button onClick={() => toggleClick("modal-trigger")}>
          <Search />
          Search your galleries
        </Button>
      </div>
      {loading ? (
        <TableLoader cols={3} rows={1} className="h-24" />
      ) : (
        <GalleryGrid galleries={results?.data ?? []} />
      )}

      {/* MORE */}
      <SideDrawer side="bottom" trigger={"View More"} id="modal-trigger">
        <SearchWithSubmit
          onChange={(v) => {
            setSearch(v);
            refetch();
          }}
          placeholder={`Search your galleries`}
          className="mx-4 mt-3"
        />
        {loading ? (
          <TableLoader cols={3} rows={1} className="h-24" />
        ) : (
          <GalleryGrid galleries={results?.data ?? []} />
        )}
      </SideDrawer>
    </div>
  );
}
