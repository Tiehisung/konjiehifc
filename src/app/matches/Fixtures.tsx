import React from "react";
import { SearchQueryUpdator } from "./Headers";
import { Pagination } from "@/components/Pagination";
import { IMatchProps } from "./(fixturesAndResults)";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DIALOG } from "@/components/Dialog";
import Image from "next/image";
import { formatDate } from "@/lib/timeAndDate";
import { Badge } from "@/components/ui/badge";
import SquadCard from "../admin/squad/SquadCard";
import { FaCheckCircle } from "react-icons/fa";
import { Eye } from "lucide-react";
import { BsPatchCheck } from "react-icons/bs";
import { MdLiveTv } from "react-icons/md";
import { checkGoals, checkTeams } from "@/lib";
import { IQueryResponse } from "@/types";

interface IProps {
  fixtures: IQueryResponse<IMatchProps[]>;
}

const FixturesSection = ({ fixtures }: IProps) => {
  const filters = ["all", "home", "away", "canceled"];
  if (!fixtures) return <div className="_label">No fixtures</div>;
  return (
    <section id="fixtures" className="bg-secondary">
      <header className="flex justify-between items-center gap-4">
        <h2 className="font-bold my-3">Fixtures</h2>{" "}
      </header>
      <SearchQueryUpdator query="fixture" values={filters} />
      <div className=" ">
        <Table>
          <TableCaption>Fixtures</TableCaption>

          <TableHeader>
            <TableHead>MATCH</TableHead>
            <TableHead>DATE</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>SQUAD</TableHead>
          </TableHeader>

          <TableBody>
            {fixtures?.data?.map((fixture) => {
              const { home, away } = checkTeams(fixture);
              const goals = checkGoals(fixture);
              return (
                <TableRow key={fixture._id} className={`border _borderColor `}>
                  <TableCell className="px-4 py-4 ">
                    <div className="flex items-center gap-2 text-nowrap uppercase">
                      <span className="">
                        {fixture.status == "COMPLETED" ? (
                          <FaCheckCircle
                            className="text-primaryGreen"
                            size={16}
                          />
                        ) : fixture.status == "LIVE" ? (
                          <MdLiveTv className="text-primaryRed" size={16} />
                        ) : (
                          <BsPatchCheck size={16} />
                        )}
                      </span>

                      <Image
                        src={home?.logo as string}
                        alt={home?.name as string}
                        className="h-10 w-10 aspect-square "
                        width={100}
                        height={100}
                      />
                      <strong className="w-36 line-clamp-1">
                        {home?.name}
                      </strong>
                      {fixture?.status == "COMPLETED" ? (
                        <span className="w-11 text-xl font-semibold  ">
                          {goals?.home} - {goals?.away}
                        </span>
                      ) : (
                        <span className="w-11 text-xl">V</span>
                      )}

                      <Image
                        src={away?.logo as string}
                        width={100}
                        height={100}
                        alt={away?.name as string}
                        className="h-10 w-10 aspect-square "
                      />
                      <strong className="w-36 line-clamp-1">
                        {away?.name}
                      </strong>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-2 whitespace-nowrap text-sm flex gap-2">
                    <span>{formatDate(fixture.date, "March 2, 2025")}</span>
                    <span>{fixture?.time}</span>
                  </TableCell>

                  <TableCell className="px-4 py-2 whitespace-nowrap text-sm">
                    <Badge
                      variant={
                        fixture?.status == "LIVE" ? "destructive" : "outline"
                      }
                    >
                      {fixture.status}
                    </Badge>
                  </TableCell>

                  <TableCell
                    className="px-4 py-2 whitespace-nowrap text-sm"
                    title="View Squad"
                  >
                    {fixture?.squad ? (
                      <DIALOG
                        trigger={<Eye />}
                        title=""
                        className="min-w-[80vw]"
                      >
                        <SquadCard squad={fixture?.squad} match={fixture} />
                      </DIALOG>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}

            <TableRow>
              <TableCell>
                <div className="p-2 flex items-center text-sm gap-3 text-muted-foreground py-4">
                  <div>
                    Home fixtures:{" "}
                    {fixtures?.data?.filter((f) => f.isHome)?.length}
                  </div>
                  <div>
                    Away fixtures:{" "}
                    {fixtures?.data?.filter((f) => !f.isHome)?.length}
                  </div>
                  <div>Total fixtures: {fixtures?.data?.length}</div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                <Pagination pagination={fixtures?.pagination} />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
};

export default FixturesSection;
