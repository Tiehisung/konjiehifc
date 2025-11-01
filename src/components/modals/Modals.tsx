"use client";

import React, { ReactNode } from "react";
import { useActionOnEsc } from "@/hooks/Esc";
import DiveUpwards from "../Animate";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "@/hooks/params";

const PrimaryModal = ({
  children,
  isOpen = false,
  setIsOpen,
  className,
}: {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  className?: string;
}) => {
  useActionOnEsc({
    onEscape() {
      setIsOpen(false);
    },
  });

  if (!isOpen) return null;
  return (
    <div
      onClick={() => setIsOpen(false)}
      className={` z-50 fixed inset-0 bg-black/30 flex justify-center items-center h-screen ${className}`}
    >
      <DiveUpwards layoutId={""}>
        <div className="max-h-[85vh] overflow-y-auto">{isOpen && children}</div>
      </DiveUpwards>
    </div>
  );
};

export default PrimaryModal;

export const StackModal = ({
  children,
  className,
  id,
  overlayClassName,
}: {
  children: ReactNode;
  className?: string;
  id: string;
  overlayClassName?: string;
}) => {
  const modalId = useSearchParams().get("stackModal");

  const { setParam } = useUpdateSearchParams();

  const isOpen = id == (modalId as string);

  if (!isOpen) return null;
  return (
    <div
      onClick={() => setParam("stackModal", "")}
      className={` z-50 fixed inset-0 bg-black/30 flex justify-center items-center h-screen ${overlayClassName}`}
    >
      <DiveUpwards layoutId={""} y={8}>
        <div className={`max-h-[85vh] overflow-y-auto pb-14 ${className}`}>
          {isOpen && children}
        </div>
      </DiveUpwards>
    </div>
  );
};
