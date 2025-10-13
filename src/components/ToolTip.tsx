import { ReactNode } from "react";
import { GoInfo } from "react-icons/go";
import { BsTriangle } from "react-icons/bs";

export function ToolTipA({ tip = "Tip", className = "" }) {
  <div
    className={`${className}bg-gray-900 text-white w-full p-1 rounded absolute top-full hidden hover:hidden peer-hover:block `}
  >
    <BsTriangle className="ml-[50%] text-white" />
    {tip}
  </div>;
  return;
}
//

const InfoTip = ({
  dataTip,
  className = "tooltip-top tooltip-info",
  children,
}: {
  dataTip?: string;
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <span className={` tooltip  ${className}`} data-tip={dataTip}>
      {children ?? <GoInfo />}
    </span>
  );
};

export default InfoTip;
