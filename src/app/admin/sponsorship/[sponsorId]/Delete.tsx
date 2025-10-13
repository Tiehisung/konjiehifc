"use client";

import { Button } from "@/components/buttons/Button";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

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
    toast(result.message, { type: result.success ? "success" : "error" });

    router.refresh();
    if (result.success) router.back();
  };
  return (
    <div id="delete-sponsor">
      <p className="_title">Danger zone</p>
      <div className="_secondaryBg shadow p-5 ">
        <h1 className="_label ">Delete sponsor</h1>
        <Button
          primaryText="Delete sponsor"
          className={"delete__btn px-4 py-2 rounded shadow"}
          waiting={waiting}
          disabled={waiting}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}
