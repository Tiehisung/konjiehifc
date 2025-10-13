"use client";

import BackBtn from "@/components/buttons/BackBtn";
import { ScrollToPointBtn } from "@/components/scroll/ScrollToPoint";
import { BiBadgeCheck } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
import { RiDeleteBin2Line, RiEditLine } from "react-icons/ri";
import { FiInfo } from "react-icons/fi";

export default function SponsorActionsBar() {
  const className = `flex items-center h-full gap-2 px-2 hover:bg-base-100 transition-all duration-200 hover:opacity-90`;
  return (
    <div className="flex items-center h-10 px-2 _secondaryBg max-md:gap-2 sticky top-1 z-[4]">
      <BackBtn className={"_secondaryBg mr-auto _shadow"} />
      <ScrollToPointBtn
        sectionId={"sponsor-info"}
        className={className}
        title="Overview"
      >
        <FiInfo /> <span className="max-md:hidden ">Overview</span>
      </ScrollToPointBtn>
      <ScrollToPointBtn
        sectionId={"badging"}
        className={className}
        title="Badge"
      >
        <BiBadgeCheck /> <span className="max-md:hidden ">Badge</span>
      </ScrollToPointBtn>
      <ScrollToPointBtn
        sectionId={"edit-sponsor"}
        className={className}
        title="Edit"
      >
        <RiEditLine /> <span className="max-md:hidden ">Edit</span>
      </ScrollToPointBtn>
      <ScrollToPointBtn
        sectionId={"support"}
        className={className}
        title="Support"
      >
        <FaDonate /> <span className="max-md:hidden ">Support</span>
      </ScrollToPointBtn>
      <ScrollToPointBtn
        sectionId={"delete-sponsor"}
        className={className}
        title="Delete"
      >
        <RiDeleteBin2Line /> <span className="max-md:hidden ">Delete</span>
      </ScrollToPointBtn>
    </div>
  );
}
