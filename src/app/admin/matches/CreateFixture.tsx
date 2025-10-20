"use client";

import { ITeamProps, IMatchProps } from "@/app/matches/(fixturesAndResults)";
import { Button } from "@/components/buttons/Button";
import { DIALOG } from "@/components/Dialog";
import { DateTimeInput } from "@/components/input/Inputs";
import RadioButtons from "@/components/input/Radio";
import PrimaryModal from "@/components/modals/Modals";
import { fireEscape } from "@/hooks/Esc";
import { getErrorMessage, checkTeams } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { customStyles } from "@/styles";
import { ISelectOptionLV } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Select from "react-select";
import { toast } from "sonner";

export interface IPostMatch {
  date: string;
  time: string;
  isHome: boolean;
  opponentId: string;
}

const CreateFixture = ({ teams }: { teams?: ITeamProps[] }) => {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const teamOptions: ISelectOptionLV[] =
    teams?.map((t) => ({
      label: t.name,
      value: t._id,
    })) || [];

  const [matchType, setMatchType] = useState<string>("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [opponent, setOpponent] = useState<ISelectOptionLV | null>(null);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setWaiting(true);
      const body = {
        date,
        time,
        isHome: matchType === "home" ? true : false,
        opponent: opponent?.value, //opponentId
      };
      const response = await fetch(apiConfig.matches, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-cache",
      });
      const results = await response.json();
      if (results.success) {
        toast.success(results.message);
        fireEscape();
      } else toast.error(results.message);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setWaiting(false);
      router.refresh();
    }
  };

  return (
    <div>
      <Button
        onClick={() => setIsOpenForm((p) => !p)}
        primaryText="Create  Fixture"
        className="px-2 py-1 ml-auto _primaryBtn"
      />
      <PrimaryModal isOpen={isOpenForm} setIsOpen={setIsOpenForm}>
        <form
          className="p-4 border _borderColor rounded-xl space-y-4 _shadow w-72 bg-accent  max-w-xl"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-lg my-3">New Fixture</h1>
          <div>
            <p className="_label mb-3 ">Select team</p>
            <Select
              options={teamOptions}
              styles={customStyles}
              onChange={(e) => setOpponent(e as ISelectOptionLV)}
              className="bg-background rounded"
            />
          </div>

          <div>
            <p className="_label mb-3">Match type </p>
            <RadioButtons
              defaultValue={matchType}
              setSelectedValue={setMatchType}
              values={["home", "away"]}
              wrapperStyles="flex gap-3 items-center"
            />
          </div>

          <div>
            <p className="_label mb-3">Date </p>
            <DateTimeInput
              name={"match-date"}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              required
            />
          </div>

          <div>
            <p className="_label mb-3">Time </p>
            <DateTimeInput
              name={"match-time"}
              onChange={(e) => setTime(e.target.value)}
              type="time"
              required
            />
          </div>

          <Button
            type="submit"
            waiting={waiting}
            disabled={waiting}
            waitingText={"Saving..."}
            primaryText={"Save fixture"}
            className="_primaryBtn px-3 mt-2 py-2 ml-auto"
          />
        </form>
      </PrimaryModal>
    </div>
  );
};

export default CreateFixture;

export const UpdateFixtureMatch = ({
  fixture: fx,
  teams,
}: {
  fixture: IMatchProps;
  teams?: ITeamProps[];
}) => {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const teamOptions: ISelectOptionLV[] =
    teams?.map((t) => ({
      label: t.name,
      value: t._id,
    })) || [];

  const [matchType, setMatchType] = useState<string>(
    fx?.isHome ? "home" : "away"
  );
  const [time, setTime] = useState(fx?.time);

  const [date, setDate] = useState(fx?.date);

  const [opponent, setOpponent] = useState<ISelectOptionLV | null>({
    label: fx?.opponent?.name,
    value: fx?.opponent?._id,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);
    const body = {
      ...fx,
      date,
      time,
      isHome: matchType === "home" ? true : false,
      opponent: opponent?.value, //opponentId
    };
    const response = await fetch(apiConfig.matches, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-cache",
    });
    const results = await response.json();
    if (results.success) {
      toast.success(results.message);
      fireEscape();
    } else toast.error(results.message);

    setWaiting(false);

    router.refresh();
  };

  const { home, away } = checkTeams(fx);

  return (
    <DIALOG
      closeId={fx._id}
      trigger="Edit"
      triggerStyles="text-teal-600"
      title={"Update Fixture"}
    >
      <div>
        <h1 className="mb-4 text-lg md:text-xl">
          {` ${home?.name} vs ${away?.name}`}
        </h1>
        <form
          className="p-4 border _borderColor rounded-xl space-y-4 _shadow w-72  max-w-xl"
          onSubmit={handleSubmit}
        >
          <div>
            <p className="_label mb-3 ">Select team</p>
            <Select
              defaultValue={opponent}
              options={teamOptions}
              styles={customStyles}
              onChange={(e) => setOpponent(e as ISelectOptionLV)}
              className=" dark:bg-background rounded"
            />
          </div>

          <div>
            <p className="_label mb-3">Match type </p>
            <RadioButtons
              defaultValue={fx?.isHome ? "home" : "away"}
              setSelectedValue={setMatchType}
              values={["home", "away"]}
              wrapperStyles="flex gap-3 items-center"
            />
          </div>

          <div>
            <p className="_label mb-3">Date </p>
            <DateTimeInput
              value={fx.date}
              name={"update-date"}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              required
            />
          </div>

          <div>
            <p className="_label mb-3">Time </p>
            <DateTimeInput
              value={fx.time}
              name={"update-time"}
              onChange={(e) => setTime(e.target.value)}
              type="time"
              required
            />
          </div>

          <Button
            type="submit"
            waiting={waiting}
            disabled={waiting}
            waitingText={"Saving..."}
            primaryText={"Update fixture"}
            className="_primaryBtn px-3 mt-2 py-2 ml-auto"
          />
        </form>
      </div>
    </DIALOG>
  );
};
