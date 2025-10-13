"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
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
}

export default function BackBtn({ className = "", link = "", label = "" }: BackBtnProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (link) return router.replace(link);
        router.back();
      }}
      className={`${className} text-gray-800 flex items-center gap-2 ml-6 group w-fit bg-neutral-400 px-3 rounded`}
    >
      <FaArrowLeft className=" group-hover:scale-105 group-hover:-translate-x-1 transition-all duration-300" />{" "}
      {label}
    </button>
  );
}
