"use client";

import { IPlayer } from "@/app/players/page";
import { PrimarySearch } from "@/components/Search";
import { POPOVER } from "@/components/ui/popover";
import { useUpdateSearchParams } from "@/hooks/params";
import { customStyles } from "@/styles";
import { ISelectOptionLV } from "@/types";
import ReactSelect from "react-select";

export function SearchGallery({ players }: { players?: IPlayer[] }) {
  const { setParam } = useUpdateSearchParams();
  return (
    <div className="my-8 space-y-2">
      <PrimarySearch
        datalist={players?.map((p) => `${p.lastName} ${p.firstName}`)}
        listId="players-search"
        searchKey="gallery_search"
        placeholder="Search Galleries"
        inputStyles="h-10"
      />

      {(players?.length ?? 0) > 0 && (
        <div className="w-full">
          <POPOVER
            className="min-h-96 h-fit"
            trigger={<span>Tag Players</span>}
            triggerClassNames="w-fit _hover p-2 rounded cursor-pointer text-sm text-muted-foreground _slowTrans"
          >
            <ReactSelect
              onChange={(selected) =>
                setParam(
                  "tags",
                  selected
                    .map((item) =>
                      (item as unknown as ISelectOptionLV).value.split(" ")
                    )
                    .flat(2)
                    .join(",")
                )
              }
              options={players?.map((p) => ({
                label: `${p.firstName} ${p.lastName}`,
                value: `${p._id} ${p.firstName} ${p.lastName}`,
              }))}
              isMulti
              className="text-sm"
              placeholder="Select players to tag"
              styles={customStyles}
            />
          </POPOVER>
        </div>
      )}
    </div>
  );
}
