"use client";

import React from "react";

import { useUpdateSearchParams } from "@/hooks/params";
import { CgSearch } from "react-icons/cg";
import useGetParam from "./Param";
import { TSearchKey } from "@/types";

interface ISearchProps {
  label?: string;
  name?: string;
  type?: "text" | "search" | "email";
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputStyles?: string;
  className?: string;
  others?: unknown & React.InputHTMLAttributes<HTMLInputElement>;
  searchKey?: TSearchKey;
  datalist?: string[];
  listId?: string;
}

export const PrimarySearch = ({
  className,
  name,
  type,
  onChange,
  placeholder,
  inputStyles,
  others,
  value,
  searchKey = "search",
  datalist,
  listId = "search-datalist",
}: ISearchProps) => {
  const { setParam } = useUpdateSearchParams();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    } else {
      setParam(searchKey, e.target.value);
    }
  };
  const defaultValue = useGetParam(searchKey);
  return (
    <div
      className={`bg-card flex items-center border border-1.5 border-border focus-within:ring ring-teal-500 focus-within:border-teal-ring-teal-500 rounded-md grow px-2 ${className}`}
    >
      <CgSearch className="h-4 w-auto" />
      <input
        onChange={handleOnChange}
        id={name}
        name={name}
        type={type ?? "text"}
        className={`outline-none h-7 grow rounded-md pl-1.5 bg-transparent ${inputStyles} ${
          datalist ? "_hideBrowserUI" : ""
        }`}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        {...others}
        autoComplete="off"
        list={listId}
      />

      {datalist && listId && (
        <datalist id={listId}>
          {datalist?.map((item, i) => (
            <option key={item + i} value={item} />
          ))}
        </datalist>
      )}
    </div>
  );
};
