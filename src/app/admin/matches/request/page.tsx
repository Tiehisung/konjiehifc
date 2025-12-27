import { IMatchProps } from "@/app/matches/(fixturesAndResults)";
import { IQueryResponse } from "@/types";
import { getMatches } from "../page";
import { getManagers, IManager } from "../../managers/page";
import { MatchRequestForm } from "./LetterForm";
import { auth } from "@/auth";
import { teamKFC } from "@/data/teams";

const MatchRequestPage = async () => {
  const session = await auth();
  const matches: IQueryResponse<IMatchProps[]> = await getMatches(
    "?status=UPCOMING"
  );

  const managers: IQueryResponse<IManager[]> = await getManagers(
    "?manager_search=" + session?.user?.email
  );

  const requester =
    managers?.data?.[0] ??
    ({
      fullname: session?.user?.name,
      role: "KonFC Official",
      phone: teamKFC?.contact,
    } as IManager);

  return (
    <div>
      <main className="_page py-12 space-y-10">
        <MatchRequestForm
          match={matches?.data?.[0] as IMatchProps}
          official={{
            requester,
          }}
        />
      </main>
    </div>
  );
};

export default MatchRequestPage;
