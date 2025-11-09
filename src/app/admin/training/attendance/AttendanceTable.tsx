"use client";

import { IPlayer, IPlayerMini } from "@/app/players/page";
import { Button } from "@/components/buttons/Button";
import { AVATAR } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { getErrorMessage, getInitials } from "@/lib";
import { ITrainingSession } from "./page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IUser } from "@/types/user";
import { isToday } from "@/lib/timeAndDate";
import { toast } from "sonner";
import { apiConfig } from "@/lib/configs";
import ContentShowcaseWrapper from "@/components/ShowcaseWrapper";
import { imageIcons } from "@/assets/icons/icons";

export interface IPostTrainingSession {
  date: string;
  location: string;
  note?: string;
  recordedBy?: Partial<IUser>;
  attendance: {
    allPlayers: Array<IPlayerMini>;
    attendedBy: Array<IPlayerMini>;
  };
}

interface IProps {
  players?: IPlayer[];
  trainingSessions?: ITrainingSession[];
}

export function AttendanceTable({
  players = [],
  trainingSessions = [],
}: IProps) {
  const session = useSession();
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [editing, setEditing] = useState(false);

  const todaySession = trainingSessions.find((s) => isToday(s.createdAt));

  const { handleSubmit, reset } = useForm<IPostTrainingSession>({
    defaultValues: {
      recordedBy: todaySession?.recordedBy as Partial<IUser>,
      date: new Date().toISOString(),
      ...todaySession,
    },
  });

  //  Pre-populate attendance checkboxes when session exists
  useEffect(() => {
    if (todaySession?.attendance?.attendedBy) {
      const initialChecked: Record<string, boolean> = {};
      todaySession.attendance.attendedBy.forEach((p) => {
        initialChecked[p._id] = true;
      });
      setChecked(initialChecked);
    }
  }, [todaySession]);

  const handleCheck = (player: IPlayer) => {
    setChecked((prev) => ({
      ...prev,
      [player._id]: !prev[player._id],
    }));
  };

  const onSubmit = async () => {
    if (!players.length) return toast.error("No players available");

    setWaiting(true);
    try {
      const attendedBy = players
        .filter((p) => checked[p._id])
        .map((p) => ({
          _id: p._id,
          name: `${p.firstName} ${p.lastName}`,
          number: p.number,
          avatar: p.avatar,
        }));

      const allPlayers = players.map((p) => ({
        _id: p._id,
        name: `${p.firstName} ${p.lastName}`,
        number: p.number,
        avatar: p.avatar,
      }));

      const payload: IPostTrainingSession = {
        date: new Date().toISOString(),
        location: "Training Ground",
        note: "",
        recordedBy: session.data?.user as Partial<IUser>,
        attendance: { allPlayers, attendedBy },
      };

      const uri = editing
        ? `${apiConfig.trainingSession}/${todaySession?._id}`
        : apiConfig.trainingSession;
      const res = await fetch(uri, {
        method: todaySession && editing ? "PUT" : "POST", // 🔁 support update
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          _id: todaySession?._id, // only used for update
        }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(
          todaySession
            ? "Attendance updated successfully"
            : "Attendance saved successfully"
        );
        reset();
        setChecked({});
        setEditing(false);
        router.refresh();
      } else {
        toast.error(result.message || "Failed to save attendance");
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "An unexpected error occurred"));
    } finally {
      setWaiting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-5">
        <h2 className="text-lg font-semibold">Training Attendance</h2>
        {todaySession ? (
          <>
            <span className="text-sm text-green-500">
              ✅ Attendance recorded today
            </span>
            <Button
              onClick={() => setEditing(!editing)}
              disabled={todaySession.updateCount >= 3}
            >
              {editing
                ? "Cancel Edit"
                : `Edit Attendance(${todaySession.updateCount}/3)`}
            </Button>
          </>
        ) : (
          <span className="text-sm text-muted-foreground">
            Record attendance for today
          </span>
        )}
      </div>
      <ContentShowcaseWrapper
        images={[todaySession ? imageIcons.success : imageIcons.error]}
        graphicsStyles="animate-pulse"
      >
        <section>
          <h1>Training Attendance List</h1>
          <br />
          <ul className="w-fit ring">
            {players.map((player) => {
              const name = `${player.firstName} ${player.lastName}`;
              return (
                <li
                  key={player._id}
                  className="flex items-center justify-start gap-6 font-medium uppercase ring p-1.5"
                >
                  <Input
                    type="checkbox"
                    checked={!!checked[player._id]}
                    onChange={() => handleCheck(player)}
                    className="accent-primary cursor-pointer w-8"
                    disabled={!!todaySession && !editing} // 🔒 disable unless editing
                  />
                  <AVATAR
                    src={player.avatar}
                    fallbackText={getInitials(name)}
                  />
                  <span>
                    {name} <b>({player.number})</b>
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="py-6 text-center">
            {(!todaySession || editing) && (
              <Button
                onClick={handleSubmit(onSubmit)}
                waiting={waiting}
                waitingText="Saving..."
                primaryText={
                  todaySession ? "Update Attendance" : "Save Attendance"
                }
                className="_primaryBtn min-w-72 justify-center h-10"
              />
            )}
          </div>
        </section>
      </ContentShowcaseWrapper>
    </div>
  );
}
