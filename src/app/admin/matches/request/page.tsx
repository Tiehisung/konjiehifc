import { IMatchProps } from "@/app/matches/(fixturesAndResults)";
import { IQueryResponse } from "@/types";
import { getMatches } from "../page";
import { getManagers, IManager } from "../../managers/page";
import { DIALOG } from "@/components/Dialog";
import BottomSheetModal from "@/components/modals/BottomSheet";
import { TemplatesSelector } from "./TemplatesSelectorModal";
import { MatchRequestForm } from "./LetterForm";

const MatchRequestPage = async () => {
  const matches: IQueryResponse<IMatchProps[]> = await getMatches(
    "?status=UPCOMING"
  );
  const managers: IQueryResponse<IManager[]> = await getManagers();

  console.log({ matches, managers });

  return (
    <div>
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
      <BottomSheetModal trigger="Choose Template">
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
      </BottomSheetModal>

      <DIALOG trigger={"Choose Template"}>
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
      </DIALOG>
    </div>
  );
};

export default MatchRequestPage;
