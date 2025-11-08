"use client";

import { ReactNode, useEffect } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { fireEscape } from "@/hooks/Esc";
import { PrimaryDropdown } from "./Dropdown";

export function NavigationPopover({
  children,
  className,
  triggerStyles = "lg:hidden ",
  align = "end",
}: {
  children: ReactNode;
  className?: string;
  triggerStyles?: string;
  align?: "end" | "center" | "start";
}) {
  const pathname = usePathname();
  useEffect(() => {
    fireEscape();
  }, [pathname]);
  return (
    <PrimaryDropdown
      className={`rounded-3xl border shadow bg-blue-500/40 backdrop-blur-xs max-w-[70vw] -ml-8 ${className}`}
      trigger={<Menu />}
      triggerStyles={`rounded-full aspect-square h-10 w-10 shadow-lg p-1.5 cursor-pointer ${triggerStyles}`}
      id={""}
      align={align}
    >
      {children}
    </PrimaryDropdown>
  );
}
