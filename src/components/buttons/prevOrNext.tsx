"use client";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
type PrevNextBtnProps = {
  disabled?: boolean;
  styles?: string;
  handleClick?: () => void;
  label?: string;
  hideArrow?: boolean;
  title?: string;
};

export function PreviousBtn({
  disabled = false,
  styles,
  handleClick,
  label = "Previous",
  hideArrow = false,
  title = "",
}: PrevNextBtnProps) {
  return (
    <button
      disabled={disabled}
      className={`secondary__btn ${styles}`}
      onClick={handleClick}
      title={title}
    >
      <FaAngleLeft className={` ${hideArrow && "md:hidden"}`} />
      <span className="max-md:hidden">{label}</span>
    </button>
  );
}

export function NextBtn({
  disabled = false,
  styles,
  handleClick,
  label = "Next",
  hideArrow = false,
  title = "",
}: PrevNextBtnProps) {
  return (
    <button
      disabled={disabled}
      className={`secondary__btn ${styles}`}
      onClick={handleClick}
      title={title}
    >
      <FaAngleRight className={` ${hideArrow && "md:hidden"}`} />
      <span className="max-md:hidden">{label}</span>
    </button>
  );
}
