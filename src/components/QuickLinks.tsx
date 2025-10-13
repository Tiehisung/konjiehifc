"use client";

import { scrollToElement } from "@/lib/DOM";
import { useState } from "react";
import { CgScrollV } from "react-icons/cg";

/**
 *
 * @param {} sections Array of section objects containing 'name' and 'sectionId'.
 * @param scroll boolean to toggle scroll behavior
 * @param className Adds some extra styles to section
 * @param containerStyles styles adds CSS classes to sections container
 * @returns
 */

type Section = {
  name: string;
  sectionId: string;
};
type QLinksProps = {
  sections: Section[];
  className?: string;
  containerStyles?: string;
};

export default function QuickLinksCP({
  sections,
  className = "px-2 w-20 truncate rounded-full secondary__btn",
  containerStyles = "flex gap-3 p-1 items-center w-full overflow-x-auto ",
}: QLinksProps) {
  const [reordered, setReordered] = useState(sections);

  const handleReorder = (curSection: Section) => {
    scrollToElement(curSection.sectionId);
    setReordered((prevSections) => [
      ...prevSections.filter(
        (section) => section.sectionId !== curSection.sectionId
      ),
      curSection,
    ]);
  };
  return (
    <div>
      <p className="text-xs text-white">Also in this page</p>
      <ul className={`hideScrollbar ${containerStyles}`}>
        {reordered.map((section, index) => (
          <li
            key={index}
            onClick={() => handleReorder(section)}
            className={` text-blue-500 text-xs cursor-pointer ${className}`}
          >
            {section.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**ScrollToSectionDropdown displays sections as dropdown
 * This component allows user to navigate to any specific section providing matching section id such as class name.
 * @param {*} sectionsList List of sections to be displayed for click.
 * @param sectionsList Structure { name : string, id: string }[ ]
 * @returns
 */

export function ScrollToDropdown({
  sectionsList = [],
  label = "Go to section",
}: {
  sectionsList: {
    name: string;
    id: string;
  }[];
  label: string;
}) {
  return (
    <div
      className={`sticky top-1 left-[90%] z-20 group w-10 hover:w-[200px] transition-all duration-300 ${
        sectionsList?.length < 2 ? "hidden" : ""
      }`}
    >
      <button
        className="secondary__btn p-2 text-xs flex items-center w-9 group-hover:w-full gap-3 ml-auto"
        title="Go to section"
      >
        <CgScrollV />
        <span className="max-md:hidden hidden group-hover:flex">{label} </span>
      </button>
      {/* Classes */}
      <div className="absolute bg-yellow-50 w-full max-h-[30vh] h-0 overflow-y-auto group-hover:h-fit shadow">
        {sectionsList.length > 0 &&
          sectionsList.map((section, index) => (
            <button
              key={index}
              onClick={() => scrollToElement(section.id)}
              className="secondary__link px-1 truncate w-full max-w-[200px] text-xs text-left"
            >
              {section.name}
            </button>
          ))}
      </div>
    </div>
  );
}
