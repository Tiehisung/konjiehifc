import type { ReactNode } from "react";
import { SlOptions } from "react-icons/sl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { ChevronDown } from "lucide-react";
export function PrimaryDropdown({
  children,
  className,
  trigger = <SlOptions />,
  triggerStyles = "hover:bg-background/50 p-2",
  id,
  hideAngle = true,
}: {
  children: ReactNode;
  trigger?: ReactNode;
  className?: string;
  id: string;
  triggerStyles?: string;
  hideAngle?: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={` gap-1 flex items-center cursor-pointer ${triggerStyles}`}
          id={id}
        >
          {trigger}
          {!hideAngle && <ChevronDown size={16} />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`w-56 ${className}`} align="start">
        <>{children}</>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Hover dropdown

export function HoverDropdown({
  children,
  openDelay = 20,
  trigger = "open",
  triggerStyles = "hover:bg-background/50 p-2",
  className,
  id,
  hideAngle = true,
}: {
  children: ReactNode;
  trigger?: ReactNode;
  openDelay?: 0 | 20 | 50 | 100 | 200 | 500;
  className?: string;
  id: string;
  triggerStyles?: string;
  hideAngle?: boolean;
}) {
  return (
    <HoverCard openDelay={openDelay}>
      <HoverCardTrigger
        className={`gap-1 flex items-center cursor-pointer ${triggerStyles}`}
        id={id}
      >
        {trigger} {!hideAngle && <ChevronDown size={16} />}
      </HoverCardTrigger>
      <HoverCardContent className={className}>{children}</HoverCardContent>
    </HoverCard>
  );
}
