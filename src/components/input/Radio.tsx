"use client";

import React, { FC, useEffect, useState } from "react";

interface RadioButtonsProps {
  values: string[];
  defaultValue: string;
  wrapperStyles?: string;
  className?: string;
  setSelectedValue: (arg: string) => void;
}

const RadioButtons: FC<RadioButtonsProps> = ({
  values,
  defaultValue,
  wrapperStyles,
  className,
  setSelectedValue,
}) => {
  const [option, setOption] = useState(defaultValue ?? "");
  useEffect(() => {
    if (typeof setSelectedValue !== "undefined") {
      setSelectedValue(option);
    }
  }, [option, defaultValue]);
  return (
    <div className={`select-none ${wrapperStyles}`}>
      {values.map((val, i) => (
        <button
          type="button"
          key={i}
          className={`flex items-center gap-3 border border-muted-foreground/50 cursor-pointer p-2 rounded-full _hover _slowTrans ${
            option == val && "border-teal-600/55 pointer-events-none"
          } ${className}`}
          onClick={() => {
            setOption(val);
            setSelectedValue(val);
          }}
        >
          <span
            className={` rounded-full border border-muted-foreground/50  ${
              option == val ? "bg-teal-600/75 w-5 h-5" : "invisible"
            }`}
          ></span>
          <span> {val}</span>
        </button>
      ))}
    </div>
  );
};

export default RadioButtons;
