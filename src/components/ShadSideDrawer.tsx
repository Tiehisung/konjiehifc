import type { ReactNode } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { Menu } from "lucide-react";

interface IDrawer {
  children: ReactNode;
  trigger?: ReactNode;
  triggerStyles?: string;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  triggerId?: string;
}

export function SideDrawer({
  side = "right",
  trigger = <Menu />,
  triggerStyles = "",
  children,
  className = "",
  triggerId,
}: IDrawer) {
  return (
    <Sheet>
      <SheetTrigger asChild id={triggerId}>
        <Button
          variant="outline"
          className={` ${triggerStyles} cursor-pointer `}
        >
          {trigger}
        </Button>
      </SheetTrigger>
      <SheetContent
        side={side}
        className={` overflow-y-auto max-h-[85vh] ${className}`}
      >
        <SheetTitle className="h-[1px] invisible"></SheetTitle>
        {children}
      </SheetContent>
    </Sheet>
  );
}
