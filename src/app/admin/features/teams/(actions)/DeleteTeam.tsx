"use client";

import { ITeamProps } from "@/app/matches/(fixturesAndResults)";
import { Button } from "@/components/buttons/Button";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";

export function DeleteTeam({
  team,
  className,
}: {
  team: ITeamProps;
  className?: string;
}) {
  const router = useRouter();

  const [waiting, setWaiting] = useState(false);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setWaiting(true);
      const response = await fetch(`${apiConfig.teams}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        body: JSON.stringify(team),
      });
      const results = await response.json();
      toast.success(results.message, );
      setWaiting(false);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to delete team"));
    } finally {
      setWaiting(false);
      router.refresh();
    }
  };
  return (
    <Button
      waiting={waiting}
      disabled={waiting}
      primaryText="Delete"
      waitingText="Deleting..."
      onClick={handleDelete}
      className={className}
    >
      <RiDeleteBin6Line className={waiting ? "hidden" : ""} />
    </Button>
  );
}
