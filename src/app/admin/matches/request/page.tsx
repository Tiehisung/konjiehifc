import { IMatchProps } from "@/app/matches/(fixturesAndResults)";
import { IQueryResponse } from "@/types";
import { getMatches } from "../page";
import { getManagers, IManager } from "../../managers/page";
import { TemplatesSelector } from "./TemplatesSelectorModal";
import { MatchRequestForm } from "./LetterForm";
import { PrimarySearch } from "@/components/Search";
import { SideDrawer } from "@/components/ShadSideDrawer";

const MatchRequestPage = async () => {
  const matches: IQueryResponse<IMatchProps[]> = await getMatches(
    "?status=UPCOMING"
  );
  const managers: IQueryResponse<IManager[]> = await getManagers();

  console.log({ matches, managers });

  return (
    <div>
      <main className="_page py-12 space-y-10">
        <MatchRequestForm
          match={matches?.data?.[0] as IMatchProps}
          official={{
            requester: {
              fullname: "Soskode",
              role: "Coach",
              phone: "0209282928",
            } as IManager,
          }}
        />
        <SideDrawer
          trigger="Choose Template"
          className="p-[2vw]"
          header={<PrimarySearch />}
          side="bottom"
          roundedTop
        >
          <TemplatesSelector
            match={matches?.data?.[0] as IMatchProps}
            official={{
              requester: {
                fullname: "Soskode",
                role: "Coach",
                phone: "0209282928",
              } as IManager,
            }}
          />
        </SideDrawer>
      </main>
    </div>
  );
};

export default MatchRequestPage;
