"use client";

/**
 *
 * @param {*} data The array list of data from source.
 * @param className The className for customizing the selector className
 * @param label For short instruction label indicating the direction of use.
 * @param selectedValue Intended to prefetch and set the already chosen value in formData
 * @param name Used in combination with handleOnChange to set the value of the select element appropriately in the form.
 * @param handleOnChange The whole formData object parameter for changing the property value directly.
 * @param disabled To disable selector incase data is not fully loaded.
 * @returns
 **/

import { useState } from "react";
import { CgSelect } from "react-icons/cg";
import { ImKeyboard } from "react-icons/im";

type GeneralSelectorProps = {
  data?: string[];
  className?: string;
  label?: string;
  selectedValue?: string;
  required?: boolean;
  name?: string;
  id?: string;
  disabled?: boolean;
  handleOnChange: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
};

export function GeneralSelector({
  data = [],
  className = " capitalize ",
  label = "Select",
  selectedValue = "",
  required = true,
  name = "optional",
  id = "",
  disabled = false,
  handleOnChange,
}: GeneralSelectorProps)  {
  return (
    <select
      name={name}
      onChange={handleOnChange}
      required={required}
      className={`p-2 bg-accent capitalize ${className}`}
      id={id || name}
      disabled={disabled}
      value={selectedValue}
    >
      <option value="" hidden>
        {label}
      </option>
      {data?.map((item, index) => (
        <option value={item} key={index}>
          {item}
        </option>
      ))}
    </select>
  );
}

type SelectOrInputProps = {
  handleOnChange: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  data?: string[];
  name?: string;
  selectedValue?: string;
  inputStyles?: string;
  required?: boolean;
};

export function SelectOrInput({
  handleOnChange,
  data = [],
  name = "selector",
  selectedValue = "",
  inputStyles = "",
  required = false,
}: SelectOrInputProps) {
  const [isSelector, setIsSelector] = useState(true);
  return (
    <div className=" pr-12 flex items-center gap-2">
      <select
        name={name}
        required={isSelector ? required : false}
        onChange={handleOnChange}
        value={selectedValue}
        className={` min-w-[200px] basic__input ${
          isSelector ? "" : "hidden"
        } ${inputStyles}`}
      >
        <option value="" hidden>
          {data?.length > 0 ? "Select instead" : "None"}
        </option>
        {data?.map((optionValue, index) => (
          <option key={index} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
      <input
        onChange={handleOnChange}
        required={isSelector ? false : required}
        type="text"
        name={name}
        value={selectedValue}
        placeholder="Type input here"
        className={`min-w-[200px] basic__input px-1 ${
          isSelector ? "hidden" : ""
        } ${inputStyles}`}
      />
      <button
        type="button"
        onClick={() => setIsSelector((p) => !p)}
        className={` default__btn w-fit p-1 text-lg `}
        title={isSelector ? "Type new instead" : "Select from list"}
      >
        {isSelector ? <ImKeyboard /> : <CgSelect />}
      </button>
    </div>
  );
}
