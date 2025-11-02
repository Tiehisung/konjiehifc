// Modal.tsx
import React, { ReactNode } from "react";
import { SideDrawer } from "../ShadSideDrawer";

interface Props {
  children: ReactNode;
  className?: string;
  id: string;
  trigger?: ReactNode;
  isPreparing?: boolean;
}

const BottomSheetModal: React.FC<Props> = ({
  children,
  className,
  id,
  trigger,
}) => {
  return (
    <SideDrawer
      className={` ${className}`}
      triggerId={id}
      trigger={trigger}
      side="bottom"
    >
      {children}
    </SideDrawer>
  );
};

export default BottomSheetModal;
