"use client";

import { Button } from "@/components/buttons/Button";
import { TextArea } from "@/components/input/Inputs";
import { GeneralSelector } from "@/components/Selectors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function DeletePlayer({
  playerId,
  name,
}: {
  playerId: string;
  name: string;
}) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState({ reason: "", detail: "" });
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setWaiting(true);
    const response = await fetch(`${apiConfig.players}/${playerId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify({
        reason: formData.reason,
        detail: formData.detail,
      }),
    });
    const result = await response.json();
    if (result.success) {
      toast.success(result.message);
      router.back();
    } else {
      toast.error(result.message);
    }

    router.refresh();
    setWaiting(false);
  }
  return (
    <Card
      id="delete-player"
      className=" rounded-xl p-4 shadow-md max-w-md grow"
    >
      <CardHeader>
        <CardTitle>
          <h1 className="font-bold text-lg text-primaryRed ">Delete {name}</h1>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className=" space-y-10 border _borderColor rounded-xl h-fit p-4 pt-0"
        >
          <div className="w-full">
            <p className="_label">Reason</p>
            <GeneralSelector
              data={[
                "Contract expired",
                "Contract terminated",
                "Demise",
                "Misconduct",
                "Health issues",
              ]}
              handleOnChange={(e) =>
                setFormData((prev) => ({ ...prev, reason: e.target.value }))
              }
              selectedValue={formData.reason}
              className="grow w-full "
            />
          </div>

          <TextArea
            label="Detail"
            labelStyles="_label"
            name="deleteDetails"
            value={formData.detail}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, detail: e.target.value }))
            }
          />

          <Button
            type="submit"
            primaryText={"Delete player"}
            waitingText={"Deleting player"}
            className="_deleteBtn w-fit px-5 py-2 rounded shadow"
            waiting={waiting}
            disabled={waiting || !formData.detail || !formData.reason}
          />
        </form>
      </CardContent>
    </Card>
  );
}
