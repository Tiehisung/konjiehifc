"use client";

import SponsorActionsBar from "./ActionsBar";

import { ReactNode } from "react";

export default function SponsorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <SponsorActionsBar />
      <br />
      <div className="flex flex-col justify-center items-center min-w-[60%]">
        {children}
      </div>
    </div>
  );
}
