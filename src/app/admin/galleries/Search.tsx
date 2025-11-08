"use client";

import { IPlayer } from "@/app/players/page";
import { PrimaryAccordion } from "@/components/Accordion";
import { ClearFiltersBtn } from "@/components/buttons/ClearFilters";
import { PrimarySearch } from "@/components/Search";
import MultiSelectionInput from "@/components/select/MultiSelect";

export function SearchGallery({ players }: { players?: IPlayer[] }) {
  return (
    <div className="my-8 space-y-2 border-b pb-3">
      <PrimarySearch
        datalist={(players ?? [])?.map((p) => `${p?.firstName} ${p?.lastName}`)}
        listId="players-search"
        searchKey="gallery_search"
        placeholder="Search Galleries"
        inputStyles="h-10"
      />

      {(players?.length ?? 0) > 0 && (
        <div className="w-full flex items-center max-md:flxe-wrap gap-4">
          <PrimaryAccordion
            data={[
              {
                content: (
                  <MultiSelectionInput
                    name="tags"
                    options={players?.map((p) => ({
                      label: `${p?.firstName} ${p?.lastName}`,
                      value: p?._id,
                    }))}
                  />
                ),
                trigger: (
                  <span className="_hover text-sm px-2 py-1 rounded font-light">
                    Tag Players
                  </span>
                ),
                value: "tags",
              },
            ]}
          />

          <ClearFiltersBtn label="Clear" className="ml-auto text-red-500" />
        </div>
      )}
    </div>
  );
}
