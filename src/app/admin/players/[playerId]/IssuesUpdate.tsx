"use client";

import { IPlayer } from "@/app/players/page";
import { IAccordionProps, PrimaryAccordion } from "@/components/Accordion";
import { Button } from "@/components/buttons/Button";
import { Title } from "@/components/Elements";
import { TextArea } from "@/components/input/Inputs";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { TbRibbonHealth } from "react-icons/tb";
import { toast } from "sonner";

export default function UpdatePlayerIssuesAndFitness({
  player,
}: {
  player: IPlayer;
}) {
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  const [issue, setIssue] = useState(player?.issues?.[0] ?? "");

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
      trigger: (
        <p className=" line-clamp-1 pl-1 max-w-full">
          {issue}
        </p>
      ),
      value: issue + i,
    })
  );
  return (
    <div id="fitness-update">
      <Title icon={<TbRibbonHealth size={36} />}>
        <span className="text-left mr-auto">Fitness & Issues Updates</span>
      </Title>
      <form
        onSubmit={handleSubmit}
        className="grid gap-3 p-2 border rounded-md shadow-md bg-card "
      >
        <div className=" mb-4" />

        <div>
          <TextArea
            name={"fitness"}
            label="Update fitness"
            onChange={(e) => setIssue(e.target.value)}
            value={issue}
            className=" max-h-32 min-h-20 w-full "
          />
        </div>
        <Button
          type="submit"
          primaryText={"Update"}
          waiting={waiting}
          waitingText={"Updating, wait..."}
          disabled={waiting || !issue}
          className="_primaryBtn grow px-5 rounded shadow md:w-64 justify-center"
        />
      </form>
      <h1 className=" mt-6">ISSUES</h1>
      <PrimaryAccordion
        data={accordionData}
        className="_card backdrop-blur-[1px] overflow-x-hidden"
      />
    </div>
  );
}
