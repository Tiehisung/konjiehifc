"use client";

import { Button } from "@/components/buttons/Button";
import { ResponsiveModal } from "@/components/modals/Responsive";
import _players from "@/data/players";
import React, { useState } from "react";
import Select from "react-select";

const HomeTeamGoalForm = ({}) => {
  const [waiting, setWaiting] = useState(false);
  const [scorerId, setScorerId] = useState<string | null>(null);
  console.log(scorerId, setWaiting);

  const onfieldPlayers = _players.map((p) => ({
    label: `${p.lastName} ${p.firstName}`,
    value: p._id,
  }));
  return (
    <ResponsiveModal modalId="home-team-modal" trigger="Goal">
      <form className="">
        <div>
          <p className="_label">Player</p>
          <Select
            options={onfieldPlayers}
            onChange={(arg) => setScorerId(arg?.value as string)}
          />
        </div>
        <div>
          <p className="_label">Time</p>
          <input
            type="number"
            name="time"
            max={100}
            min={1}
            className="bg-white text-black p-2 w-20"
            required
          />
        </div>
        <div>
          <Button
            type="submit"
            waiting={waiting}
            disabled={waiting}
            waitingText={"Saving..."}
            primaryText={"Save Goal"}
            className="_secondaryBtn px-3 mt-2"
          />
        </div>
      </form>
    </ResponsiveModal>
  );
};

export default HomeTeamGoalForm;

export const AwayTeamGoalForm = ({}) => {
  const [waiting, setWaiting] = useState(false);
  console.log(setWaiting);

  return (
    <ResponsiveModal modalId="away-team-modal" trigger="Goal">
      <form className="">
        <div>
          <p className="_label">Time</p>
          <input
            type="number"
            name="time"
            max={100}
            min={1}
            className="bg-white text-black p-2 w-20"
            required
          />
        </div>
        <div>
          <Button
            type="submit"
            waiting={waiting}
            disabled={waiting}
            waitingText={"Saving..."}
            primaryText={"Save Goal"}
            className="_secondaryBtn px-3 mt-2"
          />
        </div>
      </form>
    </ResponsiveModal>
  );
};

export const GoalForms = () => {
  return (
    <div className="flex w-full h-fit border rounded-mx p-3">
      <HomeTeamGoalForm />
      <AwayTeamGoalForm />
    </div>
  );
};
