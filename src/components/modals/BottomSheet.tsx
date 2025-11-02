// Modal.tsx
import React, { ReactNode, useState } from "react";
import DiveUpwards from "../Animate";
import CloseButton from "../buttons/Close";
import { VscLoading } from "react-icons/vsc";
import { useActionOnEsc } from "../../hooks/Esc";
import { Button } from "../buttons/Button";
import { ArrowBigLeft } from "lucide-react";

interface Props {
  title: ReactNode;
  children: ReactNode;
  className?: string;
  wrapperStyles?: string;
  allowOverlayClose?: boolean;
  context?: keyof IModalContext;
  headerStyles?: string;
  id: string;
  label: ReactNode;
  labelStyles?: string;
  isPreparing?: boolean;
  y?: number;
}

const BottomSheetModal: React.FC<Props> = ({
  title,
  children,
  className,
  wrapperStyles,
  allowOverlayClose = true,
  context = "neutral",
  headerStyles = "border-b",
  id = "BottomSheetModal",
  label = "toggle",
  labelStyles,
  isPreparing,
  y = 30,
}) => {
  const color = `text-${actionEffects[context]}`;

  const [isOpen, setIsOpen] = useState(false);

  useActionOnEsc({
    onEscape() {
      setIsOpen(false);
    },
  });

  return (
    <>
      <div
        id={id}
        onClick={() => setIsOpen((p) => !p)}
        className={`line-clamp-3 cursor-pointer ${
          isPreparing ? "pointer-events-none" : ""
        } ${labelStyles}  `}
      >
        {isPreparing ? (
          <VscLoading className="animate-spin min-h-5 min-w-5" />
        ) : (
          label
        )}
      </div>

      {isOpen && (
        <div
          onClick={() => {
            if (allowOverlayClose) setIsOpen((p) => !p);
          }}
          className={`fixed inset-0 -top-6 bg-black bg-opacity-50 backdrop-blur-sm form-control justify-end z-50 ${wrapperStyles}`}
        >
          <DiveUpwards
            layoutId={`pmod${id}`}
            y={y}
            duration="0.05"
            className={` shadow-2xl relative bg-white rounded-t-badge w-full space-y-2 `}
          >
            <nav
              className={`flex gap-x-2 items-start justify-between p-3 px-6 pr-3 pt-1 ${color} ${headerStyles}`}
            >
              <Button
                className="rotate-180 mt-2 md:hidden "
                onClick={() => setIsOpen((p) => !p)}
              >
                <ArrowBigLeft />
              </Button>
              <div className="text-xl mt-2 pr-2 grow">{title}</div>

              <CloseButton
                onClose={() => setIsOpen((p) => !p)}
                className="max-md:hidden"
              />
            </nav>

            <div
              className={`border-b-4 md:min-w-[400px] grow max-h-[85vh] min-h-48 h-fit overflow-y-auto p-6 mt-auto ${className}`}
            >
              {children}
            </div>
          </DiveUpwards>
        </div>
      )}
    </>
  );
};

export default BottomSheetModal;

export interface IModalContext {
  new: string;
  edit: string;
  neutral: string;
  delete: string;
}
export const actionEffects = {
  new: "success",
  edit: "btn",
  neutral: "bodyText",
  delete: "error",
};
