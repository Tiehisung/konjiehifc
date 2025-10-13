"use client";

import { IPlayer } from "@/app/players/page";
import { Button } from "@/components/buttons/Button";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

export default function CardAndFit({ player }: { player: IPlayer }) {
  const router = useRouter();

  const [waiting, setWaiting] = useState("");

  const handleToggleYellow = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const { checked } = e.target;

      setWaiting("yellow");
      const response = await fetch(`${apiConfig.players}/${player._id}`, {
        cache: "no-cache",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fieldKey: "card",
          fieldValue: checked ? "yellow" : "",
        }),
      });
      const result = await response.json();

      toast(result.message, { type: result.success ? "success" : "error" });
      setWaiting("");
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };
  const handleToggleRed = async (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    try {
      setWaiting("red");
      const response = await fetch(`${apiConfig.players}/${player._id}`, {
        cache: "no-cache",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fieldKey: "card",
          fieldValue: checked ? "red" : "",
        }),
      });
      const result = await response.json();

      toast(result.message, { type: result.success ? "success" : "error" });
      setWaiting("");
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleToggleFitness = async (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    try {
      setWaiting("isFit");
      const response = await fetch(`${apiConfig.players}/${player._id}`, {
        cache: "no-cache",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fieldKey: "isFit",
          fieldValue: checked,
        }),
      });
      const result = await response.json();

      toast(result.message, { type: result.success ? "success" : "error" });
      setWaiting("");
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };
  return (
    <div className="grid grid-cols-3 items-center font-bold">
      <span>
        <h3 className="text-gray-800">💪Fit</h3>
        <Button
          primaryText={""}
          waiting={waiting == "isFit"}
          waitingText=""
          className=" flex items-center text-arsh text-2xl"
          disabled={waiting == "isFit"}
        >
          <input
            onChange={handleToggleFitness}
            type="checkbox"
            checked={player?.isFit}
            name="fitness"
            className="h-10 w-10 grayscale"
          />
        </Button>
      </span>

      <span className="text-red-500">
        <h3>🟥Red card</h3>
        <Button
          primaryText={""}
          waiting={waiting == "red"}
          waitingText=""
          className=" flex items-center text-arsh text-2xl"
          disabled={waiting == "red"}
        >
          <input
            onChange={handleToggleRed}
            type="checkbox"
            checked={player?.card == "red"}
            name="red"
            className="h-10 w-10 grayscale"
          />
        </Button>
      </span>

      <span className="text-yellow-500 ">
        <h3 className="whitespace-nowrap">🟨Yellow card</h3>
        <Button
          primaryText={""}
          waiting={waiting == "yellow"}
          waitingText=""
          className=" flex items-center text-arsh text-2xl"
          disabled={waiting == "yellow"}
        >
          <input
            onChange={handleToggleYellow}
            checked={player?.card == "yellow"}
            type="checkbox"
            name="yellow"
            className="h-10 w-10 grayscale"
          />
        </Button>
      </span>
    </div>
  );
}
