"use client";

import { useState } from "react";
import { BiCopy } from "react-icons/bi";

interface CopyButtonProps {
  buttonText?: string;
  styles?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  textToCopy: string;
}

export const CopyButton = ({
  buttonText = "Copy url",
  styles = "secondary__btn",
  disabled = false,
  type = "button",
  textToCopy,
}: CopyButtonProps) => {
  const [copyButtonText, setCopyButtonText] = useState(buttonText);
  const handleClick = () => {
    setCopyButtonText("Copied!");
    navigator.clipboard.writeText(textToCopy);
    setTimeout(() => {
      setCopyButtonText(buttonText);
    }, 2000);
  };

  return (
    <button
      onClick={handleClick}
      type={type}
      disabled={disabled}
      style={{ color: copyButtonText === "Copied!" ? "green" : "" }}
      className={`${styles} `}
    >
      <BiCopy />
      {copyButtonText}
    </button>
  );
};
