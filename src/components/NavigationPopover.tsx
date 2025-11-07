"use client";

import { ReactNode, useEffect } from "react";
import { POPOVER } from "./ui/popover";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { fireEscape } from "@/hooks/Esc";

export function NavigationPopover({
  children,
  className,
  triggerStyles = "lg:hidden ",
}: {
  children: ReactNode;
  className?: string;
  triggerStyles?: string;
}) {
  const pathname = usePathname();
  useEffect(() => {
    fireEscape();
  }, [pathname]);
  return (
    <POPOVER
      className={`rounded-3xl border shadow bg-blue-500/40 backdrop-blur-xs max-w-[80vw] ${className}`}
      trigger={<Menu />}
      triggerClassNames={`rounded-full aspect-square h-10 w-10 shadow-lg p-1.5 cursor-pointer ${triggerStyles}`}
    >
      {children}
    </POPOVER>
  );
}
