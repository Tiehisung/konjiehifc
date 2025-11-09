"use client";

import { useClearParams } from "@/hooks/params";
import { MdOutlineFilterAltOff } from "react-icons/md";

export const ClearFiltersBtn = ({
  className = " rounded px-2 ",
  label,
}: {
  className?: string;
  label?: string;
}) => {
  const { clearAll } = useClearParams();

  return (
    <button
      type="button"
      title="Clear filters"
      className={`_hover _active _shrink text-xs transform active:text-primaryRed p-2 w-fit select-none cursor-pointer ${className}`}
      onClick={() => clearAll()}
    >
      {label ? <span>{label}</span> : <MdOutlineFilterAltOff />}
    </button>
  );
};
