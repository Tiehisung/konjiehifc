"use client";

import { ReactNode, useEffect } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { fireEscape } from "@/hooks/Esc";
import { POPOVER } from "./ui/popover";

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
    <POPOVER
      className={`rounded-3xl shadow bg-modalOverlay backdrop-blur-xs max-w-[80vw] ${className}`}
      trigger={<Menu />}
      triggerClassNames={`rounded-full aspect-square h-10 w-10 shadow-lg p-1.5 cursor-pointer ${triggerStyles}`}
      id={""}
      align={align}
    >
      {children}
    </POPOVER>
  );
}
