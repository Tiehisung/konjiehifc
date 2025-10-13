"use client";

import { Button } from "@/components/buttons/Button";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function Performance({ playerId }: { playerId: string }) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState({ ...formModel });
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setWaiting(true);
    const response = await fetch(
      `${apiConfig.players} /${playerId}/performance`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        body: JSON.stringify({
          playerId: playerId,
          ...formData,
        }),
      }
    );
    const result = await response.json();
    toast(result.message, { type: result.success ? "success" : "error" });
    if (result.success) setFormData(formModel);
    setWaiting(false);
    router.refresh();
  }
  return (
    <form
      id="player-performance"
      onSubmit={handleSubmit}
      className=" grid md:grid-cols-2 gap-2 justify-center items-center border p-[2vw] bg-arshTrans text-xl text-blue-800"
    >
      <h1 className="_title mt-3 text-[#f7bd53] __gradient1">
        Performance statistics updates
      </h1>
      <div>
        <p>Goals</p>
        <input
          value={formData.goals}
          name="goals"
          type="number"
          min={0}
          onChange={handleOnChange}
          className="w-60 h-16 bg-blue-200 font-semibold text-center pl-2 text-4xl"
        />
      </div>
      <div>
        <p>Red cards</p>
        <input
          value={formData.redCards}
          name="redCards"
          type="number"
          min={0}
          onChange={handleOnChange}
          className="w-60 h-16 bg-blue-200 font-semibold text-center pl-2 text-4xl"
        />
      </div>
      <div>
        <p>Yellow cards</p>
        <input
          value={formData.yellowCards}
          name="yellowCards"
          type="number"
          min={0}
          onChange={handleOnChange}
          className="w-60 h-16 bg-blue-200 font-semibold text-center pl-2 text-4xl"
        />
      </div>
      <div>
        <p>Assists</p>
        <input
          value={formData.assists}
          name="assists"
          type="number"
          min={0}
          onChange={handleOnChange}
          className="w-60 h-16 bg-blue-200 font-semibold text-center pl-2 text-4xl"
        />
      </div>
      <div>
        <p>Penalties won</p>
        <input
          value={formData.penaltiesWon}
          name="penaltiesWon"
          type="number"
          min={0}
          onChange={handleOnChange}
          className="w-60 h-16 bg-blue-200 font-semibold text-center pl-2 text-4xl"
        />
      </div>
      <div>
        <p>MVP/MoTM won</p>
        <input
          value={formData.motm}
          name="motm"
          type="number"
          min={0}
          onChange={handleOnChange}
          className="w-60 h-16 bg-blue-200 font-semibold text-center pl-2 text-4xl"
        />
      </div>
      <div>
        <p>Penalties committed</p>
        <input
          value={formData.penaltiesCommitted}
          name="penaltiesCommitted"
          type="number"
          min={0}
          onChange={handleOnChange}
          className="w-60 h-16 bg-blue-200 font-semibold text-center pl-2 text-4xl"
        />
      </div>
      <Button
        type="submit"
        primaryText={"Update"}
        waitingText={"Updating, wait..."}
        waiting={waiting}
        disabled={waiting}
        className="_secondaryBtn w-60 h-16 px-5 rounded shadow mt-6"
      />
    </form>
  );
}

const formModel = {
  yellowCards: 0,
  redCards: 0,
  goals: 0,
  penaltiesWon: 0,
  penaltiesCommitted: 0,
  motm: 0,
  assists: 0,
};
