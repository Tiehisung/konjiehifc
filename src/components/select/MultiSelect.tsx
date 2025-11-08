"use client";

import useGetParam, { useUpdateSearchParams } from "@/hooks/params";
import { ISelectOptionLV } from "@/types";
import { ReactNode, useEffect, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { Button } from "../buttons/Button";
import { useSearchParams } from "next/navigation";

interface IProps {
  options?: ISelectOptionLV[];
  onChange?: (arg: ISelectOptionLV[]) => void;
  name: string;
  label?: ReactNode;
  className?: string;
  wrapperStyles?: string;
  initialOptions?: Array<ISelectOptionLV>;
}

const MultiSelectionInput = ({
  options,
  onChange,
  name,
  label,
  className,
  wrapperStyles,
  initialOptions,
}: IProps) => {
  const sp = useSearchParams();
  const [selectedOptions, setSelectedOptions] = useState<ISelectOptionLV[]>([]);

  function handleChangeOption(option: ISelectOptionLV) {
    if (selectedOptions.find((op) => op.value == option.value)) {
      setSelectedOptions([
        ...selectedOptions.filter((o) => o.value !== option.value),
      ]);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  }

  //Initialize
  useEffect(() => {
    const _value = sp.get(name);
    if (_value) {
      const values = _value
        ?.split(",")
        .map((v) => options?.find((o) => o?.value == v) as ISelectOptionLV)
        .filter(Boolean);
      console.log(values);
      setSelectedOptions(values);
    } else if (initialOptions) {
      setSelectedOptions(initialOptions);
    }
  }, [sp, initialOptions]);

  //Export
  const { setParam } = useUpdateSearchParams();

  useEffect(() => {
    if (typeof onChange !== "function") {
      setParam(name, selectedOptions.map((o) => o.value).join(","));
    } else {
      onChange(selectedOptions);
    }
  }, [selectedOptions]);

  if (!options) return;
  return (
    <div className={`border border-border rounded-lg p-3 ${wrapperStyles}`}>
      {label && label}
      <ul className="flex flex-wrap gap-x-3 gap-y-1 p-3">
        {options?.map((option, index) => (
          <li key={index} className="flex">
            <Button
              onClick={() => handleChangeOption(option)}
              primaryText={option.label}
              className={`${className} capitalize font-light text-sm w-fit px-2 py-1 grow text-center border border-border shadow-sm _slowTrans cursor-pointer  select-none ${
                selectedOptions?.includes(option)
                  ? " bg-primary/45 flex items-center gap-1"
                  : " bg-popover hover:bg-popover/70"
              }`}
            >
              {selectedOptions?.includes(option) && <MdOutlineDone size={10} />}
            </Button>
          </li>
        ))}
        <li></li>
      </ul>
    </div>
  );
};

export default MultiSelectionInput;
