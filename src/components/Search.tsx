"use client";

import React from "react";

import { useUpdateSearchParams } from "@/hooks/params";
import { CgSearch } from "react-icons/cg";

interface ISearchProps {
  label?: string;
  name?: string;
  type?: "text" | "search" | "email";
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputStyles?: string;
  className?: string;
  others?: unknown & React.InputHTMLAttributes<HTMLInputElement>;
  searchKey?: string;
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
  defaultValue,
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
  return (
    <div
      className={`flex items-center border border-1.5 border-border focus-within:border-primary rounded-md grow px-2 ${className}`}
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
