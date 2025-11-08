"use client";

import { useUpdateSearchParams } from "@/hooks/params";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
  id?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  paramKey?: string;
  error?: string;
}

// Primary Select (like your PrimaryDropdown)
export function PrimarySelect(props: ISelect) {
  const { setParam } = useUpdateSearchParams();

  const handleOnChange = (val: string) => {
    if (props.onChange) {
      props.onChange(val);
    } else {
      if (props.paramKey) setParam(props.paramKey as string, val);
    }
  };
  return (
    <>
      <Select
        value={props.value}
        onValueChange={handleOnChange}
        disabled={props.disabled}
        name={props.name}
        required={props.required}
        
      >
        <SelectTrigger className={`${props.triggerStyles}`} id={props.id}>
          <SelectValue placeholder={props.placeholder ?? "Select"} />
        </SelectTrigger>
        <SelectContent className={props.className}>
          {props.options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {props.error && (
        <p className={` text-red-500 text-left text-sm mt-1 font-light`}>{props.error}</p>
      )}
    </>
  );
}

// Compact Select (smaller version)
export function CompactSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  className,
  triggerStyles = "h-8 px-2 text-sm",
  id,
  disabled = false,
}: {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  triggerStyles?: string;
  id: string;
  disabled?: boolean;
}) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={`${triggerStyles}`} id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={className}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
