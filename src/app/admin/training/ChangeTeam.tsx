"use client";

import { IPlayer } from "@/types/player.interface";
import { Input } from "@/components/ui/input";
import { apiConfig } from "@/lib/configs";
import { IQueryResponse } from "@/types";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

export default function ChangePlayerTeam({ player }: { player: IPlayer }) {
  const router = useRouter();
  const [selectedTeam, setSelectedTeam] = useState(player.training.team);

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedTeam(value as IPlayer["training"]["team"]);
    const response = await fetch(`${apiConfig.players}/${player._id}`, {
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({ training: { team: value } }),
    });
    const result: IQueryResponse = await response.json();

    toast.success(result.message);
    router.refresh();
  };

  return (
    <div className="grid grid-cols-2">
      <Input
        type="radio"
        value={"A"}
        checked={selectedTeam == "A"}
        onChange={handleOnChange}
        name={player._id}
        className="w-7 h-7 grayscale-[.8] "
      />

      <Input
        type="radio"
        onChange={handleOnChange}
        value={"B"}
        checked={selectedTeam == "B"}
        name={player._id}
        className="w-7 h-7 grayscale-[.8] "
      />
    </div>
  );
}
