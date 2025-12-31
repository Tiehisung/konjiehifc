import { apiConfig } from "@/lib/configs";
import { IMatchProps, ITeamProps } from "@/app/matches/(fixturesAndResults)";
import { IPlayer } from "@/types/player.interface";
import { getPlayers } from "../players/page";
import { IQueryResponse } from "@/types";
import { MatchEventsAdmin } from "./EventsUpdator";
import { getTeams } from "../features/teams/page";
import { checkGoals, checkTeams } from "@/lib";
import Image from "next/image";
import { StartStopMatch } from "./StartStop";
import Header from "../../../components/Element";

export const getLiveMatch = async () => {
  try {
    const response = await fetch(`${apiConfig.matches}/live`, {
      cache: "no-cache",
    });
    const result = await response.json();
    return result;
  } catch {
    return null;
  }
};

export default async function LiveMatchPage() {
  const match: IQueryResponse<IMatchProps> = await getLiveMatch();
  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  const teams: IQueryResponse<ITeamProps[]> = await getTeams();

  const { home, away } = checkTeams(match?.data);
  const goals = checkGoals(match?.data);

  if (!match?.data)
    return (
      <div className="_label _card rounded-2xl text-center my-14 mx-6 _page">
        No Live Match Yet. You need to start a match first.
      </div>
    );

  if (match?.data.status == "COMPLETED")
    return (
      <div className="_page p-4">
        <h1 className="text-2xl font-bold mb-4 text-primaryRed">
          Played today
        </h1>
        <div className="my-6 _card rounded-tl-3xl rounded-br-3xl flex items-center justify-between gap-6">
          <Image
            src={home?.logo as string}
            width={200}
            height={200}
            alt={home?.name ?? ""}
            className="aspect-square h-16 w-16 sm:h-24 sm:w-24 object-cover"
          />
          <div className=" flex flex-col justify-center items-center">
            <div className="text-xl md:text-2xl font-black uppercase">
              {home?.name}
            </div>
            <div className="mx-auto text-2xl text-center">
              {goals?.home ?? 0} - {goals?.away ?? 0}
            </div>
            <div className="text-xl md:text-2xl font-black uppercase">
              {away?.name}
            </div>
          </div>
          <Image
            src={away?.logo as string}
            width={200}
            height={200}
            alt={away?.name ?? ""}
            className="aspect-square h-16 w-16 sm:h-24 sm:w-24 object-cover"
          />
        </div>
      </div>
    );
  if (match?.data.status == "UPCOMING")
    return (
      <div className="_page p-4">
        <div className="  font-bold mb-4 text-primaryRed">
          <Header title="DUE TODAY" subtitle=" Update all events live" />
        </div>
        {match?.data?.squad ? (
          <div className="my-6 _card rounded-tl-3xl rounded-br-3xl flex items-center justify-between gap-6">
            <Image
              src={home?.logo as string}
              width={200}
              height={200}
              alt={home?.name ?? ""}
              className="aspect-square h-16 w-16 sm:h-24 sm:w-24 object-cover"
            />
            <div className=" flex justify-center items-center">
              <div className="text-xl md:text-2xl font-black uppercase">
                {home?.name}
              </div>
              <div className="mx-auto text-2xl text-center px-3">VS</div>
              <div className="text-xl md:text-2xl font-black uppercase">
                {away?.name}
              </div>
            </div>
            <Image
              src={away?.logo as string}
              width={200}
              height={200}
              alt={away?.name ?? ""}
              className="aspect-square h-16 w-16 sm:h-24 sm:w-24 object-cover"
            />
          </div>
        ) : (
          <p className="_label p-6">No Squad Yet!</p>
        )}
      </div>
    );

  return (
    <div className="container mx-auto p-4 _page">
      <h1 className="text-2xl font-bold mb-4 text-primaryRed">
        Live Match Update
      </h1>
      <div className="my-6 _card rounded-tl-3xl rounded-br-3xl flex items-center justify-between gap-6">
        <Image
          src={home?.logo as string}
          width={200}
          height={200}
          alt={home?.name ?? ""}
          className="aspect-square h-16 w-16 sm:h-24 sm:w-24 object-cover"
        />
        <div className=" flex flex-col justify-center items-center">
          <div className="text-xl md:text-2xl font-black uppercase">
            {home?.name}
          </div>
          <div className="mx-auto text-2xl text-center">
            {goals?.home ?? 0} - {goals?.away ?? 0}
          </div>
          <div className="text-xl md:text-2xl font-black uppercase">
            {away?.name}
          </div>
        </div>
        <Image
          src={away?.logo as string}
          width={200}
          height={200}
          alt={away?.name ?? ""}
          className="aspect-square h-16 w-16 sm:h-24 sm:w-24 object-cover"
        />
      </div>

      <StartStopMatch match={match?.data} players={players?.data} />
      <br />

      {match?.data?.status == "LIVE" && match?.data?.squad && (
        <MatchEventsAdmin
          players={players?.data}
          opponent={teams?.data?.[0] as ITeamProps}
          match={match?.data as IMatchProps}
        />
      )}
    </div>
  );
}
