"use client";

import { ReactNode, useState } from "react";
import { useActionOnEsc } from "@/hooks/Esc";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "@/hooks/params";
import { Button } from "../buttons/Button";
import { cn } from "@/lib/utils";
import { TButtonSize, TButtonVariant } from "../ui/button";
import { X } from "lucide-react";

export const StackModal = ({
  children,
  className,
  id,
  overlayClassName,
  closeOnEsc,
  trigger,
  header,
  size,
  variant,
  triggerStyles,
  hideCloseButton,
}: {
  children: ReactNode;
  className?: string;
  id: string;
  overlayClassName?: string;
  closeOnEsc?: boolean;
  hideCloseButton?: boolean;
  triggerStyles?: string;
  trigger?: ReactNode;
  header?: ReactNode;
  variant?: TButtonVariant;
  size?: TButtonSize;
}) => {
  const modalId = useSearchParams().get("stackModal");

  const { clearParams, setParam } = useUpdateSearchParams();

  const isOpen = id == (modalId as string);

  //Cater for the little lag in setting param
  const [loading, setLoading] = useState(false);

  useActionOnEsc({
    onEscape() {
      if (closeOnEsc) {
        clearParams("stackModal");
      }
    },
  });

  return (
    <>
      {trigger && (
        <Button
          variant={variant}
          size={size}
          className={cn(`cursor-pointer`, triggerStyles)}
          onClick={() => {
            setParam("stackModal", id);
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 3000);
          }}
          waiting={!modalId && loading}
          waitingText="Please wait..."
          id={id}
        >
          {trigger}
        </Button>
      )}
      {isOpen && (
        <div
          onClick={() => clearParams("stackModal")}
          className={` z-50 fixed inset-0 bg-linear-to-b from-modalOverlay to-accent flex justify-start items-center h-screen ${overlayClassName}`}
        >
          <main
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative bg-accent space-y-3.5 py-1.5 mt-auto rounded-to-3xl max-h-[90vh] "
            )}
          >
            <div className="flex items-center gap-3 justify-b ">
              {header && <header className="sticky top-2">{header}</header>}
              {!hideCloseButton && (
                <Button
                  size="icon-sm"
                  onClick={() => clearParams("stackModal")}
                  className='ml-auto'
                  variant='ghost'
                >
                  <X />
                </Button>
              )}
            </div>
            <div
              className={`max-h-[85vh] overflow-y-auto pb-14 min-w-[60vw] ${className}`}
            >
              {children}
            </div>
          </main>
        </div>
      )}
    </>
  );
};
