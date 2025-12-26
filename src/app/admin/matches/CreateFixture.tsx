"use client";

import { ITeamProps, IMatchProps } from "@/app/matches/(fixturesAndResults)";
import { staticImages } from "@/assets/images";
import { Button } from "@/components/buttons/Button";
import { DIALOG } from "@/components/Dialog";
import { DateTimeInput } from "@/components/input/Inputs";
import RadioButtons from "@/components/input/Radio";
import ContentShowcaseWrapper from "@/components/ShowcaseWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { teamKFC } from "@/data/teams";
import { fireDoubleEscape, fireEscape } from "@/hooks/Esc";
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setWaiting(true);
      const body = {
        date,
        time,
        isHome: matchType === "home" ? true : false,
        opponent: opponent?.value, //opponentId
        title:
          matchType === "home"
            ? `${teamKFC.name} VS ${opponent?.label}`
            : `${opponent?.label} VS ${teamKFC.name}`,
        venue: {
          files: [],
          name: matchType === "home" ? teamKFC.name : opponent?.label,
        },
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
        setTime("");
        setDate("");
        setMatchType("");
        setOpponent(null);
      } else toast.error(results.message);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setWaiting(false);
      router.refresh();
    }
  };

  return (
    <ContentShowcaseWrapper
      images={[staticImages.team.src]}
      className="py-6 gap-y-10 items-start gap-5"
      graphicsStyles="md:min-h-[80vh] bg-Red "
    >
      <form onSubmit={handleSubmit} className=" grow">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-2xl">NEW FIXTURE</CardTitle>
            <CardDescription>Fill Out To Create Fixture</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 max-w-xl sm:min-w-sm">
            <div>
              <p className="_label mb-2 ">Select team</p>
              <Select
                options={teamOptions}
                styles={customStyles}
                onChange={(e) => setOpponent(e as ISelectOptionLV)}
                className="bg-popover rounded"
                value={opponent}
              />
            </div>

            <RadioButtons
              defaultValue={matchType}
              setSelectedValue={setMatchType}
              values={["home", "away"]}
              label="Match Type"
              wrapperStyles="flex gap-3 items-center"
            />

            <DateTimeInput
              name={"match-date"}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              required
              value={date}
              label={"Date Of Play"}
            />

            <DateTimeInput
              name={"match-time"}
              onChange={(e) => setTime(e.target.value)}
              type="time"
              required
              label={"Time Of Play"}
              value={time}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              waiting={waiting}
              disabled={!date || !time || !opponent || !matchType}
              waitingText={"Saving..."}
              primaryText={"Save Fixture"}
              className="_primaryBtn px-3 mt-2 py-2 mx-auto grow justify-center "
            />
          </CardFooter>
        </Card>
      </form>
    </ContentShowcaseWrapper>
  );
};

export default CreateFixture;

export const UpdateFixtureMatch = ({
  fixture: fx,
  teams,
}: {
  fixture?: IMatchProps;
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

  const [date, setDate] = useState(fx?.date?.split("T")?.[0]);

  const [opponent, setOpponent] = useState<ISelectOptionLV | null>({
    label: fx?.opponent?.name as string,
    value: fx?.opponent?._id as string,
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
      title:
        matchType === "home"
          ? `${teamKFC.name} VS ${fx?.opponent?.name}`
          : `${fx?.opponent.name} VS ${teamKFC.name}`,
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
      fireDoubleEscape();
    } else toast.error(results.message);

    setWaiting(false);

    router.refresh();
  };

  const { home, away } = checkTeams(fx);

  if (fx?.status !== "UPCOMING") return null;

  return (
    <DIALOG
      id={fx._id}
      trigger={"Edit"}
      title={"UPDATE FIXTURE"}
      className="bg-popover"
      description={` ${home?.name} vs ${away?.name}`.toUpperCase()}
    >
      <div className=" ">
        <form
          className="p-4 border _borderColor rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6 max-w-xl sm:min-w-sm">
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

            <RadioButtons
              defaultValue={matchType}
              setSelectedValue={setMatchType}
              values={["home", "away"]}
              wrapperStyles="flex gap-3 items-center"
              label="Match Type"
            />

            <DateTimeInput
              name={"match-date"}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              value={date}
              required
              label={"Date Of Play"}
            />

            <DateTimeInput
              name={"match-time"}
              onChange={(e) => setTime(e.target.value)}
              type="time"
              value={time}
              required
              label={"Time Of Play"}
            />
          </div>

          <Button
            type="submit"
            waiting={waiting}
            disabled={waiting}
            waitingText={"Saving..."}
            primaryText={"Update Fixture"}
            className="_primaryBtn px-3 py-2 mx-auto grow w-full justify-center mt-6"
          />
        </form>
      </div>
    </DIALOG>
  );
};
