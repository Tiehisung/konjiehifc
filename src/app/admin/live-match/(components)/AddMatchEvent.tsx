"use client";

import { apiConfig } from "@/lib/configs";
import { IResultProps } from "@/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { toast } from "react-toastify";
import { Button } from "../../../../components/buttons/Button";
import { Input } from "../../../../components/input/Inputs";
import { IMatchProps } from "@/app/matches/(fixturesAndResults)";
import { getErrorMessage } from "@/lib";
import InfoTip from "@/components/ToolTip";

export const AddLiveMatchEvent = ({ match }: { match: IMatchProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const [event, setEvent] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setWaiting(true);
      const date = new Date();
      const time = date.toLocaleTimeString();

      const response = await fetch(`${apiConfig.matches}/live`, {
        method: "PUT",
        body: JSON.stringify({
          events: [{ description: event, time }, ...match.events],
          _id: match._id,
        }),
      });
      const result: IResultProps = await response.json();
      if (result.success) {
        setEvent("");
      }
      toast(result.message, {
        type: result.success ? "success" : "error",
        position: "top-center",
      });
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update events"));
    } finally {
      setWaiting(false);
      router.refresh();
    }
  }

  return (
    <div className="grow">
      <h2 className="_subtitle">Add event</h2>
      <div className="flex">
        <button
          onClick={() => {
            setIsOpen((p) => !p);
          }}
          title="Add match event"
          className={`_secondaryBg h-9 w-9 form-control justify-center items-center text-primaryGreen rounded-full ${
            isOpen ? "rotate-45" : " border _border"
          }`}
        >
          <GrAdd />
        </button>

        <form
          onSubmit={handleSubmit}
          className={`grow inline-flex mr-1 bg-primaryGreen border border-primaryGreen rounded-full overflow-hidden ${
            isOpen ? " visible transA " : "w-0 invisible -translate-y-2 "
          }`}
        >
          <Input
            name="event"
            value={event}
            others={{ autoFocus: true }}
            placeholder="Type event"
            className="max-w-full border-none rounded-full grow"
            onChange={(e) => setEvent(e.target.value)}
            wrapperStyles=" grow"
          />

          <Button
            type="submit"
            primaryText={"Send"}
            waiting={waiting}
            waitingText={"Saving..."}
            disabled={waiting}
            className={`  ${
              !event || !isOpen ? "invisible w-0 p-0" : " px-1 h-full"
            }`}
          />
        </form>
      </div>
    </div>
  );
};

export function AddEventForm({ match }: { match: IMatchProps }) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [event, setEvent] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const date = new Date();
      const time = date.toLocaleTimeString();

      setWaiting(true);
      const response = await fetch(`${apiConfig.matches}/live`, {
        method: "PUT",
        body: JSON.stringify({
          events: [{ description: event, time }, ...match.events],
          _id: match._id,
        }),
      });
      const result = await response.json();

      toast(result.message, {
        type: result.success ? "success" : "error",
        position: "top-center",
      });
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update events"));
      console.log({ error });
    } finally {
      setWaiting(false);
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="_subtitle ">
        <span>Update live events</span>
        <InfoTip dataTip="e.g., Goal scored by Kudus at 23' " />
      </h2>
      <Input
        type="text"
        name="event"
        placeholder="Type event"
        required
        value={event}
        onChange={(e) => setEvent(e.target.value)}
        className=" block w-full rounded-md shadow-sm"
        wrapperStyles="grow w-full my-4"
      />

      <Button
        type="submit"
        waiting={waiting}
        waitingText={"Adding event..."}
        disabled={waiting}
        primaryText={"Update event"}
        className="_primaryBtn px-12 h-10 py-1 w-fit"
      />
    </form>
  );
}
