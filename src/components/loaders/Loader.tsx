"use client";

import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

/**
 *
 * @param message Any single string of message to render as loading is active.
 * @param messages Array of custom messages(strings) that will be iterated as loading in progress.
 * @returns
 */
const Loader: React.FC<{
  message?: string,
  messages?: string[],
  className?: string,
  iconStyles?: string,
}> = ({ message, className, iconStyles, messages = [] }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (messages?.length > 0) {
        if (msgIndex < messages?.length - 1) setMsgIndex((p) => p + 1);
        else setMsgIndex(0);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={`flex gap-2 items-center justify-center ${className}`}>
      <ImSpinner2 className={`animate-spin text-primary ${iconStyles}`} />
      <span>{message || messages?.[msgIndex]}</span>
    </div>
  );
};

export default Loader;
