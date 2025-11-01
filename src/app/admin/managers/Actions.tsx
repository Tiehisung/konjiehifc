"use client";

import React from "react";
import { IManager } from "./page";
import TechnicalManagerForm from "./ManagerForm";
import { POPOVER } from "@/components/ui/popover";
import { Edit3 } from "lucide-react";
import { ActionButton } from "@/components/buttons/ActionButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import { apiConfig } from "@/lib/configs";
import { HiOutlineUserRemove } from "react-icons/hi";
import { StackModal } from "@/components/modals/Modals";
import { Button } from "@/components/buttons/Button";
import { useUpdateSearchParams } from "@/hooks/params";
import { fireEscape } from "@/hooks/Esc";

const ManagerActionsPopper = ({
  manager,
  availableRoles,
}: {
  manager: IManager;
  availableRoles: string[];
}) => {
  const { setParam } = useUpdateSearchParams();
  return (
    <>
      <POPOVER>
        <div className="grid gap-4">
          <Button
            className=" w-full _hover bg-transparent _shrink border _secondaryBtn"
            onClick={() => {
              setParam("stackModal", manager._id);
              fireEscape();
            }}
          >
            <Edit3 /> Edit
          </Button>

          <ActionButton
            method={"PUT"}
            primaryText="Disengage as Manager"
            loadingText="Finalizing..."
            uri={`${apiConfig.managers}/${manager?._id}`}
            body={{ isActive: false }}
            variant="destructive"
            className="w-full"
          >
            <HiOutlineUserRemove />
          </ActionButton>

          <ActionButton
            method={"DELETE"}
            primaryText="Delete Manager"
            loadingText="Deleting..."
            uri={`${apiConfig.managers}/${manager?._id}`}
            variant="destructive"
            className="w-full"
          >
            <RiDeleteBin6Line />
          </ActionButton>
        </div>
      </POPOVER>

      <StackModal id={manager._id} className="bg-accent rounded-2xl _hideScrollbar ">
        <TechnicalManagerForm
          existingManager={manager}
          availableRoles={availableRoles}
          className="lg:flex flex-col min-w-[70vw] "
        />
      </StackModal>
    </>
  );
};

export default ManagerActionsPopper;
