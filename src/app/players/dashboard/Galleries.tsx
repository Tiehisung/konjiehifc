"use client";

import GalleryGrid from "@/components/Gallery/GallaryGrid";
import TableLoader from "@/components/loaders/Table";
import { PrimarySearch } from "@/components/Search";
import { useFetch } from "@/hooks/fetch";
import { IGallery } from "@/types/file.interface";
import { useState } from "react";

export function PlayerGalleries() {
  const [search, setSearch] = useState("");
  const { results, loading, refetch } = useFetch<IGallery[]>({
    uri: "/galleries",
    filters: { gallery_search: search ?? "" },
  });

  console.log({ results });

  return (
    <div>
      <PrimarySearch
        onChange={(e) => {
          setSearch(e.target.value);
          refetch();
        }}
      />
      {loading ? (
        <TableLoader cols={3} rows={2} className="h-24" />
      ) : (
        <GalleryGrid galleries={results?.data ?? []} />
      )}
    </div>
  );
}
