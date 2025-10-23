import type { ReactNode } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
 
  

interface IDrawer {
  children: ReactNode;
  trigger?: ReactNode;
  triggerStyles?: string;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
}
export function SideDrawer({
  side = "right",
  trigger = <Menu />,
  triggerStyles = "md:hidden",
  children,
  className='',
}: IDrawer) {
  return (
    <Sheet>
      <SheetTrigger asChild  >
        <Button variant="outline" className={` ${triggerStyles} cursor-pointer `}>
          {trigger}
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className={` overflow-y-auto ${className}`}>
        {children }
      </SheetContent>
    </Sheet>
  );
}
