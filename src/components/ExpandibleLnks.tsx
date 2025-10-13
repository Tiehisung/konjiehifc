"use client";

import Link from "next/link";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";

import { ReactNode } from "react";

interface ExpandableLinksProps {
  data?: { name: string; link: string }[];
  label?: string;
  children?: ReactNode;
  setOpenMobileNav?: (open: boolean) => void;
}

export default function ExapandableLinks({
  data = [{ name: "form master", link: "#" }],
  label = "Class",
  children,
  setOpenMobileNav,
}: ExpandableLinksProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        id="trigger"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className=" flex gap-2 items-center justify-between p-1 w-full text-[#1d4d55]"
      >
        <span className="flex items-center gap-2">
          {children}
          {label}
        </span>
        <FaAngleRight
          className={`transition-all duration-200 ${isOpen ? "rotate-90" : ""}`}
        />
      </button>

      <ul
        id="links-ul"
        style={{ height: isOpen ? data.length * 29 + "px" : "0px" }}
        className={`ml-3 transition-all ease-linear duration-200 overflow-hidden grid `}
      >
        {data?.map((item, index) => (
          <Link
            replace
            href={item.link}
            key={index}
            onClick={() => {
              if (setOpenMobileNav) setOpenMobileNav(false); //Close if mobile
            }}
            className="md:simple__link secondary__btn flex items-center gap-2 p-1 text-xs md:hover:underline "
          >
            <li className="first-letter:uppercase">
              {item.name.replaceAll("-", " ")}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
