"use client";

import { Button } from "@/components/buttons/Button";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";
import { UpdateFixtureMatch } from "./CreateFixture";
import { checkTeams } from "@/lib";
import { getFormattedDate } from "@/lib/timeAndDate";
import { IMatchProps, ITeamProps } from "@/app/matches/(fixturesAndResults)";
import { BsPatchCheck } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { Badge } from "@/components/ui/badge";

interface DisplayFixturesProps {
  fixtures: IMatchProps[];
  teams?: ITeamProps[];
}
// Fixture is  match that is not yet played successfully

export function DisplayFixtures({ fixtures, teams }: DisplayFixturesProps) {
  return (
    <div>
      <h1 className="_title">Fixtures</h1>
      <div className="overflow-x-auto ">
        <table className="table table-auto bg-popover w-full">
          <tbody>
            <tr className="border p-2 _label h-12 text-left">
              <th className="px-2">TITLE</th>
              <th className="px-2">DATE</th>
              <th className="px-2">STATUS</th>
              <th className="px-2">ACTION</th>
            </tr>
            {fixtures?.map((fixture, index) => (
              <tr key={fixture._id} className={`border _borderColor `}>
                <td className="px-2 py-4 ">
                  <div className="flex items-center gap-2 text-nowrap uppercase">
                    <span className="">
                      {fixture.status == "COMPLETED" ? (
                        <FaCheckCircle
                          className="text-primaryGreen"
                          size={30}
                        />
                      ) : fixture.status == "LIVE" ? (
                        <MdLiveTv className="text-primaryRed" size={30} />
                      ) : (
                        <BsPatchCheck size={30} />
                      )}
                    </span>

                    <strong className="w-24">
                      {checkTeams(fixture)?.home?.name}
                    </strong>
                    <span className="w-10">vs</span>

                    <strong className="w-24">
                      {checkTeams(fixture)?.away?.name}
                    </strong>
                  </div>
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-sm">
                  {getFormattedDate(fixture.date, "March 2, 2025")}
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-sm">
                  {fixture.status}
                </td>
                <td className="px-2 py-2 text-sm ">
                  <div className="flex gap-5 items-center justify-between max-w-sm">
                    <StatusToggle
                      status={fixture.status}
                      fixtureId={fixture._id}
                    />
                    <UpdateFixtureMatch teams={teams} fixture={fixture} />
                    <DeleteFixture fixtureId={fixture._id} />
                  </div>
                </td>
              </tr>
            ))}
            {fixtures?.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center _label">
                  No fixtures available.
                </td>
              </tr>
            )}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={4}>
                <div className="p-2 flex items-center text-sm gap-3">
                  <div>
                    Home fixtures: {fixtures?.filter((f) => f.isHome)?.length}
                  </div>
                  <div>
                    Away fixtures: {fixtures?.filter((f) => !f.isHome)?.length}
                  </div>
                  <div>Total fixtures: {fixtures?.length}</div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export function DeleteFixture({ fixtureId }: { fixtureId: string }) {
  const router = useRouter();

  const [waiting, setWaiting] = useState(false);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setWaiting(true);
    const response = await fetch(apiConfig.matches, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        matchId: fixtureId,
      }),
      cache: "no-cache",
    });
    const results = await response.json();
    toast.success(results.message);
    setWaiting(false);

    router.refresh();
  };
  return (
    <Button
      waiting={waiting}
      disabled={waiting}
      waitingText=""
      onClick={handleDelete}
      className=" px-2 flex items-center text-red-600 _deleteBtn"
    >
      <RiDeleteBin6Line className={waiting ? "hidden" : ""} />
    </Button>
  );
}
export function StatusToggle({
  fixtureId,
  status,
}: {
  fixtureId: string;
  status: IMatchProps["status"];
}) {
  const router = useRouter();

  const [waiting, setWaiting] = useState(false);

  const handleToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setWaiting(true);
    const response = await fetch(`${apiConfig.matches}/live`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: fixtureId,
        status: status == "LIVE" ? "COMPLETED" : "LIVE",
      }),
      cache: "no-cache",
    });
    const results = await response.json();
    if (results.success) toast.success(results.message);
    setWaiting(false);

    router.refresh();
  };

  if (status == "COMPLETED")
    return (
      <Badge className="w-20 " variant={"outline"}>
        FT
      </Badge>
    );

  return (
    <Button
      waiting={waiting}
      disabled={waiting}
      primaryText={status == "LIVE" ? "Mark FT" : "Go Live"}
      waitingText="Updating..."
      onClick={handleToggle}
      className=" px-2 flex items-center text-red-600 _deleteBtn"
    />
  );
}
