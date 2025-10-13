"use client";

import { IPlayer } from "@/app/players/page";
import { Button } from "@/components/buttons/Button";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function UpdatePlayerFitness({ player }: { player: IPlayer }) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [fitnessState, setFitnessState] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setWaiting(true);
      const response = await fetch(
        `${`${apiConfig.players}/${player?._id}`}/fitness?fitness=${fitnessState}`
      );
      const result = await response.json();
      toast(result.message, { type: result.success ? "success" : "error" });
      if (result.success) setFitnessState("");
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setWaiting(false);
    }
  };
  return (
    <form
      id="fitness-update"
      onSubmit={handleSubmit}
      className="grid gap-3 p-2 border rounded-md shadow-md bg-arsh text-white"
    >
      <h1 className="_title mt-3 text-[#f7bd53] __gradient1">
        Fitness updates
      </h1>
      <p className="font-light ">
        <small>[{player?.firstName + " " + player?.lastName}]</small>
        {player?.medicals?.pop()?.fitness}
      </p>

      <div>
        <p>Update fitness</p>
        <textarea
          onChange={(e) => setFitnessState(e.target.value)}
          value={fitnessState}
          className="classic__input max-h-32 min-h-20 w-full bg-[#9595956b]"
        />
      </div>
      <Button
        type="submit"
        primaryText={"Update"}
        waiting={waiting}
        waitingText={"Updating, wait..."}
        disabled={waiting || !fitnessState}
        className="_primaryBtn w-fit px-5 rounded shadow"
      />
    </form>
  );
}
