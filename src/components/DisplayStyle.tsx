"use client";

import { useUpdateSearchParams } from "@/hooks/params";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "./buttons/Button";
import { Grid, List } from "lucide-react";

export type TDisplayType = "grid" | "list";

export const DisplayType = ({
  className,
  defaultDisplay,
}: {
  className?: string;
  defaultDisplay: TDisplayType;
}) => {
  const { setParam } = useUpdateSearchParams();
  const searchParams = useSearchParams();

  const handleClick = (display: "grid" | "list") => {
    setParam("display", display);
  };

  const [display, setDisplay] = useState(defaultDisplay);
  useEffect(() => {
    const str = searchParams.get("display");
    if (str || defaultDisplay)
      setDisplay(
        (searchParams.get("display") as TDisplayType) ?? defaultDisplay
      );
  }, [searchParams]);

  return (
    <div
      className={`flex items-center gap-1.5 border p-2 rounded-md text-2xl ${className}`}
    >
      <span className="text-sm">View</span>
      <Button
        className={`p-2 rounded-md  `}
        onClick={() => handleClick("grid")}
        title="Grid View"
        variant={display == "grid" ? "outline" : "ghost"}
      >
        <Grid />
      </Button>

      <Button
        title="List View"
        className={`p-2 rounded-md  `}
        onClick={() => handleClick("list")}
        variant={display == "list" ? "outline" : "ghost"}
      >
        <List />
      </Button>
    </div>
  );
};
