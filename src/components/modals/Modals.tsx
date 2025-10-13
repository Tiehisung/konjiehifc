"use client";

import React, { ReactNode, useState } from "react";
import DiveUpwards from "../Animate/DiveUp";
import { useActionOnEsc } from "@/hooks/Esc";

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
      <DiveUpwards>
        <div className="max-h-[85vh] overflow-y-auto">{isOpen && children}</div>
      </DiveUpwards>
    </div>
  );
};

export default PrimaryModal;


