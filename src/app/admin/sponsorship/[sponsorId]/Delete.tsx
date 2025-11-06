"use client";

import { Button } from "@/components/buttons/Button";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteSponsorProps {
  sponsorId: string;
}

export default function DeleteSponsor({ sponsorId }: DeleteSponsorProps) {
  const [waiting, setWaiting] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    setWaiting(true);
    const response = await fetch(apiConfig.sponsors, {
      cache: "no-cache",
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sponsorId }),
    });
    const result = await response.json();
    if (result.success) toast.success(result.message);
    else toast.error(result.message);

    router.refresh();
    if (result.success) router.back();
  };
  return (
    <div id="delete-sponsor">
      <p className="_title">Danger zone</p>
      <div className=" p-5 ">
        <h1 className="_label mb-3">Delete sponsor</h1>
        <Button
          primaryText="Delete sponsor"
          className={"_deleteBtn px-4 py-2 rounded shadow"}
          waiting={waiting}
          disabled={waiting}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}
