"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdOutlineWbSunny } from "react-icons/md";
import { RiMoonClearLine } from "react-icons/ri";

export function ThemeModeToggle({
  dropdown,
  className = "",
}: {
  dropdown?: boolean;
  className?: string;
}) {
  const { setTheme, theme } = useTheme();

  if (!dropdown)
    return (
      <div
        className={`flex items-center gap-0.5 rounded-full p-1 w-fit ${className}`}
      >
        {/* <HiOutlineComputerDesktop
          size={32}
          className={`rounded-full p-1.5 cursor-pointer _hover  ${
            theme == "system" ? "bg-popover text-pink-700" : ""
          }`}
          onClick={() => setTheme("system")}
        /> */}

        {theme === "dark" ? (
          <MdOutlineWbSunny
            size={32}
            className={`rounded-full p-1.5 cursor-pointer _hover bg-popover`}
            onClick={() => setTheme("light")}
          />
        ) : (
          <RiMoonClearLine
            size={32}
            className={`rounded-full p-1.5 cursor-pointer _hover bg-popover`}
            onClick={() => setTheme("dark")}
          />
        )}
      </div>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
