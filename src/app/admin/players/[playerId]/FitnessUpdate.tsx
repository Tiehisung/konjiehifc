"use client";

import { IPlayer } from "@/app/players/page";
import { Button } from "@/components/buttons/Button";
import { Title } from "@/components/Elements";
import { TextArea } from "@/components/input/Inputs";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { TbRibbonHealth } from "react-icons/tb";
import { toast } from "sonner";

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
      if (result.success) {
        setFitnessState("");
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
  };
  return (
    <div id="fitness-update">
      <Title icon={<TbRibbonHealth size={36} />}>Fitness updates</Title>
      <form
        onSubmit={handleSubmit}
        className="grid gap-3 p-2 border rounded-md shadow-md bg-card "
      >
        <p className=" my-4 ">
          <strong>[{player?.firstName + " " + player?.lastName}]</strong>
          {player?.medicals?.pop()?.fitness}
        </p>

        <div>
          <TextArea
            name={"fitness"}
            label="Update fitness"
            onChange={(e) => setFitnessState(e.target.value)}
            value={fitnessState}
            className=" max-h-32 min-h-20 w-full "
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
    </div>
  );
}
