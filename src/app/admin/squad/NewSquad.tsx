"use client";

import React from "react";
import { IPlayer } from "../../players/page";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PrimarySelect } from "@/components/select/Select";
import { Button } from "@/components/buttons/Button";
import { ITeamProps } from "@/app/matches/(fixturesAndResults)";
import { IManager } from "../managers/page";

interface IProps {
  players?: IPlayer[];
  teams?: ITeamProps[];
  managers?: IManager[];
}

const NewSquad = ({ players, teams, managers }: IProps) => {
  return (
    <div className="grow  ">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-black">NEW MATCH SQUAD</CardTitle>
          <CardDescription className="grid grid-cols-2">
            <PrimarySelect
              options={
                teams?.map((t) => ({
                  label: `${t.name}(${t.alias})`,
                  value: t._id,
                })) || []
              }
              className=""
              triggerStyles=" "
              placeholder="Oponent"
            />
            <PrimarySelect
              options={
                ["Home", "Away"].map((p) => ({
                  label: p,
                  value: p,
                })) || []
              }
              className=""
              placeholder="Venue"
            />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-black text-foreground">
                    Player
                  </th>
                  <th className="text-center py-3 px-4 font-black text-foreground">
                    Position
                  </th>
                  <th className="text-center py-3 px-4 font-black text-foreground">
                    Jersey
                  </th>
                  <th className="text-center py-3 px-4 font-black text-foreground">
                    Matches
                  </th>
                  <th className="text-center py-3 px-4 font-black text-foreground">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {players?.map((player, i) => (
                  <tr
                    key={i}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 px-4 font-semibold">{`${player?.lastName} ${player?.firstName}`}</td>
                    <td className="text-center py-4 px-4">
                      <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1 rounded-full font-bold">
                        {player?.position}
                      </span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full font-bold">
                        {player.jersey}
                      </span>
                    </td>
                    <td className="text-center py-4 px-4 text-muted-foreground">
                      {/* {player.matches} */}
                    </td>
                    <td className="text-center py-4 px-4">
                      <Button className="font-semibold bg-transparent _secondaryBtn">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <br />

          <hr />
          <br />

          <div>
            <h1>Technical Leadership</h1>
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-b border-border ">
                  <TableHead>COACH</TableHead>
                  <TableHead>ASSISTANT</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow className="border-b border-border">
                  <TableCell>
                    <PrimarySelect
                      options={
                        managers?.map((p) => ({
                          label: `${p.fullname} `,
                          value: p._id,
                        })) || []
                      }
                      className=""
                      triggerStyles=" "
                    />
                  </TableCell>
                  <TableCell>
                    <PrimarySelect
                      options={
                        managers?.map((p) => ({
                          label: `${p.fullname} `,
                          value: p._id,
                        })) || []
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button
              type="submit"
              primaryText="Save Squad"
              waiting={false}
              waitingText="Saving..."
              className="_primaryBtn p-3 ml-auto"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewSquad;
