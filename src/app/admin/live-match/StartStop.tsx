"use client";

import { IMatchProps } from "@/app/matches/(fixturesAndResults)";
import { IPlayer } from "@/types/player.interface";
import { Button } from "@/components/buttons/Button";
import { DIALOG } from "@/components/Dialog";
import { fireEscape } from "@/hooks/Esc";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiStop } from "react-icons/bi";
import { FcStart } from "react-icons/fc";
import { toast } from "sonner";

interface IProps {
  match?: IMatchProps;
  players?: IPlayer[];
}
export function StartStopMatch({ match, players }: IProps) {
  const router = useRouter();

  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);

  console.log({ match });
  const handleStart = async () => {
    try {
      setIsStarting(true);

      const response = await fetch(`${apiConfig.matches}/live`, {
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          _id: match?._id,
          playerIds: players?.map((p) => p._id),
        }),
        method: "POST",
      });

      const results = await response.json();
      toast.success(results.message);
      fireEscape();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsStarting(false);
      router.refresh();
    }
  };

  const handleStop = async () => {
    try {
      setIsStopping(true);

      const response = await fetch(`${apiConfig.matches}`, {
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          _id: match?._id,
          status: "COMPLETED",
        }),
        method: "PUT",
      });

      const results = await response.json();
      toast.success(results.message);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsStopping(false);
      router.refresh();
    }
  };
  return (
    <div>
      <div className="flex items-center gap-10 ">
        {match?.status == "UPCOMING" ? (
          <DIALOG
            title="Start Match"
            trigger={
              <Button primaryText="START MATCH" className="_deleteBtn" />
            }
            id="start-match"
            description="Are you sure you want to start this match?"
          >
            <Button
              onClick={handleStart}
              className=" justify-center _primaryBtn w-full"
              waiting={isStarting}
              primaryText="START MATCH"
              waitingText={"STARTING..."}
            >
              <FcStart className="mr-2 h-4 w-4" />
            </Button>
          </DIALOG>
        ) : (
          <DIALOG
            title="Stop Match"
            trigger={
              <Button primaryText="STOP MATCH" className="_deleteBtn" />
            }
            id="stop-match"
            description="Are you sure you want to stop this match?"
          >
            <Button
              onClick={handleStop}
              className=" justify-center _deleteBtn w-full"
              waiting={isStopping}
              primaryText="STOP MATCH"
              waitingText={"STOPPING..."}
            >
              <BiStop className="mr-2 h-4 w-4" />
            </Button>
          </DIALOG>
        )}
      </div>
    </div>
  );
}
