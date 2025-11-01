"use client";

import { usePathname, useRouter } from "next/navigation";
import { MdOutlineFilterAltOff } from "react-icons/md";

export const ClearFiltersBtn = ({
  className = "bg-primaryBg rounded px-2 ",
  label,
}: {
  className?: string;
  label?: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  function handleClearParams() {
    router.push(pathname, { scroll: false });
    router.refresh();
  }
  return (
    <button
      type="button"
      title="Clear filters"
      className={`hover:text-opacity-75 text-xs transform primaryBg tag active:text-primaryOrange p-2 w-fit ${className}`}
      onClick={handleClearParams}
    >
      {label ? <span>{label}</span> : <MdOutlineFilterAltOff />}
    </button>
  );
};
