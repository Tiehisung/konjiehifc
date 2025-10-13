"use client";

import { Button } from "@/components/buttons/Button";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiOutlineUserRemove } from "react-icons/hi";
import { toast } from "react-toastify";
import { IManager } from "../page";

export function DisengageManager({
  manager,
  className,
}: {
  manager: IManager;
  className?: string;
}) {
  const router = useRouter();

  const [waiting, setWaiting] = useState(false);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setWaiting(true);
      const response = await fetch(`${apiConfig.managers}/${manager._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        body: JSON.stringify({ isActive: false }),
      });
      const results = await response.json();
      toast(results.message, { type: results.success ? "success" : "error" });
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
      primaryText="Update"
      waitingText="Updating..."
      handleClickEvent={handleDelete}
      className={className}
    >
      <HiOutlineUserRemove className={waiting ? "hidden" : ""} />
    </Button>
  );
}
