"use client";

import { Button } from "@/components/buttons/Button";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { IManager } from "../page";

export function DeleteManager({
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
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
      });
      const results = await response.json();
      toast(results.message, { type: results.success ? "success" : "error" });
      setWaiting(false);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to delete manager"));
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
      handleClickEvent={handleDelete}
      className={className}
    >
      <RiDeleteBin6Line className={waiting ? "hidden" : ""} />
    </Button>
  );
}
