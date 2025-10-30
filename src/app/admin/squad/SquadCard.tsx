"use client";

import React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Users, CalendarDays, MapPin, Clock, UserCog } from "lucide-react";
import { ISquad } from "./page";
import { getFormattedDate, getTimeAgo } from "@/lib/timeAndDate";
import SquadActionButtons from "./Action";

interface SquadDisplayProps {
  squad?: ISquad;
}

const SquadCard = ({ squad }: SquadDisplayProps) => {
  if(!squad)return <div className='_label text-center m-6'>Squad not found</div>
  return (
    <Card className="shadow-lg border-0 overflow-hidden rounded-none ml-2.5 mb-12">
      <CardHeader className="bg-muted/40 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">
              Match Squad | {squad?.title ?? "Unknown"}
            </CardTitle>
            <CardDescription className="flex flex-wrap items-center gap-3 mt-1 text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin size={16} /> {squad?.match?.isHome ? "Home" : "Away"}
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays size={16} />{" "}
                {getFormattedDate(squad?.match?.date, "March 2, 2025")}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} /> {squad?.match?.time}
              </span>
            </CardDescription>
          </div>
        </div>

        {squad?.description && (
          <p className="mt-3 text-sm text-muted-foreground italic">
            “{squad?.description}”
          </p>
        )}
      </CardHeader>

      <CardContent className="py-6">
        {/* Players Section */}
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <Users size={18} /> Players ({squad?.players?.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {squad?.players?.map((player) => (
            <div
              key={player?._id}
              className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl border border-border hover:shadow-md transition"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={player?.avatar} alt={player?.name} />
                <AvatarFallback>
                  {player?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-sm uppercase">
                  {player?.name}
                </span>
                <Badge variant="outline" className="text-xs mt-1 capitalize">
                  {player?.position}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        {/* Technical Team */}
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <UserCog size={18} /> Technical Leadership
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Coach */}
          <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl border border-border">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={squad?.coach?.avatar}
                alt={squad?.coach?.name}
              />
              <AvatarFallback>
                {squad?.coach?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">
                {squad?.coach?.name || "N/A"}
              </span>
              <Badge variant="secondary" className="text-xs mt-1">
                Coach
              </Badge>
            </div>
          </div>

          {/* Assistant */}
          <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl border border-border">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={squad?.assistant?.avatar}
                alt={squad?.assistant?.name}
              />
              <AvatarFallback>
                {squad?.assistant?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">
                {squad?.assistant?.name || "N/A"}
              </span>
              <Badge variant="secondary" className="text-xs mt-1">
                Assistant Coach
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-between text-sm text-muted-foreground">
        <p>
          Created on {getFormattedDate(squad?.createdAt)} (
          {getTimeAgo(squad?.createdAt as string)})
        </p>
        <SquadActionButtons squadId={squad?._id as string} />
      </CardFooter>
    </Card>
  );
};

export default SquadCard;
