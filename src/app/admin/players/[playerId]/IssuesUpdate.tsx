"use client";

import { IPlayer } from "@/types/player.interface";
import { IAccordionProps, PrimaryAccordion } from "@/components/Accordion";
import { Button } from "@/components/buttons/Button";
import { PrimaryCollapsible } from "@/components/Collapsible";
import { TextArea } from "@/components/input/Inputs";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { CgAdd } from "react-icons/cg";
import { TbRibbonHealth } from "react-icons/tb";
import { toast } from "sonner";

export default function UpdatePlayerIssuesAndFitness({
  player,
}: {
  player: IPlayer;
}) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [issue, setIssue] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setWaiting(true);
      const response = await fetch(`${`${apiConfig.players}/${player?._id}`}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ issues: [issue, ...player?.issues] }),
      });
      const result = await response.json();
      if (result.success) {
        setIssue("");
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setWaiting(false);
    }
  };

  const accordionData: IAccordionProps["data"] = player?.issues?.map(
    (issue, i) => ({
      content: <div className="ml-2 border-l pl-0.5">{issue}</div>,
      trigger: <p className=" line-clamp-1 pl-1 max-w-full">{issue}</p>,
      value: issue + i,
    })
  );
  return (
    <div id="fitness-update" className=" bg-card">
      <header className="flex items-center gap-3 mt-6">
        <TbRibbonHealth size={36} /> <span>FITNESS & ISSUES UPDATES</span>
      </header>

      <br />

      <PrimaryAccordion
        data={accordionData}
        className="_card backdrop-blur-[1px] overflow-x-hidden"
      />

      <br />
      
      <PrimaryCollapsible
        header={{
          label: (
            <div className="w-full">
              <CgAdd size={24} />
            </div>
          ),
          others: { title: "Add Issue" },
        }}
      >
        <h1 className="text-left mr-auto mb-2.5 _label">Add Issue</h1>

        <form
          onSubmit={handleSubmit}
          className="grid gap-3 p-2 border rounded-md shadow-md bg-card "
        >
          <div className=" mb-4" />

          <TextArea
            name={"fitness"}
            label="Update Fitness"
            onChange={(e) => setIssue(e.target.value)}
            value={issue}
            className=" max-h-32 min-h-16 w-full "
          />

          <Button
            type="submit"
            primaryText={"Update"}
            waiting={waiting}
            waitingText={"Updating, wait..."}
            disabled={waiting || !issue}
            className="_primaryBtn grow px-5 rounded shadow md:w-64 justify-center"
          />
        </form>
      </PrimaryCollapsible>
    </div>
  );
}
