"use client";

 
import { useUpdateSearchParams } from "@/hooks/params";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "./buttons/Button";
import { Grid, List } from "lucide-react";
 

export const DisplayType = ({
  className,
  defaultDisplay,
}: {
  className?: string;
  defaultDisplay: "grid" | "list";
}) => {
  const { setParam } = useUpdateSearchParams();
  const searchParams = useSearchParams();

  const handleClick = (display: "grid" | "list") => {
    setParam("display", display);
  }; 
 
  const [display, setDisplay] = useState("");
  useEffect(() => {
    const str = searchParams.get("display");
    if (str || defaultDisplay)
      setDisplay(searchParams.get("display") ?? defaultDisplay);
  }, [searchParams]);

  return (
    <div className={`flex border rounded-md text-2xl shadow ${className}`}>
      <Button
        className={`p-2 rounded-md ${display == "grid" && "bg-border"}`}
        onClick={() => handleClick("grid")}
        title="Grid View"
        >
        <Grid />
      </Button>

      <Button
        title="List View"
        className={`p-2 rounded-md ${display == "list" && "bg-border"}`}
        onClick={() => handleClick("list")}
      >
        <List/>
      </Button>
    </div>
  );
};
