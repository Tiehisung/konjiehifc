import React, { ReactNode } from "react";
import { BiSolidCheckCircle } from "react-icons/bi";
import { FaBriefcase } from "react-icons/fa6";

/**
 * A vertical timeline component that displays a list of items.
 *
 * @param {Object} props - The component props.
 * @param {Array<ReactNode>} props.children - An array of React nodes to be displayed as timeline items.
 *
 * @returns {JSX.Element} The rendered vertical timeline component.
 */
const TimelineVertical = ({ children }: { children: Array<ReactNode> }) => {
  return (
    <ul className="timeline timeline-vertical ">
      {children.map((lineItem, i) => (
        <li key={i}>
          <div className="timeline-middle">
            <BiSolidCheckCircle />
          </div>
          <div className="timeline-end timeline-box bg-transparent">
            {lineItem}
          </div>
          <hr />
        </li>
      ))}
    </ul>
  );
};

export default TimelineVertical;

/**
 * Timeline flowbite
 * @param icons Array of preffered list icons equal in length to the number of children so rendered
 * @param children Components to render as children
 * @returns
 */
export const TimelineFlowbite = ({
  children,
  icons,
}: {
  children: Array<ReactNode>;
  icons?: Array<ReactNode>;
}) => {
  return (
    <ol className="relative border-s border-gray-200 ">
      {children.map((lineItem, i) => (
        <li className="mb-10 ms-6" key={i}>
          <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-lightGrey dark:ring-secondary   ">
            {icons?.[i] ?? <FaBriefcase />}
          </span>
          {lineItem}
        </li>
      ))}
    </ol>
  );
};
