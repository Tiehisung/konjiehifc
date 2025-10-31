"use client";

import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { BiPhone, BiText } from "react-icons/bi";
import { IoIosLink, IoMdTime } from "react-icons/io";
import { MdAlternateEmail, MdDateRange, MdNumbers } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";

const inputIcons = [
  { type: "text", icon: <BiText /> },
  { type: "email", icon: <MdAlternateEmail /> },
  { type: "password", icon: <TbLockPassword /> },
  { type: "number", icon: <MdNumbers /> },
  { type: "tel", icon: <BiPhone /> },
  { type: "date", icon: <MdDateRange /> },
  { type: "time", icon: <IoMdTime /> },
  { type: "url", icon: <IoIosLink /> },
];

interface ITextAreaProps extends IInput {
  type?: HTMLInputTypeAttribute;
  labelStyles?: string;
  labelStylesFocus?: string;
  label?: string;
  wrapperStyles?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}
export function TextArea({
  className = "",
  name,
  labelStyles = "",
  placeholder = "",
  onChange,
  value,
  dataTip = "",
  required = false,
  label = "",
  others,
  wrapperStyles,
  error,
}: ITextAreaProps) {
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    setIsFocus(value ? true : false);
  }, [value]);
  return (
    <div className={`relative w-full group ${wrapperStyles}`} title={dataTip}>
      <label
        htmlFor={name}
        className={`absolute transition-all duration-200 ease-linear delay-0 select-none ${
          isFocus
            ? "-top-5 left-0 text-sm"
            : " top-3 left-4 text-muted-foreground font-semibold"
        } ${labelStyles}`}
      >
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        value={value}
        placeholder={
          placeholder?.length > 30
            ? placeholder.substring(0, 27) + "..."
            : placeholder
        }
        onChange={(e) => {
          onChange(e);
        }}
        className={`outline-none border _borderColor focus:border-border shadow-teal-100/50 rounded px-2 w-full min-h-20 bg-accent ${className}`}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(value ? true : false)}
        {...others}
        required={required}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

interface IInput {
  className?: string;
  name: string;
  placeholder?: string;
  value?: string | number;
  setEvent?: boolean;
  dataTip?: string;
  others?: object;
  required?: boolean;
  wrapperStyles?: string;
}

interface IInputProps extends IInput {
  labelStyles?: string;
  labelStylesFocus?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function Input({
  className = "",
  name,
  label = "",
  labelStyles = "_label",
  placeholder = "",
  onChange,
  value,
  dataTip = "",
  type = "text",
  wrapperStyles = "",
  others,
  required = false,
  error,
}: IInputProps) {
  return (
    <div className={`grid relative ${wrapperStyles} `} data-tip={dataTip}>
      <label
        hidden={!label}
        htmlFor={name}
        className={` transition-all duration-200 ease-linear delay-0 select-none ${labelStyles}`}
      >
        {label}
      </label>
      <input
        name={name}
        id={name}
        type={type}
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
        placeholder={
          placeholder?.length > 30
            ? placeholder.substring(0, 27) + "..."
            : placeholder
        }
        className={`bg-secondary outline-none border border-border focus:border-teal-400 shadow-teal-100/50 h-9 rounded px-2 text-primary w-full placeholder:line-clamp-1 _slowTrans ${className}`}
        {...others}
        required={required}
      />
      {error && <p className={` text-red-500  text-sm mt-1`}>{error}</p>}
    </div>
  );
}

interface IDateInputProps extends IInput {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "time" | "datetime-local" | "date";
  label?: ReactNode;
  error?: string;
}
export function DateTimeInput({
  className = "",
  name = "date-input",
  onChange,
  value,
  dataTip = "",
  wrapperStyles = "",
  others,
  required = false,
  type,
  label,
  error,
}: IDateInputProps) {
  const handleOpenPicker = () => {
    const dateInput = document.getElementById(name) as HTMLInputElement; //avoid id starting with number
    dateInput.showPicker();
  };
  if (!name) return null;
  return (
    <label
      className={`block grow focus-within: items-center gap-2 ${wrapperStyles}`}
      title={dataTip}
      htmlFor={name}
    >
      {label && (
        <div onClick={handleOpenPicker} className="_label mb-2">
          {label}
        </div>
      )}
      <input
        name={name}
        id={name}
        value={value}
        type={type ?? "date"}
        onChange={(e) => {
          onChange(e);
        }}
        className={`bg-accent/40 grow w-full border px-2 py-2 uppercase rounded focus:border-teal-500 ${className}`}
        {...others}
        required={required}
      />
      {error && <p className={` text-red-500 text-xs mt-1`}>{error}</p>}
    </label>
  );
}

export function IconInputWithLabel({
  className = "",
  name,
  label = "",
  labelStyles = "",
  labelStylesFocus = "",
  placeholder = "",
  onChange,
  value,
  dataTip = "",
  type = "text",
  wrapperStyles = "",
  others,
  required = false,
  error,
}: IInputProps) {
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    setIsFocus(value ? true : false);
  }, [value]);
  return (
    <div>
      <div
        className={`flex items-center relative pl-[2px] border bg-accent/40 focus-within:border-teal-400 shadow-teal-100/50 w-full rounded ${wrapperStyles} `}
        data-tip={dataTip}
      >
        <label
          htmlFor={name}
          className={`absolute transition-all duration-200 ease-linear delay-0 select-none _label ${
            isFocus
              ? `-top-6 text-sm font-semibold ${labelStylesFocus}`
              : "ml-1 pl-7 top-1/4 text-muted-foreground"
          } ${labelStyles}`}
        >
          {label}
        </label>
        <span
          className={`text-2xl p-1 slowTrans h-[40px] flex items-center justify-center bg-accent/40 text-muted-foreground`}
          hidden={!inputIcons.find((item) => item.type === type)}
        >
          {inputIcons.find((item) => item.type === type)?.icon}
        </span>
        <input
          name={name}
          id={name}
          value={value}
          type={type}
          onChange={(e) => {
            onChange(e);
          }}
          placeholder={
            placeholder?.length > 30
              ? placeholder.substring(0, 27) + "..."
              : placeholder
          }
          className={`outline-none grow h-[40px] min-w-10 max-w-full p-2 placeholder:line-clamp-1 _slowTrans rounded bg-accent ${className}`}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(value ? true : false)}
          {...others}
          required={required}
        />
      </div>
      {error && <p className={` text-red-500  text-xs mt-1`}>{error}</p>}
    </div>
  );
}
