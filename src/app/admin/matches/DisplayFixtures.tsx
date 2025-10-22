"use client";

import { Button } from "@/components/buttons/Button";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { UpdateFixtureMatch } from "./CreateFixture";
import { checkTeams } from "@/lib";
import { getFormattedDate } from "@/lib/timeAndDate";
import { IMatchProps, ITeamProps } from "@/app/matches/(fixturesAndResults)";
import { BsPatchCheck } from "react-icons/bs";

interface DisplayFixturesProps {
  fixtures: IMatchProps[];
  teams?: ITeamProps[];
}
// Fixture is  match that is not yet played successfully

export function DisplayFixtures({ fixtures, teams }: DisplayFixturesProps) {
  return (
    <div>
      <h1 className="_title">Fixtures</h1>
      <div className="overflow-x-auto">
        <table className="table table-auto  ">
          <tbody>
            <tr className="border p-2 _label h-12">
              <th>Title</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {fixtures?.map((fixture, index) => (
              <tr
                key={fixture._id}
                className={`border _borderColor _p _card ${
                  index % 2 == 0 ? "bg-accent" : ""
                }`}
              >
                <td className="px-2 py-4 ">
                  <div className="flex items-center gap-2">
                    <BsPatchCheck />

                    <strong className="w-24">
                      {" "}
                      {checkTeams(fixture)?.home?.name}
                    </strong>
                    <span className="w-10">vs</span>

                    <strong className="w-24">
                      {" "}
                      {checkTeams(fixture)?.away?.name}
                    </strong>
                  </div>
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-sm">
                  {getFormattedDate(fixture.date, "Sunday, March 2, 2025")}
                </td>
                <td className="px-2 py-2 flex gap-5 text-sm ">
                  <UpdateFixtureMatch teams={teams} fixture={fixture} />
                  <DeleteFixture fixtureId={fixture._id} />
                </td>
              </tr>
            ))}
            {fixtures?.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center _label">
                  No fixtures available.
                </td>
              </tr>
            )}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={3}>
                <div className="p-2 flex items-center _p gap-3">
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
    toast(results.message, { type: results.success ? "success" : "error" });
    setWaiting(false);

    router.refresh();
  };
  return (
    <Button
      waiting={waiting}
      disabled={waiting}
      waitingText=""
      onClick={handleDelete}
      className=" px-2 flex items-center text-red-600"
    >
      <RiDeleteBin6Line className={waiting ? "hidden" : ""} />
    </Button>
  );
}
