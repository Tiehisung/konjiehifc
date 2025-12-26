import type { ReactNode } from "react";
import { Button, TButtonSize, TButtonVariant } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { Menu } from "lucide-react";

interface IDrawer {
  children: ReactNode;
  trigger?: ReactNode;
  triggerStyles?: string;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  id?: string;
  variant?: TButtonVariant;
  size?: TButtonSize;
}

export function SideDrawer({
  side = "right",
  trigger = <Menu />,
  triggerStyles = "",
  children,
  className = "",
  id,
  size,
  variant,
}: IDrawer) {
  return (
    <Sheet>
      <SheetTrigger asChild id={id} className={` ${!trigger ? "sr-only" : ""}`}>
        <Button
          variant={variant}
          size={size}
          className={` ${triggerStyles} cursor-pointer`}
        >
          {trigger}
        </Button>
      </SheetTrigger>
      <SheetContent
        side={side}
        className={` overflow-y-auto max-h-[85vh] ${className}`}
      >
        <SheetTitle className="h-px invisible"></SheetTitle>
        {children}
      </SheetContent>
    </Sheet>
  );
}
