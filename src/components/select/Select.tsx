"use client";

import useGetParam, { useUpdateSearchParams } from "@/hooks/params";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { ReactNode, useEffect, useState } from "react";
import Loader from "../loaders/Loader";

export interface SelectOption {
  label: string;
  value: string;
}

interface ISelect {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  triggerStyles?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  paramKey?: string;
  label?: ReactNode;
  error?: string;
  clearable?: boolean;
}

// Primary Select (like your PrimaryDropdown)
export function PrimarySelect({ clearable = true, ...props }: ISelect) {
  const { setParam } = useUpdateSearchParams();
  const paramValue = useGetParam(props.paramKey as string);

  const [refreshing, setRefreshing] = useState(false);

  // Refresh when paramValue is cleared
  useEffect(() => {
    if (!paramValue) {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 50);
    }
  }, [paramValue]);

  const handleOnChange = (val: string) => {
    const value = val === "all" ? "" : val;
    if (props.onChange) {
      props.onChange(value);
    } else {
      if (props.paramKey) setParam(props.paramKey as string, value);
    }
  };
  const normalizedValue =
    !props.value || props.value === "all" ? undefined : props.value;

  if (refreshing) return <Loader />;

  return (
    <div>
      {props.label && <Label htmlFor={props.name} className="_label mb-1">{props.label}</Label>}

      <Select
        value={normalizedValue}
        onValueChange={handleOnChange}
        disabled={props.disabled}
        name={props.name}
        required={props.required}
      >
        <SelectTrigger className={`${props.triggerStyles}`} id={props.name}>
          <SelectValue placeholder={props.placeholder ?? "Select"} />
        </SelectTrigger>
        <SelectContent className={props.className}>
          {clearable && (
            <SelectItem value="all">
              <span className="text-muted-foreground">All</span>
            </SelectItem>
          )}
          {props?.options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {props.error && (
        <p className={` text-red-500 text-left text-sm mt-1 font-light`}>
          {props.error}
        </p>
      )}
    </div>
  );
}
