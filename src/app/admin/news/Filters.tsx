"use client";

import { useClearParams, useUpdateSearchParams } from "@/hooks/params";

import { useSearchParams } from "next/navigation";

export interface NewsFilterValues {
  isTrending?: boolean;
  isLatest?: boolean;
  isPublished?: boolean;
  from?: string;
  to?: string;
}

interface NewsFilterProps {}

export default function NewsFilter({}: NewsFilterProps) {
  const sp = useSearchParams();
  const isTrending = sp.get("isTrending");
  const isPublished = sp.get("isPublished");
  const isLatest = sp.get("isLatest");
  const from = sp.get("from");
  const to = sp.get("to");

  const { setParam } = useUpdateSearchParams();
  const { clearOnly } = useClearParams();

  return (
    <div className="space-y-4 p-4 border rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold">Filter News</h2>

      {/* Boolean Filters */}
      <div className="grid grid-cols-3 gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isTrending == "true" ? true : false}
            onChange={(e) =>
              setParam("isTrending", e.target.checked.toString())
            }
          />
          <span>Trending</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isLatest == "true" ? true : false}
            onChange={(e) => setParam("isLatest", e.target.checked.toString())}
          />
          <span>Latest</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublished == "true" ? true : false}
            onChange={(e) =>
              setParam("isPublished", e.target.checked ? "true" : "")
            }
          />
          <span>Published</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublished == "false" ? true : false}
            onChange={(e) =>
              setParam("isPublished", e.target.checked ? "false" : "")
            }
          />
          <span>Unpublished</span>
        </label>
      </div>

      {/* Date Filters */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">From Date</label>
          <input
            type="date"
            className="w-full border rounded-md px-2 py-1"
            value={from as string}
            onChange={(e) => setParam("from", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">To Date</label>
          <input
            type="date"
            className="w-full border rounded-md px-2 py-1"
            value={to as string}
            onChange={(e) => setParam("to", e.target.value)}
          />
        </div>
      </div>

      {/* Clear Button */}
      <button
        type="button"
        className="text-sm text-red-500 cursor-pointer _hover px-1"
        onClick={() =>
          clearOnly(...["isTrending", "isLatest", "isPublished", "from", "to"])
        }
      >
        Reset Filters
      </button>
    </div>
  );
}
