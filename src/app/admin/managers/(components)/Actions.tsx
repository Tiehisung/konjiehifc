"use client";

import { PopperToLeft } from "@/components/Poppers";
import React from "react";
import { IManager } from "../page";
import { DeleteManager } from "./DeleteManager";
import { DisengageManager } from "./DisengageManger";
import { ResponsiveModal } from "@/components/modals/Responsive";
import TechnicalManagerForm from "./ManagerForm";
import { CiEdit } from "react-icons/ci";
import { ManagerRole } from "./Managers";

const ManagerActionsPopper = ({
  manager,
  availablePortfolios,
}: {
  manager: IManager;
  availablePortfolios: ManagerRole[];
}) => {
  const className =
    "flex items-center justify-start gap-2 w-full py-2 px-3 h-9 hover:bg-base-200 slowTrans select-none cursor-pointer line-clamp-1 whitespace-nowrap";

  return (
    <PopperToLeft>
      <div>
        <ResponsiveModal
          modalId={manager._id}
          trigger={
            <div className={` w-full grow  ${className}`}>
              <CiEdit /> Edit
            </div>
          }
        >
          <TechnicalManagerForm
            existingManager={manager}
            availablePortfolios={availablePortfolios}
          />
        </ResponsiveModal>

        <DisengageManager manager={manager} className={className} />

        <DeleteManager manager={manager} className={className} />
      </div>
    </PopperToLeft>
  );
};

export default ManagerActionsPopper;
