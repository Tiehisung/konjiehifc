"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib";
import { IQueryResponse } from "@/types";
import { IPlayer } from "@/app/players/page";
import RadioButtons from "@/components/input/Radio";
import Image from "next/image";
import useGetParam from "@/hooks/params";
import { Verified } from "lucide-react";
import { SearchCaptains } from "./Search";
import { DIALOG } from "@/components/Dialog";
import { OverlayLoader } from "@/components/loaders/OverlayLoader";
import { fireEscape } from "@/hooks/Esc";
import { getFormattedDate } from "@/lib/timeAndDate";
import { Badge } from "@/components/ui/badge";

export type ICaptainProps = {
  isActive?: boolean;
  _id: string;
  player: Partial<IPlayer>;
  role: "captain" | "vice";
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

export default function CaptaincyAdm({
  players,
  captains,
}: {
  captains: IQueryResponse<ICaptainProps[]> | null;
  players: IPlayer[];
}) {
  console.log({ captains });
  const [filtered, setFiltered] = useState<ICaptainProps[]>(
    captains?.data as ICaptainProps[]
  );

  const captainType = useGetParam("captains") as
    | "current"
    | "passed"
    | undefined;

  const searchKey = useGetParam("search");

  function searcher(caps: ICaptainProps[]) {
    if (searchKey)
      return caps?.filter((c) =>
        `${c.player?.firstName} ${c.player.lastName}`
          .toLowerCase()
          .includes(searchKey.toLowerCase())
      );
    return caps;
  }
  useEffect(() => {
    if (captainType == "current") {
      setFiltered(searcher((captains?.data ?? []).filter((c) => c.isActive)));
    } else if (captainType == "passed") {
      setFiltered(searcher((captains?.data ?? []).filter((c) => !c.isActive)));
    } else {
      const sorted = [
        ...(captains?.data ?? []).filter((c) => c.isActive),
        ...(captains?.data ?? []).filter((c) => !c.isActive),
      ];
      setFiltered(searcher(sorted));
    }
  }, [captains?.data, captainType]);

  return (
    <div className="flex flex-col justify-center items-center bg-card pb-10">
      {/*  Captains */}

      <section>
        <header className="flex justify-center items-center gap-6 flex-col p-4 ">
          <h1 className="text-2xl md:text-4xl font-bold my-5"> Captains</h1>
          <SearchCaptains />
        </header>

        <ul className="flex items-start justify-center flex-wrap gap-10 my-10 p-4">
          {filtered?.map((captain, index) => (
            <li key={index}>
              <div>
                <Image
                  src={captain?.player?.avatar as string}
                  width={300}
                  height={300}
                  alt="desc image"
                  className="h-36 w-36 rounded-xl shadow-md object-cover aspect-square"
                />
                <p className="_label text-[grayText] first-letter:uppercase flex items-center gap-3 mt-1">
                  {captain.isActive && (
                    <Verified className="text-primaryGreen" size={24} />
                  )}

                  <Badge
                    className="capitalize text-xs "
                    variant={captain.isActive ? "secondary" : "destructive"}
                  >
                    {captain?.role}
                  </Badge>
                </p>
                <p className="uppercase">
                  {`${captain?.player?.firstName} ${captain?.player?.lastName}`}
                </p>
                <div className="grid text-sm font-light gap-1">
                  {captain?.isActive ? (
                    <span>
                      Since:
                      {getFormattedDate(captain?.startDate, "March 2, 2025")}
                    </span>
                  ) : (
                    <>
                      <span>
                        From:
                        {getFormattedDate(captain?.startDate, "March 2, 2025")}
                      </span>
                      <span>
                        To:
                        {getFormattedDate(captain?.startDate, "March 2, 2025")}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Update Captaincy */}

      <section>
        <UpdateCaptaincy captains={captains?.data} players={players} />
      </section>
    </div>
  );
}

export const UpdateCaptaincy = ({
  players,
  captains,
}: {
  players?: IPlayer[];
  captains?: ICaptainProps[];
}) => {
  const [isBusy, setIsBusy] = useState(false);

  return (
    <DIALOG title trigger="Update Captaincy" triggerStyles="text-primaryGreen ">
      <OverlayLoader isLoading={isBusy} className="backdrop:blur-none" />
      <table
        className={` bg-card w-full ${
          isBusy &&
          "ring-1 ring-red-400 pointer-events-none opacity-95 backdrop-blur-sm"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <tbody>
          <tr className=" text-left ">
            <th className="p-3 text-muted-foreground">#</th>
            <th className="p-3 text-muted-foreground">Player</th>
            <th className="p-3 text-muted-foreground">Captain</th>
          </tr>
          {players?.map((player, index) => (
            <PlayerForCaptainRow
              key={index}
              player={player}
              setIsBusy={setIsBusy}
              defaultRole={
                captains?.find(
                  (cap) => cap.player._id == player._id && cap.isActive
                )?.role
              }
            />
          ))}
        </tbody>
      </table>
    </DIALOG>
  );
};

const PlayerForCaptainRow = ({
  player,
  defaultRole,
  setIsBusy,
}: {
  player: IPlayer;
  defaultRole?: ICaptainProps["role"];
  setIsBusy: (arg: boolean) => void;
}) => {
  const router = useRouter();
  const [newRole, setNewRole] = useState<string>("");
  const [waiting, setWaiting] = useState(false);

  const handleChangeCaptain = async () => {
    try {
      if (defaultRole == newRole || !newRole) return; //Prevent duplication
      setWaiting(true);
      setIsBusy(true);
      const response = await fetch(apiConfig.captains, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        body: JSON.stringify({ playerId: player._id, role: newRole }),
      });
      const result: IQueryResponse = await response.json();
      toast.success(result.message);
      if (result.success) fireEscape();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      router.refresh();
      setWaiting(false);
      setIsBusy(false);
    }
  };

  useEffect(() => {
    handleChangeCaptain();
  }, [newRole, defaultRole]);
  return (
    <tr className={`border ${waiting && "pointer-events-none"}`}>
      <td className="p-2 font-black">{player.number}</td>
      <td className="p-2 uppercase">{`${player.firstName} ${player.lastName}`}</td>
      <td className="p-2">
        <RadioButtons
          values={["captain", "vice"]}
          setSelectedValue={setNewRole}
          defaultValue={defaultRole ?? ""}
          wrapperStyles="flex items-center gap-3"
        />
      </td>
    </tr>
  );
};
