"use client";

import React, { ReactNode } from "react";
import { useActionOnEsc } from "@/hooks/Esc";
import DiveUpwards from "../Animate";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "@/hooks/params";

export const StackModal = ({
  children,
  className,
  id,
  overlayClassName,
  closeOnEsc,
}: {
  children: ReactNode;
  className?: string;
  id: string;
  overlayClassName?: string;
  closeOnEsc?: boolean;
}) => {
  const modalId = useSearchParams().get("stackModal");

  const { clearParams } = useUpdateSearchParams();

  const isOpen = id == (modalId as string);
  useActionOnEsc({
    onEscape() {
      if (closeOnEsc) {
        clearParams("stackModal");
      }
    },
  });

  if (!isOpen) return null;
  return (
    <div
      onClick={() => clearParams("stackModal")}
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
