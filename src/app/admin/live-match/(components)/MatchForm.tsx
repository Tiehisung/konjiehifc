"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Input } from "@/components/input/Inputs";
import { Button } from "@/components/buttons/Button";
import { IMatchProps } from "@/app/matches/(fixturesAndResults)";
import { apiConfig } from "@/lib/configs";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/lib";
import { useRouter } from "next/navigation";
import { IResultProps } from "@/types";
import DiveUpwards from "@/components/Animate";

export const revalidate = 0;
export const dynamic = "force-dynamic";

interface ILiveMatchProps {
  match: IMatchProps;
}

export default function MatchForm({ match }: ILiveMatchProps) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormdata] = useState({
    kfc: match?.score?.kfc ?? 0,
    opponent: match?.score?.opponent ?? 0,
  });

  async function handleUpdateScore(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setWaiting(true);
      const response = await fetch(`${apiConfig.matches}/live`, {
        method: "PUT",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: formData, _id: match._id }),
      });
      const result: IResultProps = await response.json();
      if (result.success) {
        formRef.current?.reset();
      }

      toast(result.message, {
        type: result.success ? "success" : "error",
        position: "bottom-center",
      });
    } catch (error) {
      console.log({ error });
      toast.error(getErrorMessage(error));
    } finally {
      setWaiting(false);
      router.refresh();
    }
  }

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata((p) => ({ ...p, [name]: value }));
  };

  return (
    <form ref={formRef} onSubmit={handleUpdateScore} className="space-y-4">
      <div className="grid grid-cols-2 gap-6 border _borderColor min-w-72">
        <div className="grid border-l-4 border-green-500 ">
          <p className="_title line-clamp-1">Konjiehi FC</p>

          <div className="_label grid grid-cols-2 items-baseline">
            <span>Score </span>
            <DiveUpwards layoutId="home" dependency={match?.score?.kfc}>
              <span className="text-3xl text-green-500">
                {match?.score?.kfc}
              </span>
            </DiveUpwards>
          </div>
          <Input
            type="number"
            value={formData.kfc}
            name="kfc"
            onChange={handleOnchange}
            required
            others={{ min: 0 }}
            className="w-24 mt-1 rounded-none "
          />
        </div>
        <div className="grid border-l-4 border-blue-500 ">
          <p className="_title line-clamp-1">{match?.opponent?.name}</p>
          <div className="_label grid grid-cols-2 items-baseline">
            Score{" "}
            <DiveUpwards layoutId="opoenet" dependency={match?.score?.opponent}>
              <span className="text-3xl text-blue-500">
                {match?.score?.opponent}
              </span>
            </DiveUpwards>
          </div>

          <Input
            type="number"
            value={formData?.opponent}
            name="opponent"
            onChange={handleOnchange}
            required
            className="w-24 mt-1 rounded-none "
            others={{ min: 0 }}
          />
        </div>
      </div>
      <Button
        type="submit"
        waiting={waiting}
        waitingText={"Updating..."}
        disabled={waiting}
        primaryText={"Update"}
        className="_primaryBtn px-12 h-10 py-1 w-fit mt-12"
      />
    </form>
  );
}
