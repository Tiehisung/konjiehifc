import { apiConfig } from "@/lib/configs";
import { IMatchProps, ITeamProps } from "@/app/matches/(fixturesAndResults)";
import { IPlayer } from "@/app/players/page";
import { getPlayers } from "../players/page";
import { IQueryResponse } from "@/types";
import { MatchEventsAdmin } from "./Events";
import { getTeams } from "../features/teams/page";
import { checkTeams } from "@/lib";
import Image from "next/image";
import { staticImages } from "@/assets/images";

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

  console.log({ teams, match });

  const { home, away } = checkTeams(match?.data);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-primaryRed">
        Live Match Update
      </h1>

      <div className="my-6 _card rounded-tl-3xl rounded-br-3xl flex items-center justify-between gap-6">
        <Image
          src={home?.logo?.secure_url ?? staticImages.avatar}
          width={200}
          height={200}
          alt={home?.name ?? ""}
          className="aspect-square h-16 w-16 sm:h-24 sm:w-24 object-cover"
        />
        <div className=" flex flex-col justify-center items-center">
          <div className="text-xl md:text-2xl font-black uppercase">
            {home?.name}
          </div>
          <div className="mx-auto text-2xl text-center">0 - 0</div>
          <div className="text-xl md:text-2xl font-black uppercase">
            {away?.name}
          </div>
        </div>
        <Image
          src={away?.logo?.secure_url ?? staticImages.avatar}
          width={200}
          height={200}
          alt={away?.name ?? ""}
          className="aspect-square h-16 w-16 sm:h-24 sm:w-24 object-cover"
        />
      </div>

      <MatchEventsAdmin
        players={players?.data}
        opponent={teams?.data?.[0] as ITeamProps}
        match={match?.data as IMatchProps}
      />
    </div>
  );
}
