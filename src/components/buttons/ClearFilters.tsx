"use client";

import { useUpdateSearchParams } from "@/hooks/params";
import { MdOutlineFilterAltOff } from "react-icons/md";

export const ClearFiltersBtn = ({
  className = " rounded px-2 ",
  label,
}: {
  className?: string;
  label?: string;
}) => {
  const { clearParams } = useUpdateSearchParams();

  return (
    <button
      type="button"
      title="Clear filters"
      className={`_hover _active _shrink text-xs transform active:text-primaryRed p-2 w-fit select-none cursor-pointer ${className}`}
      onClick={() => clearParams()}
    >
      {label ? <span>{label}</span> : <MdOutlineFilterAltOff size={20} />}
    </button>
  );
};
