"use client";

import { setSearchParams } from "@/lib/searchParams";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface HeaderLinksProps {
  query: string;
  values: string[];
  className?: string;
  wrapperStyles?: string;
}
export const SearchQueryUpdator = ({
  values,
  className,
  wrapperStyles,
  query,
}: HeaderLinksProps) => {
  const [selectedKey, setSelectedKey] = useState<string>("");
  const sp = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const value = sp.get(query);
    setSelectedKey(value!);
  }, [sp]);

  const handleUpdateQuery = (val: string) => {
    setSearchParams(query, val, router);
  };
  return (
    <div className={` ${wrapperStyles}`}>
      {values.map((value, i) => {
        return (
          <button
            onClick={() => handleUpdateQuery(value)}
            key={i}
            className={`border border-border rounded-full px-3 py-1 mx-1 text-xs bg-popover hover:bg-card cursor-pointer transition-transform capitalize ${
              selectedKey == value ? "ring-1" : ""
            } ${className}`}
          >
            {value}
          </button>
        );
      })}
    </div>
  );
};
