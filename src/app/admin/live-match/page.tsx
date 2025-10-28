import { apiConfig } from "@/lib/configs";
import { IMatchProps, ITeamProps } from "@/app/matches/(fixturesAndResults)";
import { IPlayer } from "@/app/players/page";
import { getPlayers } from "../players/page";
import { IQueryResponse } from "@/types";
import { MatchEventsAdmin } from "./Events";
import { getTeams } from "../features/teams/page";

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

  console.log({ teams,match });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-primaryRed">
        Live Football Match Update
      </h1>

      <MatchEventsAdmin
        players={players?.data}
        opponent={teams?.data?.[0] as ITeamProps}
        match={match?.data as IMatchProps}
      />

      {/* <div className="form-control lg:grid lg:grid-cols-2 items-start gap-8 mt-12">
        <Suspense fallback={<div>Loading match form...</div>}>
          <MatchForm match={match?.data as IMatchProps} />
        </Suspense>

        <Suspense fallback={<div>Loading match events...</div>}>
          <div className=" w-full">
            <AddLiveMatchEvent match={match?.data as IMatchProps} />
          </div>
          <MatchEvents match={match?.data as IMatchProps} />
        </Suspense>
      </div> */}

      {/* <ScoreboardManager players={players?.data || []} /> */}
    </div>
  );
}
