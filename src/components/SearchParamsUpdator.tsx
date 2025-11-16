"use client";

import { setSearchParams } from "@/lib/searchParams";
import { useSearchParams, useRouter } from "next/navigation";

interface IQueryOption {
  label: string;
  value: string;
  query: string;
}

interface HeaderLinksProps {
  options: IQueryOption[];
  className?: string;
  wrapperStyles?: string;
}
export const QueryUpdator = ({
  options,
  className,
  wrapperStyles,
}: HeaderLinksProps) => {
  const sp = useSearchParams();
  const router = useRouter();

  const handleUpdateQuery = (option: IQueryOption) => {
    setSearchParams(option.query, option.value, router);
  };
  return (
    <div
      className={`flex items-center flex-wrap gap-y-1 gap-x-1.5 ${wrapperStyles}`}
    >
      {options?.map((option, i) => {
        return (
          <button
            onClick={() => handleUpdateQuery(option)}
            key={i}
            className={`border border-border rounded-full px-3 py-1 text-xs bg-popover hover:bg-card cursor-pointer transition-transform capitalize ${
              sp.get(option.query) == option.value ? "ring-1 " : ""
            } ${className}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
