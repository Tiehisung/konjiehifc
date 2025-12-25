"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "./Button";
import { TButtonSize, TButtonVariant } from "../ui/button";
/**
 *
 * @param {*} className  [Optional] Apply custom styles
 * @param {*} link [Optional] Link to return to if preffered
 * @returns
 */
interface BackBtnProps {
  className?: string;
  link?: string;
  label?: string;
  variant?: TButtonVariant;
  size?: TButtonSize;
}

export default function BackBtn({
  className = "",
  link = "",
  label = "",
  variant,
  size,
}: BackBtnProps) {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => {
        if (link) return router.replace(link);
        router.back();
      }}
      className={`${className} _shrink _hover flex items-center gap-2 ml-6 group w-fit bg-muted text-muted-foreground px-3 rounded-full`}
    >
      <FaArrowLeft className=" group-hover:scale-105 group-hover:-translate-x-1 transition-all duration-300" />{" "}
      {label}
    </Button>
  );
}
