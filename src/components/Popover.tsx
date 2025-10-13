import type { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface IPopper {
  children: ReactNode;
  trigger?: ReactNode;
  triggerStyles?: string;
  className?: string;
  align?: "center" | "start" | "end";
}
export function POPPER({
  children,
  className,
  trigger = "open popper",
  triggerStyles = "_secondaryBtn",
  align,
}: IPopper) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={`cursor-pointer ${triggerStyles}`} role="button">
          {trigger}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={`w-80 max-h-[80vh] overflow-y-auto _hideScrollbar ${className}`}
        align={align}
      >
        {children }
      </PopoverContent>
    </Popover>
  );
}
