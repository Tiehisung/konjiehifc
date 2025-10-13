"use client";

import React, { ReactNode, useEffect, useState } from "react";

import { BiCheck } from "react-icons/bi";
import { RxTriangleDown } from "react-icons/rx";
import HideOnClickOutside from "./HideOnClickOutside";
import { ISelectOptionLV } from "@/types";

/**
 *A dropdown that features a checkmark on the selected item.
 */
export const DropSelect = ({
  trigger = "Select",
  className,
  defaultOption,
  data,
  listWrapperStyles,
  triggerStyles,
  setExportOption,
}: {
  data: Array<ISelectOptionLV>;
  className?: string;
  listWrapperStyles?: string;
  trigger?: ReactNode;
  triggerStyles?: string;
  defaultOption?: ISelectOptionLV | null;
  setExportOption: (arg: ISelectOptionLV) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ISelectOptionLV | null>(
    defaultOption || null
  );

  useEffect(() => {
    setSelectedOption(defaultOption ?? null);
  }, [defaultOption]);
  const handleClick = (option: ISelectOptionLV) => {
    setSelectedOption(option);
    setExportOption(option); //exported option
    setIsOpen(false);
  };

  return (
    <HideOnClickOutside setIsVisible={setIsOpen} className="relative  ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={
          "font-bold text-sm mb-1 border select-none p-1 btn-sm btn-ghost rounded capitalize w-20" +
          triggerStyles
        }
      >
        {selectedOption ? selectedOption.label : trigger}
      </button>
      <ul
        className={`grid w-fit max-h-[50vh] overflow-y-auto rounded-md bg-white shadow py-2 border absolute z-40 transform  ${
          isOpen ? "visible top-full duration-200 " : "invisible top-[80%]"
        } ${listWrapperStyles}`}
      >
        {data?.map((option, index: number) => (
          <li
            onClick={() => handleClick(option)}
            key={index}
            className={`flex items-center gap-1 hover:bg-gray-300 transform cursor-pointer py-2 pr-3 pl-0 select-none capitalize whitespace-nowrap ${
              selectedOption?.value == option.value ? "bg-gray-200 " : ""
            } ${className}`}
          >
            <BiCheck
              className={` ${
                selectedOption?.value == option.value && isOpen
                  ? "visible"
                  : "invisible"
              }`}
            />
            {option.label}
          </li>
        ))}
        {data.length == 0 && <li className="px-4">No data available!</li>}
      </ul>
    </HideOnClickOutside>
  );
};

/**
 *
 * @param className Used to style the data options.
 * @param defa Optional 'label' - 'value' object as default if available.
 * @param triggerText The label to describe the trigger.
 * @param triggerStyles Styles for styling the trigger.
 * @param data The required data to be selected from.
 *
 * @returns
 */
export const DropSelectTriangle = ({
  className,
  defaultOption,
  triggerStyles,
  triggerText,
  data,
  listWrapperStyles,
  setExportOption,
}: {
  data: Array<ISelectOptionLV>;
  triggerStyles?: string;
  triggerText: string;
  className?: string;
  listWrapperStyles?: string;
  defaultOption?: ISelectOptionLV | null;
  setExportOption: (arg: ISelectOptionLV) => void;
}) => {
  const handleClick = (option: ISelectOptionLV) => {
    setSelectedOption(option);
    setExportOption(option); //exported option
    setIsOpen(false);
  };

  const [selectedOption, setSelectedOption] = useState<ISelectOptionLV | null>(
    defaultOption!
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedOption(defaultOption ?? null);
  }, [defaultOption]);

  return (
    <HideOnClickOutside
      setIsVisible={setIsOpen}
      className={`relative w-fit ${isOpen && "z-40"}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={` p-1 rounded flex items-center gap-2 -z-10 ${
          selectedOption && "text-primaryGreen"
        } ${triggerStyles}`}
      >
        {triggerText}
        <RxTriangleDown
          size={20}
          className={`transform ${isOpen ? "rotate-180 " : ""}`}
        />
      </button>
      <ul
        className={` max-h-[50vh] overflow-y-auto rounded-md shadow bg-white py-2 border absolute ${
          isOpen
            ? "visible top-full right-2 transition-all duration-200 delay-0 h-fit z-30 "
            : "invisible top-[80%] h-0 right-2"
        }  ${listWrapperStyles}`}
      >
        {data?.map((option, index: number) => (
          <li
            onClick={() => handleClick(option)}
            key={index}
            className={`flex items-center gap-1 hover:bg-gray-200 active:text-opacity-75 text-sm transform cursor-pointer py-2 px-3 pr-5 select-none capitalize whitespace-nowrap ${
              selectedOption?.value == option.value ? "bg-gray-300 " : ""
            } ${className}`}
          >
            <BiCheck
              className={` ${
                selectedOption?.value == option.value && isOpen
                  ? "visible"
                  : "invisible"
              }`}
            />
            {option.label}
          </li>
        ))}
        {data.length == 0 && (
          <li className="px-4 whitespace-nowrap text-xs">No data available!</li>
        )}
      </ul>
    </HideOnClickOutside>
  );
};
