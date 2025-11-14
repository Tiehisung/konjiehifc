"use client";

import { useState } from "react";
import { BiCopy } from "react-icons/bi";

interface CopyButtonProps {
  buttonText?: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  textToCopy: string;
}

export const CopyButton = ({
  buttonText = "Copy url",
  className = "_secondaryBtn",
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
      className={`${className} `}
    >
      <BiCopy size={20}/>
      {copyButtonText}
    </button>
  );
};
