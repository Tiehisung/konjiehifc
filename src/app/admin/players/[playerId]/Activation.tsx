"use client";

import { Button } from "@/components/buttons/Button";
import { SubTitle } from "@/components/Elements";
import { TextArea } from "@/components/input/Inputs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function PlayerActivation({
  playerId,
  isActive,
}: {
  playerId: string;
  isActive: boolean;
}) {
  const [waiting, setWaiting] = useState(false);
  const router = useRouter();
  const [reason, setReason] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setWaiting(true);
      const response = await fetch(
        `${apiConfig.players}/${playerId}/activation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-cache",
          body: JSON.stringify({
            reason,
          }),
        }
      );
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setWaiting(false);
    }
  }
  return (
    <Card
      id="activate-player"
      className=" rounded-xl p-4 shadow-md max-w-md grow text-sm"
    >
      <CardHeader>
        <CardTitle>
          <SubTitle className=" font-bold text-lg text-primaryRed">
            Player activation
          </SubTitle>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className=" space-y-6 border _borderColor rounded-xl h-fit p-4"
        >
          <TextArea
            label="Reason"
            labelStyles="_label"
            name="activationReason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <Button
            type="submit"
            primaryText={isActive ? "Deactive" : "Activate"}
            waiting={waiting}
            waitingText={
              isActive ? "Deactivating, please wait..." : "Reactivating..."
            }
            disabled={waiting || !reason}
            className="_deleteBtn w-fit h-10 px-5 rounded shadow"
          />
        </form>
      </CardContent>
    </Card>
  );
}
