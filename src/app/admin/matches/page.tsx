import { apiConfig } from "@/lib/configs";
import { DisplayFixtures } from "./DisplayFixtures";
import CreateMatch from "./CreateFixture";
import { getTeams } from "../features/teams/page";
import { MatchStatus } from "@/app/matches/(fixturesAndResults)";

export interface IGetMatchesProps {
  status?: MatchStatus;
  isHome?: boolean;
  sort?: "desc" | "asc";
}
export const getMatches = async ({
  status,
  isHome,
  sort,
}: IGetMatchesProps) => {
  try {
    const response = await fetch(`${apiConfig.matches}/find`, {
      cache: "no-store",
      body: JSON.stringify({ status, isHome, sort }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const fixtures = await response.json();
    return fixtures;
  } catch (error) {
    console.log(typeof error)
    return null;
  }
};

export const getMatchById = async (id: string) => {
  try {
    const response = await fetch(`${apiConfig.matches}/${id}`, {
      cache: "no-store",
    });
    const match = await response.json();
    return match;
  } catch (error) {
    console.log({ matches: error });
    return null;
  }
};

export default async function AdminFixtures() {
  const fixtures = await getMatches({});
  const teams = await getTeams();
  return (
    <section className="pb-6 pt-10 px-3">
      <DisplayFixtures fixtures={fixtures} teams={teams} />
      <div className="flex items-center py-14 gap-9">
        <CreateMatch teams={teams} />
      </div>
    </section>
  );
}
