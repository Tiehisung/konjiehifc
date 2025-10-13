"use client";

import { useUpdateSearchParams } from "@/hooks/params";

export default function FilterPlayers({}) {
  const { setParam } = useUpdateSearchParams();

  const handleOnChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setParam("p_filter", value.toLowerCase());
  };
  return (
    <div className="flex items-center ">
      <p>Filter by:</p>
      <select
        className="focus:ring-2 ring-blue-300 outline-none rounded-md _p shadow-md p-2 bg-secondary"
        onChange={handleOnChangeFilter}
      >
        <option value="fit">💪Fit players</option>
        <option value="yellow">🟨Yellow carded</option>
        <option value="red">🟥Red carded</option>
      </select>
    </div>
  );
}
